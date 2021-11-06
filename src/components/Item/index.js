import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';


const styles = StyleSheet.create({
    item: {
      backgroundColor: '#0288D1',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      flexDirection: 'row'
    },
    title: {
      fontSize: 32,
    },
  });

export default function Item({itemData, editFunc, deleteFunc}) {
 return (
    <View style={styles.item}>
      <Text style={styles.title}>{itemData.name}</Text>
      <Button title="editar" onPress={() => editFunc(itemData)}/>
      <Button title="excluir" onPress={() => deleteFunc(itemData.id)}/>
    </View>
  );
}