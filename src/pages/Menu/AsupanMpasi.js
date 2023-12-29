import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import moment from 'moment';
import { MyCalendar, MyGap, MyHeader, MyRadio } from '../../components';

export default function AsupanMpasi({ navigation, route }) {
    const user = route.params;
    const [loading, setLoading] = useState(false);
    const [kirim, setKirim] = useState({
        tanggal: moment().format('YYYY-MM-DD'),
        diberi_asi: '',
    })
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <MyHeader judul="Asupan MPASI" onPress={() => navigation.goBack()} />
            <Text style={{
                fontFamily: fonts.secondary[800],
                color: colors.primary,
                textAlign: 'center',
                fontSize: MyDimensi / 2.5
            }}>Input MPASI Disini</Text>

            <View style={{
                padding: 10,
                borderWidth: 1,
                margin: 20,
                borderRadius: 10,
                borderColor: colors.border
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.primary,
                    fontSize: MyDimensi / 4
                }}>Frekuensi Pemberian Makanan</Text>

                <MyGap jarak={10} />
                <MyCalendar label="Tanggal Pemberian" iconname="calendar-outline" value={kirim.tanggal} />
                <MyGap jarak={10} />


                <MyRadio onPress={() => {
                    setKirim({
                        ...kirim,
                        diberi_asi: 'Ya'
                    })
                }}
                    onPress2={() => {
                        setKirim({
                            ...kirim,
                            diberi_asi: 'Tidak'
                        })
                    }}

                    iconname="option" value={kirim.diberi_asi} label="Apakah Anak Diberi ASI" />



            </View>

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