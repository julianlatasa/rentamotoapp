// src/styles/styles.js
// Estilos minimalistas usando propiedades nativas de React Native
// Los estilos visuales se manejan a través de react-native-paper

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Contenedor principal con fondo de tema
  main: { 
    flex: 1
  },
  // Contenedor centrado para pantallas de autenticación
  centerContainer: { 
    flexGrow: 1,
    justifyContent: 'center', 
    padding: 24 
  },
  // Estilos para logo
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain'
  }
});