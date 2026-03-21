// src/screens/LoginScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { authService } from '../services/api';
import { styles } from '../styles/styles';

export const LoginScreen = ({ onSwitchToRegister }) => {
  const { saveToken } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.login(email, password);
      // Persistencia del token
      await saveToken(response.jwt, { 
        email: email,
        username: response.username 
      });
    } catch (error) {
      Alert.alert('Error', error.message || 'Usuario o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.centerContainer}>
      <Image 
        source={require('../../assets/icon.png')} 
        style={styles.logo}
      />
      <Text style={styles.title}>Rent-A-Moto</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#79747E"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        editable={!loading}
        keyboardType="email-address"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#79747E"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />
      
      {/* Botón personalizado estilo Material Design 3 */}
      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={onSwitchToRegister} disabled={loading}>
        <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};