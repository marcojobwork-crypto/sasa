import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { router } from 'expo-router';

const populares = [
  { id:'1', nome:'Pastel Carne', preco:12, img: require('../../assets/images/icon.png') },
  { id:'2', nome:'Pastel Frango', preco:11, img: require('../../assets/images/icon.png') },
  { id:'3', nome:'Pastel Pizza', preco:13, img: require('../../assets/images/icon.png') },
];

export default function Home(){

  return(
    <ScrollView style={styles.container}>

      {/* BANNER */}
      <View style={styles.banner}>
        <Text style={styles.bannerTxt}>🔥 Promoção do Dia</Text>
        <Text style={{color:'#fff'}}>Pastéis com desconto</Text>
      </View>

      {/* MAIS VENDIDOS */}
      <Text style={styles.titulo}>Mais vendidos</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>

        {populares.map(item=>(
          <TouchableOpacity key={item.id} style={styles.card}
            onPress={()=> router.push('/(tabs)/cardapio')}
          >
            <Image source={item.img} style={styles.img} />
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>R$ {item.preco}</Text>
          </TouchableOpacity>
        ))}

      </ScrollView>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
 container:{flex:1,padding:15},

 banner:{
  backgroundColor:'#fd5703',
  padding:30,
  borderRadius:20,
  marginBottom:25
 },

 bannerTxt:{
  color:'#fff',
  fontSize:22,
  fontWeight:'bold'
 },

 titulo:{
  fontSize:20,
  fontWeight:'bold',
  marginBottom:15
 },

 card:{
  backgroundColor:'#fff',
  padding:15,
  borderRadius:15,
  marginRight:15,
  width:140,
  elevation:5
 },

 img:{
  width:100,
  height:100,
  borderRadius:12,
  marginBottom:10
 },

 nome:{
  fontWeight:'bold'
 }
});