import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image, Dimensions, Modal, ScrollView } from "react-native";
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-br');
import Swiper from "react-native-swiper";
import seta from "../../assets/arrow.png";
import icon from "../../assets/icon_barber.png";
import database from '../../firebase/database';
import { get, ref, child, query, orderByChild, equalTo} from 'firebase/database';
import { getAuth } from 'firebase/auth';

function chunkArray(arr, chunkSize) {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        chunkedArray.push(arr.slice(i, i + chunkSize));
    } return chunkedArray;
}
const largura = Dimensions.get("screen").width;
const Separator = () => {
    return <View style={styles.linha} />;
}

const AgendaBarber = () => {
    const [showModal, setshowModal] = useState(false);
    const [teste, setTeste] = useState(null);
    const [selectedBarber, setSelectedBarber] = useState(null);
    const [selectedBarbearia, setSelectedBarbearia] = useState(null);
    const [barbeariasVinculadas, setBarbeariasVinculadas] = useState([]);
    const [barbeiros, setBarbeiros] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedDayOfWeek, setSelectedDayOfWeek] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectNoDate, setSelectNoDate] = useState(false);
    const [selectedTime, setSelectedTime] = useState('');
    const [horariosAgendados, setHorariosAgendados] = useState(null);

    const onDateSelected = async (date) => {
        setSelectedDate(date);
        const selectedDateString = moment(date).format('dddd');
        setSelectedDayOfWeek(selectedDateString);
        if (selectedBarbearia) {
            const configAgendaData = await fetchConfigAgenda(selectedBarbearia.id);
            const agendamentos = await getAgendamentosDaBarbearia(selectedBarbearia.id);
            const horariosAgendados = agendamentos.map((agendamento) => agendamento.horario);
            setHorariosAgendados(horariosAgendados);  // Atualize os horários agendados
            const availableTimesForDay = getAvailableTimes(selectedDateString, configAgendaData, selectedTime, horariosAgendados);
            setAvailableTimes(availableTimesForDay);
        }
    };
    

    const isDayAvailable = (selectedDay, configAgendaData) => {
        const allowedDays = [
            configAgendaData.selectedDay,
            configAgendaData.selectedDay1,
        ];
        return allowedDays.includes(selectedDay);
    };

    const generateWeekDays = (configAgendaData) => {
        const selectedDay = configAgendaData.selectedDay;
        const selectedDay1 = configAgendaData.selectedDay1;
        const days = [];
        if (selectedDay && selectedDay1) {
            const start = moment().day(selectedDay);
            const end = moment().day(selectedDay1);
            for (let day = start; day <= end; day.add(1, 'days')) {
                days.push(day.format('dddd'));
            }
        }
        return days;
    };

    const onCalendarPress = () => {
        setSelectNoDate(false);
    };
    const locale = {
        name: moment.locale(),
        config: moment.localeData()
    };
    const fechaModal = () => {
        setshowModal(false);
    }
    //----------------------------------------- API CONFIG BARBEARIA ------------------------------------
    useEffect(() => {
        const getUserData = async () => {
            try {
                const auth = getAuth();
                const user = auth.currentUser;
                if (user) {
                    const userId = user.uid;
                    const dbRef = ref(database, `users/${userId}/barbeariaVinculadas`);
                    const snapshot = await get(child(dbRef, '/'));
                    if (snapshot.exists()) {
                        const barbearias = [];
                        snapshot.forEach((childSnapshot) => {
                            const key = childSnapshot.key;
                            const data = childSnapshot.val();
                            barbearias.push({ id: key, ...data, });
                        });
                        setBarbeariasVinculadas(barbearias);
                    } else {
                        setBarbeariasVinculadas([]);
                    }
                } else {
                    console.warn('Usuário não autenticado');
                }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
            }
        };
        getUserData();
    }, []);

    // ----------------------------------- API CONFIG BARBEIROS ---------------------------------------------
    const handleBarbeariaSelection = async (barbearia) => {
        console.log('Selecionou a barbearia:', barbearia.nomeBarbearia);
        setSelectedBarbearia(barbearia);
        const usersRef = ref(database, `users/${barbearia.id}/config/`);
        const snapshot = await get(usersRef);
        if (snapshot.exists()) {
            const userData = snapshot.val();
            const configEquipe = userData.configEquipe || {};
            const selectedDay = configEquipe.selectedDay || '';
            setSelectedDayOfWeek(selectedDay);
            const barbeiros = [];
            const equipeConfig = configEquipe || {};
            Object.keys(equipeConfig).forEach((key) => {
                const userData = equipeConfig[key];
                barbeiros.push(userData);
            });
            setBarbeiros(barbeiros);
            setSelectedBarber(null);
        };
    }
    // ------------------------------------------ API CONFIG AGENDA -----------------------------------------------
    const fetchConfigAgenda = async (barbeariaId) => {
        try {
            const configAgendaRef = ref(database, `users/${barbeariaId}/config/configAgenda/`);
            const agendaSnapshot = await get(configAgendaRef);
            if (agendaSnapshot.exists()) {
                const configAgendaData = agendaSnapshot.val();
                // console.log('Dados de configAgenda:', configAgendaData);
                return configAgendaData;
            } else {
                console.log('Nenhuma configuração de agenda encontrada.');
                return null;
            }
        } catch (error) {
            console.error('Erro ao buscar configuração de agenda:', error);
            return null;
        }
    };

    const getAvailableTimes = (selectedDay, configAgendaData, selectedTime, horariosAgendados) => {
        if (!selectedDay || !configAgendaData) {
            console.log('Nenhuma barbearia selecionada ou dia da semana definido.');
            return [];
        }
    
        const availableDays = generateWeekDays(configAgendaData);
        let availableTimes = [];
    
        if (availableDays.includes(selectedDay)) {
            const isWeekend = selectedDay.toLowerCase() === 'sábado' || selectedDay.toLowerCase() === 'domingo';
            const startTimeKey = isWeekend ? 'hrFinalSemana' : 'hrSemana';
            const endTimeKey = isWeekend ? 'hrFinalSemana2' : 'hrSemanaFinal';
    
            const startTime = configAgendaData[startTimeKey];
            const endTime = configAgendaData[endTimeKey];
    
            const startHour = parseInt(startTime.split(':')[0]);
            const endHour = parseInt(endTime.split(':')[0]);
    
            for (let hour = startHour; hour <= endHour; hour++) {
                const time = `${hour.toString().padStart(2, '0')}:00`;
                if (time !== selectedTime && !horariosAgendados.includes(time)) {
                    availableTimes.push(time);
                }
            }
            
            console.log('Horários disponíveis:', availableTimes);
        } else {
            console.log('Dia selecionado não corresponde às configurações.');
        }
    
        return availableTimes;
    };
    
    const handleTimeSelection = (time, isTimeSelected) => {
        setSelectedTime(time);
    
        if (isTimeSelected) {
            setAvailableTimes(prevAvailableTimes => prevAvailableTimes.filter(availableTime => availableTime !== time));
        }
    };
    const getAgendamentosDaBarbearia = async (barbeariaId) => {
        try {
            console.log('ID da Barbearia:', barbeariaId);
          const agendamentosRef = ref(database, 'agendamentos');
          const agendamentosQuery = query(
            agendamentosRef,
            orderByChild('barberia'),
          );
          const snapshot = await get(agendamentosQuery);
          console.log('Snapshot dos agendamentos:', snapshot.val());
          const horariosAgendados = [];
          if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const agendamento = childSnapshot.val();
                console.log('Agendamento encontrado:', agendamento); 
                const data = agendamento.data;
                const horario = agendamento.horario;
                horariosAgendados.push({ data, horario });
            });
        }
          console.log('Datas e horários dos agendamentos:', horariosAgendados);
          return horariosAgendados;
        } catch (error) {
          console.error('Erro ao buscar os agendamentos:', error);
          throw error;
        }
      };
    //--------------------- ROTAS -------------------------
    const navigation = useNavigation();
    const navigateToAgendaFinal = () => {
        if (selectedBarber && selectedBarber.name) {
          navigation.navigate("AgendaFinal", {
            selectedBarbeariaId: selectedBarbearia.id,
            selectedBarbearia,
            selectedBarber: selectedBarber.name, 
            selectedDate: selectedDate.toISOString(),
            selectedTime: selectedTime,
          });
        } else {
          console.error('Erro: Nome do barbeiro não definido.');
        }
      };
    
    function MenuCliente() {
        return navigation.navigate("MenuCliente")
    }
    //--------------- FONTES ---------------------------------
    const [fonteCarregada] = useFonts({
        "MontRegular": Montserrat_400Regular,
        "MontMedium": Montserrat_500Medium,
        "MontSemiBold": Montserrat_600SemiBold,
        "MontBold": Montserrat_700Bold,
    });
    if (!fonteCarregada) { return null; }
   

    return (
        // ----------------------------------------------- AGENDAMENTO FRONT END ----------------------------------------- 
        <View style={{ flex: 1, backgroundColor: "black", }}>
            <View >
                <View style={{ height: 750, width: 350, alignSelf: "center", }}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate("MenuCliente")}>
                            <Image source={seta} style={{ width: 40, height: 30, top: 20, }} />
                        </TouchableOpacity>
                        <Text style={styles.titulo}>Escolha a sua Barbearia:</Text>
                    </View>
                    <Swiper
                        showsButtons={true}
                        showsPagination={true}
                        buttonWrapperStyle={styles.seta}>
                        {barbeariasVinculadas.map(barbearia => {
                            return (
                                <TouchableOpacity
                                    style={styles.slide}
                                    key={barbearia.id}
                                    onPress={() => {
                                        setshowModal(true);
                                        handleBarbeariaSelection(barbearia);
                                    }}>
                                    <Text style={{ color: "black", fontFamily: "MontSemiBold", fontSize: 30, marginTop: 120 }}>{barbearia.nomeBarbearia}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </Swiper>
                </View>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
                onRequestClose={fechaModal}>
                <View style={styles.modal}>
                    <Text style={styles.tituloModal}>Escolha o Barbeiro:</Text>
                    <Swiper
                        style={styles.swiper}
                        showsButtons={false}
                        showsPagination={false}
                        autoplay={false}
                        loop={false}>
                        {barbeiros.map((barbeiro) => (
                            <View key={barbeiro.id}>
                               <TouchableOpacity
                                    onPress={() => {
                                        setSelectedBarber(barbeiro);
                                        console.log('Barbeiro selecionado:', barbeiro.name);
                                    }}
                                    style={[
                                        styles.slideModal,
                                        selectedBarber === barbeiro && styles.selectedSlide,
                                    ]}>
                                    <Image source={icon} style={styles.slideIcon} />
                                    <Text style={styles.descBarberModal}>{barbeiro.name}</Text>
                                </TouchableOpacity>


                            </View>
                        ))}
                    </Swiper>
                    <View>
                        <View style={{ height: 500 }}>
                            <Separator />
                            <CalendarStrip
                                selectedDate={selectedDate}
                                onDateSelected={onDateSelected}
                                onHeaderPressed={onCalendarPress}
                                calendarColor={'black'}
                                calendarHeaderStyle={{ color: 'white', fontFamily: "MontBold", textTransform: 'uppercase', fontSize: 18, }}
                                calendarAnimation={{ type: 'sequence', duration: 10 }}
                                daySelectionAnimation={{
                                    type: 'background',
                                    duration: 200,
                                    highlightColor: '#FCA311',
                                }}
                                style={{ height: 150, paddingTop: 20, paddingBottom: 10, bottom: 75 }}
                                calendarHeaderContainerStyle={{ marginBottom: 2 }}
                                dateNumberStyle={{ color: 'white', fontFamily: "MontSemiBold" }}
                                dateNameStyle={{ color: 'white', fontFamily: "MontSemiBold", fontSize: 15 }}
                                highlightDateNumberStyle={{ color: 'white' }}
                                highlightDateNameStyle={{ color: 'white' }}
                                disabledDateNameStyle={{ color: 'gray' }}
                                disabledDateNumberStyle={{ color: 'gray' }}
                                locale={locale}
                                iconContainer={{
                                    flex: 0.1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                }}
                                iconStyle={{
                                    width: 20,
                                    height: 20,
                                    tintColor: 'white',
                                }}
                            />
                            <Separator />
                        </View>
                    </View>
                    <View>
                        <View style={{
                            backgroundColor: "#14213D",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            alignItems: "center",
                            position: "absolute",
                            paddingVertical: 29,
                            width: 410,
                            height: 380,
                            bottom: 0,
                        }}>
                            <View>
                                <Text style={styles.tituloHora}>Horários Disponíveis</Text>
                            </View>
                            {chunkArray(availableTimes, 4).map((timeGroup, index) => (
                                <View key={index} style={{ flexDirection: 'row' }}>
                                    {timeGroup.map((time) => (
                                        <TouchableOpacity
                                            key={time}
                                            style={[
                                                styles.btnHora,
                                                selectedTime === time && styles.selectedBtnHora,
                                                horariosAgendados && horariosAgendados.includes(time) && styles.agendadoBtnHora, // Adicionado esta linha
                                            ]}
                                            onPress={() => { handleTimeSelection(time); }}>
                                            <Text style={styles.textHora}>{time}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ))}
                            <TouchableOpacity style={styles.botaoConfirma} onPress={navigateToAgendaFinal}>
                                <Text style={styles.btnConfirma}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default AgendaBarber;

const styles = StyleSheet.create({

    titulo: {
        fontFamily: "MontBold",
        fontSize: 20,
        color: "white",
        textAlign: 'left',
        top: 75,
        marginLeft: 4,
    },
    slide: {
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 5,
        marginLeft: 50,
        marginRight: 50,
        alignItems: "center",
        top: 190,
    },
    seta: {
        backgroundColor: "FCA311",
    },
    imgs: {
        width: "100%",
        height: 2300 / 3500 * largura,
        alignItems: "center",
    },
    modal: {
        backgroundColor: "black",
        flex: 1,
    },
    tituloModal: {
        fontFamily: "MontSemiBold",
        fontSize: 20,
        color: "white",
        marginLeft: 30,
        marginTop: 40,
    },
    tituloHora: {
        color: "white",
        fontFamily: "MontSemiBold",
        marginBottom: 20,
        fontSize: 18,
    },
    slideModal: {
        backgroundColor: '#7B7B77',
        borderRadius: 25,
        marginLeft: 150,
        marginRight: 150,
        alignItems: "center",
        top: 40,
    },
    slideIcon: {
        width: 90,
        height: 90,
        alignItems: "center",
    },
    selectedSlide: {
        backgroundColor: "#FCA311",
    },
    descBarberModal: {
        color: 'white',
        fontFamily: "MontBold",
        fontSize: 10,
        textAlign: 'center',
        bottom: 20,
    },
    linha: {
        marginVertical: 5,
        marginHorizontal: 40,
        borderTopColor: "#FCA311",
        borderWidth: 2,
        bottom: 75,
    },
    btnHora: {
        borderColor: "#fca311",
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        height: 40,
        margin: 5,
    },
    selectedBtnHora: {
        backgroundColor: "#FCA311",
    },
    textHora: {
        color: "white",
        fontFamily: "MontSemiBold"
    },
    botaoConfirma: {
        marginTop: 30,
    },
    btnConfirma: {
        backgroundColor: "#FCA311",
        color: "white",
        fontFamily: "MontSemiBold",
        fontSize: 15,
        paddingLeft: 50,
        paddingRight: 50,
        padding: 9,
        borderRadius: 7,
    },
    slide: {
        backgroundColor: "white",
        borderRadius: 25,
        width: 250,
        height: 300,
        marginLeft: 50,
        marginRight: 50,
        alignItems: "center",
        top: 190,
    },
    mensagemNaoDisponivel: {
        color: "red",
        fontSize: 20,
        fontFamily: "MontBold",
    }
});