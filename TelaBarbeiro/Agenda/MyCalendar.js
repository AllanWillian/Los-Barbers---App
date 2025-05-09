import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StatusBar, StyleSheet, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import { LocaleConfig } from 'react-native-calendars';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { useNavigation } from "@react-navigation/native";
import database from '../../firebase/database';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, query, orderByChild, equalTo, get, child, update } from 'firebase/database';
import AwesomeAlert from "react-native-awesome-alerts";



export default function Teste() {
  const [data, setData] = useState({});
  const [selectedAgendamento, setSelectedAgendamento] = useState(null);
  const [alertSelected, setAlertSelected] = useState(false);


  const AlertSelected = () => {
      setAlertSelected(true);
  };
  const exitAlert = () => {
    setAlertSelected(false);
    setSelectedAgendamento(null);
    navigator.navigate("Menu")
  }
  const enterAlert = () => {
    setAlertSelected(false);
  };
  const handleAgendamentoSelecionado = (agendamento) => {
  setSelectedAgendamento(agendamento);
};
  

  const updateAgendamentoStatus = async (agendamentoId,novoStatus) => {
    try {

      const db = getDatabase();
      const agendamentosRef = ref(db, `agendamentos/${agendamentoId}`);

      console.log(agendamentoId);
  
      await update(agendamentosRef, { status: novoStatus });
      console.log('Status do agendamento atualizado com sucesso.');
    } catch (error) {
      console.error('Erro ao atualizar o status do agendamento:', error);
    }
  };

  const fetchAgendamentos = async () => {
    try {
      console.log("Iniciando busca de agendamentos no banco de dados...");
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        return;
      }
  
      const userId = user.uid;
      console.log('ID do Usuário:', userId);
  
      const db = getDatabase();
      const usersRef = ref(db, 'users'); // Referência para os usuários
      const barbeariaId = userId;
      console.log('ID da Barbearia:', barbeariaId);
  
      const agendamentosRef = ref(db, 'agendamentos');
      const userAgendamentosQuery = query(
        agendamentosRef,
        orderByChild('barberia/id'), // Certifique-se de que 'barberia/id' é o caminho correto
        equalTo(barbeariaId)
      );
  
      const snapshot = await get(userAgendamentosQuery);
      console.log('Agendamentos:', snapshot.val());
      const formattedData = {};
  
      if (snapshot.exists()) {
        const agendamentos = [];
        snapshot.forEach(childSnapshot => {
          const agendamento = childSnapshot.val();
          const agendamentoDate = agendamento.data.substring(0, 10);
  
          // Adiciona a data de marcação
          agendamento.dataMarcacao = agendamento.createdAt || ''; // Substitua com a propriedade correta que representa a data de marcação
  
          agendamentos.push(agendamento);
        });
  
        // Ordena os agendamentos primeiro por data de marcação e depois por horário
        agendamentos.sort((a, b) => {
          const dataA = new Date(a.dataMarcacao);
          const dataB = new Date(b.dataMarcacao);
  
          if (dataA < dataB) return -1;
          if (dataA > dataB) return 1;
  
          // Se as datas de marcação forem iguais, ordena por horário
          return a.horario.localeCompare(b.horario);
        });
  
        for (const agendamento of agendamentos) {
          const agendamentoDate = agendamento.data.substring(0, 10);
  
          if (!formattedData[agendamentoDate]) {
            formattedData[agendamentoDate] = [];
          }
  
          // Obtenha os dados do usuário associado ao agendamento
          const userId = agendamento.userId;
          const userSnapshot = await get(child(usersRef, userId));
          const userData = userSnapshot.val();
  
          formattedData[agendamentoDate].push({
            nome: `Cliente: ${userData.nome}`,
            horario: `Horário: ${agendamento.horario}`,
            servicos: `Serviços: ${agendamento.servicos.map(servico => `${servico.servico}\nValor a Receber: R$ ${servico.valor}`).join('\n')}`,
            barbeiro: `Barbeiro: ${agendamento.barbeiro}`,
            id: agendamento.id,
            status: `Status: ${agendamento.status}`,
          });
        }
      }
  
      setData(formattedData);
    } catch (error) {
      console.log('Erro ao buscar agendamentos:', error.message);
    }
  };
  
  useEffect(() => {
    fetchAgendamentos();
  }, []);


  const navigator = useNavigation();
  function Menu() {
      return navigator.navigate("Menu")
  }


  const [year, setYear] = useState(new Date().getFullYear());
  const onPressNextYear = () => {
    setYear(year - 1);
  };

  const minDate = new Date(`${year}-01-01`);
  const maxDate = new Date(`${year}-12-31`);



  const customTheme = {
    backgroundColor: 'black', // cor de fundo personalizada
    calendarBackground: 'black', // cor de fundo do calendário
    textSectionTitleColor: 'white', // cor do título da seção de texto
    selectedDayBackgroundColor: '#FCA311', // cor de fundo do dia selecionado
    selectedDayTextColor: 'white', // cor do texto do dia selecionadoa
    todayTextColor: '#FCA311', // cor do texto do dia atual
    dayTextColor: 'white', // cor do texto do dia
    textDisabledColor: '#d9dbe0', // cor do texto desabilitado
    dotColor: '#FCA311', // cor do ponto
    selectedDotColor: 'white', // cor do ponto selecionado
    arrowColor: 'orange', // cor das setas de navegação
    monthTextColor: '#FCA311', // cor do texto do mês
    textDayFontFamily: 'MontSemiBold',
    textDayFontColor: 'black',
    textMonthFontFamily: 'MontSemiBold', // fonte do texto do mês
    textDayHeaderFontFamily: 'MontSemiBold', // fonte do cabeçalho do dia
    textDayFontSize: 16, // tamanho do texto do dia
    textMonthFontSize: 16, // tamanho do texto do mês
    textDayHeaderFontSize: 13, // tamanho do cabeçalho do dia

  };
  const listTheme = () => {
    return (<View style={estilo.emptyDataContainer}>
      <Text style={{
        fontFamily: "MontSemiBold",
        fontSize: 20,
        textAlign: "center",
        marginTop: 20,
        color: "red"
      }}>Nenhum evento neste dia</Text>
    </View>
    )
  };

  const [fonteCarregada] = useFonts({
    "MontRegular": Montserrat_400Regular,
    "MontMedium": Montserrat_500Medium,
    "MontSemiBold": Montserrat_600SemiBold,
    "MontBold": Montserrat_700Bold
  });

  if (!fonteCarregada) {
    return null;
  }

  LocaleConfig.locales['pt-br'] = {
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    monthNamesShort: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
    dayNames: [
      'D',
      'S',
      'T',
      'Q',
      'Q',
      'S',
      'S',
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: 'Hoje',
  };

  LocaleConfig.defaultLocale = 'pt-br';

  return (
    <View style={{ backgroundColor: 'black', height: '100%' }}>
    <StatusBar />
    <View style={estilo.fundo}>
        <Agenda
          style={{ height: 900 }}
          theme={customTheme}
          items={data} 
          locale="pt-br"
          renderEmptyData={listTheme}
          renderItem={(item, firstItemInDay) => {
            console.log('Item a ser renderizado:', item); // Adicione esta linha para ver os detalhes do item na console
            return (
              <TouchableOpacity onPress={() => {
                setSelectedAgendamento(item);
                setAlertSelected(true);
              }} style={{
                backgroundColor: firstItemInDay ? "#FCA311" : "#FCA311",
                padding: 10,
                margin: 5,
                borderRadius: 15,
              }}>
                <Text style={estilo.textos}>{item.nome}</Text>
                <Text style={estilo.textos}>{item.horario}</Text>
                <Text style={estilo.textos}>{item.servicos}</Text>
                <Text style={estilo.textos}>{item.barbeiro}</Text>
                <Text style={[estilo.textos, { color: item.status === 'Cancelado' ? 'red' : item.status === 'Finalizado' ? 'green' : 'black' }]}>
                  {item.status}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

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
          title="Seu agendamento foi?"
          titleStyle={{
            fontFamily: 'MontSemiBold',
            fontSize: 18,
            color: "white",
            textAlign: "justify",
            marginHorizontal: -100,
          }}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Cancelado"
          confirmText="Finalizado"
          confirmButtonStyle={{
            borderColor:"green",
            borderWidth:1, 
            borderRadius:6,
            backgroundColor:'green',}}
          cancelButtonStyle={{ 
          borderColor:"red",
          borderWidth:1, 
          borderRadius:6,
          backgroundColor:'red',}}
          confirmButtonTextStyle={{
            fontSize: 18,
            fontFamily: "MontSemiBold",
          }}
          cancelButtonTextStyle={{
            fontSize: 18,
            fontFamily: "MontSemiBold"
          }}
          onCancelPressed={() => {
            enterAlert();
            if (selectedAgendamento && selectedAgendamento.id) {
              updateAgendamentoStatus(selectedAgendamento.id, 'Cancelado');
            }
          }}
          onConfirmPressed={() => {
            enterAlert();
            if (selectedAgendamento) {
              updateAgendamentoStatus(selectedAgendamento.id, "Finalizado");
            }
          }}
        />
      </View>
    </View>
  );
}

const estilo = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: "black",
  },
  textos: {
    fontFamily: "MontSemiBold",
  },



})