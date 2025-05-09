import React, { useState, useEffect} from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import moment from 'moment';
import { push, ref, set, get } from 'firebase/database';
import database from "../../firebase/database";
import { getAuth } from "firebase/auth";
import AwesomeAlert from "react-native-awesome-alerts";


import seta from "../../assets/arrow.png";


const AgendaFinal = () => {
    const route = useRoute();
    const { selectedDate } = route.params;
    const parsedDate = moment(selectedDate).toDate();    
    // console.log('route.params', route.params)

    const navigator = useNavigation();
    function MenuCliente() {
        return navigator.navigate("MenuCliente")
    }
    function Historico() {
        return navigator.navigate("Historico")
    }


    const [alertSelected, setAlertSelected] = useState(false);
    const AlertSelected = () => {
        setAlertSelected(true);
    };
    const exitAlert = () => {
        setAlertSelected(false)
        navigator.navigate("MenuCliente")
    }
    const enterAlert = () => {
        setAlertSelected(false)
        navigator.navigate("Historico")
    }



    // ______________________________STATES PARA GUARDAR A SELEÇÃO DO USUARIO__________________________
    const [corteSelected, setCorteSelected] = useState(false);
    const [sobrancelhaSelected, setSobrancelhaSelected] = useState(false);
    const [selectedBarbeariaId, setSelectedBarbeariaId] = useState(null);
    const [barbaSelected, setBarbaSelected] = useState(false);
    const [personalizadosSelected, setPersonalizadosSelected] = useState(false);
    const [services, setServices] = useState([]);
    const [selectedServiceIds, setSelectedServiceIds] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [allServices, setAllServices] = useState([]);
    // _________________________________________________________________________________________________
    useEffect(() => {
        const fetchServicesForBarbearia = async (selectedBarbeariaId) => {
            try {
                const { selectedBarbeariaId } = route.params;
                console.log('Chamando fetchServicesForBarbearia');
                console.log('selectedBarbeariaId:', selectedBarbeariaId);
                console.log('Iniciando busca de serviços para a barbearia com ID:', selectedBarbeariaId);
                const servicesRef = ref(database, `users/${selectedBarbeariaId}/config/configServicos`);
                const servicesSnapshot = await get(servicesRef);

                if (servicesSnapshot.exists()) {
                    console.log('Dados de serviços encontrados no banco de dados.');
                    const servicesData = servicesSnapshot.val();

                    const servicesArray = Object.keys(servicesData).map((key) => {
                        return { id: key, ...servicesData[key] };
                    });

                    // Atualize a state de allServices com os serviços
                    setAllServices(servicesArray);
                } else {
                    console.log('Nenhum dado de serviços encontrado no banco de dados.');
                }
            } catch (error) {
                console.error('Erro ao buscar os serviços da barbearia:', error);
            }
        };
        fetchServicesForBarbearia(selectedBarbeariaId);
    }, [selectedBarbeariaId]);

     
    const toggleServiceSelection = (serviceId) => {
        const updatedIds = selectedServiceIds.includes(serviceId)
            ? selectedServiceIds.filter(id => id !== serviceId)
            : [...selectedServiceIds, serviceId];

        const updatedSelectedServices = allServices.filter(service => updatedIds.includes(service.id));

        setSelectedServiceIds(updatedIds);
        setSelectedServices(updatedSelectedServices);
    };
    
    

      const salvarServico = async () => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) {
                console.error('Usuário não autenticado!');
                return;
            }
            const userId = currentUser.uid;
            const customId = Date.now().toString();
    
            const {
                selectedBarbeariaId,
                selectedBarbearia,
                selectedBarber,
                selectedDate,
                selectedTime,
            } = route.params;
            {console.log(route.params);}
    
            const agendamentosRef = ref(database, 'agendamentos');
            const novoAgendamentoRef = push(agendamentosRef);

            const selectedServicesData = selectedServices.map(service => ({
                id: service.id,
                servico: service.servico,
                tempoGasto: service.tempoGasto,
                valor: service.valor,
            }));
            
            const agendamento = {
                id: customId,
                userId,
                barberia: selectedBarbearia,
                barbeiro: selectedBarber,
                data: selectedDate,
                horario: selectedTime,
                servicos: selectedServicesData,             };
            await set(ref(database, 'agendamentos/' + customId), agendamento);

            const handleAgendamentoConfirmado = () => {
                try {
                    // Obtém os horários disponíveis atuais
                    const horariosAtualizados = [...horariosDisponiveis];
                    
                    // Remove o horário selecionado da lista de horários disponíveis
                    const indexToRemove = horariosAtualizados.indexOf(selectedTime);
                    if (indexToRemove !== -1) {
                        horariosAtualizados.splice(indexToRemove, 1);
                        // Atualiza a state com os horários atualizados (removendo o horário selecionado)
                        setHorariosDisponiveis(horariosAtualizados);
                        console.log('Horário removido dos horários disponíveis.');
                    } else {
                        console.warn('O horário selecionado não está na lista de horários disponíveis.');
                    }
                } catch (error) {
                    console.error('Erro ao remover o horário dos horários disponíveis:', error);
                }
            };
            console.log('Agendamento salvo com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar o serviço selecionado:', error);
        }
    };

  

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
        <View style={styles.fundo}>
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
                title="Agendamento Confirmado "
                message="Conferir seu agendamento?"
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
            <View>
            <Image source={seta} style={styles.seta}></Image>
            <Text style={styles.titulo}>Escolha os serviços:</Text>
            </View>
            <ScrollView>
                {allServices.map((service) => (
                    <View key={service.id}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => toggleServiceSelection(service.id)}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <BouncyCheckbox
                                    isChecked={selectedServiceIds.includes(service.id)}
                                    onPress={() => toggleServiceSelection(service.id)}
                                />
                                <Text style={styles.tituloBtn}>{service.servico}</Text>
                            </View>
                            <Text style={styles.descricaoBtn}>{`${service.tempoGasto} min - R$ ${service.valor}`}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity
            style={{ bottom:50,}}
                    onPress={() => {
                        setAlertSelected(true);
                        salvarServico();
                    }}
                >
                    <Text style={styles.btnAgendar}>AGENDAR</Text>
                </TouchableOpacity>
        </View>
    );
};

export default AgendaFinal;

const styles = StyleSheet.create({
    fundo: {
        backgroundColor: "black",
        flex: 1,
    },
    seta: {
        width: 30,
        height: 40,
        left: 20,
        marginTop: 20,
    },
    titulo: {
        color: "white",
        fontFamily: "MontSemiBold",
        fontSize: 20,
        marginLeft: 55,
        marginTop: 20,
        marginBottom: 20,
    },
    btn: {
        borderWidth: 1,
        borderColor: "#fca311",
        borderRadius: 30,
        marginHorizontal: 50,
        marginTop: 30,
        padding: 40,
    },
    tituloBtn: {
        color: "white",
        fontSize: 20,
        fontFamily: "MontSemiBold"
    },
    descricaoBtn: {
        color: "#7B7B77",
        fontFamily: "MontRegular",
        marginLeft: 40,
        marginTop: 5
    },
    checkBox: {

    },

    btnAgendar: {
        backgroundColor: "#FCA311",
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 90,
        textAlign: "center",
        color: "white",
        fontFamily: "MontSemiBold",
        fontSize: 15,
       
    },
});