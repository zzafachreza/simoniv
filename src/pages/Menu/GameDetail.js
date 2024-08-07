import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { MYAPP, apiURL, getData } from '../../utils/localStorage';
import moment from 'moment';
import { MyHeader } from '../../components';
import { TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import SweetAlert from 'react-native-sweet-alert';
export default function GameDetail({ navigation, route }) {
    const item = route.params;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nomor, setNomor] = useState(0);
    const [jawab, setJawab] = useState('');
    const [nilai, setNilai] = useState(0);


    const [user, setUser] = useState({});
    const getDataTransaksi = () => {


        getData('user').then(uu => {
            setUser(uu);
        })

        axios.post(apiURL + 'game', {
            stage: route.params.stage
        }).then(res => {
            console.log(res.data);
            if (res.data.length > 0) {
                setData(res.data);
                setLoading(false)

            } else {
                showMessage({
                    message: 'Kuis belum tersedia !'
                });
                navigation.goBack();
            }
        })
    }

    useEffect(() => {
        getDataTransaksi();
    }, []);


    const __renderItem = ({ item, index }) => {
        return (

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colors.primary,
                padding: 10,

            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 28,
                    color: colors.black,
                }}>{item.soal}</Text>

                <View style={{
                    flexDirection: 'row'
                }}>
                    <TouchableWithoutFeedback>
                        <View>

                        </View>
                    </TouchableWithoutFeedback>
                </View>

            </View>

        )
    }

    const [key, setKey] = useState('');
    const [TMP, setTMP] = useState({});

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <MyHeader judul={`Game Kuis`} onPress={() => navigation.goBack()} />

            {!loading &&
                <View style={{
                    flex: 1,
                    paddingHorizontal: 20,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        textAlign: 'center',
                        fontSize: MyDimensi / 12,
                    }}>{item.stage}</Text>

                    <View style={{
                        flex: 1,
                        padding: 10,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: MyDimensi / 28
                        }}>{data[nomor].soal}</Text>

                        {jawab == '' &&

                            <View style={{
                                marginTop: 10,
                                flexDirection: 'row'
                            }}>
                                <TouchableOpacity onPress={() => {
                                    if (data[nomor].jawaban == 'BENAR') {
                                        setNilai(nilai + 1);
                                        setJawab('BENAR');

                                    } else {
                                        setJawab('SALAH');
                                    }
                                }} style={{
                                    flex: 1,
                                    marginRight: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>

                                    <Image source={require('../../assets/ya.png')} style={{
                                        width: 100,
                                        height: 100
                                    }} />

                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    if (data[nomor].jawaban == 'SALAH') {
                                        setNilai(nilai + 1);
                                        setJawab('BENAR');

                                    } else {
                                        setJawab('SALAH');
                                    }
                                }} style={{
                                    flex: 1,
                                    marginLeft: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>

                                    <Image source={require('../../assets/tidak.png')} style={{
                                        width: 100,
                                        height: 100
                                    }} />

                                </TouchableOpacity>
                            </View>
                        }

                        <View style={{
                            margin: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {jawab == 'BENAR' && <Image source={require('../../assets/benar.png')} style={{
                                width: 100,
                                height: 100
                            }} />}

                            {jawab == 'SALAH' && <Image source={require('../../assets/salah.png')} style={{
                                width: 100,
                                height: 100
                            }} />}
                        </View>

                        {jawab !== '' && <View style={{
                            marginTop: 10,
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                fontFamily: fonts.secondary[600],
                                fontSize: MyDimensi / 28
                            }}>{data[nomor].keterangan}</Text>
                        </View>}
                    </View>

                    {jawab !== '' &&

                        <TouchableWithoutFeedback onPress={() => {
                            if (nomor < (data.length) - 1) {
                                setNomor(nomor + 1);
                                setJawab('');
                            } else {
                                console.log(nilai);
                                console.log(data.length);



                                if (nilai == data.length) {


                                    axios.post(apiURL + 'add_point', {
                                        fid_user: user.id,
                                        nilai: 1,
                                        stage: item.stage.replace(" ", "").toLowerCase()
                                    }).then(res => {
                                        console.log(res.data);

                                        SweetAlert.showAlertWithOptions({
                                            title: MYAPP,
                                            subTitle: 'Selamat jawaban kamu benar semua',
                                            style: 'success',
                                            cancellable: true
                                        },
                                            callback => navigation.goBack());
                                    })

                                } else {


                                    SweetAlert.showAlertWithOptions({
                                        title: MYAPP,
                                        subTitle: 'Maaf jawaban kamu masih ada yang salah',
                                        style: 'error',
                                        cancellable: true
                                    },
                                        callback => navigation.goBack());
                                }

                            }
                        }}>
                            <View style={{
                                padding: 10,
                                borderWidth: 1,
                                borderColor: colors.primary,
                                backgroundColor: colors.primary,
                                borderRadius: 10,
                                marginBottom: 10,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    flex: 1,
                                    // textAlign: 'center',
                                    color: colors.white,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: MyDimensi / 22
                                }}>SELANJUTNYA</Text>
                                <Icon type='ionicon' name='arrow-forward-circle-outline' color={colors.white} size={MyDimensi / 12} />
                            </View>
                        </TouchableWithoutFeedback>
                    }
                </View>
            }
            {
                loading &&
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    <ActivityIndicator size="large" color={colors.primary} />

                </View>
            }



        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})