import React, { useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';
import { styles } from '../styles/styles';

export function ProfileScreen({ onLogout }) {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <ScrollView contentContainerStyle={styles.centerContainer}>
      <Text variant="headlineLarge" style={{ marginBottom: 32, textAlign: 'center' }}>
        Perfil de Usuario
      </Text>

      {user ? (
        <Card style={{ width: '100%', marginBottom: 24 }}>
          <Card.Content>
            <Text variant="titleMedium" style={{ marginBottom: 12 }}>
              Información Personal
            </Text>
            <View style={{ marginBottom: 8 }}>
              <Text variant="labelLarge" style={{ color: '#79747E' }}>Nombre</Text>
              <Text variant="bodyLarge">{user.name || 'No disponible'}</Text>
            </View>
            <View>
              <Text variant="labelLarge" style={{ color: '#79747E' }}>Email</Text>
              <Text variant="bodyLarge">{user.email || 'No disponible'}</Text>
            </View>
          </Card.Content>
        </Card>
      ) : (
        <Text style={{ textAlign: 'center', marginBottom: 24 }}>
          No hay información de usuario disponible
        </Text>
      )}

      <Button 
        mode="contained"
        onPress={handleLogout}
        buttonColor="#D32F2F"
        style={{ width: '100%' }}
      >
        Cerrar Sesión
      </Button>
    </ScrollView>
  );
}
