// GUÍA: CÓMO CREAR Y USAR ICONOS PERSONALIZADOS
// ===============================================

// OPCIÓN 1: USAR ICONOS DE MATERIAL COMMUNITY (YA DISPONIBLES)
// ============================================================
// Los iconos actuales ya están usando Material Community Icons
// que vienen incluidos con react-native-paper

// Lista de iconos disponibles:
// https://materialdesignicons.com/

// Algunos iconos útiles para la app:
// - motorcycle: Motocicleta
// - plus-circle: Círculo con +
// - plus: Simple +
// - plus-box: Cuadro con +
// - chat: Burbuja de chat
// - chat-outline: Burbuja de chat (outline)
// - chat-multiple: Múltiples chats
// - account: Perfil/usuario
// - account-circle: Círculo con usuario
// - user: Usuario
// - home: Casa
// - home-outline: Casa (outline)
// - star: Estrella
// - heart: Corazón
// - map-marker: Ubicación
// - phone: Teléfono
// - email: Email
// - check: Marca

// Para CAMBIAR los iconos en App.tsx:
const routes = [
  { key: 'offers', title: 'Motos', icon: 'motorcycle' },      // Ya configurado ✓
  { key: 'myoffers', title: 'Mis Ofertas', icon: 'plus-circle' }, // Ya configurado ✓
  { key: 'chat', title: 'Chat', icon: 'chat' },               // Ya configurado ✓
  { key: 'profile', title: 'Perfil', icon: 'account' },       // Ya configurado ✓
];

// Alt otras opciones:
const routesAlt = [
  { key: 'offers', title: 'Motos', icon: 'bike', },
  { key: 'myoffers', title: 'Mis Ofertas', icon: 'plus-box' },
  { key: 'chat', title: 'Chat', icon: 'chat-multiple' },
  { key: 'profile', title: 'Perfil', icon: 'account-circle' },
];

// OPCIÓN 2: CREAR ICONOS SVG PERSONALIZADOS
// ==========================================
// Si quieres crear iconos únicos para tu marca:

// 1. Instala react-native-svg:
// npm install react-native-svg

// 2. Crea componentes SVG para cada icono:

// Archivo: src/icons/MotoIcon.js
import { SvgXml } from 'react-native-svg';

export const MotoIcon = ({ color = '#6750A4', size = 24 }) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g fill="${color}">
        <!-- Simple motorcycle icon -->
        <path d="M14 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
      </g>
    </svg>
  `;
  return <SvgXml xml={svg} width={size} height={size} />;
};

// Archivo: src/icons/MyOffersIcon.js
export const MyOffersIcon = ({ color = '#6750A4', size = 24 }) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g fill="${color}">
        <circle cx="12" cy="12" r="10"/>
        <path fill="white" d="M12 8v8M8 12h8"/>
      </g>
    </svg>
  `;
  return <SvgXml xml={svg} width={size} height={size} />;
};

// Archivo: src/icons/ChatIcon.js
export const ChatIcon = ({ color = '#6750A4', size = 24 }) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path fill="${color}" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
    </svg>
  `;
  return <SvgXml xml={svg} width={size} height={size} />;
};

// Archivo: src/icons/ProfileIcon.js
export const ProfileIcon = ({ color = '#6750A4', size = 24 }) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path fill="${color}" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  `;
  return <SvgXml xml={svg} width={size} height={size} />;
};

// 3. Actualiza App.tsx para usar los iconos personalizados:

import { MotoIcon } from './src/icons/MotoIcon';
import { MyOffersIcon } from './src/icons/MyOffersIcon';
import { ChatIcon } from './src/icons/ChatIcon';
import { ProfileIcon } from './src/icons/ProfileIcon';

function AppContent() {
  const [index, setIndex] = useState(0);

  // Si usas iconos personalizados (más complejo):
  // Necesitarás usar NavigationContainer de React Navigation:
  // npm install @react-navigation/bottom-tabs

  // Alternativamente, puedes usar BottomTabNavigator de React Navigation
  // que permite más personalización que BottomNavigation de Paper

  const routes = [
    { key: 'offers', title: 'Motos', icon: 'motorcycle' },
    { key: 'myoffers', title: 'Mis Ofertas', icon: 'plus-circle' },
    { key: 'chat', title: 'Chat', icon: 'chat' },
    { key: 'profile', title: 'Perfil', icon: 'account' },
  ];

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      // ... resto de props
    />
  );
}

// OPCIÓN 3: USAR EMOJIS COMO ICONOS (RÁPIDO Y SIMPLE)
// =====================================================
// Puedes usar emojis directamente en los títulos:

const routes = [
  { key: 'offers', title: '🏍️ Motos', icon: 'motorcycle' },
  { key: 'myoffers', title: '➕ Ofertas', icon: 'plus-circle' },
  { key: 'chat', title: '💬 Chat', icon: 'chat' },
  { key: 'profile', title: '👤 Perfil', icon: 'account' },
];

// OPCIÓN 4: USAR REACT NAVIGATION CON ICONOS PERSONALIZADOS
// ===========================================================
// Para mayor control y personalización:

// npm install @react-navigation/bottom-tabs
// npm install @react-navigation/native react-native-screens react-native-safe-area-context

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Motos') {
              iconName = 'motorcycle';
            } else if (route.name === 'MisOfertas') {
              iconName = 'plus-circle';
            } else if (route.name === 'Chat') {
              iconName = 'chat';
            } else if (route.name === 'Perfil') {
              iconName = 'account';
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6750A4',
          tabBarInactiveTintColor: '#79747E',
        })}
      >
        <Tab.Screen name="Motos" component={OffersScreen} />
        <Tab.Screen name="MisOfertas" component={MyOffersScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Perfil" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// COMPARATIVA DE OPCIONES
// =======================

/*

OPCIÓN                    COMPLEJIDAD    FLEXIBILIDAD    APARIENCIA    RECOMENDADO
─────────────────────────────────────────────────────────────────────────────────
Material Icons (actual)      Baja           Media          Moderna       ✓ (Ahora)
Iconos SVG personalizados    Media          Alta           Personalizada  Para futuro
Emojis                       Baja           Baja           Lúdica        No (profesional)
React Navigation + Icons     Alta           Muy Alta       Profesional   Para futuro

*/

// RECOMENDACIÓN
// =============
// La implementación actual (Material Community Icons) es la mejor para comenzar:
// ✓ Ya está integrada con react-native-paper
// ✓ No requiere dependencias adicionales
// ✓ Apariencia moderna y profesional
// ✓ Fácil de cambiar si necesitas otros iconos
// ✓ Personalizable con colores

console.log('✅ Iconos configurados correctamente');
