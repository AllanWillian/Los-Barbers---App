import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View , TouchableOpacity, StatusBar} from 'react-native';
import { VictoryPie, VictoryTooltip } from 'victory-native';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold } from "@expo-google-fonts/montserrat";


const DATA = [
  {
    x: 'CLIENTES EXTERNOS',
    y: 80,
    color: '#008000',
  },

  {
    x: 'CLIENTES INTERNOS',
    y: 40,
    color: '#008080',
  },

  {
    x: 'CLIENTES NÃO FREQUENTES',
    y: 20,
    color: '#57cc99',
  },

 

];

export default function Principal() {
  const [selected, setSelected] = useState('');
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
    <ScrollView>
      <StatusBar/>
    <TouchableWithoutFeedback onPress={() => setSelected('')}>
      <View style={styles.container}>
      
        <StatusBar style='light' backgroundColor='transparent' translucent />
        <View style={styles.chart}>
          <VictoryPie
            data={DATA}
            colorScale={DATA.map((value) => value.color)}
            style={{
              labels: {
                display: 'none',
              },
              data: {
                fillOpacity: ({ datum }) => (datum.x === selected ? 1 : 0.3),
              },
            }}
            innerRadius={100}
            labelComponent={
              <VictoryTooltip
                renderInPortal={false}
                style={{
                  color: 'black',
                }}
                orientation={'top'}
              />
            }
          />
        </View>
        <View style={{ marginTop: 20, alignItems:'center',}}>
          {DATA.map((value, index) => (
            <View
              key={index}
              style={{
                alignItems: 'center',
                marginVertical: 2,
              }}
            >
              
              <TouchableOpacity onPress={() => setSelected(value.x)}  style={styles.Button}>
                  <View style={styles.square}>
                  <View style= {styles.linha}>
                    <View style={{
                      backgroundColor: value.color,
                       width: 20,
                       height: 20,
                       borderRadius: 5,
                       left: 10,
                    }}/>
                      <Text style={styles.text}>{value.x}</Text>
                      <Text style={styles.percentage}>{value.y}%</Text>
                    </View>
                  </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingVertical: 60,
  },
 
  chart: {
    width: '100%',
    alignItems: 'center',
  },

  Button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'transparent',
    borderRadius: 15,
    padding: 10,
    borderWidth: 1.5,
    borderColor: '#FCA311',
    margin: 10,
  },

  square: {
    width: 300,
    height: 25,
    marginRight:10,
  
  },

  text: {
    color: "white",
    left: 20,
    fontFamily:"MontSemiBold",
  },

  percentage: {
    color: 'gray',
    fontSize: 12,
    left: 30, 
    color: "white",
    fontFamily:"MontSemiBold",
    marginTop:2,

  }, 
  linha: {
    flexDirection: 'row',
    
  }

});
  