import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_500Medium, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import Icon from "react-native-vector-icons/FontAwesome";
import pix from "../../../assets/pix.png";
import boleto from "../../../assets/boleto_teste.png";
import cartão from "../../../assets/cartao.png";
import qrcode from '../../../assets/qrcode.png';
import iconBoleto from "../../../assets/boleto.png";
import master from "../../../assets/mastercard.png";
import visa from "../../../assets/visa.png";
import elo from "../../../assets/elo.png";
import hipercard from "../../../assets/hipercard.png";
import american from "../../../assets/american.png";

const Pagamento = () => {
    const [modalPix, setModalPix] = useState(false);
    const [modalBoleto, setModalBoleto] = useState(false);
    const [modalCartao, setModalCartao] = useState(false);

    //FORMATAÇÃO CAMPO NÚMERO DO CARTÃO
    const [numeroCartao, setNumeroCartao] = useState('');
    const handleInputChange = (text) => {
        const digitsOnly = text.replace(/\D/g, '');
        const formattedText = digitsOnly
            .replace(/(\d{4})(\d{4})(\d{4})(\d+)/, '$1 - $2 - $3 - $4')
            .trim();
        setNumeroCartao(formattedText);
    };
    //----------------------------------

    //FORMATAÇÃO CAMPO DE DATA DE VENCIMENTO DO CARTÃO
    const [dataVencimento, setDataVencimento] = useState('');
    const handleDataInputChange = (text) => {
        const digitsOnly = text.replace(/\D/g, '');
        const formattedText = digitsOnly
            .replace(/(\d{2})(\d{2})/, '$1/$2')
            .trim();
        setDataVencimento(formattedText);
    };
    //----------------------------------

    //FORMATAÇÂO CAMPO NOME DO TITULAR
    const [nomeCartao, setNomeCartao] = useState('');
    const handleNomeInputChange = (text) => {
        const lettersOnly = text.replace(/[^a-zA-ZÀ-ÿ ]/g, '');
        const formattedText = lettersOnly
            .toLowerCase()
            .replace(/(?:^|\s)\S/g, (letter) => letter.toUpperCase());
        setNomeCartao(formattedText);
    };
    //----------------------------------
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
        //MODAL PIX ---------------- MODAL PIX--------------------------- MODAL PIX
        <View style={estilos.fundo}>
            <Modal visible={modalPix} transparent animationType='slide'>
                <View style={estilos.fundoModal}>
                    <View style={estilos.modalContainer}>
                        <TouchableOpacity style={estilos.btnfechaModal} onPress={() => setModalPix(false)}>
                            <Text style={estilos.fechaModal}>X</Text>
                        </TouchableOpacity>
                        <Text style={estilos.pixtexto}> ESCANEIE O QR CODE ABAIXO </Text>
                        <View style={estilos.caixa}>
                            <Image source={qrcode} style={estilos.piximgcod}></Image>
                        </View>
                        <Text style={estilos.pixtexto}> COPIE O CÓDIGO ABAIXO </Text>
                        <TouchableOpacity style={estilos.pixboton} onPress={() => Alert.alert("código copiado com sucesso!")}>
                            <Text style={estilos.pixtextoboton}> phdy984J-24v2-z4n6-y2hs-3682rh7854m3 </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
            {/* //MODAL BOLETO --------------------- MODAL BOLETO ------------------------ MODAL BOLETO */}
            <Modal visible={modalBoleto} transparent animationType="slide">
                <View style={estilos.fundoModal}>
                    <View style={estilos.modalContainer}>
                        <TouchableOpacity style={estilos.btnfechaModal} onPress={() => setModalBoleto(false)}>
                            <Text style={estilos.fechaModal}>X</Text>
                        </TouchableOpacity>
                        <Text style={estilos.texto}> ESCANEIE O BOLETO ABAIXO </Text>
                        <Image source={boleto} style={estilos.imgcod}></Image>
                        <Text style={estilos.ncod}> 73845.04855 749302 63821 110234 193284732092123 </Text>
                        <TouchableOpacity style={estilos.boton} onPress={() => Alert.alert("boleto enviado no seu e-mail")}>
                            <Text style={estilos.textoboton}> COPIAR BOLETO </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
 {/* //MODAL CARTAO --------------------- MODAL CARTAO ------------------------ MODAL CARTAO */}
            <Modal visible={modalCartao} transparent animationType="slide">
                <View style={estilos.fundoModal}>
                    <View style={estilos.modalContainer}>
                    <TouchableOpacity style={estilos.btnfechaModal} onPress={() => setModalCartao(false)}>
                            <Text style={estilos.fechaModal}>X</Text>
                        </TouchableOpacity>
                        <View style={{marginTop:20,}}>
                        <View>
                            <Text style={estilos.textoDadosCartao}>NÚMERO DO CARTÃO</Text>
                            <TextInput
                                style={estilos.campoNumeroCartao}
                                placeholder="0000 - 0000 - 0000 - 0000"
                                keyboardType="numeric"
                                value={numeroCartao}
                                onChangeText={handleInputChange}
                                maxLength={25}
                                cursorColor={"#FCA311"}
                                placeholderTextColor={"#d7d8d7"}
                            />
                          
                        </View>

                        <View style={estilos.aoLadoPagamento}>
                            <View>
                                <Text style={estilos.textoDadosCartao}>VENCIMENTO</Text>
                                <TextInput
                                    style={estilos.campoDataCartao}
                                    placeholder="00/00"
                                    keyboardType="numeric"
                                    value={dataVencimento}
                                    onChangeText={handleDataInputChange}
                                    maxLength={5}
                                    cursorColor={"#FCA311"}
                                    placeholderTextColor={"#d7d8d7"}
                                />
                            </View>

                            <View style={estilos.margemDireita}>
                                <Text style={estilos.textoDadosCartao}>CVV</Text>
                                <TextInput
                                    style={estilos.campoCvvCartao}
                                    placeholder="000"
                                    keyboardType="numeric"
                                    maxLength={3}
                                    cursorColor={"#FCA311"}
                                    placeholderTextColor={"#d7d8d7"}
                                />
                            </View>
                        </View>

                        <View>
                            <Text style={estilos.textoDadosCartao}>NOME NO CARTÃO</Text>
                            <TextInput
                                style={estilos.campoNomeCartao}
                                placeholder="Nome do Titular"
                                value={nomeCartao}
                                onChangeText={handleNomeInputChange}
                                autoCapitalize="words"
                                maxLength={35}
                                cursorColor={"#FCA311"}
                                placeholderTextColor={"#d7d8d7"}
                            />
                        </View>


                        <View style={estilos.imgs}>
                            <Image source={master} style={estilos.imgCartaoMaster} />
                            <Image source={visa} style={estilos.imgCartaoVisa} />
                            <Image source={elo} style={estilos.imgCartaoElo} />
                            <Image source={hipercard} style={estilos.imgCartaoHiper} />
                            <Image source={american} style={estilos.imgCartaoAmerican} />
                        </View>
                        </View>
                    </View>
                </View>
            </Modal>


            <View style={estilos.alinhamento} />
            <TouchableOpacity onPress={() => navigator.navigate("HomeBarber")}>
                <Icon name="chevron-left" size={50} style={estilos.seta}></Icon>
            </TouchableOpacity>
            <Text style={estilos.pag}> PAGAMENTO </Text>
            <View style={estilos.caixaUm}>
                <Text style={estilos.plano}> Setembro: </Text>
                <Text style={estilos.valor}> R$99,90 </Text>
                <Text style={{ color: "white", textAlign: "center", fontFamily: "MontSemiBold" }}>válido até 31/09/2023</Text>

                <View style={estilos.imagens}>
                    <TouchableOpacity style={estilos.caixa} onPress={() => setModalPix(true)}>
                        <Image source={pix} style={estilos.imagemUm} />
                        <Text style={estilos.textoUm}> PIX </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={estilos.caixa} onPress={() => setModalBoleto(true)}>
                        <Image source={iconBoleto} style={estilos.imagemUm} />
                        <Text style={estilos.textoUm}> BOLETO </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={estilos.caixa} onPress={() => setModalCartao(true)}>
                        <Image source={cartão} style={estilos.imagemUm}></Image>
                        <Text style={estilos.textoUm}> CARTÃO </Text>
                    </TouchableOpacity>
                </View>


            </View>
        </View>

    );
}

