import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, Alert, FlatList } from 'react-native';
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
      Alert.alert('Error', error.message || 'No se pudieron cargar las ofertas');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro?',
      [
        { text: 'Cancelar', onPress: () => {} },
        { text: 'Sí', onPress: logout }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ofertas Disponibles</Text>
        <Button title="Nueva Oferta" onPress={onCreateOffer} />
        <Button title="Mi Perfil" onPress={onProfile} />
      </View>

      {loading ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Cargando ofertas...</Text>
      ) : (
        <FlatList
          data={ofertas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.descripcion}</Text>
              <Text>Precio: ${item.precioMinimo} - ${item.precioMaximo}</Text>
              <Button 
                title="Alquilar" 
                onPress={() => Alert.alert('Info', 'Funcionalidad de alquiler pendiente')} 
              />
            </View>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20 }}>No hay ofertas disponibles</Text>
          }
        />
      )}

      <Button title="Cerrar Sesión" color="red" onPress={handleLogout} />
    </View>
  );
};
