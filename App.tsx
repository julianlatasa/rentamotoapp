import React, { useContext, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { PaperProvider, BottomNavigation } from 'react-native-paper';
import { AuthProvider, AuthContext } from './src/contexts/AuthContext';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { OffersScreen } from './src/screens/OffersScreen';
import { MyOffersScreen } from './src/screens/MyOffersScreen';
import { ChatScreen } from './src/screens/ChatScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { theme } from './src/theme/theme';
import { styles } from './src/styles/styles';

function AppContent() {
  const { isAuthenticated, loading, view, navigate } = useContext(AuthContext);
  const [index, setIndex] = useState(0);

  const routes = [
    { key: 'offers', title: 'Motos', icon: 'motorcycle' },
    { key: 'myoffers', title: 'Mis Ofertas', icon: 'plus-circle' },
    { key: 'chat', title: 'Chat', icon: 'chat' },
    { key: 'profile', title: 'Perfil', icon: 'account' },
  ];

  const renderScene = BottomNavigation.SceneMap({
    offers: OffersScreen,
    myoffers: MyOffersScreen,
    chat: ChatScreen,
    profile: ProfileScreen,
  });

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
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          shifting={false}
          labeled={true}
          activeColor="#6750A4"
          inactiveColor="#79747E"
          barStyle={{ backgroundColor: '#FEF7FF' }}
        />
      )}
    </View>
  );
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </PaperProvider>
  );
}