import * as Keychain from 'react-native-keychain';

// API base URL - Soporta múltiples entornos
// Para emulador Android: usa 10.0.2.2 (que resuelve a localhost del host)
// Para dispositivo físico: usa la IP local de tu máquina (ej: 192.168.1.X)
// Para producción: reemplaza con tu dominio real
const API_URL = (() => {
  // Opción 1: Emulador Android
  const EMULATOR_URL = 'http://10.0.2.2:8080/v1';

  // Opción 2: Dispositivo físico o máquina local
  const LOCAL_URL = 'http://10.58.28.161:8080/v1';

  // Opción 3: Producción (reemplaza cuando depliegues)
  const PRODUCTION_URL = 'https://api.rent-a-moto.com.ar/v1';

  // Retorna la URL según el entorno
  // Por defecto usamos EMULATOR_URL para desarrollo
  // Cambia a LOCAL_URL o PRODUCTION_URL según necesites
  //return EMULATOR_URL;
    return PRODUCTION_URL;
})();

// Cliente HTTP centralizado para manejar token JWT automáticamente
const createAuthHeader = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${credentials.password}`
      };
    }
  } catch (error) {
    console.error('Error obteniendo token:', error);
  }
  return { 'Content-Type': 'application/json' };
};

const httpRequest = async (url, options = {}) => {
  const headers = await createAuthHeader();
  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers
    }
  });

  if (response.status === 401) {
    // Token inválido o expirado
    await Keychain.resetGenericPassword();
    throw new Error('Sesión expirada. Por favor inicia sesión nuevamente');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error ${response.status}`);
  }

  return response.json();
};

// Servicio de autenticación
export const authService = {
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/authenticate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Credenciales inválidas');
    }
    
    const data = await response.json();
    
    if (data.jwt) {
      // Guardamos el token y usamos el campo 'username' para guardar el userId
      // Así evitamos usar AsyncStorage
      await Keychain.setGenericPassword(data.userId.toString(), data.jwt);
    }
    
    return data;
  },
  register: async (email, password, nombre, apellido, documento) => {
    const response = await fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mail: email, password, nombre, apellido, documento }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Error al registrar');
    }
    return response.json();
  },

  logout: async () => {
    await Keychain.resetGenericPassword();
  },

  getUserId: async () => {
    const credentials = await Keychain.getGenericPassword();
    return credentials ? credentials.username : null; // El ID ahora vive en el username de Keychain
  },

  getToken: async () => {
    const credentials = await Keychain.getGenericPassword();
    return credentials ? credentials.password : null;
  },

  getProfile: async () => {
    const userId = await authService.getUserId(); // Obtenemos el ID desde Keychain
    if (!userId) {
      throw new Error('No se encontró el ID del usuario');
    }
    return httpRequest(`${API_URL}/usuarios/${userId}`, {
      method: 'GET'
    });
  }
};

// Servicio de ofertas (usa token automáticamente)
export const offerService = {
  getOfertas: async () => {
    return httpRequest(`${API_URL}/ofertas`, {
      method: 'GET'
    });
  },

  createOffer: async (descripcion, precioMinimo, precioMaximo) => {
    return httpRequest(`${API_URL}/ofertas`, {
      method: 'POST',
      body: JSON.stringify({
        descripcion,
        precioMinimo: parseFloat(precioMinimo),
        precioMaximo: parseFloat(precioMaximo)
      })
    });
  }
};
