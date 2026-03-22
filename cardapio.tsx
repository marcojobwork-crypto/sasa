import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useCarrinho } from '../../context/CarrinhoContext';
import { useState } from 'react';
import { router } from 'expo-router';

const categorias = ['Pastéis','Doces','Buffet','Bebidas'];

const produtos = [

  // 🥟 PASTÉIS
  { id:'1', nome:'Pastel de Carne', preco:10, categoria:'Pastéis', img: require('../../assets/images/icon.png') },
  { id:'2', nome:'Pastel de Calabresa', preco:10, categoria:'Pastéis', img: require('../../assets/images/icon.png') },
  { id:'3', nome:'Pastel de Frango', preco:10, categoria:'Pastéis', img: require('../../assets/images/icon.png') },
  { id:'4', nome:'Pastel de Queijo', preco:10, categoria:'Pastéis', img: require('../../assets/images/icon.png') },
  { id:'5', nome:'Pastel de Legumes', preco:10, categoria:'Pastéis', img: require('../../assets/images/icon.png') },

  // 🍫 DOCES
  { id:'6', nome:'Pastel de Banana', preco:10, categoria:'Doces', img: require('../../assets/images/icon.png') },
  { id:'7', nome:'Pastel de Chocolate Preto', preco:10, categoria:'Doces', img: require('../../assets/images/icon.png') },
  { id:'8', nome:'Pastel de Nutella', preco:10, categoria:'Doces', img: require('../../assets/images/icon.png') },
  { id:'9', nome:'Pastel de Chocolate Branco', preco:10, categoria:'Doces', img: require('../../assets/images/icon.png') },

  // 🥤 BEBIDAS
  { id:'10', nome:'Coca Lata', preco:5, categoria:'Bebidas', img: require('../../assets/images/icon.png') },
  { id:'11', nome:'Pureza Lata', preco:5, categoria:'Bebidas', img: require('../../assets/images/icon.png') },
  { id:'12', nome:'Guaraná Mini', preco:3, categoria:'Bebidas', img: require('../../assets/images/icon.png') },
  { id:'13', nome:'Coca Mini', preco:3, categoria:'Bebidas', img: require('../../assets/images/icon.png') },
  { id:'14', nome:'Coca 1L', preco:8, categoria:'Bebidas', img: require('../../assets/images/icon.png') },
  { id:'15', nome:'Pureza 1L', preco:8, categoria:'Bebidas', img: require('../../assets/images/icon.png') },
  { id:'16', nome:'Coca 2L', preco:13, categoria:'Bebidas', img: require('../../assets/images/icon.png') },
  { id:'17', nome:'Suco Natural de Laranja 300ml', preco:5, categoria:'Bebidas', img: require('../../assets/images/icon.png') },

];

export default function Cardapio(){

  const { adicionar, itens } = useCarrinho();

  const totalItens = itens.reduce((soma,i)=> soma + i.qtd,0);

  const [categoriaSelecionada,setCategoriaSelecionada] = useState('Pastéis');

  const produtosFiltrados = produtos.filter(
    p => p.categoria === categoriaSelecionada
  );

  return(
    <View style={styles.container}>

      {/* CATEGORIAS */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom:20}}>
        {categorias.map(cat=>(
          <TouchableOpacity
            key={cat}
            style={[
              styles.catBtn,
              categoriaSelecionada===cat && styles.catBtnActive
            ]}
            onPress={()=>{
              if(cat === 'Buffet'){
                router.push('/buffet');
              }else{
                setCategoriaSelecionada(cat);
              }
            }}
          >
            <Text style={{
              color: categoriaSelecionada===cat ? '#fff' : '#000',
              fontWeight:'bold'
            }}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* LISTA */}
      <FlatList
        data={produtosFiltrados}
        keyExtractor={i=>i.id}
        renderItem={({item})=>(
          <View style={styles.card}>

            <Image source={item.img} style={styles.img} />

            <View style={{flex:1}}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.preco}>R$ {item.preco}</Text>

              <TouchableOpacity
                style={styles.btn}
                onPress={()=> adicionar({
                  id:item.id,
                  nome:item.nome,
                  preco:item.preco
                })}
              >
                <Text style={{color:'#fff'}}>Adicionar</Text>
              </TouchableOpacity>

            </View>

          </View>
        )}
      />

      {/* CARRINHO FLUTUANTE */}
      {totalItens > 0 && (
        <TouchableOpacity
          style={styles.floatCart}
          onPress={()=> router.push('/carrinho')}
        >
          <Text style={styles.floatTxt}>🛒 {totalItens} itens</Text>
        </TouchableOpacity>
      )}

    </View>
  )
}

const styles = StyleSheet.create({

 container:{flex:1,padding:15},

 catBtn:{
  padding:12,
  backgroundColor:'#eee',
  borderRadius:20,
  marginRight:10
 },

 catBtnActive:{
  backgroundColor:'#fd5703'
 },

 card:{
  flexDirection:'row',
  backgroundColor:'#fff',
  padding:15,
  borderRadius:15,
  marginBottom:15,
  elevation:5
 },

 img:{
  width:80,
  height:80,
  borderRadius:12,
  marginRight:15
 },

 nome:{fontSize:18,fontWeight:'bold'},
 preco:{marginTop:5,fontSize:16},

 btn:{
  backgroundColor:'#fd5703',
  padding:10,
  borderRadius:10,
  marginTop:10,
  alignSelf:'flex-start'
 },

 floatCart:{
  position:'absolute',
  bottom:20,
  right:20,
  backgroundColor:'#fd5703',
  padding:15,
  borderRadius:30,
  elevation:10
 },

 floatTxt:{
  color:'#fff',
  fontWeight:'bold'
 }

});