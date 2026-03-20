import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { styles } from '../styles/styles';

export function ProfileScreen({ onLogout }) {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <View style={styles.main}>
      <Text style={styles.title}>Perfil de Usuario</Text>
      {user && (
        <View>
          <Text>Nombre: {user.name}</Text>
          <Text>Email: {user.email}</Text>
        </View>
      )}
      <Button title="Cerrar Sesión" onPress={handleLogout} />
    </View>
  );
}
