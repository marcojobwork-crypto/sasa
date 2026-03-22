import { View, Text, StyleSheet } from 'react-native';

export default function Perfil() {
  return (
    <View style={[styles.tela,{backgroundColor:'#e3f2fd'}]}>
      <Text style={styles.txt}>PERFIL</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tela:{ flex:1,justifyContent:'center',alignItems:'center' },
  txt:{ fontSize:30,fontWeight:'bold'}
});