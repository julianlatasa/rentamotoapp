import React, { createContext, useState, useCallback, useEffect } from 'react';
import * as Keychain from 'react-native-keychain';
import { authService } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('login');

  const navigate = (newView) => {
    setView(newView);
  };

  useEffect(() => {
    restoreToken();
  }, []);

  useEffect(() => {
    if (token) {
      navigate('home');
    } else {
      navigate('login');
    }
  }, [token]);

  // Guardar token en almacenamiento seguro
  const saveToken = useCallback(async (jwtToken, userData) => {
    try {
      if (jwtToken !== null && jwtToken !== undefined) {
        await Keychain.setGenericPassword('authToken', jwtToken);
      }
      setToken(jwtToken);
      const profile = await authService.getProfile();
      setUser(profile);
      navigate('home');
    } catch (error) {
      console.error('Error guardando token:', error);
    }
  }, []);

  // Obtener token del almacenamiento seguro
  const restoreToken = useCallback(async () => {
    setLoading(true);
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials && credentials.password) {
        setToken(credentials.password);
        const profile = await authService.getProfile();
        setUser(profile);
      }
    } catch (error) {
      console.error('Error restaurando token:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await Keychain.resetGenericPassword();
      setToken(null);
      setUser(null);
      navigate('login');
    } catch (error) {
      console.error('Error en logout:', error);
    }
  }, []);

  const value = {
    token,
    user,
    setToken,
    setUser,
    saveToken,
    logout,
    restoreToken,
    isAuthenticated: !!token,
    loading,
    view,
    navigate
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
