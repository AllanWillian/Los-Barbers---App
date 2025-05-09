import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet, TextInput, KeyboardAvoidingView, FlatList, ScrollView} from "react-native";
import seta from "../../../assets/arrow.png";
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import Icon from "react-native-vector-icons/FontAwesome";
import { getDatabase, ref, push,child, update, get} from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import database from "../../../firebase/database";


const ConfigServico = () => {
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(null);
    const [serviceData, setServiceData] = useState({
        servico: "",
        valor: "",
        tempoGasto: ""
    });
    const [userServices, setUserServices] = useState([]);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (user) {
            const db = getDatabase();
            const userRef = ref(db, `users/${user.uid}`);
    
            get(child(userRef, "config/configServicos"))
                .then(snapshot => {
                    if (snapshot.exists()) {
                        const servicesData = snapshot.val();
                        const servicesList = Object.entries(servicesData).map(([key, value]) => ({
                            id: key,
                            ...value
                        }));
                        setUserServices(servicesList);
                    } else {
                        setUserServices([]);
                    }
                })
                .catch(error => {
                    console.error("Erro ao buscar serviços: ", error);
                });
        }
    }, [user]);
    const saveServiceDataToFirebase = () => {
        if (user) {
            const db = getDatabase();
            const serviceDataToSave = {
                servico: serviceData.servico,
                valor: serviceData.valor,
                tempoGasto: serviceData.tempoGasto
            };
    
            console.log("UID do usuário: ", user.uid);
    
            const userRef = ref(db, `users/${user.uid}`);
            console.log("Salvando dados do serviço: ", serviceDataToSave);
    
            const servicesRef = child(userRef, "config/configServicos");
    
            const newServiceKey = generateRandomId();
    
            const newServiceData = {};
            newServiceData[newServiceKey] = serviceDataToSave;
    
            update(servicesRef, newServiceData)
                .then(() => {
                    console.log("Dados do serviço salvos com sucesso!");
                    setShowModal(false);

                    setUserServices(prevServices => [
                        ...prevServices,
                        { id: newServiceKey, ...serviceDataToSave }
                    ]);
                })
                .catch(error => {
                    console.error("Erro ao salvar dados do serviço: ", error);
                });
        }
    };

    const generateRandomId = () => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const idLength = 5;
        let randomId = "";

        for (let i = 0; i < idLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomId += characters.charAt(randomIndex);
        }

        return randomId;
    };
    const [fonteCarregada] = useFonts({
        "MontRegular": Montserrat_400Regular,
        "MontMedium": Montserrat_500Medium,
        "MontSemiBold": Montserrat_600SemiBold,
        "MontBold": Montserrat_700Bold,
    });

    const navigator = useNavigation();
    function HomeBarber() {
        return navigator.navigate("HomeBarber")
    }

    if (!fonteCarregada) {
        return null;
    }

    return (
        <View style={styles.fundo}>
            <View>
                <TouchableOpacity onPress={() => navigator.navigate("HomeBarber")}>
                <Icon name="chevron-left" size={50} style={styles.seta}></Icon>
                </TouchableOpacity>
                <Text style={styles.titulo}> SERVIÇOS</Text>
                <FlatList
                    data={userServices}
                    keyExtractor={item => item.id}
                    style={{marginTop:20, height:"70%"}}
                    scrollEnabled={true} 
                    renderItem={({ item }) => (
                        <View style={styles.lista}>
                            <Text style={styles.serviceItem1}>{item.servico}</Text>
                            <Text style={styles.serviceItem}>Tempo Gasto: {item.tempoGasto} -- Valor: {item.valor}</Text>
                        </View>
                    )}
                />
            </View>
            
            <View style={{backgroundColor:"black",position:"absolute",top:700,width:500,alignSelf:"center"}}>
                    <TouchableOpacity style={styles.btnAdicionar} onPress={() => setShowModal(true)}>
                        <Text style={styles.textBtnAdicionar}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
            
           

            {/* //MODAL PARA PREENCHER OS DADOS DO SERVIÇOS */}
            <View>
                <Modal visible={showModal} transparent animationType='slide'>
                    <KeyboardAvoidingView style={styles.keyboardAvoidingContainer} behavior='padding'>
                        <View style={styles.fundoModal}>
                            <View style={styles.modalContainer}>
                                <View>
                                    <TouchableOpacity style={styles.btnfechaModal} onPress={() => setShowModal(false)}>
                                        <Text style={styles.fechaModalText}>X</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.tituloModal}>Insira o seu serviço:</Text>
                                <View>
                                    <TextInput
                                        placeholder="Serviço"
                                        placeholderTextColor="gray"
                                        style={styles.inputText}
                                        value={serviceData.servico}
                                        onChangeText={text => setServiceData(prevData => ({ ...prevData, servico: text }))}
                                    />
                                    <TextInput
                                        placeholder="Valor"
                                        placeholderTextColor="gray"
                                        style={styles.inputText}
                                        value={serviceData.valor}
                                        onChangeText={text => setServiceData(prevData => ({ ...prevData, valor: text }))}
                                    />
                                    <TextInput
                                        placeholder="Tempo Gasto"
                                        placeholderTextColor="gray"
                                        style={styles.inputText}
                                        value={serviceData.tempoGasto}
                                        onChangeText={text => setServiceData(prevData => ({ ...prevData, tempoGasto: text }))}
                                    />
                                    <TouchableOpacity style={styles.btnSalvarModal} onPress={saveServiceDataToFirebase}>
                                        <Text style={styles.textSalvarModal}>Salvar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </KeyboardAvoidingView>

                </Modal>
            </View>
        </View>
    )
}

