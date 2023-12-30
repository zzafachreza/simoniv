import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker, MyRadio } from '../../components';
import { ScrollView } from 'react-native';
export default function StatusGizi({ navigation, route }) {
    const [loading, setLoading] = useState(false);
    const [kirim, setKirim] = useState({
        tanggal: moment().format('YYYY-MM-DD'),
        berat_badan: '',
        tinggi_badan: '',
    })
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <MyHeader judul="Status Gizi" onPress={() => navigation.goBack()} />

            <View style={{
                padding: 10,
                borderWidth: 1,
                margin: 20,
                borderRadius: 10,
                borderColor: colors.border
            }}>
                <MyCalendar value={kirim.tanggal} onDateChange={x => {
                    setKirim({
                        ...kirim,
                        tanggal: x
                    })
                }} label="Tanggal Pengukuran" iconname="calendar-outline" />
                <MyGap jarak={10} />


                <MyInput label="Berat Badan Saat Ini ( kg )" keyboardType="number-pad" onChangeText={x => {
                    setKirim({
                        ...kirim,
                        berat_badan: x
                    })
                }} />
                <MyGap jarak={10} />


                <MyInput label="Tinggi Badan Saat Ini ( cm )" keyboardType="number-pad" onChangeText={x => {
                    setKirim({
                        ...kirim,
                        tinggi_badan: x
                    })
                }} />
                <MyGap jarak={30} />
                <MyButton title="Kirim" />
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