// src/styles/styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  main: { 
    flex: 1, 
    backgroundColor: '#FEF7FF' 
  },
  centerContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 24 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 32, 
    textAlign: 'center',
    color: '#1C1B1F'
  },
  input: { 
    backgroundColor: '#F3F3F3', 
    padding: 16, 
    borderRadius: 16, // Bordes redondeados modernos
    marginBottom: 16, 
    borderWidth: 1, 
    borderColor: '#79747E',
    fontSize: 16,
    color: '#1C1B1F'
  },
  // NUEVO: Estilo para el botón personalizado
  button: {
    backgroundColor: '#6750A4', // Púrpura Material Design 3
    paddingVertical: 14,
    borderRadius: 28, // Botón completamente redondeado
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    elevation: 2, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    backgroundColor: '#958DA5',
  },
  link: { 
    color: '#6750A4', 
    marginTop: 24, 
    textAlign: 'center',
    fontWeight: '500'
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain'
  }
});