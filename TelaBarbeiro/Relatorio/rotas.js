import { Text, View, TouchableOpacity, Image, StyleSheet,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import Principal from '../Relatorio/principal';
import Barbas from "../Relatorio/barbas";
import Clientes from "../Relatorio/clientes";




function Relatorio1() {
  return (

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
      <Principal />
    </View>

  );
}

function Relatorio2() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Barbas />
    </View>
  );
}

function Relatorio4() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Clientes />
    </View>
  );
}


const Tab = createMaterialTopTabNavigator();


export default function Rotas() {
  const navigator = useNavigation();
    function Menu() {
        return navigator.navigate("Menu")
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
    <NavigationContainer independent={true}>
      <View style={{ backgroundColor: "black",marginBottom:-30,}}>
        <TouchableOpacity onPress={() => navigator.navigate('Menu')}>
        <Icon name="chevron-left" size={50} style={styles.seta}></Icon>
          </TouchableOpacity>
          <Text style={{color:"white", position:"absolute",top:109,alignSelf:'center', fontFamily:"MontBold", fontSize:25}}>RELATÓRIOS</Text>
        
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'white', // Cor do texto ativo
          tabBarInactiveTintColor: 'gray', // Cor do texto inativo
          tabBarLabelStyle: {
            fontSize: 15,
            fontFamily: 'MontSemiBold',
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#FCA311',
          },
          tabBarStyle: {
            backgroundColor: 'black',
            marginTop: 20,
          },

      
        }} >
        <Tab.Screen name="Cortes " component={Relatorio1} />
        <Tab.Screen name="BARBAS" component={Relatorio2} />
        <Tab.Screen name="CLIENTES" component={Relatorio4} />

      </Tab.Navigator>
    </NavigationContainer>


  );
}


const styles= StyleSheet.create({
  voltar: {
    width: 40,
    height: 40,
    backgroundColor: "black",
    marginLeft: 15,
    margin:60,
  },
  seta: {
    marginLeft:20,
    margin:50,
    color: "white",
    position:"relative",
},
 
})
