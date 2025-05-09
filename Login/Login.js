import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, Modal } from 'react-native';
import logo from '../assets/los.png';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import AwesomeAlert from "react-native-awesome-alerts";
import Icon from 'react-native-vector-icons/FontAwesome'

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, auth} from 'firebase/auth';
import {ref, get, getDatabase,} from 'firebase/database';
import database from '../firebase/database';




const largura = Dimensions.get('screen').width;

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const fechaErrorModal = () => {
    setErrorModal(false);
  }
  const auth = getAuth();

  const loginSucess = () => {
    signInWithEmailAndPassword(auth, email, senha)
    .then(async (userCredential) => {
      const user = userCredential.user;
      
      const usersRef = ref(database, 'users');
      const snapshot = await get(usersRef);
      const users = snapshot.val();
      
      // Procurar pelo usuário correspondente ao UID autenticado
      const userUid = user.uid;
      let tipoConta = null;
      for (const userId in users) {
        if (users[userId].uid === userUid) {
          tipoConta = users[userId].tipoConta;
          break;
        }
      }

      console.log('Tipo de conta:', tipoConta);

      if (tipoConta === 'cliente') {
        navigator.navigate('MenuCliente');
      } else if (tipoConta === 'barbeiro') {
        navigator.navigate('Menu');
      } else {
        console.log('Tipo de conta inválida:', tipoConta);
      }
    })
    .catch(error => {
      console.log(error);
      setErrorModal(true);
    });

};
  const testConnection = async () => {
    try {
      const userRef = ref(database, 'users');
      const snapshot = await get(userRef);
      const data = snapshot.val();
      console.log('Dados recuperados:', data);
    } catch (error) {
      console.log('Erro ao recuperar dados:', error);
    }
  };


  const navigator = useNavigation();
  function navegaMenu() {
    return navigator.navigate("Menu")

    function Cadastro() {
      return navigator.navigate("Cadastro")
    }
    function MenuCliente(){
      return navigator.navigate("MenuCliente")
    }
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
    <View>
      {/* _______________________________________MODAL DE VALIDAÇÃO______________________________________________ */}
      <AwesomeAlert
                show={errorModal}
                showProgress={false}
                overlayStyle={{ backgroundColor: "rgba(0,0,0,0.8)" }}
                contentContainerStyle={{
                    width: 600,
                    height: 200,
                    backgroundColor: '#353535',
                    borderRadius: 10,
                    padding: 20,

                }}
                title="Credenciais Inválidas"
                message="Por favor, verifique seu e-mail e senha e tente novamente"
                titleStyle={{
                    fontFamily: 'MontSemiBold',
                    fontSize: 18,
                    color: "white",
                    textAlign: "justify",
                    marginHorizontal: -100,
                }}
                messageStyle={{
                    marginTop: 15,
                    fontFamily: 'MontMedium',
                    fontSize: 14,
                    color: "white",
                    textAlign: "center",
                }}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="Ok"
                confirmButtonColor="#FCA311"
                cancelButtonColor="##FFD897"
                confirmButtonTextStyle={{
                    fontSize: 18,
                    fontFamily: "MontSemiBold"
                }}
                onConfirmPressed={fechaErrorModal}
            />
      {/* _______________________________________MODAL DE VALIDAÇÃO______________________________________________ */}


      <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
        <View style={styles.inputView}>
         <Icon
          name="user" 
          size={25} 
          color="#FCA311" 
          style={styles.icon}
          />
          <TextInput

            style={styles.inputText}
            placeholder="Email:"
            placeholderTextColor="gray"
            type="text"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
        <Icon
          name="lock" 
          size={25} 
          color="#FCA311" 
          style={styles.icon2}
          />
          <TextInput
            style={styles.inputText2}
            placeholder="Senha:"
            placeholderTextColor="gray" 
            secureTextEntry={!mostrarSenha}
            type="text"
            value={senha}
            onChangeText={(text) => setSenha(text)}
          />
           <Icon
           style={{left:270,bottom:40}}
            name={mostrarSenha ? 'eye-slash' : 'eye'} 
            size={20}
            color="#FCA311"
            onPress={() => setMostrarSenha(!mostrarSenha)} 
  />
        </View>


        <TouchableOpacity style={styles.loginBtn}onPress={loginSucess}>
          <Text style={styles.loginText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.senha}>Esqueceu a sua senha? </Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => navigator.navigate("Cadastro")}>
            <Text style={styles.descricao}>Não possui uma conta? Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>


  );
};
const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent:"center"

  },

  icon: {
    top:26,
    marginRight:-6,
   
  },
  logo: {
    width: "100%",
    height: 375/ 677 * largura,
    bottom:10,
    alignItems:'center',
  },

  footer: {
    display: "flex",
    flexDirection: "column",
    bottom: -90,

  },
  senha: {
    color: 'white',
    fontSize: 11,
    textAlign: 'center',
    fontWeight: 'bold',

  },
  descricao: {
    color: 'white',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 15,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },

  inputView: {
    width: '80%',
    backgroundColor: '#353535',
    borderRadius: 10,
    height: 70,
    marginBottom: 20,
    justifyContent: 'center',
    paddingLeft:20,
    // borderColor: "#FCA311",
    // borderWidth: 3,

  },
  inputText: {
    height: 50,
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 35,
    bottom:10,
    fontFamily: "MontSemiBold",
  },
  inputText2:{
    height: 50,
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 35,
    bottom:5,
    fontFamily: "MontSemiBold",
  },

  icon2: {
    top:33,
    marginRight:-6,
   
  },
  loginBtn: {
    width: '40%',
    backgroundColor: '#FCA311',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,

  },
  loginText: {
    color: 'black',
    fontFamily: "MontSemiBold",

  },

  btnFechaModal:{
    backgroundColor:"red",
    borderRadius:90,
    padding:10,
    width:35,
    height:40,
    bottom:65,
    left:220,
    position:"absolute",
  },

  textBtnFecha:{
    textAlign:'center',
    fontSize:15,
    fontWeight:'bold',
    
  },
  containerModal:{
    backgroundColor:"#14213D",
    alignItems:'center',
    marginHorizontal:85,
    padding:40,
    borderRadius:20,
    borderWidth:1,
    borderColor:"#FCA311",
    elevation:4,
    top:350,
    
   
  },

  TextModal:{
    
    fontFamily:"MontSemiBold",
    color:"red",

  }
});

export default Login;
