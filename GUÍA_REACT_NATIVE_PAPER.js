// GUÍA DE INSTALACIÓN Y USO DE REACT NATIVE PAPER
// ==================================================

// 1. INSTALACIÓN (EJECUTA EN LA TERMINAL)
// ========================================
// npm install react-native-paper react-native-vector-icons --save

// Si usas Expo, también ejecuta:
// expo install react-native-paper react-native-vector-icons

// Para Android: Asegúrate de que android/app/build.gradle incluya:
// project.ext.vectoricons = [
//     project: ['/node_modules/react-native-vector-icons'],
// ]

// 2. LO QUE HA SIDO MODIFICADO
// ============================

// ✅ App.tsx
//    - Se agregó PaperProvider como wrapper principal
//    - Se importó y aplicó el tema personalizado

// ✅ src/theme/theme.js (NUEVO)
//    - Tema personalizado basado en Material Design 3
//    - Colores consistentes con tu marca

// ✅ src/screens/LoginScreen.js
//    - Componentes nativos reemplazados por Paper
//    - TextInput -> TextInput de Paper (con label)
//    - Button -> Button de Paper (con variantes contained/text)

// ✅ src/screens/RegisterScreen.js
//    - Todos los TextInput actualizados a Paper
//    - Button con loader automático
//    - ScrollView para mejor UX en formularios largos

// ✅ src/screens/HomeScreen.js
//    - Componentes de Paper para UI moderna
//    - Card para mostrar ofertas
//    - ActivityIndicator de Paper

// ✅ src/screens/ProfileScreen.js
//    - Card para mostrar información
//    - Mejor presentación visual

// 3. COMPONENTES DE PAPER DISPONIBLES
// ====================================
// Puedes usar estos componentes en toda tu app:

import { 
  Button,           // Botones: mode="contained" | "outlined" | "text"
  TextInput,        // Inputs con label y validación
  Card,             // Tarjetas para contenido
  ActivityIndicator,// Indicadores de carga
  Text,             // Textos con variantes: headlineLarge, bodyMedium, etc
  Appbar,           // Barra superior
  FAB,              // Botón flotante
  Dialog,           // Diálogos
  IconButton,       // Botones con iconos
  Chip,             // Etiquetas
  Snackbar,         // Notificaciones
  Surface,          // Superficies con elevation
  List,             // Listas
  Divider,          // Separadores
} from 'react-native-paper';

// 4. EJEMPLOS DE USO
// ==================

// Botón
<Button 
  mode="contained" 
  onPress={() => console.log('Presionado')}
>
  Mi Botón
</Button>

// Input
<TextInput
  label="Email"
  value={email}
  onChangeText={setEmail}
  mode="outlined"
  keyboardType="email-address"
/>

// Card
<Card style={{ margin: 12 }}>
  <Card.Content>
    <Text variant="titleLarge">Título</Text>
    <Text>Contenido</Text>
  </Card.Content>
  <Card.Actions>
    <Button>Cancelar</Button>
    <Button>Aceptar</Button>
  </Card.Actions>
</Card>

// Text con variantes
<Text variant="headlineLarge">Título Grande</Text>
<Text variant="titleMedium">Título Medio</Text>
<Text variant="bodyMedium">Cuerpo Normal</Text>
<Text variant="labelSmall">Etiqueta</Text>

// 5. TEMAS DISPONIBLES
// ====================
// Tu tema actual incluye colores Material Design 3:
// - primary: #6750A4 (Púrpura)
// - secondary: #625B71
// - tertiary: #7D5260
// - error: #B3261E
// - background: #FEF7FF
// - surface: #FEF7FF

// Puedes modificar los colores en: src/theme/theme.js

// 6. PERSONALIZACIÓN
// ==================
// Para cambiar el tema, edita src/theme/theme.js:

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#TU_COLOR', // Cambia aquí
    // ... más colores
  },
};

// 7. ICONOS
// =========
// React Native Paper usa Material Symbols
// Para usar iconos:

import { MaterialCommunityIcons } from '@expo/vector-icons';

<IconButton
  icon="heart"
  size={20}
  onPress={() => console.log('Presionado')}
/>

// 8. PRÓXIMOS PASOS
// =================
// 1. Ejecuta: npm install
// 2. Prueba la app en Android/iOS
// 3. Personaliza componentes según tus necesidades
// 4. Consulta docs: https://callstack.github.io/react-native-paper/

console.log('✅ React Native Paper está listo para usar!');
