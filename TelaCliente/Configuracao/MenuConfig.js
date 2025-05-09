import React, { useState, useEffect} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, TextInput, ScrollView, StatusBar} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import barber from '../../assets/barber.png'
import seta from "../../assets/arrow.png";
import lapis from "../../assets/lapis.png";
import perfil from "../../assets/teste.jpg";
import fundo from '../../assets/fundo.png';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { getDatabase,ref,get,set} from "firebase/database";
import { getAuth,onAuthStateChanged } from "firebase/auth";



const MenuConfig = () => {
    const [image, setImage] = useState(perfil);
    const [bannerImage, setBannerImage] = useState(fundo);
    const [userData, setUserData] = useState({
        nome: '',
        telefone: '',
        email: '',
        dataNascimento: '',
        cpf: ''
    });

    const [editNome, setEditNome] = useState(null);
    const [editTelefone, setEditTelefone] = useState(null);
    const [editEmail, setEditEmail] = useState(null);
    const [editDataNascimento, setEditDataNascimento] = useState(null);
    const [editCpf, setEditCpf] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.uri);
        }
    };

    const pickBannerImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 2],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setBannerImage(result.uri);
        }
    };

    const navigator = useNavigation();
    function Conta() {
        return navigator.navigate("MenuCliente")
    }

    const [fonteCarregada] = useFonts({
        "MontRegular": Montserrat_400Regular,
        "MontMedium": Montserrat_500Medium,
        "MontSemiBold": Montserrat_600SemiBold,
        "MontBold": Montserrat_700Bold,
    });


    useEffect(() => {
        const auth = getAuth();
        
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const db = getDatabase();
                const userRef = ref(db, 'users/' + user.uid);

                get(userRef)
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            const userDataFromDatabase = snapshot.val();
                            setUserData(userDataFromDatabase);
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao buscar dados do usuário:', error);
                    });
            }
        });
    }, []);

    const salvarAlteracoes = () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const db = getDatabase();
            const userRef = ref(db, 'users/' + user.uid);

            set(userRef, userData)
                .then(() => {
                    Alert.alert("Conta alterada com sucesso");
                })
                .catch(error => {
                    console.error('Erro ao salvar alterações:', error);
                });
        }
    };

    if (!fonteCarregada) {
        return null;
    }

    return (

        <View style={estilos.fundo}>
            <StatusBar></StatusBar>

            <ScrollView>

                <View>
                    {bannerImage && (
                        <Image source={fundo} style={estilos.banner} />
                    )}
                    <View>
                        <TouchableOpacity onPress={pickBannerImage} >
                            <Image source={lapis} style={estilos.LapisBanner}></Image>
                        </TouchableOpacity>
                    </View>

                    {image && (
                        <Image source={perfil} style={estilos.profileImage} />
                    )}
                    <View>
                        <TouchableOpacity onPress={pickImage}>
                            <Image source={lapis} style={estilos.LapisPerfil}></Image>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={estilos.alinhamento}>
                    <TouchableOpacity onPress={() => navigator.navigate('MenuCliente')}>
                        <Image source={seta} style={{ width: 40, height: 30, bottom: 290, marginLeft: 10 }} />
                    </TouchableOpacity>
                </View>


                <View style={estilos.formulario}>
                    <View style={estilos.inputContainer}>

                        <Icon
                            name="user"
                            size={25}
                            color="#FCA311"
                            style={estilos.icon} />

                        <TextInput 
                              style={estilos.textInput}
                              placeholder="Nome"
                              placeholderTextColor="white"
                              value={userData.nome}
                              editable={editNome}
                              onFocus={() => setEditNome(true)}
                              onBlur={() => setEditNome(false)}
                              onChangeText={(text) => setUserData({ ...userData, nome: text })}
                          />
                    </View>

                    <View style={estilos.inputContainer}>

                        <TextInput
                            style={estilos.textInput}
                            placeholder="Telefone"
                            keyboardType="numeric"
                            placeholderTextColor="white"
                            value={userData.telefone}
                            editable={editTelefone}
                            onFocus={() => setEditTelefone(true)} 
                            onBlur={() => setEditTelefone(false)} 
                            onChangeText={(text) => setUserData({ ...userData, telefone: text })}>
                        </TextInput>


                        <Icon
                            name="phone"
                            size={25}
                            color="#FCA311"
                            style={estilos.icon} />

                    </View>
                    <View style={estilos.inputContainer}>
                        <TextInput
                            style={estilos.textInput}
                            placeholder="Email"
                            keyboardType="email-address"
                            placeholderTextColor="white"
                            value={userData.email}
                            editable={editEmail}
                            onFocus={() => setEditEmail(true)} 
                            onBlur={() => setEditEmail(false)} 
                            onChangeText={(text) => setUserData({ ...userData, email: text })} 
                            />
                        <Icon
                            name="inbox"
                            size={25}
                            color="#FCA311"
                            style={estilos.icon} />

                    </View>

                    <View style={estilos.inputContainer}>

                        <TextInput
                            style={estilos.textInput}
                            placeholder="Data de Nascimento"
                            keyboardType="phone-pad"
                            placeholderTextColor="white"
                            value={userData.dataNascimento}
                            editable={editDataNascimento}
                            onFocus={() => setEditDataNascimento(true)} 
                            onBlur={() => setEditDataNascimento(false)} 
                            onChangeText={(text) => setUserData({ ...userData, dataNascimento: text })} />

                        <Icon
                            name="calendar"
                            size={25}
                            color="#FCA311"
                            style={estilos.icon} />
                    </View>

                    <View style={estilos.inputContainer}>

                        <TextInput style={estilos.textInput}
                            placeholder="CPF"
                            keyboardType="numeric"
                            placeholderTextColor="white"
                            value={userData.cpf}
                            editable={editCpf}
                            onFocus={() => setEditCpf(true)} 
                            onBlur={() => setEditCpf(false)} 
                            onChangeText={(text) => setUserData({ ...userData, cpf: text })}
                            />

                        <Icon
                            name="file"
                            size={25}
                            color="#FCA311"
                            style={estilos.icon} />

                    </View>
                </View>


                <View>
                    <TouchableOpacity style={estilos.botao} onPress={salvarAlteracoes}>
                        <Text style={estilos.textoum} >ALTERAR</Text>
                    </TouchableOpacity>
                </View>


                <View>
                    <TouchableOpacity onPress={() => Alert.alert("em desenvolvimento")}>
                        <Text style={estilos.alteracaotext}>Alterar senha</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>


        </View>
    );
}


