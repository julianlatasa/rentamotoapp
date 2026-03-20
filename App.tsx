import React, { useContext } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { AuthProvider, AuthContext } from './src/contexts/AuthContext';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { CreateOfferScreen } from './src/screens/CreateOfferScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { styles } from './src/styles/styles';

function AppContent() {
  const { isAuthenticated, loading, view, navigate } = useContext(AuthContext);

  // Mostrar pantalla de carga mientras se verifica la sesión
  if (loading) {
    return (
      <View style={[styles.main, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Cargando sesión...</Text>
      </View>
    );
  }

  // Si el usuario está autenticado, maneja la navegación entre pantallas autenticadas
  if (isAuthenticated) {
    return (
      <View style={styles.main}>
        {view === 'home' && (
          <HomeScreen
            onCreateOffer={() => navigate('createOffer')}
            onProfile={() => navigate('profile')}
          />
        )}
        {view === 'createOffer' && (
          <CreateOfferScreen
            onOfferCreated={() => navigate('home')}
            onCancel={() => navigate('home')}
          />
        )}
        {view === 'profile' && (
          <ProfileScreen onLogout={() => navigate('login')} />
        )}
      </View>
    );
  }

  // Si no está autenticado, muestra login o registro
  return (
    <View style={styles.main}>
      {view === 'login' && (
        <LoginScreen onSwitchToRegister={() => navigate('register')} />
      )}
      {view === 'register' && (
        <RegisterScreen onSwitchToLogin={() => navigate('login')} />
      )}
    </View>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
