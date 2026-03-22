import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

export default function Mapa(){

  const [posicao,setPosicao] = useState(0);
  const [status,setStatus] = useState('Saiu para entrega 🚴');

  useEffect(()=>{

    const timer = setInterval(()=>{

      setPosicao(prev=>{

        if(prev >= 280){
          setStatus('Pedido entregue ✅');
          clearInterval(timer);
          return prev;
        }

        return prev + 5;

      });

    },500);

    return ()=> clearInterval(timer);

  },[]);

  return(
    <View style={styles.container}>

      <Text style={styles.titulo}>Acompanhar Entrega</Text>

      <Text style={styles.status}>{status}</Text>

      <View style={styles.mapa}>

        <View style={[styles.moto,{ left: posicao }]}>
          <Text style={{fontSize:30}}>🛵</Text>
        </View>

      </View>

      <Text style={{marginTop:20}}>Tempo estimado: 15 minutos</Text>

    </View>
  )
}

const styles = StyleSheet.create({

 container:{
  flex:1,
  justifyContent:'center',
  alignItems:'center'
 },

 titulo:{
  fontSize:28,
  fontWeight:'bold',
  marginBottom:20
 },

 status:{
  fontSize:18,
  marginBottom:20
 },

 mapa:{
  width:300,
  height:200,
  backgroundColor:'#eee',
  borderRadius:20,
  overflow:'hidden',
  justifyContent:'center'
 },

 moto:{
  position:'absolute'
 }

});