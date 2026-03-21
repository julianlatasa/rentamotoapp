import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Modal, ScrollView } from 'react-native';
import { Button, Card, Text, TextInput, ActivityIndicator, IconButton } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';
import { styles } from '../styles/styles';

export const OffersScreen = ({ onCreateOffer, onProfile }) => {
  const { token } = useContext(AuthContext);
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  // Datos dummy de motos ofertadas
  const dummyOfertas = [
    {
      id: 1,
      marca: 'Honda',
      modelo: 'CB500',
      año: 2022,
      precio: '$25/día',
      descripcion: 'Moto deportiva en excelente estado',
      imagen: '🏍️',
      propietario: 'Juan Pérez',
      ubicacion: 'Centro',
    },
    {
      id: 2,
      marca: 'Yamaha',
      modelo: 'XTZ 250',
      año: 2021,
      precio: '$20/día',
      descripcion: 'Moto todoterreno confiable',
      imagen: '🏍️',
      propietario: 'María García',
      ubicacion: 'Zona Norte',
    },
    {
      id: 3,
      marca: 'Kawasaki',
      modelo: 'Ninja 400',
      año: 2023,
      precio: '$30/día',
      descripcion: 'Deportiva nueva, poco uso',
      imagen: '🏍️',
      propietario: 'Carlos López',
      ubicacion: 'Centro Comercial',
    },
    {
      id: 4,
      marca: 'Suzuki',
      modelo: 'GSX-R150',
      año: 2020,
      precio: '$18/día',
      descripcion: 'Moto económica y eficiente',
      imagen: '🏍️',
      propietario: 'Ana Martínez',
      ubicacion: 'Barrio Sur',
    },
  ];

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setOfertas(dummyOfertas);
      setLoading(false);
    }, 500);
  }, []);

  const openOfferDetails = (offer) => {
    setSelectedOffer(offer);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={[styles.centerContainer, { justifyContent: 'center' }]}>
        <ActivityIndicator animating={true} size="large" />
        <Text style={{ marginTop: 16, textAlign: 'center' }}>Cargando motos disponibles...</Text>
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <View style={{ padding: 16, paddingBottom: 8 }}>
        <Text variant="headlineLarge" style={{ marginBottom: 16 }}>
          🏍️ Motos Disponibles
        </Text>
        <Text variant="bodyMedium" style={{ color: '#79747E', marginBottom: 16 }}>
          Encuentra la moto perfecta para tu viaje
        </Text>
      </View>

      <FlatList
        data={ofertas}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <Card style={{ marginVertical: 8 }}>
            <Card.Content>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flex: 1 }}>
                  <Text variant="titleLarge" style={{ marginBottom: 4 }}>
                    {item.marca} {item.modelo}
                  </Text>
                  <Text variant="bodySmall" style={{ color: '#79747E', marginBottom: 8 }}>
                    {item.año} • {item.ubicacion}
                  </Text>
                  <Text variant="titleMedium" style={{ color: '#6750A4', marginBottom: 8 }}>
                    {item.precio}
                  </Text>
                  <Text variant="bodySmall">{item.descripcion}</Text>
                </View>
                <Text style={{ fontSize: 40, marginLeft: 8 }}>{item.imagen}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button mode="outlined" onPress={() => openOfferDetails(item)}>
                Ver Detalles
              </Button>
              <Button mode="contained" onPress={() => alert('Solicitud de alquiler enviada')}>
                Alquilar
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      {/* Modal de detalles */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text variant="headlineMedium">Detalles de la Moto</Text>
            <IconButton
              icon="close"
              onPress={() => setModalVisible(false)}
            />
          </View>

          {selectedOffer && (
            <>
              <Card style={{ marginBottom: 16, backgroundColor: '#F3F3F3' }}>
                <Card.Content style={{ alignItems: 'center', paddingVertical: 40 }}>
                  <Text style={{ fontSize: 100 }}>{selectedOffer.imagen}</Text>
                </Card.Content>
              </Card>

              <Card style={{ marginBottom: 16 }}>
                <Card.Content>
                  <Text variant="headlineSmall" style={{ marginBottom: 16 }}>
                    {selectedOffer.marca} {selectedOffer.modelo}
                  </Text>

                  <View style={{ marginBottom: 16 }}>
                    <Text variant="labelLarge" style={{ color: '#79747E' }}>Propietario</Text>
                    <Text variant="bodyLarge">{selectedOffer.propietario}</Text>
                  </View>

                  <View style={{ marginBottom: 16 }}>
                    <Text variant="labelLarge" style={{ color: '#79747E' }}>Año</Text>
                    <Text variant="bodyLarge">{selectedOffer.año}</Text>
                  </View>

                  <View style={{ marginBottom: 16 }}>
                    <Text variant="labelLarge" style={{ color: '#79747E' }}>Ubicación</Text>
                    <Text variant="bodyLarge">{selectedOffer.ubicacion}</Text>
                  </View>

                  <View style={{ marginBottom: 16 }}>
                    <Text variant="labelLarge" style={{ color: '#79747E' }}>Descripción</Text>
                    <Text variant="bodyLarge">{selectedOffer.descripcion}</Text>
                  </View>

                  <View style={{ backgroundColor: '#EADDFF', padding: 12, borderRadius: 8 }}>
                    <Text variant="labelLarge" style={{ color: '#79747E', marginBottom: 4 }}>Precio por día</Text>
                    <Text variant="headlineSmall" style={{ color: '#6750A4' }}>
                      {selectedOffer.precio}
                    </Text>
                  </View>
                </Card.Content>
              </Card>

              <Button
                mode="contained"
                onPress={() => {
                  alert('Solicitud de alquiler enviada a ' + selectedOffer.propietario);
                  setModalVisible(false);
                }}
                style={{ marginBottom: 16 }}
              >
                Enviar Solicitud de Alquiler
              </Button>

              <Button
                mode="outlined"
                onPress={() => setModalVisible(false)}
              >
                Volver
              </Button>
            </>
          )}
        </ScrollView>
      </Modal>
    </View>
  );
};
