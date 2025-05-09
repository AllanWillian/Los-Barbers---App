import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image, Dimensions } from "react-native";
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import Swiper from "react-native-swiper";
import barber1 from "../../assets/barber1.png";
import barber2 from "../../assets/barber2.png"
import barber3 from "../../assets/barber3.png"
import seta from "../../assets/arrow.png"
import database from '../../firebase/database';
import { get, ref, child, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';


const largura = Dimensions.get("screen").width;

const Barbearias = () => {
  const route = useRoute();
  const navigator = useNavigation();
  function MenuCliente() {
    return navigator.navigate("MenuCliente")
  }
  function Scanner() {
    return navigator.navigate("Scanner")
  }

  const [fonteCarregada] = useFonts({
    "MontRegular": Montserrat_400Regular,
    "MontMedium": Montserrat_500Medium,
    "MontSemiBold": Montserrat_600SemiBold,
    "MontBold": Montserrat_700Bold,
  });


  const [barbeariasVinculadas, setBarbeariasVinculadas] = useState([]);
  useEffect(() => {
    const getUserData = async () => {
      try {
        // Obtenha o usuário autenticado
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userId = user.uid;
          const dbRef = ref(database, `users/${userId}/barbeariaVinculadas`);

          const snapshot = await get(child(dbRef, '/'));

          if (snapshot.exists()) {
            const barbearias = [];

            snapshot.forEach((childSnapshot) => {
              const key = childSnapshot.key;
              const data = childSnapshot.val();
              barbearias.push({ id: key, ...data, });
            });

            // Defina o estado com os dados das barbearias vinculadas
            setBarbeariasVinculadas(barbearias);
       
          } else {
            // Caso não haja barbearias vinculadas
            setBarbeariasVinculadas([]);
          }
        } else {
          // Usuário não autenticado
          console.warn('Usuário não autenticado');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    getUserData();
  }, []);


  if (!fonteCarregada) {
    return null;
  }


  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <View style={{ height: 750, width: 350, alignSelf: "center", }}>
        <View>
          <TouchableOpacity onPress={() => navigator.navigate("MenuCliente")}>
            <Image source={seta} style={{ width: 40, height: 30, top: 20, }} />
          </TouchableOpacity>
          <Text style={styles.titulo}>BARBEARIAS</Text>
        </View>
        <Swiper
          showsButtons={true}
          showsPagination={true}
          buttonWrapperStyle={styles.seta}
                    
        >
          {barbeariasVinculadas.map(barbearias => {
            
            return (
              <View style={styles.slide} key={barbearias.id}>
                
                <Text style={{color:"black", fontFamily:"MontSemiBold", fontSize:30, marginTop:120}}>{barbearias.nomeBarbearia}</Text>
                <Text style={{color:"black", fontFamily:"MontSemiBold", fontSize:10, marginTop:100,}}>R. Paineiras, 1300 - Eldorado, Contagem</Text>
              </View>
            );
          })}
        </Swiper>


        <TouchableOpacity style={styles.botao} onPress={() => navigator.navigate("Scanner")}>
          <Text style={styles.textobotao}>Adicionar Barbearia</Text>
        </TouchableOpacity>

      </View>


    </View>
  );
};

export default Barbearias;




const styles = StyleSheet.create({

  titulo: {
    fontFamily: "MontBold",
    fontSize: 29,
    color: "white",
    textAlign: 'center',
    top: 75,
  },

  botao: {
    backgroundColor: "#FCA311",
    borderRadius: 15,
    padding: 15,
    bottom: 20,
    marginHorizontal: 15,
  },

  textobotao: {
    fontSize: 20,
    color: "white",
    textAlign: 'center',
    borderRadius: 30,
    fontFamily: "MontSemiBold"
  },

  slide: {
    backgroundColor: "white",
    borderRadius: 25,
    width:250,
    height:300,
    marginLeft: 50,
    marginRight: 50,
    alignItems: "center",
    top: 190,
  },

  seta: {
    backgroundColor: "FCA311",
  },

  imgs: {
    width: "100%",
    height: 2300 / 3500 * largura,
    alignItems: "center",
  },

});



