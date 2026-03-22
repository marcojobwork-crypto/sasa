import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useCarrinho } from '../context/CarrinhoContext';
import { useState } from 'react';
import { router } from 'expo-router';

export default function Checkout(){

  const { itens, finalizar } = useCarrinho();

  const [nome,setNome] = useState('');
  const [endereco,setEndereco] = useState('');

  const total = itens.reduce((soma,i)=> soma + i.preco*i.qtd,0);

  async function enviarPedido(){

    if(!nome || !endereco){
      Alert.alert('Preencha nome e endereço');
      return;
    }

    try{

      const response = await fetch('http://192.168.1.16:3333/pedido',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          itens,
          total,
          cliente:nome,
          endereco
        })
      });

      const data = await response.json();

      if(data.ok){
        Alert.alert('Pedido enviado 🔥');
        finalizar();
        router.replace('/(tabs)/historico');
      }

    }catch(e){
      Alert.alert('Erro ao conectar no servidor');
    }

  }

  return(
    <View style={styles.container}>

      <Text style={styles.titulo}>Finalizar Pedido</Text>

      <TextInput
        placeholder="Seu nome"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Endereço"
        style={styles.input}
        value={endereco}
        onChangeText={setEndereco}
      />

      <TouchableOpacity style={styles.btn} onPress={enviarPedido}>
        <Text style={{color:'#fff'}}>Enviar Pedido</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',padding:30},

  titulo:{
    fontSize:30,
    fontWeight:'bold',
    marginBottom:30,
    textAlign:'center'
  },

  input:{
    backgroundColor:'#eee',
    padding:15,
    borderRadius:10,
    marginBottom:15
  },

  btn:{
    backgroundColor:'#fd5703',
    padding:20,
    borderRadius:15,
    alignItems:'center'
  }
});