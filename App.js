import React, { Component } from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';

// __________________________________ TELA_BARBEIRO__________________________________________________
import MyCalendar from './TelaBarbeiro/Agenda/MyCalendar';
import Login from './Login/Login';
import Cadastro from './Login/Cadastro';
import CadastroCliente from './Login/cadastroCliente';
import CadastroBarbeiro from './Login/cadastroBarbeiro';
import Menu from './TelaBarbeiro/Menu/Menu';
import Home from './TelaBarbeiro/Ajustes/componentes/Home';
import Barber from './TelaBarbeiro/Barbearia/Barber';
import Rotas from './TelaBarbeiro/Relatorio/rotas';
import Conta from './TelaBarbeiro/Ajustes/componentes/Conta';
import Senha from './TelaBarbeiro/Ajustes/componentes/Conta';
import Suporte from './TelaBarbeiro/Ajustes/componentes/Suporte';
import ConfigAgenda from './TelaBarbeiro/Ajustes/componentes/ConfigAgenda'
import HomeBarber from './TelaBarbeiro/Ajustes/ConfigBarber/HomeBarber';
import ConfigServico from './TelaBarbeiro/Ajustes/ConfigBarber/ConfigServico';
import ConfigEquipe from './TelaBarbeiro/Ajustes/ConfigBarber/ConfigEquipe';
import Pagamento from './TelaBarbeiro/Ajustes/ConfigBarber/Pagamento';

// __________________________________ TELA_CLIENTE__________________________________________________
import MenuCliente from './TelaCliente/MenuCliente/MenuCliente';
import Barbearias from './TelaCliente/Barbearias/barbearias';
import AgendaBarber from './TelaCliente/Agendamento/AgendaBarber';
import AgendaFinal from './TelaCliente/Agendamento/AgendaFinal';
import Historico from './TelaCliente/Historico/historico';
import MenuConfig from './TelaCliente/Configuracao/MenuConfig';
import Scanner from './TelaCliente/Barbearias/Scanner';



import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Cadastro'
          component={Cadastro}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='CadastroCliente'
          component={CadastroCliente}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name='CadastroBarbeiro'
          component={CadastroBarbeiro}
          options={{
            headerShown: false
          }}
        />
        {/* ____________________________________________________BARBEIRO___________________________________________________ */}

        <Stack.Screen
          name='Menu'
          component={Menu}
          options={{
            headerShown: false
          }}
        />
        {/*----------------------------------------- Calendar-------------------------------------------*/}
        <Stack.Screen
          name='MyCalendar'
          component={MyCalendar}
          options={{
            headerShown: false
          }}
        />


        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            headerShown: false
          }}
        />

        {/*----------------------------------------- RELATORIO -------------------------------------------*/}
        <Stack.Screen
          name='Rotas'
          component={Rotas}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name='Barber'
          component={Barber}
          options={{
            headerShown: false
          }}
        />
        {/*----------------------------------------- CONFIG -------------------------------------------*/}
        <Stack.Screen
          name='Conta'
          component={Conta}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Senha'
          component={Senha}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Suporte'
          component={Suporte}
          options={{
            headerShown: false
          }}
        />
         <Stack.Screen
          name='ConfigAgenda'
          component={ConfigAgenda}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='HomeBarber'
          component={HomeBarber}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='ConfigServico'
          component={ConfigServico}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='ConfigEquipe'
          component={ConfigEquipe}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Pagamento'
          component={Pagamento}
          options={{
            headerShown: false
          }}
        />
        {/* ____________________________________________________________________________________________________*/}



        {/* _____________________________________________TELA CLIENTE_____________________________________________________*/}
        <Stack.Screen
          name='MenuCliente'
          component={MenuCliente}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Barbearias'
          component={Barbearias}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='AgendaBarber'
          component={AgendaBarber}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='AgendaFinal'
          component={AgendaFinal}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Historico'
          component={Historico}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='MenuConfig'
          component={MenuConfig}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name='Scanner'
          component={Scanner}
          options={{
            headerShown: false
          }}
        />



      </Stack.Navigator>
    </NavigationContainer>

  );
}



