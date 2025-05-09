import React from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image, ScrollView } from "react-native";
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { useNavigation } from "@react-navigation/native";
import barber1 from "../../../assets/equipe.png";
import barber2 from "../../../assets/pagamento.png";
import barber3 from "../../../assets/suporte.png";
import Icon from "react-native-vector-icons/FontAwesome";



const HomeBarber = () => {
  const navigator = useNavigation();
  function Home() {
    return navigator.navigate("Home")
  }
  function ConfigServico(){
    return navigator.navigate("ConfigServico")
  }
  

  const [fonteCarregada] = useFonts({
    "MontRegular": Montserrat_400Regular,
    "MontMedium": Montserrat_500Medium,
    "MontSemiBold": Montserrat_600SemiBold,
    "MontBold": Montserrat_700Bold,
  });

  if (!fonteCarregada) {
    return null;
  }


  return (
    
    <View style={{ flex: 1, backgroundColor: "black" }}>

      <View>
        <TouchableOpacity onPress={() => navigator.navigate("Home")}>
        <Icon name="chevron-left" size={50} style={styles.seta}></Icon>
          </TouchableOpacity>
        
      </View>

      <Text style={styles.titulo}>BARBEARIA</Text>
      <View style={styles.pai}>
      <View style={styles.bloco1}>
        <TouchableOpacity  style={styles.btn} onPress={() => navigator.navigate("ConfigEquipe")}>
          <Image source={barber1} style={styles.imgs}></Image>
          <Text style={styles.texto1}>EQUIPE</Text>
        </TouchableOpacity>
      </View>
      <View >
        <TouchableOpacity  style={styles.btn} onPress={()=> navigator.navigate("ConfigServico")}>
          <Image source={barber3} style={styles.imgs}></Image>
          <Text style={styles.texto1}>SERVIÇOS</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity  style={styles.btn} onPress={()=> navigator.navigate("Pagamento")}>
          <Image source={barber2} style={styles.imgs}></Image>
          <Text style={styles.texto1}>PAGAMENTO</Text>
        </TouchableOpacity>
        </View>

      </View>
    
    </View>
    
  );
};

export default HomeBarber;




const styles = StyleSheet.create({

  titulo: {
    fontFamily: "MontBold",
    fontSize: 29,
    color: "white",
    textAlign: 'center',
    top: 20,
    marginBottom: 20,

  },
  imgs: {
    width: 140,
    height: 140,
    alignSelf:"center"
  },
  


  texto1: {
    color: 'white',
    textAlign:"center",
    fontFamily: "MontBold",
    fontSize: 20,
    bottom:10,
   
  },


  btn:{
    backgroundColor:"#14213D",
    borderRadius:20,
    width:200,
    height:170,
    alignSelf:"center",
    top:60,
    marginBottom:30,
  },

  seta: {
    marginLeft: 20,
    marginTop: 10,
    color: "white",
},

});