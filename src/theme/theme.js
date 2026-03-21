// src/theme/theme.js
import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6750A4',
    onPrimary: '#FFFFFF',
    primaryContainer: '#EADDFF',
    onPrimaryContainer: '#21005E',
    secondary: '#625B71',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#E8DEF8',
    onSecondaryContainer: '#1E192B',
    tertiary: '#7D5260',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#FFD8E4',
    onTertiaryContainer: '#31111D',
    error: '#B3261E',
    onError: '#FFFFFF',
    errorContainer: '#F9DEDC',
    onErrorContainer: '#410E0B',
    outline: '#79747E',
    outlineVariant: '#CAC7D0',
    background: '#FEF7FF',
    onBackground: '#1C1B1F',
    surface: '#FEF7FF',
    onSurface: '#1C1B1F',
    surfaceVariant: '#F3F3F3',
    onSurfaceVariant: '#49454E',
  },
};
