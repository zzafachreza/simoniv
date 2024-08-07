import { ActivityIndicator, Alert, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { MYAPP, apiURL, getData } from '../../utils/localStorage';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker, MyRadio } from '../../components';
import { ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
export default function Notifikasi({ navigation, route }) {

    const [loading, setLoading] = useState(true);
    const [kirim, setKirim] = useState({
        tanggal: moment().format('YYYY-MM-DD'),
        berat_badan: '',
        tinggi_badan: '',
    });

    const [data, setData] = useState([]);

    const isFocus = useIsFocused();

    useEffect(() => {
        if (isFocus) {
            __getTransaction();
        }
    }, [isFocus])

    const __getTransaction = () => {
        getData('user').then(uu => {
            axios.post(apiURL + 'pesan', {
                fid_user: uu.id
            }).then(res => {
                console.log(res.data);
                setData(res.data);
                setLoading(false);
            })
        })
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.background
        }}>

            <MyHeader judul="Notifikasi" onPress={() => navigation.goBack()} />

            {!loading && <View style={{
                flex: 1,
            }}>
                <FlatList data={data} renderItem={({ item, index }) => {
                    return <View style={{
                        borderWidth: 1,
                        margin: 10,
                        borderRadius: 8,
                        borderColor: colors.border,
                        overflow: "hidden",
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 1,
                            padding: 10,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[800],
                                fontSize: MyDimensi / 28,
                            }}>{item.label}</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: MyDimensi / 28,
                            }}>{item.rekomendasi}</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[400],
                                fontSize: MyDimensi / 28,
                                color: colors.primary
                            }}>{moment(item.tanggal).format('dddd DD MMMM YYYY')}</Text>
                        </View>
                        <View style={{
                            backgroundColor: colors.danger
                        }}>
                            <TouchableWithoutFeedback onPress={() => {
                                Alert.alert(MYAPP, 'Apakah kamu akan hapus ini ?', [
                                    {
                                        text: 'TIDAK'
                                    },
                                    {
                                        text: 'HAPUS',
                                        onPress: () => {
                                            axios.post(apiURL + 'hapus_pesan', {
                                                id: item.id
                                            }).then(res => {
                                                console.log(res.data);
                                                showMessage({
                                                    message: res.data.message,
                                                    type: 'success'
                                                })
                                                __getTransaction();
                                            })
                                        }
                                    }
                                ])
                            }}>
                                <View style={{
                                    padding: 15,
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon type='ionicon' name='trash' color={colors.white} />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                }} />
            </View>}



            {loading &&
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size="large" color={colors.primary} />

                </View>
            }



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})