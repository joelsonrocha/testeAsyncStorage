import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, FlatList, StyleSheet, TextInput, Button} from 'react-native';
import Item from '../../components/Item';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

const Home = () => {
  const [name, setName] = useState("");
  const [idEdit, setIdEdit] = useState(null);
  const [data, setData] = useState([]);  

  const saveForm = () => {
      if(idEdit){
        let editItem = {
            id: idEdit,
            name: name
        }
        let arrayEdit = data;
        let index = arrayEdit.findIndex((item) => item.id === idEdit);
        if(index >= 0){
            arrayEdit[index] = editItem;
            setData([...arrayEdit]);
        }
      }else{
        let novoItem = {
            id: uuid.v4(),
            name: name
        }
        setData([...data,novoItem]);
     }
      //const arrayCopy = data;
      //arrayCopy.push(novoItem);
      //setData(arrayCopy);
      setName("");
      setIdEdit(null);
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('cadastro');
      console.log(value);
      if(value !== null) {
        setData(JSON.parse(value));  
        // value previously stored
      }
    } catch(e) {
    console.log('erro ao ler dados', e);
      // error reading value
    }
  }

  useEffect(()=>{
    if(data.length){
     storeData();
    }  
  },[data])

  useEffect(()=>{
    getData();
  },[])

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('cadastro', JSON.stringify(data));
    } catch (e) {
        console.log('erro ao salvar', e);
      // saving error
    }
  }

  const renderItem = ({ item }) => (
    <Item itemData={item} editFunc={editItem} deleteFunc={deleteItem}/>
  );

  const editItem = (item) =>{
      console.log('editItem', item);
      setName(item.name);
      setIdEdit(item.id);
  }

  const deleteItem = (id) =>{
    let arrayEdit = data;
    let index = arrayEdit.findIndex((item) => item.id === id);
    if(index >= 0){
        arrayEdit.splice(index, 1);
        setData([...arrayEdit]);
    }
  }

  return (
    <>  
        <View style={{height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#448AFF'}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>Home</Text>
        </View>
        <View style={{backgroundColor: "#B3E5FC"}}>
            <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
            />
            <Button title="Salvar" onPress={saveForm}/>
        </View>
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    </>
  );
};

export default Home;
