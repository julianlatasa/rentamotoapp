import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { offerService } from '../services/api';
import { styles } from '../styles/styles';

export const CreateOfferScreen = ({ onOfferCreated, onCancel }) => {
  const [descripcion, setDescripcion] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateOffer = async () => {
    if (!descripcion || !precioMin || !precioMax) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (parseFloat(precioMin) > parseFloat(precioMax)) {
      Alert.alert('Error', 'El precio mínimo no puede ser mayor al precio máximo');
      return;
    }

    setLoading(true);
    try {
      await offerService.createOffer(descripcion, precioMin, precioMax);
      Alert.alert('Éxito', 'Oferta creada correctamente');
      onOfferCreated();
    } catch (error) {
      Alert.alert('Error', error.message || 'No se pudo crear la oferta');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.centerContainer}>
      <Text style={styles.title}>Publicar Moto</Text>
      <TextInput
        style={styles.input}
        placeholder="Descripción (ej. Honda Wave 110)"
        value={descripcion}
        onChangeText={setDescripcion}
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio Mínimo"
        value={precioMin}
        onChangeText={setPrecioMin}
        keyboardType="numeric"
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio Máximo"
        value={precioMax}
        onChangeText={setPrecioMax}
        keyboardType="numeric"
        editable={!loading}
      />
      <View style={styles.row}>
        <Button title="Cancelar" color="red" onPress={onCancel} disabled={loading} />
        <Button title={loading ? "Publicando..." : "Publicar"} onPress={handleCreateOffer} disabled={loading} />
      </View>
    </View>
  );
};
