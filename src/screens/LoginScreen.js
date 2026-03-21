// src/screens/LoginScreen.js
import React, { useState, useContext } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { TextInput, Button, Text, ActivityIndicator } from 'react-native-paper';
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
      alert('Error: Por favor completa todos los campos');
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
      alert('Error: ' + (error.message || 'Usuario o contraseña incorrectos'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.centerContainer}>
      <Image 
        source={require('../../assets/icon.png')} 
        style={styles.logo}
      />
      <Text variant="headlineLarge" style={{ textAlign: 'center', marginBottom: 32 }}>
        Rent-A-Moto
      </Text>
      
      <TextInput
        label="Email"
        placeholder="correo@ejemplo.com"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        editable={!loading}
        keyboardType="email-address"
        mode="outlined"
        style={{ marginBottom: 16 }}
      />
      
      <TextInput
        label="Contraseña"
        placeholder="Tu contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
        mode="outlined"
        style={{ marginBottom: 24 }}
      />
      
      <Button 
        mode="contained" 
        onPress={handleLogin}
        disabled={loading}
        loading={loading}
        style={{ marginBottom: 16 }}
      >
        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </Button>

      <Button 
        mode="text" 
        onPress={onSwitchToRegister} 
        disabled={loading}
      >
        ¿No tienes cuenta? Regístrate
      </Button>
    </ScrollView>
  );
};