const estilos = StyleSheet.create({
    fundo: {
        height: "100%",
        backgroundColor: "black"
    },

    alinhamento: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 20,
    },

    seta: {
        width: 40,
        height: 40,
        marginLeft: 10,
    },

    formulario: {
        marginTop:-40,
    },

    textInput: {
        flexDirection: 'row',
        paddingLeft: 30,
        fontFamily: "MontSemiBold",
        color:"white",
    },
    inputContainer: {
        color: "white",
        backgroundColor: "#14213D",
        borderRadius: 20,
        marginHorizontal: 30,
        padding: 18,
        color: "white",
        marginBottom: 15,
        borderColor: "#FCA311",
        borderWidth: 1,

    },

    icon: {
        display: "flex",
        top: 20,
        left: 15,
        position: "absolute",

    },
    texto: {
        fontSize: 30,
        color: "white",
        textAlign: "center",
        marginTop: 25,
        paddingTop: 10,
        fontFamily: "MontSemiBold",
    },

    botao: {
        height: 60,
        marginTop: 5,
        backgroundColor: "#FCA311",
        borderRadius: 20,
        padding: 15,
        width: 180,
        alignSelf: "center",
        justifyContent: "space-between",
        alignItems: "center",

    },

    textoum: {
        color: "black",
        fontFamily: "MontSemiBold",
        alignSelf: "center",
        fontSize: 15,
        marginTop: 5,
        textAlign: "center",

    },
    alteracaotext: {
        fontSize: 12,
        color: "white",
        textAlign: "center",
        textDecorationLine: "underline",
        top: 20,

    },
    LapisPerfil: {
        height: 30,
        width: 30,
        left: 250,
        top: -30,
        position: "relative",

    },


    LapisBanner: {
        height: 30,
        width: 30,
        top: -40,
        left: 370,
    },

    banner: {
        width: '100%',
        height: 180,
        marginTop: 20,
        position: "relative",

    },
    profileImage: {
        width: 140,
        height: 140,
        borderRadius: 100,
        marginTop: -85,
        left: 140,
        position: 'relative'

    },
})

export default MenuConfig;




