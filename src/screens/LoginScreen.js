import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
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
      
      // Guardar token y usuario en el contexto
      await saveToken(response.jwt, { 
        email: email,
        username: response.username 
      });
      
      Alert.alert('Éxito', 'Sesión iniciada correctamente');
    } catch (error) {
      Alert.alert('Error de Autenticación', error.message || 'Usuario o contraseña incorrectos');
      console.error('Error de login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.centerContainer}>
      <Text style={styles.title}>Rent-A-Moto</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        editable={!loading}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />
      <Button title={loading ? "Iniciando..." : "Iniciar Sesión"} onPress={handleLogin} disabled={loading} />
      <TouchableOpacity onPress={onSwitchToRegister} disabled={loading}>
        <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};
