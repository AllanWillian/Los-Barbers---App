import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect} from "react";
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal,StatusBar } from "react-native";
import los from "../../assets/los.png";
import config1 from "../../assets/config1.png";
import calendar1 from "../../assets/calendar1.png";
import historico from "../../assets/historico2.png";
import user1 from "../../assets/user1.png";
import barber from "../../assets/barber.png";
import perfil from "../../assets/teste.jpg";

import database from '../../firebase/database';
import { getAuth,Auth } from 'firebase/auth';
import { getDatabase, ref, onValue, get} from 'firebase/database';



const MenuCliente = () => {
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        const getCurrentUser = async () => {
          const auth = getAuth();
          const currentUser = auth.currentUser;
          if (currentUser) {
            console.log('UID do usuário:', currentUser.uid);
            try {
              const database = getDatabase();
              const userRef = ref(database, `users/${currentUser.uid}/nome`);
              const snapshot = await get(userRef);
              console.log('Snapshot.exists():', snapshot.exists());
              console.log('Snapshot.val():', snapshot.val());
              console.log (userName);
        
              if (snapshot.exists()) {
                const userNameFromDB = snapshot.val();
                setUserName(userNameFromDB);
              } else {
                console.log('Nome do usuário não encontrado no banco de dados.');
              }
            } catch (error) {
              console.error('Erro ao buscar o nome do usuário:', error);
            }
          } else {
            console.log('Usuário não está autenticado.');
          }
        };
    
        getCurrentUser();
      }, []);
    
    const navigator = useNavigation();
    function Barbearias() {
        return navigator.navigate("Barbearias")
    }
    function AgendaBarber(){
        return navigator.navigate("AgendaBarber")
    }
    function Historico (){
        return navigator.navigate ("Historico")
    }
    function MenuConfig (){
        return navigator.navigate("MenuConfig")
    }

  
    const [showModal, setshowModal] = useState(false);
    const fechaModal = () => {
        setshowModal(false);
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
        <View >
            <StatusBar/>
            <View style={estilo.fundo}>

                <View style={estilo.topo}>

                    <TouchableOpacity onPress={() => setshowModal(true)}>
                        <Image source={user1} style={estilo.user} />
                    </TouchableOpacity>

                    <Image source={los} style={estilo.logo} />
                </View>

                <View style={estilo.Div1}>
                    <TouchableOpacity style={estilo.btn1} onPress ={() => navigator.navigate('Historico')}>
                        <Image source={historico} style={estilo.icons} />
                        <Text style={estilo.text_button}>HISTÓRICO</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={estilo.btn2} onPress ={() => navigator.navigate('AgendaBarber')}>
                        <Image source={calendar1} style={estilo.icons}  />
                        <Text style={estilo.text_button}>AGENDAR</Text>
                    </TouchableOpacity>
                </View>

                <View style={estilo.Div2}>
                    <TouchableOpacity style={estilo.btn2} onPress={() => navigator.navigate('Barbearias')}>
                        <Image source={barber} style={estilo.icons}/>
                        <Text style={estilo.text_button}>BARBEARIAS</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={estilo.btn1} onPress={() =>navigator.navigate('MenuConfig')}>
                        <Image source={config1} style={estilo.icons} />
                        <Text style={estilo.text_button}>AJUSTES</Text>
                    </TouchableOpacity>
                </View>


            </View>
{/* _________________________________________________MODAL_______________________________________________________________ */}

            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
                onRequestClose={fechaModal}
            >
                <View style={{ flex: 1, justifyContent: "center", alignSelf: "stretch", }}>
                    <View style={{backgroundColor:"rgba(0,0,0,0.8)",}}>
                        <View style={{ backgroundColor: '#14213D', width: 300, height: 842, borderTopRightRadius: 50 }}>
                            <View style={{ backgroundColor: "orange", borderRadius: 20, borderTopLeftRadius: 0, borderTopRightRadius: 50, borderBottomLeftRadius: 50, borderBottomRightRadius: 0, }}>
                                <View style={{ alignItems: 'center', top: 20, }}>
                                    <Image source={perfil} style={{ width: 100, height: 100, borderRadius: 50, alignSelf: "center", top: 35, }}></Image>
                                    <Text style={{ padding: 60, textAlign: "center", fontSize: 20, fontFamily: "MontBold", bottom: 10 }}>{userName}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={{ borderColor: "#FCA311", borderWidth: 1, borderRadius: 20, padding: 20, marginTop: 30, marginHorizontal: 15, }}>
                                <Text style={{ color: "white", fontFamily: "MontSemiBold" }}>Perfil</Text></TouchableOpacity>
                            <TouchableOpacity style={{ borderColor: "#FCA311", borderWidth: 1, borderRadius: 20, padding: 20, marginTop: 15, marginHorizontal: 15, }}>
                                <Text style={{ color: "white", fontFamily: "MontSemiBold" }}>Configuração</Text></TouchableOpacity>
                            <TouchableOpacity style={{ borderColor: "#FCA311", borderWidth: 1, borderRadius: 20, padding: 20, marginTop: 15, marginHorizontal: 15, }}>
                                <Text style={{ color: "white", fontFamily: "MontSemiBold" }}>Ajuda</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ borderColor: "#FCA311", borderWidth: 1, borderRadius: 20, padding: 20, marginTop: 15, marginHorizontal: 15, }}>
                                <Text style={{ color: "white", fontFamily: "MontSemiBold" }}>Sair</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>

        // ---------------------------------------------------- MODAL -----------------------------------------------------------------

    );
}

const estilo = StyleSheet.create({


    fundo: {
        backgroundColor: "black",
        height: "100%",

    },

    text_button: {
        color: "white",
        textAlign: "center",
        fontSize: 12,
        alignItems: 'center',
        marginTop: 19,
        fontFamily: "MontBold",
    },

    btn1: {
        backgroundColor: "#14213D",
        resizeMode: "repeat",
        padding: 32,

        borderTopLeftRadius: 0,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 0,
        width: "50%",
        borderWidth: 1,
        borderColor: "white",
        elevation:100,
    },

    btn2: {
        backgroundColor: "#14213D",
        padding: 32,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 50,
        width: "50%",
        borderWidth: 1,
        borderColor: "white",
        elevation:100,
    },

    logo: {

        height: 80,
        width: 100,
        flexDirection: "row",
        left: 30,
        marginTop: "-1%",
    },

    user: {
        height: 40,
        width: 40,
        flexDirection: "row",
        right: 40,
        marginTop: "20%",

    },

    Div1: {
        display: "flex",
        justifyContent: "center",
        flexDirection: 'row',
        marginTop: "7%",
        marginLeft: "10%",
        marginRight: "10%",


    },
    Div2: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        marginTop: "0%",
        marginLeft: "10%",
        marginRight: "10%",

    },

    icons: {
        height: 80,
        width: 80,
        alignSelf: "center",
    },

    topo: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 120,
    
    }

});



export default MenuCliente;