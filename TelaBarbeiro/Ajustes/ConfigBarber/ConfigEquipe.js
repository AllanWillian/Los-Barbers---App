import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image, KeyboardAvoidingView, Modal, TextInput} from "react-native";
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import Swiper from "react-native-swiper";
import cruz from "../../../assets/cruz.png";
import Icon from "react-native-vector-icons/FontAwesome";
import iconBarber from "../../../assets/icon_barber.png";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, update, get } from 'firebase/database';


const ConfigEquipe = () => {
  const [user, setUser] = useState(null);
  const [barbers, setBarbers] = useState([]);
  const [name, setName] = useState('');
  const [barberId, setBarberId] = useState('');
  const [showModal, setShowModal] = useState(false);

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
      const userRef = ref(db, `users/${user.uid}/config/configEquipe`);

      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const barbersData = Object.values(data);
          setBarbers(barbersData);
        }
      }).catch((error) => {
        console.error('Erro ao buscar dados do Firebase: ', error);
      });
    }
  }, [user]);


  const handleAddAndSaveBarber = () => {
    if (name && barberId) {
      saveBarberToFirebase({ name, barberId }); 
    }
  };

  const saveBarberToFirebase = (barber) => {
    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}/config/configEquipe`);

     
      const barberData = {
        [generateRandomId()]: {
          name: barber.name,
          id: barber.barberId,
        },
      };

      update(userRef, barberData)
        .then(() => {
          console.log('Barbeiro salvo com sucesso!');
          setBarbers([...barbers, barber]); 
          setName('');
          setBarberId('');
          setShowModal(false);
        })
        .catch((error) => {
          console.error('Erro ao salvar barbeiro: ', error);
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
  const navigator = useNavigation();
  function HomeBarber() {
    return navigator.navigate("HomeBarber")
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
    <View style={{ flex: 1, backgroundColor: "black" }}>
    <Modal visible={showModal} transparent animationType='slide'>
      <KeyboardAvoidingView style={styles.keyboardAvoidingContainer} behavior='padding'>
        <View style={styles.fundoModal}>
          <View style={styles.modalContainer}>
            <View>
              <TouchableOpacity style={styles.btnfechaModal} onPress={() => setShowModal(false)}>
                <Text style={styles.fechaModalText}>X</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.tituloModal}>Dados do colaborador:</Text>
            <View>
              <TextInput
                placeholder="Nome do Barbeiro"
                placeholderTextColor="gray"
                style={styles.inputText}
                value={name}
                onChangeText={(text) => setName(text)}
              />
              <TextInput
                placeholder="ID do Barbeiro"
                placeholderTextColor="gray"
                style={styles.inputText}
                value={barberId}
                onChangeText={(text) => setBarberId(text)}
              />
              <TouchableOpacity style={styles.btnSalvarModal} onPress={handleAddAndSaveBarber}>
                <Text style={styles.textSalvarModal}>Adicionar e Salvar Barbeiro</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>


    <View>
      <View style={{ height: 750, width: 350, alignSelf: "center", }}>
        <View>
          <Text style={styles.titulo}>EQUIPE</Text>
        </View>
        <TouchableOpacity onPress={() => navigator.navigate("HomeBarber")}>
        <Icon name="chevron-left" size={50} style={styles.seta}></Icon>
          </TouchableOpacity>

        <Swiper
          showsButtons={true}
          showsPagination={false}
          loop={false}
        >
          {barbers.map((barber, index) => (
            <View key={index} style={styles.slide}>
              <Image source={iconBarber} style ={styles.imgs}></Image>
              <Text style={styles.text2}>{barber.name}</Text>
              <Text style={styles.text3}>ID: {barber.id}</Text>
            </View>
          ))}
        </Swiper>

        <View>
        <TouchableOpacity style={styles.btnSwiper} onPress={() => setShowModal(true)}>
          <Text style={styles.text}>Adicionar Barbeiro</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

};
export default ConfigEquipe;




const styles = StyleSheet.create({

  titulo: {
    fontFamily: "MontBold",
    fontSize: 29,
    color: "white",
    textAlign: 'center',
    top: 90,

  },
  botao: {
    backgroundColor: "#FCA311",
    borderRadius: 15,
    padding: 15,
    bottom: 20,
    marginHorizontal: 15,


  },
  text: {
    fontFamily: "MontBold",
    fontSize: 20,
    color: "white",
    textAlign: 'center',
    top: 20,
  },
  text2: {
    fontFamily: "MontBold",
    fontSize: 20,
    color: "white",
    textAlign: 'center',
    bottom:30,
  },
  text3: {
    fontFamily: "MontBold",
    fontSize: 10,
    color: "white",
    textAlign: 'center',
    bottom:30,
  },

  textobotao: {
    fontSize: 20,
    color: "white",
    textAlign: 'center',
    borderRadius: 30,
    fontFamily: "MontSemiBold"

  },

  slide: {
    backgroundColor: '#7B7B77',
    borderRadius: 25,
    padding: 5,
    marginLeft: 50,
    marginRight: 50,
    alignItems: "center",
    top: 190,
  },

  seta: {
    marginLeft: -3,
    top:-7,
    color: "white",
},

  imgs: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginTop: 20
  },
  btnSwiper: {
    alignSelf: "center",
    backgroundColor: "#FCA311",
    width: 250,
    height: 70,
    borderRadius: 15,
    bottom:30,
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
keyboardAvoidingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 350,
},


});