const estilos = StyleSheet.create({

    alinhamento: {
        flexDirection: "row",
    },

    fundo: {
        height: "100%",
        backgroundColor: "black"
    },

    seta: {
        marginLeft: 25,
        marginTop: 19,
        color: "white",
    },

    pag: {
        fontSize: 35,
        color: "white",
        fontFamily: "MontBold",
        textAlign: "center",
        padding: 15,
    },

    caixaUm: {
        borderRadius: 20,
        backgroundColor: "#14213D",
        alignSelf: "center",
        height: 190,
        width: 290,
        marginTop: 50,
    },

    plano: {
        top: -3,
        padding: 30,
        color: "white",
        fontSize: 25,
        fontFamily: "MontBold"
    },

    valor: {
        marginTop: -10,
        color: "red",
        fontSize: 40,
        fontFamily: "MontBold",
        textAlign: "center",

    },

    imagens: {
        flexDirection: "row",
        marginTop: 110,
        justifyContent: "space-between",
        alignSelf: "center",
    },

    image: {
        marginVertical: 50,
    },

    textoUm: {
        fontSize: 15,
        color: "white",
        textAlign: "center",
        fontFamily: "MontSemiBold"
    },

    imagemUm: {
        height: 95,
        width: 95,
        marginTop: 37,
        alignSelf: "center",
    },

    caixa: {
        borderRadius: 15,
        backgroundColor: "#14213D",
        alignSelf: "center",
        height: 230,
        width: 118,
        marginHorizontal: 8,
    },
    fundoModal: {
        backgroundColor: "rgba(0,0,0,0.9)",
        flex: 1,
    },
    modalContainer: {
        backgroundColor: "#14213D",
        height: 600,
        top: 260,
        borderRadius: 25,
    },
    fechaModal: {
        color: "white",
        textAlign: "center",
        fontSize: 18,
        fontFamily: "MontBold"
    },
    btnfechaModal: {
        backgroundColor: "red",
        borderRadius: 60,
        alignSelf: "center",
        width: 52,
        padding: 15,
        position: "absolute",
        right: 0,
        top: -20,
    },

    //MODAL PIX

    pixtexto: {
        color: "white",
        textAlign: "center",
        padding: 15,
        fontFamily: "MontBold",
        fontSize: 18,
        marginTop: 30,
    },

    piximgcod: {
        alignSelf: "center",
        height: 250,
        width: 250,
    },

    pixtextoboton: {
        color: "white",
        textAlign: "center",
        marginHorizontal: 7,

    },

    pixboton: {
        borderRadius: 10,
        borderColor: "#FCA311",
        borderWidth: 2,
        backgroundColor: "#14213D",
        width: 292,
        height: 35,
        alignSelf: "center",
        marginTop: 7,

    },

    // MODAL BOLETO

    texto: {
        color: "white",
        textAlign: "center",
        marginTop: 60,
        fontFamily: "MontBold",
        fontSize: 22,
    },

    imgcod: {
        alignSelf: "center",
        height: 100,
        width: 400,
        marginTop: 30,
    },

    ncod: {
        textAlign: "center",
        fontSize: 15,
        fontFamily: "MontSemiBold",
        color: "white",
        marginHorizontal: 20,
        marginTop: 20,
    },


    textoboton: {
        color: "white",
        textAlign: "center",
        marginHorizontal: 7,
        top: 25,
        fontFamily: "MontBold",
    },

    boton: {
        borderRadius: 20,
        backgroundColor: "#FCA311",
        width: 292,
        height: 70,
        alignSelf: "center",
        marginTop: 35,

    },


    //MODAL CARTAO

    
    aoLado: {
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
    },

    aoLadoPagamento: {
        flexDirection: "row",
    },

    margemDireita: {
        marginLeft: 60,
    },

    textoDadosCartao: {
        fontSize: 15,
        fontFamily:"MontSemiBold",
        paddingVertical:10,
        marginLeft: 30,
        marginTop: 5,
        color: "white"
    },

    campoNumeroCartao: {
        backgroundColor: "#14213D",
        borderRadius: 5,
        borderColor: "#FCA311",
        borderWidth: 2,
        padding: 5,
        marginRight: 50,
        fontSize: 16,
        textAlign: "center",
        marginBottom: 5,
        color: "#F6F7F9",
        marginLeft:30,
        fontFamily:"MontSemiBold",
    },

    campoDataCartao: {
        backgroundColor: "#14213D",
        borderRadius: 5,
        borderColor: "#FCA311",
        borderWidth: 2,
        padding: 5,
        marginLeft:19,
        fontSize: 16,
        textAlign: "center",
        marginBottom: 5,
        color: "#F6F7F9",
        marginLeft:30,
        fontFamily:"MontSemiBold",
    },

    campoCvvCartao: {
        backgroundColor: "#14213D",
        borderRadius: 5,
        borderColor: "#FCA311",
        borderWidth: 2,
        padding: 5,
        marginRight: -50,
        fontSize: 16,
        textAlign: "center",
        color: "#F6F7F9",
    
        fontFamily:"MontSemiBold",
    },

    campoNomeCartao: {
        backgroundColor: "#14213D",
        borderRadius: 5,
        borderColor: "#FCA311",
        borderWidth: 2,
        padding: 5,
        marginRight: 50,
        fontSize: 16,
        textAlign: "center",
        color: "#F6F7F9",
        marginLeft:30,
        fontFamily:"MontSemiBold",
    },

    imgs: {
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "space-between",
        marginRight: 15
    },

    imgCartaoMaster: {
        height: 20,
        width: 70,
        marginTop: 30,
    },

    imgCartaoVisa: {
        height: 17,
        width: 54,
        marginTop: 30,
    },

    imgCartaoElo: {
        height: 24,
        width: 60,
        marginLeft: 20,
        marginTop: 27,
    },

    imgCartaoHiper: {
        height: 20,
        width: 53,
        marginLeft: 20,
        marginTop: 29,
    },

    imgCartaoAmerican: {
        height: 20,
        width: 53,
        marginLeft: 20,
        marginTop: 29,
    },
})

export default Pagamento;