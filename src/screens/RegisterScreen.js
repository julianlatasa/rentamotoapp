import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { authService } from '../services/api';
import { styles } from '../styles/styles';

export const RegisterScreen = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [documento, setDocumento] = useState('');
  const [loading, setLoading] = useState(false);

  // Validar email simple
  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleRegister = async () => {
    // Validaciones
    if (!email || !password || !nombre || !apellido || !documento) {
      alert('Error de Validación: Por favor completa todos los campos');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Error de Validación: Por favor ingresa un email válido');
      return;
    }

    if (password.length < 6) {
      alert('Error de Validación: La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (nombre.length < 2) {
      alert('Error de Validación: El nombre debe tener al menos 2 caracteres');
      return;
    }

    if (apellido.length < 2) {
      alert('Error de Validación: El apellido debe tener al menos 2 caracteres');
      return;
    }

    if (documento.length < 5) {
      alert('Error de Validación: El documento debe tener al menos 5 caracteres');
      return;
    }

    setLoading(true);
    try {
      // Realizar registro
      const response = await authService.register(email, password, nombre, apellido, documento);
      
      // Mostrar información del usuario creado
      alert(
        `Éxito!\n\nUsuario registrado correctamente.\n\nDatos guardados:\nEmail: ${response.mail}\nNombre: ${response.nombre} ${response.apellido}\n\nAhora inicia sesión.`
      );
      onSwitchToLogin();
    } catch (error) {
      // Mensajes de error más descriptivos según el tipo de error
      let errorMessage = error.message || 'Error desconocido al registrar';
      
      if (errorMessage.includes('already registered') || errorMessage.includes('email ya está')) {
        errorMessage = 'Este email ya está registrado. Por favor usa otro email.';
      } else if (errorMessage.includes('409') || errorMessage.includes('Conflict')) {
        errorMessage = 'Este email ya está registrado. Por favor usa otro email.';
      } else if (errorMessage.includes('validation') || errorMessage.includes('Validación')) {
        errorMessage = 'Los datos ingresados no son válidos. Verifica todos los campos.';
      }
      
      alert('Error de Registro: ' + errorMessage);
      console.error('Error de registro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.centerContainer}>
      <Text variant="headlineLarge" style={{ textAlign: 'center', marginBottom: 32 }}>
        Registro
      </Text>
      
      <TextInput
        label="Nombre"
        placeholder="Ej: Juan"
        value={nombre}
        onChangeText={setNombre}
        editable={!loading}
        maxLength={50}
        mode="outlined"
        style={{ marginBottom: 16 }}
      />
      
      <TextInput
        label="Apellido"
        placeholder="Ej: Pérez"
        value={apellido}
        onChangeText={setApellido}
        editable={!loading}
        maxLength={50}
        mode="outlined"
        style={{ marginBottom: 16 }}
      />
      
      <TextInput
        label="Documento"
        placeholder="Ej: 12345678ABC"
        value={documento}
        onChangeText={setDocumento}
        editable={!loading}
        maxLength={20}
        mode="outlined"
        style={{ marginBottom: 16 }}
      />
      
      <TextInput
        label="Email"
        placeholder="Ej: correo@example.com"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        editable={!loading}
        keyboardType="email-address"
        maxLength={100}
        mode="outlined"
        style={{ marginBottom: 16 }}
      />
      
      <TextInput
        label="Contraseña"
        placeholder="Mínimo 6 caracteres"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
        maxLength={50}
        mode="outlined"
        style={{ marginBottom: 24 }}
      />
      
      <Button 
        mode="contained"
        onPress={handleRegister} 
        disabled={loading} 
        loading={loading}
        style={{ marginBottom: 16 }}
      >
        {loading ? 'Registrando...' : 'Registrarse'}
      </Button>
      
      <Button 
        mode="text" 
        onPress={onSwitchToLogin} 
        disabled={loading}
      >
        ¿Ya tienes cuenta? Inicia Sesión
      </Button>
    </ScrollView>
  );
};
