import React, {useState,useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import QRCode from 'react-native-qrcode-svg'
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

import logo from "../../assets/los.png";
import seta from "../../assets/arrow.png";



export default function Barber() {

    const auth = getAuth();
    const user = auth.currentUser;
    const db = getDatabase();
    const [barbeariaNome, setBarbeariaNome] = useState("");

  useEffect(() => {
    if (user) {
      const userId = user.uid;
      const userRef = ref(db, `users/${userId}/nomeBarbearia`);

      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setBarbeariaNome(snapshot.val());
          } else {
            console.log("O nó 'nomeBarbearia' não foi encontrado no banco de dados.");
          }
        })
        .catch((error) => {
          console.error("Erro ao recuperar o nome da barbearia:", error);
        });
    }
  }, [user, db]);

    const barbeiroData = {
        id: user ? user.uid : "",
        nomeBarbearia: barbeariaNome, 
    };

    const navigator = useNavigation();

    function Menu() {
        return navigator.navigate("Menu")
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
        <View style={estilo.fundo}>
                <TouchableOpacity onPress={() => navigator.navigate('Menu')}>
                    <Image source={seta} style={estilo.seta}></Image>
                </TouchableOpacity>
            <View>
                <Text style={estilo.titulo}> MINHA BARBEARIA</Text>
            </View>
            {/* ---------------------- QR CODE --------------------------------*/}

            <View style={estilo.qrCode}>
                <QRCode
                    value={JSON.stringify(barbeiroData)}
                    size={300} 
                    color="black" 
                    backgroundColor="white"
                />
            </View>
            {/* ---------------------- QR CODE --------------------------------*/}

            <View>
                <TouchableOpacity style={estilo.button}>
                    <Text style={{ textAlign: "center", color: "black", fontFamily: "MontBold", }}> Copiar QR Code</Text>
                </TouchableOpacity>
            </View>

            <Text style={estilo.descricao}>
                Peça ao seu cliente para scanear o Qr Code para realizar o vinculo da barbearia.
            </Text>

        </View>
    )
}

const estilo = StyleSheet.create({
    fundo: {
        backgroundColor: "black",
        height: "100%",
    },

 
    seta: {
        width: 40,
        height: 40,
        marginLeft: 10,
    },
    titulo: {
        color: 'white',
        fontSize: 30,
        textAlign: "center",
        marginTop: 50,
        fontFamily: "MontBold",
    },
    qrCode: {
        alignItems: "center",
        margin:55,
    
    },
    button: {
        backgroundColor: "#ffa500",
        width: '40%',
        padding: 10,
        borderRadius: 20,
        alignSelf: "center",
        marginLeft: 10,
    },
    descricao: {
        marginTop: 25,
        textAlign: "center",
        color: "white",
        marginHorizontal: 25,
        fontFamily: "MontSemiBold"

    },
})