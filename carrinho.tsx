import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useCarrinho } from '../../context/CarrinhoContext';
import { router } from 'expo-router';

export default function Carrinho(){

  const { itens, aumentar, diminuir } = useCarrinho();

  const total = itens.reduce((soma,i)=> soma + i.preco*i.qtd,0);

  return(
    <View style={styles.container}>

      <Text style={styles.titulo}>Carrinho</Text>

      <FlatList
        data={itens}
        keyExtractor={(i)=> i.id}
        renderItem={({item,index})=>(
          <View style={styles.card}>

            <Text style={styles.nome}>{item.nome}</Text>
            <Text>R$ {item.preco}</Text>

            <View style={styles.qtdBox}>
              <TouchableOpacity onPress={()=> diminuir(index)}>
                <Text style={styles.btn}>-</Text>
              </TouchableOpacity>

              <Text style={styles.qtd}>{item.qtd}</Text>

              <TouchableOpacity onPress={()=> aumentar(index)}>
                <Text style={styles.btn}>+</Text>
              </TouchableOpacity>
            </View>

          </View>
        )}
      />

      <Text style={styles.total}>Total: R$ {total}</Text>

      <TouchableOpacity
        style={styles.finalizar}
        onPress={()=> router.push('/pagamento' as any)}
      >
        <Text style={{color:'#fff',fontWeight:'bold'}}>Ir para Pagamento</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container:{flex:1,padding:20},
  titulo:{fontSize:28,fontWeight:'bold',marginBottom:20},
  card:{backgroundColor:'#fff',padding:15,borderRadius:12,marginBottom:10,elevation:3},
  nome:{fontSize:18,fontWeight:'bold'},
  qtdBox:{flexDirection:'row',alignItems:'center',marginTop:10},
  btn:{fontSize:25,width:40,textAlign:'center',backgroundColor:'#eee'},
  qtd:{marginHorizontal:10,fontSize:18},
  total:{fontSize:22,fontWeight:'bold',marginTop:20},
  finalizar:{backgroundColor:'#fd5703',padding:18,borderRadius:15,marginTop:20,alignItems:'center'}
});