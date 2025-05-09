import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground, Alert, TextInput } from "react-native";
import logo from "../../../assets/los.png";
import seta from "../../../assets/arrow.png"
import Icon from "react-native-vector-icons/FontAwesome";
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold } from "@expo-google-fonts/montserrat";

const Suporte = () => {
    const [showFaq, setShowFaq] = useState(false);
    const [showLosBarbers, setShowLosBarbers] = useState(false);
    const [showSenha, setShowSenha] = useState(false);
    const [showRespostaPerfil, setShowRespostaPerfil] = useState(false);
    const [showRespostaRemarcação, setShowRespostaRemarcação] = useState(false);
    const [showRespostaHorario, setShowRespostaHorario] = useState(false);

    const navigator = useNavigation();
    function Home(){
      return navigator.navigate("Home")
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

        <View style={estilos.fundo}>
            <View style={estilos.alinhamento}>
            <TouchableOpacity onPress={() => navigator.navigate('Home')}>
            <Icon name="chevron-left" size={50} style={estilos.seta}></Icon>
                </TouchableOpacity>
            </View>

            <View style={estilos.todos}>
                <Text style={estilos.texto}>SUPORTE</Text>

                <View style={estilos.caixaIcones}>

                    <View>

                        {(!showFaq && (
                            <View style={[estilos.icone, estilos.princ]}>
                                <Icon name="question" size={27} color="#FCA311" />
                                <Text style={[estilos.faqPerg, 
                                    { flexGrow: 1, 
                                    textAlign: "center", 
                                    fontSize: 15,
                                    color:"white", 
                                    fontFamily:"MontSemiBold",
                                    }]}>Perguntas frequentes</Text>
                                <TouchableOpacity onPress={() => { setShowFaq(!showFaq) }}>
                                    <Icon name="plus" size={22} color="#FCA311" style={estilos.faqUm} />
                                </TouchableOpacity>
                            </View>
                        ))}

                        {(showFaq && (
                            <View>
                                <View style={[estilos.icone, estilos.princ]}>
                                    <Icon name="question" size={27} color="#FCA311" />
                                    <Text style={[estilos.faqPerg, { flexGrow: 1, textAlign: "center", fontSize: 17}]}>Perguntas frequentes</Text>
                                    <TouchableOpacity onPress={() => { setShowFaq(!showFaq) }}>
                                        <Icon name="minus" size={22} color="#FCA311" style={estilos.faqUm} />
                                    </TouchableOpacity>
                                </View>

                                <View>
                                    <View style={estilos.pergresp}>

                                        {!showLosBarbers && (
                                            <View style={[estilos.icone, estilos.pgf]}>
                                                <Text style={estilos.faqPerg}>O que é a Los Barbers?</Text>
                                                <TouchableOpacity onPress={() => { setShowLosBarbers(!showLosBarbers) }}>
                                                    <Icon name="chevron-down" size={20} color="#FCA311" style={estilos.faqUm} />
                                                </TouchableOpacity>
                                            </View>
                                        )}

                                        {showLosBarbers && (
                                            <View>
                                                <View style={[estilos.icone, estilos.pgf, estilos.rsp]}>
                                                    <Text style={estilos.faqPerg}>O que é a Los Barbers?</Text>
                                                    <TouchableOpacity onPress={() => { setShowLosBarbers(!showLosBarbers) }}>
                                                        <Icon name="chevron-up" size={20} color="#FCA311" style={estilos.faqUm} />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={[estilos.icone, estilos.resp]}>
                                                    <Text style={estilos.faqPergRes}>A Los Barbers é uma empresa de tecnologia responsável pela criação do aplicativo que oferece auxilio aos barbeiros autônomos no gerenciamento de seus negócios e a fazer com que a barbearia se conecte mais facilmente aos seus clientes por meio de uma plataforma simples e eficiente.</Text>
                                                </View>
                                            </View>
                                        )}

                                        {!showSenha && (
                                            <View style={[estilos.icone, estilos.pgf]}>
                                                <Text style={estilos.faqPerg}>Como alterar a minha senha?</Text>
                                                <TouchableOpacity onPress={() => { setShowSenha(!showSenha) }}>
                                                    <Icon name="chevron-down" size={20} color="#FCA311" style={estilos.faqUm} />
                                                </TouchableOpacity>
                                            </View>
                                        )}

                                        {showSenha && (
                                            <View>
                                                <View style={[estilos.icone, estilos.pgf, estilos.rsp]}>
                                                    <Text style={estilos.faqPerg}>Como alterar a minha senha?</Text>
                                                    <TouchableOpacity onPress={() => { setShowSenha(!showSenha) }}>
                                                        <Icon name="chevron-up" size={20} color="#FCA311" style={estilos.faqUm} />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={[estilos.icone, estilos.resp]}>
                                                    <Text style={estilos.faqPergRes}>Passo 1: Para alterar a senha da sua conta, basta acessar o menu de “ajustes”, ir no campo “conta” e selecionar a opção “alterar senha”. {'\n'}
                                                        Passo 2: Você receberá um código de verificação para autenticar e alterar as informações da sua conta. IMPORTANTE frisar que esse código nunca deve ser compartilhado com ninguém para preservar a integridade e a segurança da sua conta. {'\n'}
                                                        Passo 3: Depois de realizado o processo de autenticação, preencha os seguintes campos respectivamente: {'\n'}
                                                        - Digitar a senha atual. {'\n'}
                                                        - Confirmar a senha atual. {'\n'}
                                                        - Digitar a nova senha. {'\n'}
                                                        - Confirmar a nova senha.
                                                    </Text>
                                                </View>
                                            </View>
                                        )}

                                        {!showRespostaPerfil && (
                                            <View style={[estilos.icone, estilos.pgf]}>
                                                <Text style={estilos.faqPerg}>Como alterar meu perfil?</Text>
                                                <TouchableOpacity onPress={() => { setShowRespostaPerfil(!showRespostaPerfil) }}>
                                                    <Icon name="chevron-down" size={20} color="#FCA311" style={estilos.faqUm} />
                                                </TouchableOpacity>
                                            </View>
                                        )}

                                        {showRespostaPerfil && (
                                            <View>
                                                <View style={[estilos.icone, estilos.pgf, estilos.rsp]}>
                                                    <Text style={estilos.faqPerg}>Como alterar meu perfil?</Text>
                                                    <TouchableOpacity onPress={() => { setShowRespostaPerfil(!showRespostaPerfil) }}>
                                                        <Icon name="chevron-up" size={20} color="#FCA311" style={estilos.faqUm} />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={[estilos.icone, estilos.resp]}>
                                                    <Text style={estilos.faqPergRes}>Para alterar informações relacionadas ao perfil, será necessário utilizar a barra lateral: {'\n'}
                                                        Passo 1: Vá na barra lateral de perfil. {'\n'}
                                                        Passo 2: Clique nos ícones de edição relacionados a opção que você deseja alterar do perfil.
                                                    </Text>
                                                </View>
                                            </View>
                                        )}

                                        {!showRespostaRemarcação && (
                                            <View style={[estilos.icone, estilos.pgf]}>
                                                <Text style={estilos.faqPerg}>Como remarcar ou cancelar o agendamento?</Text>
                                                <TouchableOpacity onPress={() => { setShowRespostaRemarcação(!showRespostaPerfil) }}>
                                                    <Icon name="chevron-down" size={20} color="#FCA311" style={estilos.faqUm} />
                                                </TouchableOpacity>
                                            </View>
                                        )}

                                        {showRespostaRemarcação && (
                                            <View>
                                                <View style={[estilos.icone, estilos.pgf, estilos.rsp]}>
                                                    <Text style={estilos.faqPerg}>Como remarcar ou cancelar o agendamento?</Text>
                                                    <TouchableOpacity onPress={() => { setShowRespostaRemarcação(!showRespostaRemarcação) }}>
                                                        <Icon name="chevron-up" size={20} color="#FCA311" style={estilos.faqUm} />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={[estilos.icone, estilos.resp]}>
                                                    <Text style={estilos.faqPergRes}>Para realizar um cancelamento ou remarcar um agendamento, você precisa acessar a tela de “agendamento”, e ir no agendamento que deseja alterar e cancelar. Após realizado esse processo, basta marcar para qual dia de preferência.
                                                    </Text>
                                                </View>
                                            </View>
                                        )}

                                        {!showRespostaHorario && (
                                            <View style={[estilos.icone, estilos.pgf]}>
                                                <Text style={estilos.faqPerg}>Qual é o expediente da Los Barbers?</Text>
                                                <TouchableOpacity onPress={() => { setShowRespostaHorario(!showRespostaHorario) }}>
                                                    <Icon name="chevron-down" size={20} color="#FCA311" style={estilos.faqUm} />
                                                </TouchableOpacity>
                                            </View>
                                        )}

                                        {showRespostaHorario && (
                                            <View>
                                                <View style={[estilos.icone, estilos.pgf, estilos.rsp]}>
                                                    <Text style={estilos.faqPerg}>Qual é o expediente da Los Barbers?</Text>
                                                    <TouchableOpacity onPress={() => { setShowRespostaHorario(!setShowRespostaHorario) }}>
                                                        <Icon name="chevron-up" size={20} color="#FCA311" style={estilos.faqUm} />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={[estilos.icone, estilos.resp]}>
                                                    <Text style={estilos.faqPergRes}>A Los Barbers é uma empresa de tecnologia que atende no horário central para assuntos relacionados a dúvidas, propostas e solução de problemas. Já os horários das barbearias variam, uma vez que quem define os horários de expediente não e a Los Barbers, mas sim as próprias barbearia.
                                                    </Text>
                                                </View>
                                            </View>
                                        )}



                                    </View>
                                </View>
                            </View>
                        ))}

                    </View>


                    <View style={[estilos.icone, estilos.iconeMaior]}>
                        <Icon name="wechat" size={20} color="#FCA311" left={4} />
                        <TextInput multiline={true}
                            numberOfLines={7} cursorColor={"#FCA311"} placeholder={"Descrição do problema"} placeholderTextColor={"white"} secureTextEntry={true} maxLength={270} fontSize={17} style={[estilos.contaInput, {}]} />
                    </View>
                    <TouchableOpacity style={estilos.botao} onPress={() => Alert.alert("Solicitação enviada à equipe de suporte")}>
                        <Text style={estilos.textoum}>ENVIAR</Text>
                    </TouchableOpacity>
                </View>


                <Image source={logo} style={estilos.logo}></Image>

                <Text style={estilos.faleConosco}>FALE CONOSCO</Text>
                <TouchableOpacity style={estilos.contate}>
                    <Icon name="whatsapp" size={25} color="white" style={estilos.whats} />
                 
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
        backgroundColor: "black",
        flexDirection: "column",
    },
  
    seta: {
        marginLeft: 20,
        marginTop: 10,
        color: "white",
    },

    logo: {
        width: 119,
        height: 71,
        alignItems: "center",
        marginTop: 20,

    },

    todos: {
        flexDirection: "column",
        justifyContent: "space-between",
        height: 480,
        marginTop: 70,
        alignItems: "center"
    },

    texto: {
        fontSize: 25,
        color: "white",
        fontFamily:"MontBold",
        textAlign: "center",
        marginBottom: 40,
    },

    caixaIcones: {
        width: 300,
    },

    icone: {
        flexDirection: "row",
        borderRadius: 20,
        borderColor: "#FCA311",
        borderWidth: 2,
        backgroundColor: "#14213D",
    },

    princ: {
      
        alignItems: "center",
        height: 55,
        marginTop:1,
        paddingHorizontal: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopEndRadius: 15,
        borderTopLeftRadius: 15,
     
    },

    pergresp: {
        marginTop: 10,
    },

    pgf: {
        alignItems: "center",
        justifyContent: "space-between",
        // marginBottom: 25,
        paddingHorizontal: 15,
        height: 50,
        borderRadius: 0,
        borderBottomWidth: 1,
        marginTop: 7,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopEndRadius: 15,
        borderTopLeftRadius: 15,
    },

    rsp: {
        borderBottomWidth: 0,
        borderTopEndRadius: 15,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        borderTopEndRadius: 15,
        borderTopLeftRadius: 15,
    },

    resp: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 15,
        borderRadius: 0,
        borderTopWidth: 0,
        paddingBottom: 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopEndRadius: 0,
        borderTopLeftRadius: 0,
    },

    faqPerg: {
        fontSize: 12,
        color: "white",
        fontFamily:"MontSemiBold",
    },

    faqPergRes: {
        fontSize:12,
        color: "white",
        fontFamily:"MontRegular",
    },



    iconeMaior: {
        height: 165,
        borderRadius: 30,
        marginTop: 25,
        paddingHorizontal: 10,
        paddingVertical: 10,
        
    },

    contaInput: {
        flexGrow: 1,
        paddingHorizontal: 10,
        borderBottomRightRadius: 100,
        borderTopRightRadius: 100,
        color: "white",
        fontFamily:"MontSemiBold",
        fontSize:15,
        flex: 1,
        textAlignVertical: "top",
        left: 10
    },

    botao: {
        height: 50,
        backgroundColor: "#FCA311",
        borderRadius: 20,
        padding: 10,
        width: 160,
        alignSelf: "center",
        marginTop: 30,
    },

    textoum: {
        color: "black",
        fontFamily:"MontBold",
        textAlign:"center",
        fontSize: 15,
        top:5,
    },

    faleConosco: {
        fontSize: 13,
        color: "white",
        marginTop: 3,

    },

    contate: {
        marginTop: 5,
        flexDirection: "row",
    },

    whats: {
        marginTop: 7,
    },

})

export default Suporte;