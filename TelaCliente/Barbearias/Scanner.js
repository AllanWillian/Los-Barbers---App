import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import database from '../../firebase/database';
import { Camera } from 'expo-camera';
import { getAuth } from 'firebase/auth';
import { ref, push } from 'firebase/database';

const Scanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [manualInput, setManualInput] = useState(false);
  const [manualData, setManualData] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      console.log('Status da permissão da câmera:', status); 
      setHasPermission(status === 'granted');
    })();
  }, []);

  const processQRCode = async ({ data }) => {
    if (data) {
      const barbeariaInfo = JSON.parse(data);
      console.log('Valor de barbeariaInfo:', barbeariaInfo);
      await saveToDatabase(barbeariaInfo);
    }
  };

  const handleManualDataSubmit = async () => {
    if (manualData) {
      const barbeariaInfo = JSON.parse(manualData);
      console.log('Valor de barbeariaInfo:', barbeariaInfo);
      await saveToDatabase(barbeariaInfo);
    }
    // Reiniciar para o modo de escaneamento
    setManualInput(false);
    setManualData('');
  };

  const saveToDatabase = async (barbeariaInfo) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        const userId = user.uid;
        const dbRef = ref(database, `users/${usexperId}/barbeariaVinculadas/${barbeariaInfo.id}`);

        // Salve os dados em chaves separadas
        await push(dbRef, barbeariaInfo,{
          id: barbeariaInfo.id,
          nomeBarbearia: barbeariaInfo.nomeBarbearia,
        });

        console.log('Dados salvos com sucesso no Firebase');
        navigation.navigate("Barbearias");
      } catch (error) {
        console.error('Erro ao salvar dados no Firebase:', error);
      }
    } else {
      console.warn('Usuário não autenticado');
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={manualInput ? undefined : processQRCode}
      />
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>Aponte a câmera para o QR code</Text>
      </View>
      {manualInput && (
        <View style={styles.manualInputContainer}>
          <TextInput
            style={styles.manualInput}
            placeholder="Insira os dados manualmente"
            value={manualData}
            onChangeText={setManualData}
          />
          <TouchableOpacity onPress={handleManualDataSubmit} style={styles.manualSubmitButton}>
            <Text style={styles.manualSubmitButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      )}
      {scannedData && (
        <View style={styles.scannedData}>
          <Text>Dados do QR code:</Text>
          <Text>{scannedData}</Text>
        </View>
      )}
      <TouchableOpacity onPress={() => setManualInput(!manualInput)} style={styles.toggleManualInputButton}>
        <Text style={styles.toggleManualInputButtonText}>{manualInput ? 'Cancelar' : 'Inserir Manualmente'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  camera: {
    flex: 1,
    marginHorizontal: 50,
    marginVertical: 190,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayText: {
    color: 'white',
    fontSize: 18,
    bottom: 220,
    fontFamily: 'MontSemiBold',
  },
  scannedData: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  manualInputContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  manualInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    fontFamily:"MontSemiBold",
    color:"black"
  },
  manualSubmitButton: {
    backgroundColor: '#FCA311',
    borderRadius: 5,
    padding: 10,
  
  },
  manualSubmitButtonText: {
    color: 'white',
    fontFamily:"MontSemiBold",
  },
  toggleManualInputButton: {
    position: 'absolute',
    bottom: 70,
    alignSelf:"center",
    backgroundColor: '#FCA311',
    padding: 10,
    borderRadius: 5,
    fontFamily:"MontSemiBold",
  },
  toggleManualInputButtonText: {
    color: 'white',
    fontFamily:"MontSemiBold",
  },
});

export default Scanner;
