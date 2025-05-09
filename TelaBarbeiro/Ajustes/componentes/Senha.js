import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, Alert, TextInput } from "react-native";
import logo from "../../../assets/los.png";
// import fundo from "../assets/config.png";
import Icon from "react-native-vector-icons/FontAwesome";

const Senha = () => {
    return (
        <View style={estilos.fundo}>
            <View style={estilos.alinhamento}>
                <TouchableOpacity onPress={() => Alert.alert("em desenvolvimento")}>
                    <Icon name="arrow-left" size={40} color="#FCA311" style={estilos.seta}></Icon>
                </TouchableOpacity>
                <Image source={logo} style={estilos.logo}></Image>
            </View>

            <View style={estilos.todos}>
                <Text style={estilos.texto}> ALTERAÇÃO DE SENHA </Text>

                <View style={estilos.caixaIcones}>
                    <View style={[estilos.icone, {marginBottom: 20}]}>
                        <View>
                            <Icon name="lock" size={25} color="#FCA311" style={estilos.senha} />
                        </View>
                        <TextInput cursorColor={"#FCA311"} placeholder={"Digite sua senha"} placeholderTextColor={"white"} secureTextEntry={true} maxLength={12} style={estilos.contaInput} />
                    </View>

                    <View style={estilos.icone}>
                        <View>
                            <Icon name="lock" size={25} color="#FCA311" style={estilos.senha} />
                        </View>
                        <TextInput cursorColor={"#FCA311"} placeholder={"Confimação de senha"} placeholderTextColor={"white"} secureTextEntry={true} maxLength={12} style={estilos.contaInput} />
                    </View>
                </View>

                <TouchableOpacity style={estilos.botao} onPress={() => Alert.alert("senha alterada com sucesso")}>
                    <Text style={estilos.textoum} >CONFIRMAR</Text>
                </TouchableOpacity>
            </View>
        </View>



    );
}

const estilos = StyleSheet.create({

    alinhamento: {

        flexDirection: "row",
    },

    fundo: {
        height: "100%",
        //    flex: -1,
        //    justifyContent: "center",
        backgroundColor: "black"

    },

    seta: {
        position: "absolute",
        top: 13,
        left: 25
    },

    logo: {
        width: 117,
        height: 69,
        left: 250
    },

    todos: {
        flexDirection: "column",
        justifyContent: "space-between",
        height:400,
        marginTop:100,
        alignItems:"center"
    },

    texto: {
        fontSize: 25,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },

    caixaIcones:{
        width:300
    },

    icone: {
        flexDirection: "row",
        borderRadius: 125,
        borderColor: "#FCA311",
        borderWidth: 2,
    },

    senha: {
        backgroundColor: "#14213D",
        alignItems: "center",
        // height:35,
        //width: 35,
        paddingLeft: 15,
        padding: 7,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,

    },

    contaInput: {
        backgroundColor: "#14213D", 
        flexGrow:1, 
        paddingHorizontal: 10, 
        borderBottomRightRadius:100, 
        borderTopRightRadius:100,
        color: "white",
    },

    botao: {
        height: 60,
        backgroundColor: "#FCA311",
        // alignItems: "center",
        borderRadius: 20,
        padding: 15,
        width: 180,
        justifyContent: "space-between",
        alignItems: "center"
    },

    textoum: {
        color: "black",
        fontWeight: "bold",
        alignSelf: "center",
        fontSize: 22,
        marginBottom: -30,
        textAlign: "center",
    },

})

export default Senha;
