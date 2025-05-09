import React from "react";
import { useNavigation } from "@react-navigation/native";
import {View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground} from "react-native";
import { useFonts,Montserrat_400Regular,Montserrat_600SemiBold,Montserrat_500Medium ,Montserrat_700Bold} from "@expo-google-fonts/montserrat";
import Icon from 'react-native-vector-icons/FontAwesome'
import barbearia from "../../../assets/barber.png";
import calendar1 from "../../../assets/calendar1.png";
import suporte from '../../../assets/suporte.png';
import user from '../../../assets/userrr.png';

const Home = () =>{

    const navigator = useNavigation();
    function Suporte() {
        return navigator.navigate("Suporte")
    }
    function Conta(){
        return navigator.navigate("Conta")
    }
    function ConfigAgenda (){
        return navigator.navigate ("ConfigAgenda")
    }
    function Menu (){
        return navigator.navigate ("Menu")
    }
    function HomeBarber (){
        return navigator.navigate ("HomeBarber")
    }


    const [fonteCarregada] = useFonts({
        "MontRegular": Montserrat_400Regular,
        "MontMedium": Montserrat_500Medium,
        "MontSemiBold" : Montserrat_600SemiBold,
        "MontBold" : Montserrat_700Bold,
    })
    
    if (!fonteCarregada){
        return null;
    }


    return (
        <View style={estilos.fundo}>
            <View style={estilos.alinhamento}>
                <TouchableOpacity onPress={() => navigator.navigate("Menu")}>
                <Icon name="chevron-left" size={50} style={estilos.seta}></Icon>
                </TouchableOpacity>
            </View>

            <Text style={estilos.conf}>AJUSTES</Text>
            <View style={{marginTop:45,}}>
            <View style={estilos.caixaUm} >
                <TouchableOpacity style={estilos.botoesConta} onPress={() => navigator.navigate("Conta")}>
                <Image source={user} style={estilos.barbearia1}></Image>
                    <Text style={estilos.texto1} >CONTA</Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.botoesAgenda} onPress={() => navigator.navigate("ConfigAgenda")}>
                    <Image source={calendar1} style={estilos.barbearia}></Image>
                    <Text style={estilos.texto} >AGENDA</Text>
                </TouchableOpacity>
            </View>
            <View style={estilos.caixaDois} >
                <TouchableOpacity style={estilos.botoesSuporte} onPress={() =>  navigator.navigate("Suporte")}>
                    <Image source={suporte} style={estilos.suporte}></Image>
                    <Text style={estilos.texto} >SUPORTE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.botoesBarbearia} onPress={() => navigator.navigate("HomeBarber")}>
                    <Image source={barbearia} style={estilos.barbearia}></Image>
                    <Text style={estilos.texto} >GESTÃO</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    );
}

const estilos = StyleSheet.create({
    seta: {
        marginLeft: 20,
        marginTop: 10,
        color: "white",
    },

    fundo: {
        height: "100%",
        backgroundColor: "black",
    },

    casa: {
        position: "absolute",
        top: 13,
        left: 25
    },

    logo: {
        width: 117,
        height: 69,
        left: 250
    },

    conf: {
        fontFamily:"MontSemiBold",
        fontSize: 30,
        color: "white",
        textAlign: "center",
        marginTop: 70,
    },

    caixaUm: {
        height: 140,
        marginTop: 70,
        flexDirection: "row",
        justifyContent: "space-between",

    },

    botoesConta: {
        backgroundColor: "#14213D",
        alignItems: "center",
        borderRadius: 20,
        width: 160,
        height: 160,
        padding: 20,
        left: 40,
    },

    botoesAgenda: {
        backgroundColor: "#14213D",
        alignItems: "center",
        borderRadius: 20,
        width: 160,
        height: 160,
        padding: 20,
        right: 40,

    },

    caixaDois: {
        height: 140,
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    botoesSuporte: {
        backgroundColor: "#14213D",
        alignItems: "center",
        borderRadius: 20,
        width: 160,
        height: 160,
        padding: 20,
        left: 40,
    },

    suporte: {
        height: 78,
        width: 130,
    },

    botoesBarbearia: {
        backgroundColor: "#14213D",
        alignItems: "center",
        borderRadius: 20,
        padding: 20,
        width: 160,
        height: 160,
        right: 40,
    },

    barbearia: {
        height: 80,
        width: 75,
    },
    barbearia1: {
        height: 100,
        width: 80,
        marginTop:-12,
    },
    texto1: {
        fontSize: 15,
        color: "white",
        fontFamily: "MontSemiBold",
        marginTop: 5,
    },

    texto: {
        fontSize: 15,
        color: "white",
        fontFamily: "MontSemiBold",
        marginTop: 10,
    },
})

export default Home;