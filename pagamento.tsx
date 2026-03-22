import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function Pagamento(){

  return(
    <View style={styles.container}>

      <Text style={styles.titulo}>Escolha o Pagamento</Text>

      <TouchableOpacity
        style={styles.btnPix}
        onPress={()=> router.push('/pix' as any)}
      >
        <Text style={styles.txt}>Pagar com PIX</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnDinheiro}
        onPress={()=> router.push('/dinheiro' as any)}
      >
        <Text style={styles.txt}>Pagar na Entrega</Text>
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

 btnPix:{
  backgroundColor:'#25D366',
  padding:20,
  borderRadius:15,
  marginBottom:20,
  alignItems:'center'
 },

 btnDinheiro:{
  backgroundColor:'#fd5703',
  padding:20,
  borderRadius:15,
  alignItems:'center'
 },

 txt:{
  color:'#fff',
  fontSize:18,
  fontWeight:'bold'
 }
});