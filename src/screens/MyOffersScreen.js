import React, { useState } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { Button, Card, Text, TextInput, ActivityIndicator, Divider, Chip } from 'react-native-paper';
import { styles } from '../styles/styles';

export const MyOffersScreen = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    año: '',
    precio: '',
    descripcion: '',
  });
  const [loading, setLoading] = useState(false);

  // Datos dummy de propuestas recibidas
  const propostas = [
    {
      id: 1,
      usuario: 'Pedro González',
      moto: 'Honda CB500 (Tu oferta)',
      fechaInicio: '25/03/2026',
      fechaFin: '27/03/2026',
      estado: 'pendiente',
      dias: 2,
      precioTotal: '$50',
    },
    {
      id: 2,
      usuario: 'Laura Fernández',
      moto: 'Yamaha XTZ 250 (Tu oferta)',
      fechaInicio: '26/03/2026',
      fechaFin: '28/03/2026',
      estado: 'aceptada',
      dias: 2,
      precioTotal: '$40',
    },
    {
      id: 3,
      usuario: 'Roberto Sánchez',
      moto: 'Suzuki GSX-R150 (Tu oferta)',
      fechaInicio: '30/03/2026',
      fechaFin: '31/03/2026',
      estado: 'rechazada',
      dias: 1,
      precioTotal: '$18',
    },
  ];

  // Datos dummy de motos ofertadas por el usuario
  const misMotoS = [
    {
      id: 1,
      marca: 'Honda',
      modelo: 'CB500',
      año: 2022,
      precio: '$25/día',
      descripcion: 'Moto deportiva en excelente estado',
      estado: 'activa',
      alquileres: 3,
    },
    {
      id: 2,
      marca: 'Yamaha',
      modelo: 'XTZ 250',
      año: 2021,
      precio: '$20/día',
      descripcion: 'Moto todoterreno confiable',
      estado: 'activa',
      alquileres: 5,
    },
  ];

  const handleAddMoto = async () => {
    if (!formData.marca || !formData.modelo || !formData.año || !formData.precio) {
      alert('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    // Simular envío
    setTimeout(() => {
      alert('¡Moto agregada exitosamente!');
      setFormData({
        marca: '',
        modelo: '',
        año: '',
        precio: '',
        descripcion: '',
      });
      setLoading(false);
    }, 1000);
  };

  const getStatusColor = (estado) => {
    switch (estado) {
      case 'pendiente':
        return '#FFA500';
      case 'aceptada':
        return '#4CAF50';
      case 'rechazada':
        return '#D32F2F';
      default:
        return '#79747E';
    }
  };

  const getStatusText = (estado) => {
    switch (estado) {
      case 'pendiente':
        return 'Pendiente';
      case 'aceptada':
        return 'Aceptada';
      case 'rechazada':
        return 'Rechazada';
      default:
        return estado;
    }
  };

  const tabs = [
    { id: 0, label: 'Mis Motos', icon: '🏍️' },
    { id: 1, label: 'Propuestas', icon: '📋' },
    { id: 2, label: 'Agregar Moto', icon: '➕' },
  ];

  return (
    <View style={styles.main}>
      {/* CUSTOM TAB NAVIGATION */}
      <View style={{ flexDirection: 'row', backgroundColor: '#FEF7FF', borderBottomWidth: 1, borderBottomColor: '#E8DDF1' }}>
        {tabs.map((tab) => (
          <View key={tab.id} style={{ flex: 1 }}>
            <Button
              mode={activeTab === tab.id ? 'contained' : 'text'}
              onPress={() => setActiveTab(tab.id)}
              style={{
                borderRadius: 0,
                marginHorizontal: 0,
              }}
              buttonColor={activeTab === tab.id ? '#6750A4' : 'transparent'}
              textColor={activeTab === tab.id ? '#FFFFFF' : '#79747E'}
              labelStyle={{ fontSize: 11, fontWeight: activeTab === tab.id ? '600' : '400' }}
            >
              {tab.icon} {tab.label}
            </Button>
          </View>
        ))}
      </View>

      {/* TAB 1: MIS MOTOS */}
      {activeTab === 0 && (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
          <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
            Mis Motos Ofertadas ({misMotoS.length})
          </Text>

          {misMotoS.length === 0 ? (
            <Card style={{ marginBottom: 16 }}>
              <Card.Content>
                <Text style={{ textAlign: 'center', color: '#79747E' }}>
                  No tienes motos ofertadas. ¡Agrega una!
                </Text>
              </Card.Content>
            </Card>
          ) : (
            misMotoS.map((moto) => (
              <Card key={moto.id} style={{ marginBottom: 12 }}>
                <Card.Content>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text variant="titleLarge">
                      {moto.marca} {moto.modelo}
                    </Text>
                    <View style={{ backgroundColor: '#C6E1FE', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 16 }}>
                      <Text style={{ color: '#003DAA', fontSize: 12, fontWeight: '600' }}>
                        {moto.estado === 'activa' ? '✓ Activa' : 'Inactiva'}
                      </Text>
                    </View>
                  </View>
                  <Text variant="bodySmall" style={{ color: '#79747E', marginBottom: 4 }}>
                    {moto.año}
                  </Text>
                  <Divider style={{ marginVertical: 8 }} />
                  <View style={{ marginBottom: 8 }}>
                    <Text variant="labelLarge" style={{ color: '#79747E', marginBottom: 4 }}>
                      Precio: <Text style={{ color: '#6750A4', fontWeight: '600' }}>{moto.precio}</Text>
                    </Text>
                    <Text variant="labelLarge" style={{ color: '#79747E' }}>
                      Alquileres completados: <Text style={{ fontWeight: '600' }}>{moto.alquileres}</Text>
                    </Text>
                  </View>
                </Card.Content>
                <Card.Actions>
                  <Button mode="outlined" compact>
                    Editar
                  </Button>
                  <Button mode="outlined" compact>
                    Más Info
                  </Button>
                </Card.Actions>
              </Card>
            ))
          )}
        </ScrollView>
      )}

      {/* TAB 2: PROPUESTAS RECIBIDAS */}
      {activeTab === 1 && (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
          <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
            Solicitudes de Alquiler ({propostas.length})
          </Text>

          {propostas.map((propuesta) => (
            <Card key={propuesta.id} style={{ marginBottom: 12 }}>
              <Card.Content>
                <View style={{ marginBottom: 8 }}>
                  <Text variant="titleLarge">{propuesta.usuario}</Text>
                  <Text variant="bodySmall" style={{ color: '#79747E' }}>
                    {propuesta.moto}
                  </Text>
                </View>

                <Divider style={{ marginVertical: 8 }} />

                <View style={{ marginBottom: 8 }}>
                  <Text variant="bodyMedium" style={{ marginBottom: 4 }}>
                    📅 {propuesta.fechaInicio} a {propuesta.fechaFin}
                  </Text>
                  <Text variant="bodyMedium" style={{ marginBottom: 4 }}>
                    ⏱️ {propuesta.dias} día(s)
                  </Text>
                  <Text variant="titleLarge" style={{ color: '#6750A4', marginTop: 4 }}>
                    {propuesta.precioTotal}
                  </Text>
                </View>

                <View style={{ marginTop: 8, marginBottom: 8 }}>
                  <View
                    style={{
                      backgroundColor: getStatusColor(propuesta.estado) + '20',
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 16,
                      alignSelf: 'flex-start',
                    }}
                  >
                    <Text style={{ color: getStatusColor(propuesta.estado), fontWeight: '600', fontSize: 12 }}>
                      {getStatusText(propuesta.estado)}
                    </Text>
                  </View>
                </View>
              </Card.Content>

              {propuesta.estado === 'pendiente' && (
                <Card.Actions>
                  <Button mode="outlined" onPress={() => alert('Solicitud rechazada')}>
                    Rechazar
                  </Button>
                  <Button mode="contained" onPress={() => alert('Solicitud aceptada')}>
                    Aceptar
                  </Button>
                </Card.Actions>
              )}
            </Card>
          ))}
        </ScrollView>
      )}

      {/* TAB 3: AGREGAR MOTO */}
      {activeTab === 2 && (
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
          <Text variant="headlineMedium" style={{ marginBottom: 24 }}>
            Agregar Nueva Moto
          </Text>

          <TextInput
            label="Marca"
            placeholder="Ej: Honda"
            value={formData.marca}
            onChangeText={(text) => setFormData({ ...formData, marca: text })}
            mode="outlined"
            style={{ marginBottom: 12 }}
          />

          <TextInput
            label="Modelo"
            placeholder="Ej: CB500"
            value={formData.modelo}
            onChangeText={(text) => setFormData({ ...formData, modelo: text })}
            mode="outlined"
            style={{ marginBottom: 12 }}
          />

          <TextInput
            label="Año"
            placeholder="Ej: 2022"
            value={formData.año}
            onChangeText={(text) => setFormData({ ...formData, año: text })}
            mode="outlined"
            keyboardType="numeric"
            style={{ marginBottom: 12 }}
          />

          <TextInput
            label="Precio por día"
            placeholder="Ej: $25"
            value={formData.precio}
            onChangeText={(text) => setFormData({ ...formData, precio: text })}
            mode="outlined"
            style={{ marginBottom: 12 }}
          />

          <TextInput
            label="Descripción"
            placeholder="Describe el estado y características de tu moto"
            value={formData.descripcion}
            onChangeText={(text) => setFormData({ ...formData, descripcion: text })}
            mode="outlined"
            multiline
            numberOfLines={4}
            style={{ marginBottom: 24 }}
          />

          <Button
            mode="contained"
            onPress={handleAddMoto}
            loading={loading}
            disabled={loading}
          >
            Publicar Moto
          </Button>

          <Button
            mode="outlined"
            onPress={() => setFormData({ marca: '', modelo: '', año: '', precio: '', descripcion: '' })}
            style={{ marginTop: 8 }}
          >
            Limpiar Formulario
          </Button>
        </ScrollView>
      )}
    </View>
  );
};
