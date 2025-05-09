import React, { useId, useState } from "react";
import { View, Text, StatusBar, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView } from "react-native";
import seta from "../assets/arrow.png"
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { useNavigation } from '@react-navigation/native';
import AwesomeAlert from "react-native-awesome-alerts";
import Icon from 'react-native-vector-icons/FontAwesome'


import { getDatabase, ref, set } from "firebase/database";
import database from "../firebase/database";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";



export default function CadastroBarbeiro() {
    const [nome, setNome] = useState('');
    const [nomeBarbearia, setNomeBarbearia] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [endereco, setEndereco] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarSenha2, setMostrarSenha2] = useState(false);


    const [maiorIdade, setMaiorIdade] = useState(false);


    // _______________________________CONFIG_FIREBASE__________________________________________________
    const salvarUsuario = () => {
        if (
            nome !== '' &&
            dataNascimento !== '' &&
            nomeBarbearia !== '' &&
            cnpj !== '' &&
            telefone !== '' &&
            email !== '' &&
            senha !== ''
            
        ) {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, senha)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const uid = user.uid;
                    const usersRef = ref(getDatabase(), `users/${uid}`); // "users"

                    set(usersRef, {
                        uid,
                        nome,
                        nomeBarbearia,
                        email,
                        telefone,
                        endereco,
                        senha,
                        cnpj,
                        dataNascimento,
                        tipoConta: "barbeiro",
                    })
                        .then(() => {
                            console.log("Usuário cadastrado com sucesso!");
                            setAlertSelected(true);
                            setNome("");
                            setNomeBarbearia("");
                            setDataNascimento("");
                            setEmail("");
                            setTelefone("");
                            setCnpj("");
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
        } else {
            window.alert("Por favor, preencha todos os campos obrigatórios.");
        }
    };
    // _________________________________________________________________________________


    // ______________________________CONFIG_TEXT_INPUTS______________________________________ 

    const handleInputChange = (text) => {
        const cnpjDigits = text.replace(/\D/g, '');

        let formattedCnpj = '';
        let i = 0;
        for (; i < cnpjDigits.length && i < 14; i++) {
            formattedCnpj += cnpjDigits[i];
            if (i === 1 || i === 4) {
                formattedCnpj += '.';
            } else if (i === 7) {
                formattedCnpj += '/';
            } else if (i === 11) {
                formattedCnpj += '-';
            }
        }
        setCnpj(formattedCnpj);
    };
    const handleInputDate = (text) => {
        const numericText = text.replace(/\D/g, '');

        if (numericText.length <= 8) { // Verifica se não excede 8 dígitos (DD/MM/YYYY)
            let formattedDate = '';

            if (numericText.length > 0) {
                formattedDate = numericText.substr(0, 2);

                if (numericText.length >= 3) {
                    formattedDate += '/' + numericText.substr(2, 2);
                }
                if (numericText.length >= 4) {
                    formattedDate += '/' + numericText.substr(4, 4);
                }
            }

            setDataNascimento(formattedDate);

            const isMaiorIdade = verificarMaiorIdade(formattedDate);
            setMaiorIdade(isMaiorIdade);
        }
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


    const navigator = useNavigation();
    function Cadastro() {
        return navigator.navigate("Cadastro");
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
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : -9000}
                style={{ flex: 1 }}
            >

                <ScrollView contentContainerStyle={{ flexGrow: 1,}}>
                    <View style={{ alignItems: "center", bottom:80, }}>
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
                            placeholder="Nome da Barbearia:"
                            value={nomeBarbearia}
                            onChangeText={(text) => setNomeBarbearia(text)}
                        />
                        <TextInput
                            style={estilo.input}
                            placeholder="CNPJ:"
                            value={cnpj}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                setCnpj(text);
                                handleInputChange(text);
                            }}
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
                            placeholder="Email:"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput
                            style={estilo.input}
                            placeholder="Senha:"
                            secureTextEntry={!mostrarSenha}
                            value={senha}
                            onChangeText={(text) => setSenha(text)}
                        />
                         <Icon
                            style={{ left: 350, bottom: 8, position:"absolute"}}
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
                            style={{ left: 350, bottom:-64, position:"absolute"}}
                            name={mostrarSenha2 ? 'eye-slash' : 'eye'}
                            size={20}
                            color="#FCA311"
                            onPress={() => setMostrarSenha2(!mostrarSenha2)}
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

})
