import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { offerService } from '../services/api';
import { styles } from '../styles/styles';

export const CreateOfferScreen = ({ onOfferCreated, onCancel }) => {
  const [descripcion, setDescripcion] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateOffer = async () => {
    if (!descripcion || !precioMin || !precioMax) {
      alert('Error: Por favor completa todos los campos');
      return;
    }

    if (parseFloat(precioMin) > parseFloat(precioMax)) {
      alert('Error: El precio mínimo no puede ser mayor al precio máximo');
      return;
    }

    setLoading(true);
    try {
      await offerService.createOffer(descripcion, precioMin, precioMax);
      alert('Éxito: Oferta creada correctamente');
      onOfferCreated();
    } catch (error) {
      alert('Error: ' + (error.message || 'No se pudo crear la oferta'));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.centerContainer}>
      <Text variant="headlineLarge" style={{ marginBottom: 32, textAlign: 'center' }}>
        Publicar Moto
      </Text>

      <TextInput
        label="Descripción"
        placeholder="Ej. Honda Wave 110"
        value={descripcion}
        onChangeText={setDescripcion}
        editable={!loading}
        mode="outlined"
        style={{ marginBottom: 16 }}
      />

      <TextInput
        label="Precio Mínimo"
        placeholder="Ej. 50"
        value={precioMin}
        onChangeText={setPrecioMin}
        keyboardType="numeric"
        editable={!loading}
        mode="outlined"
        style={{ marginBottom: 16 }}
      />

      <TextInput
        label="Precio Máximo"
        placeholder="Ej. 100"
        value={precioMax}
        onChangeText={setPrecioMax}
        keyboardType="numeric"
        editable={!loading}
        mode="outlined"
        style={{ marginBottom: 24 }}
      />

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Button
          mode="outlined"
          onPress={onCancel}
          disabled={loading}
          style={{ flex: 1 }}
        >
          Cancelar
        </Button>
        <Button
          mode="contained"
          onPress={handleCreateOffer}
          disabled={loading}
          loading={loading}
          style={{ flex: 1 }}
        >
          {loading ? "Publicando..." : "Publicar"}
        </Button>
      </View>
    </ScrollView>
  );
};
