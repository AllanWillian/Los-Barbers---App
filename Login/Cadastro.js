import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import barbearia from "../assets/barber.png";
import icon from "../assets/user2.png";
import seta from "../assets/arrow.png";
import { useFonts,Montserrat_400Regular,Montserrat_600SemiBold,Montserrat_500Medium ,Montserrat_700Bold} from "@expo-google-fonts/montserrat";

export default function Cadastro() {
 

    const navigator = useNavigation();
    function Login() {
        return navigator.navigate("Login")
    }
    function cadastroBarbeiro(){
        return navigator.navigate("cadastroCliente")
    }
    function cadastroBarbeiro(){
        return navigator.navigate("cadastroBarbeiro")
    }

    const [fonteCarregada] = useFonts({
        "MontRegular": Montserrat_400Regular,
        "MontMedium": Montserrat_500Medium,
        "MontSemiBold" : Montserrat_600SemiBold,
        "MontBold" : Montserrat_700Bold
    });
    
    if (!fonteCarregada){
        return null;
    }
    

    return (
        <View style={estilo.fundo}>
            <View style={estilo.alinhamento}>
                <TouchableOpacity onPress={() => navigator.navigate('Login')}>
                    <Image source={seta} style={{ width: 50, height: 30, position: "absolute", top: -80, marginLeft: 15, }} />
                </TouchableOpacity>
                <Text style={estilo.titulo}>Perfil</Text>
                <TouchableOpacity style={estilo.btn} onPress={() => navigator.navigate('CadastroCliente')}>
                    <Image source={icon} style={{ width: 30, height: 30, top: 10, }} />
                    <Text style={estilo.text_btn1}>Cliente</Text>
                    <Text style={{ color: "white", textAlign:"justify", fontFamily: "MontRegular",}}>Crie uma conta e marque seu horário com o seu barbeiro.</Text>
                </TouchableOpacity>

                <TouchableOpacity style={estilo.btn2} onPress={() => navigator.navigate('CadastroBarbeiro')}>
                    <Image source={barbearia} style={{ width: 30, height: 30, top: 10, }} />
                    <Text style={estilo.text_btn2}>Barbeiro</Text>
                    <Text style={{ color: "white",fontFamily: "MontRegular" }}>Forneça serviços da sua barbearia dentro do aplicativo.</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const estilo = StyleSheet.create({
    fundo: {
        backgroundColor: "black",
        height: "100%",

    },

    titulo: {
        color: "white",
        textAlign: "center",
        fontSize: 30,
        marginBottom: 30,
        fontFamily:"MontBold",
    },
    alinhamento: {
        top: 120,

    },

    text_btn1: {
        color: "white",
        textAlign: "center",
        marginBottom: 10,
        marginTop: -20,
        fontSize: 25,
        fontFamily:"MontSemiBold",
        marginRight:90,
        

    },
    text_btn2: {
        color: "white",
        textAlign: "center",
        marginBottom: 10,
        marginTop: -20,
        fontSize: 25,
        fontFamily:"MontSemiBold",
        marginRight:70,
        

    },



    btn: {
        backgroundColor: "#14213D",
        borderRadius: 20,
        padding: 50,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: "#FCA311",


    },
    btn2: {
        marginTop: 20,
        backgroundColor: "#14213D",
        borderRadius: 20,
        padding: 50,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: "#FCA311",
    }

})

