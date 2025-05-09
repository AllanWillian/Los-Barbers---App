import React, { useState } from "react";
import { View, Text, StatusBar, TextInput, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, ScrollView } from "react-native";
import seta from "../assets/arrow.png"
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { useNavigation, useTheme } from '@react-navigation/native';
import AwesomeAlert from "react-native-awesome-alerts";
import Icon from 'react-native-vector-icons/FontAwesome'


import { getDatabase, ref, push, set, update } from "firebase/database";
import database from "../firebase/database";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { ScreenStackHeaderBackButtonImage } from "react-native-screens";

export default function CadastroCliente() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [endereco, setEndereco] = useState('');

    const [maiorIdade, setMaiorIdade] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarSenha2, setMostrarSenha2] = useState(false);


    const [alertSelected, setAlertSelected] = useState(false);
    const AlertSelected = () => {
        setAlertSelected(true);
    };
    const exitAlert = () => {
        setAlertSelected(false)
        navigator.navigate("Cadastro")
    }
    const enterAlert = () => {
        setAlertSelected(false)
        navigator.navigate("Login")
    }


    // _______________________________CONFIG_FIREBASE__________________________________________________
    const salvarUsuario = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                const user = userCredential.user;
                const uid = user.uid;
                const usersRef = ref(getDatabase(), `users/${uid}`); "users"

                set(usersRef, {
                    uid,
                    nome,
                    email,
                    telefone,
                    senha,
                    cpf,
                    dataNascimento,
                    endereco,
                    tipoConta: "cliente",
                })
                    .then(() => {
                        console.log("Usuário cadastrado com sucesso!");
                        setAlertSelected(true);
                        setNome("");
                        setEmail("");
                        setCpf("");
                        setSenha("");
                        setEndereco("");
                    })
                    .catch((error) => {
                        console.log("Ocorreu um erro ao salvar as informações:", error);
                    });
            })
            .catch((error) => {
                console.log("Ocorreu um erro ao criar o usuário:", error);
            });
    };




    // ______________________________CONFIG_TEXT_INPUTS______________________________________ 
    const handleInputChange = (text) => {
        const cpfFormatado = formatarCPF(text);
        setCpf(cpfFormatado);
    }

    const formatarCPF = (cpf) => {
        cpf = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Insere um ponto após os primeiros três dígitos
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // Insere um ponto após os próximos três dígitos
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Insere um hífen após os três últimos dígitos
        return cpf;
    };


    const handleInputDate = (text) => {
        let formattedDate = '';
        const numericText = text.replace(/\D/g, '');

        if (numericText.length > 0) {
            // Formatação: DD/MM/YYYY
            formattedDate = numericText.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
        }
        setDataNascimento(formattedDate);

        const isMaiorIdade = verificarMaiorIdade(formattedDate);
        setMaiorIdade(isMaiorIdade);
    };

    const verificarMaiorIdade = (dataNascimento) => {
        if (!dataNascimento) {
            return false;
        }

        const [dia, mes, ano] = dataNascimento.split('/').map(Number);

        const dataAtual = new Date();
        const dataNasc = new Date(ano, mes - 1, dia);

        const idadeEmMilissegundos = dataAtual - dataNasc;
        const idadeEmAnos = idadeEmMilissegundos / (365.25 * 24 * 60 * 60 * 1000); // Aproximadamente 365.25 dias em um ano

        return idadeEmAnos >= 18;
    };

    const formatPhoneNumber = (number) => {
        const cleanedNumber = number.replace(/\D/g, '');

        if (cleanedNumber.length <= 11) {
            if (cleanedNumber.length <= 2) {
                return cleanedNumber;
            } else if (cleanedNumber.length <= 7) {
                return `(${cleanedNumber.substr(0, 2)}) ${cleanedNumber.substr(2)}`;
            } else {
                return `(${cleanedNumber.substr(0, 2)}) ${cleanedNumber.substr(2, 5)}-${cleanedNumber.substr(7)}`;
            }
        }

        return cleanedNumber.substr(0, 11);
    };

    // _________________________________________________________________________________


    const navigator = useNavigation();
    function Cadastro() {
        return navigator.navigate("Cadastro");
    }
    function Login() {
        return navigator.navigate("Login")
    }

    const [fonteCarregada] = useFonts({
        "MontRegular": Montserrat_400Regular,
        "MontMedium": Montserrat_500Medium,
        "MontSemiBold": Montserrat_600SemiBold,
        "MontBold": Montserrat_700Bold
    });


    return (
        <View style={estilo.fundo}>
            <StatusBar></StatusBar>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 500 : -10000}
                style={{ flex: 1 }}
            >

                <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
                    <View style={{ alignItems: "center", bottom: 55, }}>
                        <TextInput
                            style={estilo.input}
                            placeholder="Nome Completo:"
                            value={nome}
                            onChangeText={(text) => setNome(text)}
                        />

                        <TextInput
                            style={[estilo.input,
                            maiorIdade ? { borderColor: '#80ed99', borderWidth: 3 } : null, !maiorIdade ? { borderColor: 'red', borderWidth: 3 } : null]}
                            placeholder="Data de Nascimento:"
                            value={dataNascimento}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                setDataNascimento(text);
                                handleInputDate(text);
                            }}
                        />
                        <TextInput
                            style={estilo.input}
                            placeholder="CPF:"
                            value={cpf}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                setCpf(text);
                                handleInputChange(text);
                            }}
                        />

                        <TextInput
                            style={estilo.input}
                            placeholder="Email:"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput
                            style={estilo.input}
                            placeholder="Telefone:"
                            keyboardType="numeric"
                            value={formatPhoneNumber(telefone)}
                            onChangeText={(text) => setTelefone(text)}
                        />
                         <TextInput
                            style={estilo.input}
                            placeholder="Endereço:"
                            value={endereco}
                            onChangeText={(text) => setEndereco(text)}
                        />

                        <TextInput
                            style={estilo.input}
                            placeholder="Senha:"
                            secureTextEntry={!mostrarSenha}
                            value={senha}
                            onChangeText={(text) => setSenha(text)}
                        />
                        <Icon
                            style={{ left: 350, bottom: 25, position:"absolute"}}
                            name={mostrarSenha ? 'eye-slash' : 'eye'}
                            size={20}
                            color="#FCA311"
                            onPress={() => setMostrarSenha(!mostrarSenha)}
                        />
                        
                        <TextInput
                            style={estilo.input}
                            secureTextEntry={!mostrarSenha2}
                            placeholder="Confirmar a senha:"
                        />
                          <Icon
                            style={{ left: 350, bottom:-42, position:"absolute"}}
                            name={mostrarSenha2 ? 'eye-slash' : 'eye'}
                            size={20}
                            color="#FCA311"
                            onPress={() => setMostrarSenha2(!mostrarSenha2)}
                        />
                        <Icon
                            style={{ left: 270, bottom: 40 }}
                            name={mostrarSenha ? 'eye-slash' : 'eye'}
                            size={20}
                            color="#FCA311"
                            onPress={() => setMostrarSenha(!mostrarSenha)}
                        />


                        <View style={estilo.button}>
                            <TouchableOpacity
                                style={{ backgroundColor: "#FCA311", borderRadius: 20, width: 150, padding: 20 }}
                                onPress={() => { salvarUsuario(); }}
                            >
                                <Text style={{ textAlign: "center", fontFamily: "MontSemiBold" }}>
                                    Cadastrar
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <AwesomeAlert
                            show={alertSelected}
                            showProgress={false}
                            overlayStyle={{ backgroundColor: "rgba(0,0,0,0.8)" }}
                            contentContainerStyle={{
                                width: 600,
                                height: 200,
                                backgroundColor: '#353535',
                                borderRadius: 10,
                                padding: 20,


                            }}
                            title="Usuário Cadastrado "
                            message="Vamos acessar?"
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
                            showCancelButton={true}
                            showConfirmButton={true}
                            cancelText="Não"
                            confirmText="Sim"
                            confirmButtonColor="#FCA311"
                            cancelButtonColor="##FFD897"
                            confirmButtonTextStyle={{
                                fontSize: 18,
                                fontFamily: "MontSemiBold"
                            }}
                            cancelButtonTextStyle={{
                                fontSize: 18,
                                fontFamily: "MontSemiBold"
                            }}
                            onCancelPressed={exitAlert}
                            onConfirmPressed={enterAlert}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const estilo = StyleSheet.create({
    fundo: {
        display: "flex",
        flex: 1,
        backgroundColor: "black",

    },
    input: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        height: 60,
        marginBottom: 9,
        justifyContent: 'center',
        padding: 20,
        borderWidth: 3,
        top: 150,
        fontFamily: "MontSemiBold",
    },
    button: {
        alignItems: "center",
        top: 190
    },

});

