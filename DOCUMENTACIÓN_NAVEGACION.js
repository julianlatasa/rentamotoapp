// DOCUMENTACIÓN: SISTEMA DE NAVEGACIÓN INFERIOR (Bottom Navigation)
// ================================================================

// DESCRIPCIÓN GENERAL
// ====================
// La aplicación ahora incluye un sistema de navegación inferior (bottom tabs)
// visible después de que el usuario inicia sesión. Contiene 4 pestañas principales.

// PESTAÑAS / VISTAS
// =================

// 1️⃣ PESTAÑA: MOTOS (OffersScreen)
//    Ruta: routes[0] = key: 'offers'
//    Icono: motorcycle (una moto)
//    Ubicación: src/screens/OffersScreen.js
//    Descripción: 
//      - Muestra todas las motos disponibles para alquilar
//      - Lista de motos con datos dummy
//      - Cada moto muestra: marca, modelo, año, precio, ubicación
//      - Funcionalidad: Ver detalles, enviar solicitud de alquiler
//    Datos: Actualmente dados dummy (pueden ser reemplazados con API)

// 2️⃣ PESTAÑA: MIS OFERTAS (MyOffersScreen)
//    Ruta: routes[1] = key: 'myoffers'
//    Icono: plus-circle (un círculo con +)
//    Ubicación: src/screens/MyOffersScreen.js
//    Descripción:
//      - Sistema de tabs dentro de la pantalla (3 sub-pestañas):
//        a) Mis Motos - Motos públicas ofertadas por el usuario
//        b) Propuestas - Solicitudes de alquiler recibidas
//        c) Agregar Moto - Formulario para agregar nuevas motos
//    Datos: Dados dummy (tanto para motos como propuestas)
//    Funcionalidad:
//      - Ver motos propias con estado
//      - Aceptar/rechazar solicitudes de alquiler
//      - Formulario para agregar nuevas motos

// 3️⃣ PESTAÑA: CHAT (ChatScreen)
//    Ruta: routes[2] = key: 'chat'
//    Icono: chat (una burbuja de chat)
//    Ubicación: src/screens/ChatScreen.js
//    Descripción:
//      - Sistema de mensajería con otros usuarios
//      - Diferentes conversaciones con usuarios que consultaron por motos
//      - Interfaz de chat con mensajes dummy
//    Datos: Mensajes dummy para demostración
//    Funcionalidad:
//      - Enviar mensajes
//      - Recibir mensajes
//      - Scroll automático al último mensaje

// 4️⃣ PESTAÑA: PERFIL (ProfileScreen)
//    Ruta: routes[3] = key: 'profile'
//    Icono: account (una silueta de persona)
//    Ubicación: src/screens/ProfileScreen.js
//    Descripción:
//      - Información del perfil del usuario
//      - Datos personales (nombre, email)
//      - Botón para cerrar sesión
//    Datos: Datos reales del usuario (del contexto de autenticación)
//    Funcionalidad:
//      - Ver información personal
//      - Cerrar sesión

// ICONOS DISPONIBLES
// ==================
// Material Community Icons (incluidos en react-native-paper):

// 🏍️ motorcycle - Icono de motocicleta
//    Uso: Pestaña "Motos" (view offers)
//    Descripción: Representa las motos disponibles para alquilar

// ➕ plus-circle - Icono de círculo con +
//    Uso: Pestaña "Mis Ofertas" 
//    Descripción: Representa la acción de agregar/crear ofertas

// 💬 chat - Icono de burbuja de chat
//    Uso: Pestaña "Chat"
//    Descripción: Representa la mensajería

// 👤 account - Icono de perfil/usuario
//    Uso: Pestaña "Perfil"
//    Descripción: Representa la información del usuario

// PRÓXIMOS ICONOS PERSONALIZADOS (OPCIONAL)
// ===========================================
// Si deseas crear iconos personalizados, puedes:

// 1. Usar SVG con: react-native-svg
//    npm install react-native-svg

// 2. Crear componentes SVG personalizados:
import { SvgXml } from 'react-native-svg';

const MotoIcon = ({ color = '#6750A4' }) => (
  <SvgXml
    xml={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <path fill="${color}" d="M19 7h-8V4c0-.55-.45-1-1-1s-1 .45-1 1v3h-2c-.55 0-1 .45-1 1s.45 1 1 1h1v10H6c-1.1 0-2 .9-2 2s.9 2 2 2h1v2h2v-2h6v2h2v-2h1c1.1 0 2-.9 2-2s-.9-2-2-2h-1V8h1c.55 0 1-.45 1-1s-.45-1-1-1zm-5 10H7V8h7v9z"/>
    </svg>`}
  />
);

// 3. Cambiar los iconos en App.tsx:
const routes = [
  { key: 'offers', title: 'Motos', icon: 'motorcycle' }, // O icon: <MotoIcon />
  // ...
];

// CÓMO ESTÁ ESTRUCTURADO EL CÓDIGO
// ==================================

// En App.tsx:
// -----------
// 1. Se importan los 4 componentes de pantalla
// 2. Se define un array 'routes' con los 4 objetos de ruta
// 3. BottomNavigation.SceneMap() renderiza automáticamente el componente correcto
// 4. BottomNavigation maneja el estado 'index' (pestaña activa)
// 5. Los cambios de pestaña se manejan con onIndexChange

import { BottomNavigation } from 'react-native-paper';

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

// Dentro del JSX (cuando isAuthenticated === true):
<BottomNavigation
  navigationState={{ index, routes }}
  onIndexChange={setIndex}
  renderScene={renderScene}
  shifting={false}        // Mantiene texto visible en todas las pestañas
  labeled={true}          // Muestra nombres de pestañas
  activeColor="#6750A4"   // Color cuando está activa
  inactiveColor="#79747E" // Color cuando está inactiva
  barStyle={{ backgroundColor: '#FEF7FF' }} // Fondo de la barra
/>

// COLORES UTILIZADOS
// ===================
// - Primary (activo): #6750A4 (Púrpura)
// - Inactivo: #79747E (Gris)
// - Fondo barra: #FEF7FF (Blanco con toque púrpura)

// PRÓXIMOS PASOS
// ==============
// 1. Reemplazar datos dummy con llamadas API reales
// 2. Agregar persistencia de datos
// 3. Implementar notificaciones de mensajes nuevos
// 4. Crear badges en las pestañas (ej: número de solicitudes pendientes)
// 5. Agregar animations/transiciones entre pantallas

console.log('✅ Navegación inferior implementada con Material Design 3');
