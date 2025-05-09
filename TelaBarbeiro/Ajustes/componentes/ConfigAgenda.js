import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, TextInput,Modal,ScrollView } from "react-native";
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { useNavigation } from "@react-navigation/native";
import seta from '../../../assets/arrow.png'

import firebase from "../../../firebase/database";
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const ConfigAgenda = () => {
    const [hrSemana, sethrSemana] = useState('');
    const [hrSemanaFinal, sethrSemanaFinal] = useState('');
    const [hrFinalSemana, sethrFinalSemana] = useState('');
    const [hrFinalSemana2, sethrFinalSemana2] = useState('');
    const [hrAlmoco, sethrAlmoco] = useState('');
    const [hrAlmocoFinal, sethrAlmocoFinal] = useState('');

    const [user, setUser] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [selectedDay1, setSelectedDay1] = useState(null);

    const daysOfWeek = ['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado', 'domingo'];


    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleSaveConfig = async () => {
        try {
            if (user) {
                const uid = user.uid;
                const configAgenda = {
                    // Horarios da Semana
                    hrSemana,
                    hrSemanaFinal,
                    // Horarios Fim de Semana
                    hrFinalSemana,
                    hrFinalSemana2,
                     // Pause Almoço
                    hrAlmoco,
                    hrAlmocoFinal,
                     // Dias da Semana
                    selectedDay,
                    selectedDay1,
                };

                const db = getDatabase();
                const configRef = ref(db, `users/${uid}/config/configAgenda`);
                await set(configRef, configAgenda);

                console.log("Configurações salvas");
            }
        } catch (error) {
            console.error("Erro ao salvar configurações", error);
        }
    }

    

    const handleDayPress = (day) => {
        setSelectedDay(day);
        setIsModalVisible(false);
    };
    const handleDayPress1 = (day1) => {
        setSelectedDay1(day1);
        setIsModalVisible1(false);
    };
        const formatTime = (input) => {
            const sanitizedInput = input.replace(/[^\d]/g, '');
            if (sanitizedInput.length <= 2) {
                return sanitizedInput;
            } else {
                return `${sanitizedInput.slice(0, 2)}:${sanitizedInput.slice(2, 4)}`;
            }
        };

        const navigator = useNavigation();
        function Home() {
            return navigator.navigate("Home")
        }

        const [fonteCarregada] = useFonts({
            "MontRegular": Montserrat_400Regular,
            "MontMedium": Montserrat_500Medium,
            "MontSemiBold": Montserrat_600SemiBold,
            "MontBold": Montserrat_700Bold,
        })

        if (!fonteCarregada) {
            return null;
        }

        

        return (
        // <ScrollView>
            <View style={estilos.fundo}>
                <View style={estilos.alinhamento}>
                    <TouchableOpacity onPress={() => navigator.navigate("Home")}>
                        <Image source={seta} style={estilos.seta}></Image>
                    </TouchableOpacity>
                </View>

                <Text style={estilos.texto}> AGENDA </Text>
                <Text style={estilos.textoUm}> Defina sua rotina de trabalho: </Text>

                <Text style={estilos.Text}>Horários da Semana: </Text>
                <View style={estilos.Box}>
                    <TextInput
                        placeholderTextColor={"white"}
                        keyboardType="numeric"
                        style={estilos.contaInput}
                        value={formatTime(hrSemana)}
                        onChangeText={sethrSemana}
                        maxLength={5}
                    />
                    <Text style={estilos.ateUni}>até</Text>
                    <TextInput
                        placeholderTextColor={"white"}
                        keyboardType="numeric"
                        style={estilos.contaInput}
                        value={formatTime(hrSemanaFinal)}
                        onChangeText={sethrSemanaFinal}
                        maxLength={5}
                    />
                </View>

                <Text style={estilos.Text}> Horários de Fim de Semana: </Text>
                <View style={estilos.Box}>
                    <TextInput
                        placeholderTextColor={"white"}
                        keyboardType="numeric"
                        style={estilos.contaInput}
                        value={formatTime(hrFinalSemana)}
                        onChangeText={sethrFinalSemana}
                        maxLength={5}
                    />
                    <Text style={estilos.ateUni} >até</Text>
                    <TextInput
                        placeholderTextColor={"white"}
                        keyboardType="numeric"
                        style={estilos.contaInput}
                        value={formatTime(hrFinalSemana2)}
                        onChangeText={sethrFinalSemana2}
                        maxLength={5} />
                </View>

                <Text style={estilos.Text}> Pausa para Almoço: </Text>
                <View style={estilos.Box}>
                    <TextInput
                        placeholderTextColor={"white"}
                        keyboardType="numeric"
                        style={estilos.contaInput}
                        value={formatTime(hrAlmoco)}
                        onChangeText={sethrAlmoco}
                        maxLength={5}
                    />
                    <Text style={estilos.ateUni} >até</Text>
                    <TextInput
                        placeholderTextColor={"white"}
                        keyboardType="numeric"
                        style={estilos.contaInput}
                        value={formatTime(hrAlmocoFinal)}
                        onChangeText={sethrAlmocoFinal} maxLength={5}
                    />
                </View>
                <View>

                    <Text style={estilos.Text2}> Dias da Semana:</Text>
                    <View style={estilos.Box}>
                        <TouchableOpacity
                            onPress={() => setIsModalVisible(true)}
                            style={estilos.contaInput}
                        >
                            <Text style={estilos.TextSemana}>{selectedDay || 'Selecione um dia'}</Text>
                        </TouchableOpacity>
                    
                    <Text style={estilos.ateUni} >até</Text>
                        <TouchableOpacity
                            onPress={() => setIsModalVisible1(true)}
                            style={estilos.contaInput}
                        >
                            <Text style={estilos.TextSemana}>{selectedDay1 || 'Selecione um dia'}</Text>
                        </TouchableOpacity>
                        </View>

                    <Modal visible={isModalVisible} transparent animationType="slide">
                        <View style={estilos.modalContainer}>
                            {daysOfWeek.map((day) => (
                                <TouchableOpacity
                                    key={day}
                                    style={estilos.modalItem}
                                    onPress={() => handleDayPress(day)}
                                >
                                    <Text style={estilos.TextModal}>{day}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Modal>

                    <Modal visible={isModalVisible1} transparent animationType="slide">
                        <View style={estilos.modalContainer}>
                            {daysOfWeek.map((day1) => (
                                <TouchableOpacity
                                    key={day1}
                                    style={estilos.modalItem}
                                    onPress={() => handleDayPress1(day1)}
                                >
                                    <Text style={estilos.TextModal}>{day1}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Modal>
                </View>
                
                <View>
                    <TouchableOpacity style={estilos.botao} onPress= {handleSaveConfig}>
                        <Text style={estilos.TextBoton} >SALVAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        // </ScrollView>
        );
    }

    const estilos = StyleSheet.create({

        alinhamento: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 15,
            paddingVertical: 20,
        },

        fundo: {
            height: "100%",
            backgroundColor: "black"
        },

        seta: {
            width: 40,
            height: 40,
            marginLeft: 3,
        },

        texto: {
            fontSize: 30,
            color: "white",
            textAlign: "center",
            fontFamily: "MontSemiBold",
            marginBottom: 20,
        },

        textoUm: {
            fontSize: 19,
            color: "white",
            fontFamily: "MontSemiBold",
            marginTop: 3,
            left: 25,

        },

        Box: {
            height: 50,
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            width: 330,
            alignSelf: "center",
        },

        Text: {
            fontSize: 17,
            color: "white",
            fontFamily: "MontSemiBold",
            marginLeft: 25,
            marginTop: 35
        },
        Text2: {
            fontSize: 17,
            color: "white",
            fontFamily: "MontSemiBold",
            marginLeft: 30,
            marginTop: 35
        },

        ateUni: {
            fontSize: 16,
            color: "white",
            fontFamily: "MontSemiBold",
            top: 14,
            paddingHorizontal: 30,
        },

        contaInput: {
            backgroundColor: "#14213D",
            borderRadius: 9,
            borderColor: "#FCA311",
            borderWidth: 1,
            height: 50,
            width: 120,
            textAlign: "center",
            color: "white",
            fontFamily: "MontSemiBold",

        },

        botao: {
            height: 60,
            marginTop: 35,
            backgroundColor: "#FCA311",
            borderRadius: 20,
            padding: 15,
            width: 180,
            alignSelf: "center"

        },

        TextBoton: {
            color: "white",
            fontFamily: "MontSemiBold",
            fontSize: 18,
            marginTop: 2,
            textAlign: "center",

        },
        modalContainer:{
            backgroundColor:"#353535",
            fontFamily:"MontSemiBold",
            color:"white",
            alignItems:"center",
            borderRadius:15,
            justifyContent:"center",
            display:"flex",
            top:500,
            padding:50,
        },
        TextModal:{
            color:"white",
            fontFamily:"MontSemiBold",
            marginBottom:12,
            fontSize:16,    
        },
        TextSemana:{
            color:"white",
            fontFamily:"MontSemiBold",
            textAlign:"center",
            top:10,
                  
        },  

    })

    export default ConfigAgenda;