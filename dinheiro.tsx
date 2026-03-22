import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { useCarrinho } from '../context/CarrinhoContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dinheiro(){

  const { itens, finalizar } = useCarrinho();

  const total = itens.reduce((s:number,i)=> s + i.preco * i.qtd,0);

  async function pagarNaEntrega(){

    const nome = await AsyncStorage.getItem('@nome');
    const endereco = await AsyncStorage.getItem('@endereco');

    if(!nome || !endereco){
      Alert.alert('Preencha nome e endereço primeiro');
      return;
    }

    let mensagem = `🛒 NOVO PEDIDO\n\n`;

    mensagem += `Cliente: ${nome}\n`;
    mensagem += `Endereço: ${endereco}\n\n`;

    itens.forEach(i=>{
      mensagem += `${i.nome} x${i.qtd} - R$ ${i.preco * i.qtd}\n`;
    });

    mensagem += `\nPagamento: Dinheiro na entrega`;
    mensagem += `\nTotal: R$ ${total}`;

    const telefone = '5548992238787';

    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

    try{

      const supported = await Linking.canOpenURL(url);

      if(!supported){
        Alert.alert('WhatsApp não encontrado');
        return;
      }

      await Linking.openURL(url);

      finalizar();

    }catch{
      Alert.alert('Erro ao abrir WhatsApp');
    }

  }

  return(
    <View style={styles.container}>

      <Text style={styles.titulo}>Pagamento na Entrega</Text>

      <Text style={{fontSize:18}}>Total: R$ {total}</Text>

      <TouchableOpacity style={styles.btn} onPress={pagarNaEntrega}>
        <Text style={{color:'#fff'}}>Pagar na entrega</Text>
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

 btn:{
  backgroundColor:'#fd5703',
  padding:18,
  borderRadius:15,
  alignItems:'center',
  marginTop:30
 }
});