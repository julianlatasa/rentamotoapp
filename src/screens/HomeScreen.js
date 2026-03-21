import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList } from 'react-native';
import { Button, Card, Text, ActivityIndicator, FAB } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';
import { offerService } from '../services/api';
import { styles } from '../styles/styles';

export const HomeScreen = ({ onCreateOffer, onProfile }) => {
  const { token, logout } = useContext(AuthContext);
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOfertas();
  }, [token]); // Refrescar cuando el token cambia

  const fetchOfertas = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const data = await offerService.getOfertas();
      setOfertas(data);
    } catch (error) {
      alert('Error: ' + (error.message || 'No se pudieron cargar las ofertas'));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    alert('¿Estás seguro de que deseas cerrar sesión?');
    logout();
  };

  if (loading) {
    return (
      <View style={[styles.centerContainer, { justifyContent: 'center' }]}>
        <ActivityIndicator animating={true} size="large" />
        <Text style={{ marginTop: 16, textAlign: 'center' }}>Cargando ofertas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <View style={{ padding: 16, paddingBottom: 8 }}>
        <Text variant="headlineLarge" style={{ marginBottom: 16 }}>Ofertas Disponibles</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button 
            mode="contained" 
            onPress={onCreateOffer}
            style={{ flex: 1 }}
          >
            Nueva Oferta
          </Button>
          <Button 
            mode="outlined" 
            onPress={onProfile}
            style={{ flex: 1 }}
          >
            Mi Perfil
          </Button>
        </View>
      </View>

      <FlatList
        data={ofertas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={{ margin: 12 }}>
            <Card.Content>
              <Text variant="titleLarge" style={{ marginBottom: 8 }}>
                {item.descripcion}
              </Text>
              <Text variant="bodyMedium" style={{ marginBottom: 8 }}>
                Precio: ${item.precioMinimo} - ${item.precioMaximo}
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button 
                mode="contained"
                onPress={() => alert('Funcionalidad de alquiler pendiente')}
              >
                Alquilar
              </Button>
            </Card.Actions>
          </Card>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            No hay ofertas disponibles
          </Text>
        }
      />

      <View style={{ padding: 16 }}>
        <Button 
          mode="contained"
          onPress={handleLogout}
          buttonColor="#D32F2F"
        >
          Cerrar Sesión
        </Button>
      </View>
    </View>
  );
};
