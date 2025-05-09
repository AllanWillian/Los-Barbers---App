import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import seta from '../../assets/arrow.png';
import database from '../../firebase/database';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, query, orderByChild, equalTo, get} from 'firebase/database';


const Historico = () => {
  
  const navigator = useNavigation();
  function MenuCliente(){
    return navigator.navigate("MenuCliente")
  }
  const [fonteCarregada] = useFonts({
    'MontRegular': Montserrat_400Regular,
    'MontMedium': Montserrat_500Medium,
    'MontSemiBold': Montserrat_600SemiBold,
    'MontBold': Montserrat_700Bold,
  });
 

  const [historico, setHistorico] = useState([]); 
  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (!user) {
          return;
        }
        
        const userId = user.uid;
        const db = getDatabase();
        const agendamentosRef = ref(db, 'agendamentos');
        const userAgendamentosQuery = query(agendamentosRef, orderByChild('userId'), equalTo(userId));
        const snapshot = await get(userAgendamentosQuery);
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          const historicoArray = Object.values(data).map(item => ({
            ...item,
            servicos: item.servicos || [], // Certifica-se de que servicos é uma matriz
          }));
          setHistorico(historicoArray);
        } else {
          setHistorico([]);
        }
      } catch (error) {
        console.log('Erro ao buscar agendamentos:', error.message);
      }
    };
    
    fetchAgendamentos();
  }, []);

 

  if (!fonteCarregada) {
    return null;
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };
  return (
    <View style={styles.fundo}>
      <View>
        <TouchableOpacity onPress={() => navigator.navigate('MenuCliente')}>
          <Image source={seta} style={styles.seta} />
        </TouchableOpacity>

        <Text style={styles.titulo}>HISTÓRICO</Text>
      </View>

      <FlatList
        data={historico}
        keyExtractor={(item) => item.id} 
        renderItem={({ item }) => (
          <View style={styles.containerFlat}>
            <Text style={styles.textFlat}>Dia {formatDate(item.data)}</Text>
            <Text style={styles.textDesc}>Horário: {item.horario}</Text>
            <Text style={styles.textDesc}>Barbearia: {item.barberia.nomeBarbearia}</Text>
            <Text style={styles.textDesc}>Barbeiro: {item.barbeiro}</Text>
            <Text style={styles.textDesc}>Serviços: {item.servicos.map(servico => `${servico.servico}\nValor: R$ ${servico.valor}`).join('\n')}</Text>
            <Text style={styles.textDesc}>Endereço: R. Paineiras, 1300 - Eldorado, Contagem</Text>
            <Text style={styles.textDesc}>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fundo: {
    backgroundColor: 'black',
    flex: 1,
  },
  seta: {
    width: 40,
    height: 40,
    marginLeft: 20,
    marginTop: 20,
  },
  titulo: {
    color: 'white',
    fontFamily: 'MontSemiBold',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 10,
  },    
  containerFlat:{
    marginTop:30,
    backgroundColor: '#14213D',
    borderWidth:1,
    borderColor:"#fca311",
    padding: 30,
    marginHorizontal:50,
    borderRadius: 20,
  },
  textFlat:{
    fontSize: 16,
    fontFamily: 'MontSemiBold',
    color: 'white', 
    textAlign:'center',
    bottom:17,
  },
  textDesc:{
    fontSize: 14,
    fontFamily: 'MontMedium',
    color: 'white', 
  }
 

});

export default Historico;