import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Card, Text, TextInput, Avatar, IconButton } from 'react-native-paper';
import { styles } from '../styles/styles';

export const ChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Juan Pérez',
      timestamp: '10:30',
      message: '¡Hola! ¿Sigue disponible tu moto para el fin de semana?',
      isMine: false,
      avatar: '👨',
    },
    {
      id: 2,
      sender: 'Tú',
      timestamp: '10:35',
      message: 'Sí, claro. ¿Qué fechas necesitas?',
      isMine: true,
      avatar: '👤',
    },
    {
      id: 3,
      sender: 'Juan Pérez',
      timestamp: '10:36',
      message: 'Sería para el sábado y domingo. ¿Cuál es el precio?',
      isMine: false,
      avatar: '👨',
    },
    {
      id: 4,
      sender: 'Tú',
      timestamp: '10:40',
      message: 'Para 2 días te haría un descuento especial. $45 por los 2 días.',
      isMine: true,
      avatar: '👤',
    },
    {
      id: 5,
      sender: 'Juan Pérez',
      timestamp: '10:42',
      message: '¡Excelente! Me interesa. ¿Dónde y cuándo la puedo recoger?',
      isMine: false,
      avatar: '👨',
    },
    {
      id: 6,
      sender: 'María García',
      timestamp: '11:15',
      message: 'Hola, ¿tu Yamaha sigue disponible?',
      isMine: false,
      avatar: '👩',
    },
    {
      id: 7,
      sender: 'Tú',
      timestamp: '11:20',
      message: 'Sí, está disponible. ¿Te interesa?',
      isMine: true,
      avatar: '👤',
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);

  useEffect(() => {
    // Scroll al último mensaje
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      id: messages.length + 1,
      sender: 'Tú',
      timestamp: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      message: newMessage,
      isMine: true,
      avatar: '👤',
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const renderMessage = ({ item }) => (
    <View
      style={{
        flexDirection: item.isMine ? 'row-reverse' : 'row',
        marginVertical: 8,
        paddingHorizontal: 12,
        alignItems: 'flex-end',
      }}
    >
      <Text style={{ fontSize: 24, marginHorizontal: 8 }}>{item.avatar}</Text>
      <View
        style={{
          maxWidth: '70%',
          backgroundColor: item.isMine ? '#6750A4' : '#F3F3F3',
          padding: 12,
          borderRadius: 12,
        }}
      >
        {!item.isMine && (
          <Text variant="labelSmall" style={{ color: '#6750A4', marginBottom: 4, fontWeight: '600' }}>
            {item.sender}
          </Text>
        )}
        <Text style={{ color: item.isMine ? '#FFFFFF' : '#1C1B1F', marginBottom: 4 }}>
          {item.message}
        </Text>
        <Text
          variant="labelSmall"
          style={{
            color: item.isMine ? '#E8D7F4' : '#79747E',
            textAlign: 'right',
            fontSize: 10,
          }}
        >
          {item.timestamp}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.main}
    >
      <View style={{ padding: 12, paddingBottom: 4 }}>
        <Text variant="headlineMedium">Mensajes (3 chats activos)</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 12 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
      />

      <View style={{ padding: 12, backgroundColor: '#FEF7FF', borderTopWidth: 1, borderTopColor: '#E8DDF1' }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
          <TextInput
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onChangeText={setNewMessage}
            mode="outlined"
            multiline
            maxLength={500}
            style={{ flex: 1, maxHeight: 100 }}
          />
          <IconButton
            icon="send"
            size={24}
            iconColor="#6750A4"
            onPress={handleSendMessage}
            style={{ margin: 0 }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
