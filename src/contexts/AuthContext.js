import React, { createContext, useState, useCallback, useEffect } from 'react';
import * as Keychain from 'react-native-keychain';
import { authService } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Inicia en true para verificar sesión
  const [view, setView] = useState('login');

  const navigate = (newView) => setView(newView);

  // Al abrir la app, verifica si existe un token guardado
  useEffect(() => {
    restoreToken();
  }, []);

const saveToken = useCallback(async (jwtToken, userData) => {
  try {
    setToken(jwtToken);
    // Intentamos cargar el perfil real desde el servidor
    const profile = await authService.getProfile();
    setUser(profile);
    navigate('home');
  } catch (error) {
    console.error('Error al establecer sesión:', error);
    // Si falla, al menos guardamos los datos básicos del login
    setUser(userData);
    navigate('home');
  }
}, []);

const restoreToken = useCallback(async () => {
  setLoading(true);
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials && credentials.password) {
      // Intentamos obtener el perfil para validar que el token e ID sean correctos
      try {
        const profile = await authService.getProfile(); 
        setToken(credentials.password);
        setUser(profile);
      } catch (profileError) {
        // Si falla el perfil (ej. Error 403), la sesión es inválida
        console.error('Sesión inválida, limpiando datos...');
        await authService.logout();
      }
    }
  } catch (error) {
    console.error('Error restaurando token:', error);
  } finally {
    setLoading(false);
  }
}, []);
// src/contexts/AuthContext.js

const logout = useCallback(async () => {
  try {
    // LLAMA AL SERVICIO para limpiar Keychain y AsyncStorage simultáneamente
    await authService.logout(); 
    setToken(null);
    setUser(null);
    navigate('login');
  } catch (error) {
    console.error('Error en logout:', error);
  }
}, []);

return (
    <AuthContext.Provider value={{
      token, user, saveToken, logout, restoreToken,
      isAuthenticated: !!token, loading, view, navigate
    }}>
      {children}
    </AuthContext.Provider>
  );
};