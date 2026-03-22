import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useCarrinho } from '../../context/CarrinhoContext';
import { router } from 'expo-router';

function progresso(status:string){

  if(status === 'Recebido') return 25;
  if(status === 'Em preparo') return 50;
  if(status === 'Saiu para entrega') return 75;
  if(status === 'Entregue') return 100;

  return 0;
}

export default function Historico(){

  const { pedidos } = useCarrinho();

  return(
    <View style={styles.container}>

      <Text style={styles.titulo}>Pedidos</Text>

      <FlatList
        data={pedidos}
        keyExtractor={i=>i.id.toString()}
        renderItem={({item})=>{

          const width = progresso(item.status);

          return(
            <View style={styles.card}>

              <Text style={styles.id}>Pedido #{item.id}</Text>
              <Text>Total: R$ {item.total}</Text>
              <Text style={styles.status}>{item.status}</Text>

              {/* BARRA */}
              <View style={styles.barBg}>
                <View style={[styles.barFill,{width: `${width}%`}]} />
              </View>

              {/* BOTÃO MAPA */}
              {item.status !== 'Recebido' && (
                <TouchableOpacity
                  style={styles.btnMapa}
                  onPress={()=> router.push('/mapa')}
                >
                  <Text style={styles.txtMapa}>Ver entrega no mapa</Text>
                </TouchableOpacity>
              )}

            </View>
          )
        }}
      />

    </View>
  )
}

const styles = StyleSheet.create({
 container:{flex:1,padding:20},

 titulo:{
  fontSize:28,
  fontWeight:'bold',
  marginBottom:20
 },

 card:{
  backgroundColor:'#fff',
  padding:20,
  borderRadius:15,
  marginBottom:15,
  elevation:4
 },

 id:{fontWeight:'bold'},

 status:{
  marginTop:5,
  color:'#fd5703',
  fontWeight:'bold'
 },

 barBg:{
  height:10,
  backgroundColor:'#eee',
  borderRadius:10,
  marginTop:15,
  overflow:'hidden'
 },

 barFill:{
  height:10,
  backgroundColor:'#fd5703',
  borderRadius:10
 },

 btnMapa:{
  marginTop:15,
  backgroundColor:'#fd5703',
  padding:10,
  borderRadius:10,
  alignItems:'center'
 },

 txtMapa:{
  color:'#fff',
  fontWeight:'bold'
 }
});