export default ConfigServico;

const styles = StyleSheet.create({
    fundo: {
        backgroundColor: "black",
        flex: 1,
    },
    seta: {
        marginLeft: 20,
        marginTop: 10,
        color: "white",
    },
    titulo: {
        fontFamily: "MontSemiBold",
        fontSize: 30,
        textAlign: "center",
        marginTop: 20,
        color: "white",
    },
    btnAdicionar: {
        backgroundColor: "#FCA311",
        borderRadius: 20,
        alignSelf: "center",
        paddingHorizontal: 50,
        paddingVertical: 20,
        marginBottom:50,
        bottom:0,
        
        // position:"absolute",

    },
    textBtnAdicionar: {
        fontFamily: "MontSemiBold",
        color: "white",
        fontSize: 15,
       
    },
    fundoModal: {
        backgroundColor: "rgba(0,0,0,0.9)",
        padding: 500,
    },
    modalContainer: {
        backgroundColor: "#14213D",
        borderRadius: 20,
        alignSelf: "center",
        width: 400,
        height: 400,

    },

    tituloModal: {
        fontFamily: "MontSemiBold",
        fontSize: 20,
        textAlign: "center",
        marginTop: 20,
        color: "white",
    },
    inputText: {
        backgroundColor: "white",
        borderRadius: 30,
        marginTop: 20,
        height: 50,
        marginHorizontal: 50,
        fontFamily: "MontSemiBold",
        fontSize: 15,
        paddingLeft: 30,
    },

    btnSalvarModal: {
        backgroundColor: "#FCA311",
        borderRadius: 20,
        alignSelf: "center",
        paddingHorizontal: 50,
        paddingVertical: 20,
        marginTop: 16,

    },
    textSalvarModal: {
        fontFamily: "MontSemiBold",
        color: "white",
        fontSize: 15,
    },
    keyboardAvoidingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 350,
    },

    btnfechaModal: {
        backgroundColor: "red",
        borderRadius: 60,
        alignSelf: "center",
        width: 50,
        padding: 15,
        position: "absolute",
        right: 0,
        bottom: -35,
    },
    fechaModalText: {
        color: "white",
        textAlign: "center",
        fontSize: 18,
        fontFamily: "MontBold"
    },

    lista:{
        borderWidth:1,
        borderColor:"#FCA311",
        borderRadius:20,
        padding:20,
        marginHorizontal:25,
        marginBottom:15,
        
    },
    serviceList:{
        height:"100%",
      
    },

    serviceItem1:{
        color:"white",
        fontFamily:"MontBold",
        fontSize: 18,
        marginTop:10,
        marginBottom:7,
    
    },
    serviceItem:{
        color:"white",
        fontFamily:"MontRegular",
    
    },
   

})