import React, { useContext } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { AuthProvider, AuthContext } from './src/contexts/AuthContext';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { styles } from './src/styles/styles';

function AppContent() {
  const { isAuthenticated, loading, view, navigate } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={[styles.main, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#6750A4" />
        <Text style={{ marginTop: 16 }}>Verificando sesión...</Text>
      </View>
    );
  }

  return (
    <View style={styles.main}>
      {!isAuthenticated ? (
        <>
          {view === 'login' && <LoginScreen onSwitchToRegister={() => navigate('register')} />}
          {view === 'register' && <RegisterScreen onSwitchToLogin={() => navigate('login')} />}
        </>
      ) : (
        <>
          {view === 'home' && <HomeScreen onCreateOffer={() => navigate('createOffer')} onProfile={() => navigate('profile')} />}
          {view === 'profile' && <ProfileScreen onLogout={() => navigate('login')} />}
          {/* Añadir CreateOfferScreen aquí si es necesario */}
        </>
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