import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { useState } from 'react'
import { useCarrinho } from '../../context/CarrinhoContext'

const ingredientesLista = [
  'Ovo',
  'Carne',
  'Frango',
  'Calabresa',
  'Queijo',
  'Presunto',
  'Milho',
  'Ervilha',
  'Azeitona',
  'Cheddar',
  'Catupiry',
  'Tomate',
  'Carne da casa',
  'Frango da casa'
]

export default function Buffet(){

  const { adicionar } = useCarrinho()

  const [selecionados,setSelecionados] = useState<string[]>([])

  function toggleIngrediente(nome:string){

    if(selecionados.includes(nome)){
      setSelecionados(selecionados.filter(i=> i !== nome))
    }else{
      setSelecionados([...selecionados,nome])
    }

  }

  function adicionarPastel(){

    if(selecionados.length === 0){
      alert('Escolha pelo menos 1 ingrediente')
      return
    }

    adicionar({
      id: Date.now().toString(),
      nome: `Pastel Buffet (${selecionados.join(', ')})`,
      preco: 10
    })

    setSelecionados([])
    alert('Pastel Buffet adicionado 🔥')

  }

  return(
    <View style={styles.container}>

      <Text style={styles.titulo}>Monte seu pastel como quiser 😍</Text>

      <ScrollView>

        {ingredientesLista.map(ing=>(
          <TouchableOpacity
            key={ing}
            style={[
              styles.item,
              selecionados.includes(ing) && styles.itemActive
            ]}
            onPress={()=> toggleIngrediente(ing)}
          >
            <Text style={{color: selecionados.includes(ing) ? '#fff' : '#000'}}>
              {ing}
            </Text>
          </TouchableOpacity>
        ))}

      </ScrollView>

      <TouchableOpacity style={styles.btn} onPress={adicionarPastel}>
        <Text style={{color:'#fff',fontWeight:'bold'}}>Adicionar Pastel Buffet</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container:{flex:1,padding:20},

  titulo:{
    fontSize:22,
    fontWeight:'bold',
    marginBottom:20,
    textAlign:'center'
  },

  item:{
    padding:15,
    backgroundColor:'#eee',
    borderRadius:12,
    marginBottom:10
  },

  itemActive:{
    backgroundColor:'#fd5703'
  },

  btn:{
    backgroundColor:'#25D366',
    padding:18,
    borderRadius:15,
    alignItems:'center',
    marginTop:20
  }
})