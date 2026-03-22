import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import { useCarrinho } from '../context/CarrinhoContext';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';

export default function Pix(){

  const { itens } = useCarrinho();

  const [nome,setNome] = useState('');
  const [endereco,setEndereco] = useState('');

  const total = itens.reduce((s,i)=> s + i.preco*i.qtd,0);

  useEffect(()=>{
    carregar();
  },[]);

  async function carregar(){
    const n = await AsyncStorage.getItem('@nome');
    const e = await AsyncStorage.getItem('@endereco');

    if(n) setNome(n);
    if(e) setEndereco(e);
  }

  // 🔥 SEU PIX COPIA E COLA REAL
  const codigoPix = `00020101021126360014br.gov.bcb.pix0114654988110001005204000053039865802BR592565.498.811 MARIBEL IBALDE6009SAO PAULO622905251KM95DS3QBZ51DZYJVAMABY2263046D48`;

  async function copiarPix(){
    await Clipboard.setStringAsync(codigoPix);
    Alert.alert('PIX copiado ✅', 'Agora cole no app do seu banco');
  }

  function enviarWhats(){

    let mensagem = '🛒 *NOVO PEDIDO* %0A%0A';

    mensagem += `👤 Cliente: ${nome} %0A`;
    mensagem += `📍 Endereço: ${endereco} %0A%0A`;

    itens.forEach(i=>{
      mensagem += `${i.nome} x${i.qtd} - R$ ${i.preco*i.qtd} %0A`;
    });

    mensagem += `%0ATotal: R$ ${total} %0A`;
    mensagem += `%0A💰 Pagamento via PIX - comprovante enviado`;

    const telefone = '5548992238787';

    const url = `https://wa.me/${telefone}?text=${mensagem}`;

    Linking.openURL(url);
  }

  return(
    <View style={styles.container}>

      <Text style={styles.titulo}>Pagamento PIX</Text>

      <Text style={styles.total}>Total: R$ {total}</Text>

      <TouchableOpacity style={styles.btnPix} onPress={copiarPix}>
        <Text style={{color:'#fff',fontWeight:'bold'}}>Copiar código PIX</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnWhats} onPress={enviarWhats}>
        <Text style={{color:'#fff',fontWeight:'bold'}}>Enviar comprovante no WhatsApp</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
 container:{flex:1,justifyContent:'center',padding:30},

 titulo:{fontSize:30,fontWeight:'bold',marginBottom:30,textAlign:'center'},

 total:{fontSize:22,textAlign:'center',marginBottom:30},

 btnPix:{
  backgroundColor:'#fd5703',
  padding:18,
  borderRadius:15,
  alignItems:'center',
  marginBottom:15
 },

 btnWhats:{
  backgroundColor:'#25D366',
  padding:18,
  borderRadius:15,
  alignItems:'center'
 }
});