import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
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
import SweetAlert from 'react-native-sweet-alert';
export default function AsupanAsi({ navigation, route }) {
    const [loading, setLoading] = useState(false);
    const [pilih, setPilih] = useState({
        0: false,
        1: false,
        2: false,
    })
    const [kirim, setKirim] = useState({
        tanggal: moment().format('YYYY-MM-DD'),
        volume: '',
        waktu_pemberian: [],
        frek_menyusui: [],
        durasi_menyusui: []
    });




    const [user, setUser] = useState({});
    useEffect(() => {
        getData('user').then(uu => {
            setUser(uu)
            setKirim({
                ...kirim,
                fid_user: uu.id
            })
        })
    }, [])

    const sendServer = () => {

        console.log(kirim)
        if (kirim.waktu_pemberian.length == 0) {
            showMessage({
                message: 'Maaf waktu pemberian wajib di isi !',
            })
        } else {
            setLoading(true);
            axios.post(apiURL + 'insert_asupan_asi', kirim).then(res => {
                console.log(res.data);
                if (res.data.status == 200) {
                    SweetAlert.showAlertWithOptions({
                        title: MYAPP,
                        subTitle: res.data.message,
                        style: 'success',
                        cancellable: true
                    })
                }
            }).finally(() => {
                setLoading(false);
            })
        }

    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <MyHeader judul="Asupan ASI" onPress={() => navigation.goBack()} />

            <ScrollView>
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
                    <MyInput iconname="aperture" onChangeText={x => {
                        setKirim({
                            ...kirim,
                            volume: x
                        })
                    }} label2="(Jika Ibu melakukan perah asi)" value={kirim.volume} keyboardType='number-pad' label="*Volume Perah Satuan ml  Volume ASI Perah (ml)" />
                    <MyGap jarak={10} />

                    <View style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: colors.border,
                    }}>

                        <TouchableWithoutFeedback onPress={() => {
                            if (pilih[0]) {
                                setPilih({ ...pilih, [0]: false });
                                let tmp = kirim.waktu_pemberian;
                                tmp.splice(0)
                                setKirim({
                                    ...kirim,
                                    waktu_pemberian: tmp
                                })
                            } else {
                                setPilih({ ...pilih, [0]: true });
                                let tmp = kirim.waktu_pemberian;
                                tmp[0] = 'Pagi';
                                setKirim({
                                    ...kirim,
                                    waktu_pemberian: tmp
                                })
                            }
                        }}>
                            <View style={{
                                marginVertical: 10,
                                padding: 10,
                                backgroundColor: pilih[0] ? colors.primary : colors.white,
                                borderWidth: 1,
                                borderColor: colors.primary,
                                borderRadius: 10,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    flex: 1,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: MyDimensi / 4,
                                    color: pilih[0] ? colors.white : colors.black,
                                }}>Pagi (Jam 00.00 - 06.00)</Text>
                                {pilih[0] && <Icon type='ionicon' name='checkmark-circle' color={colors.white} size={MyDimensi / 3} />}
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => {
                            if (pilih[1]) {
                                setPilih({ ...pilih, [1]: false })
                                let tmp = kirim.waktu_pemberian;
                                tmp.splice(1)
                                setKirim({
                                    ...kirim,
                                    waktu_pemberian: tmp
                                })
                            } else {
                                setPilih({ ...pilih, [1]: true })
                                let tmp = kirim.waktu_pemberian;
                                tmp[1] = 'Siang';
                                setKirim({
                                    ...kirim,
                                    waktu_pemberian: tmp
                                })
                            }
                        }}>
                            <View style={{
                                marginVertical: 10,
                                padding: 10,
                                backgroundColor: pilih[1] ? colors.primary : colors.white,
                                borderWidth: 1,
                                borderColor: colors.primary,
                                borderRadius: 10,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    flex: 1,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: MyDimensi / 4,
                                    color: pilih[1] ? colors.white : colors.black,
                                }}>Siang (Jam 06.00 - 18.00)</Text>
                                {pilih[1] && <Icon type='ionicon' name='checkmark-circle' color={colors.white} size={MyDimensi / 3} />}
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => {
                            if (pilih[2]) {
                                setPilih({ ...pilih, [2]: false });
                                let tmp = kirim.waktu_pemberian;
                                tmp.splice(2)
                                setKirim({
                                    ...kirim,
                                    waktu_pemberian: tmp
                                })
                            } else {
                                setPilih({ ...pilih, [2]: true });
                                let tmp = kirim.waktu_pemberian;
                                tmp[2] = 'Malam';
                                setKirim({
                                    ...kirim,
                                    waktu_pemberian: tmp
                                })
                            }
                        }}>
                            <View style={{
                                marginVertical: 10,
                                padding: 10,
                                backgroundColor: pilih[2] ? colors.primary : colors.white,
                                borderWidth: 1,
                                borderColor: colors.primary,
                                borderRadius: 10,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    flex: 1,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: MyDimensi / 4,
                                    color: pilih[2] ? colors.white : colors.black,
                                }}>Malam (Jam 18.00 - 24.00)</Text>
                                {pilih[2] && <Icon type='ionicon' name='checkmark-circle' color={colors.white} size={MyDimensi / 3} />}
                            </View>
                        </TouchableWithoutFeedback>

                    </View>

                    <MyGap jarak={10} />


                    {/* PAGI */}
                    {pilih[0] && <View style={{ borderWidth: 1, borderRadius: 10, overflow: 'hidden', borderColor: colors.primary, }}>
                        <Text style={{ textAlign: 'center', fontFamily: fonts.secondary[800], color: colors.white, fontSize: MyDimensi / 2, marginBottom: 10, backgroundColor: colors.primary, }}>Pagi</Text>
                        <View style={{ padding: 10, }}>

                            <MyInput iconname="options-outline" label="Frekuensi Menyusui" keyboardType="number-pad" onEndEditing={x => {

                                let tmp = kirim.frek_menyusui;
                                tmp[0] = x.nativeEvent.text;

                                setKirim({
                                    ...kirim,
                                    frek_menyusui: tmp
                                })
                            }} />

                            <MyGap jarak={10} />

                            <MyInput iconname="stopwatch-outline" label="Rata-rata Durasi Menyusui ( Menit )" keyboardType="number-pad" onEndEditing={x => {
                                let tmp = kirim.durasi_menyusui;
                                tmp[0] = x.nativeEvent.text;

                                setKirim({
                                    ...kirim,
                                    durasi_menyusui: tmp
                                })
                            }} />
                        </View>
                    </View>}
                    <MyGap jarak={10} />
                    {/* SIANG */}

                    {pilih[1] &&
                        <View style={{ borderWidth: 1, borderRadius: 10, overflow: 'hidden', borderColor: colors.primary, }}>
                            <Text style={{ textAlign: 'center', fontFamily: fonts.secondary[800], color: colors.white, fontSize: MyDimensi / 2, marginBottom: 10, backgroundColor: colors.primary, }}>Siang</Text>
                            <View style={{ padding: 10, }}>

                                <MyInput iconname="options-outline" label="Frekuensi Menyusui" keyboardType="number-pad" onEndEditing={x => {

                                    let tmp = kirim.frek_menyusui;
                                    tmp[1] = x.nativeEvent.text;

                                    setKirim({
                                        ...kirim,
                                        frek_menyusui: tmp
                                    })
                                }} />

                                <MyGap jarak={10} />

                                <MyInput iconname="stopwatch-outline" label="Rata-rata Durasi Menyusui ( Menit )" keyboardType="number-pad" onEndEditing={x => {
                                    let tmp = kirim.durasi_menyusui;
                                    tmp[1] = x.nativeEvent.text;

                                    setKirim({
                                        ...kirim,
                                        durasi_menyusui: tmp
                                    })
                                }} />
                            </View>
                        </View>
                    }
                    <MyGap jarak={10} />
                    {/* MALAM */}
                    {pilih[2] &&
                        <View style={{ borderWidth: 1, borderRadius: 10, overflow: 'hidden', borderColor: colors.primary, }}>
                            <Text style={{ textAlign: 'center', fontFamily: fonts.secondary[800], color: colors.white, fontSize: MyDimensi / 2, marginBottom: 10, backgroundColor: colors.primary, }}>Malam</Text>
                            <View style={{ padding: 10, }}>

                                <MyInput iconname="options-outline" label="Frekuensi Menyusui" keyboardType="number-pad" onEndEditing={x => {

                                    let tmp = kirim.frek_menyusui;
                                    tmp[2] = x.nativeEvent.text;

                                    setKirim({
                                        ...kirim,
                                        frek_menyusui: tmp
                                    })
                                }} />

                                <MyGap jarak={10} />

                                <MyInput iconname="stopwatch-outline" label="Rata-rata Durasi Menyusui ( Menit )" keyboardType="number-pad" onEndEditing={x => {
                                    let tmp = kirim.durasi_menyusui;
                                    tmp[2] = x.nativeEvent.text;

                                    setKirim({
                                        ...kirim,
                                        durasi_menyusui: tmp
                                    })
                                }} />
                            </View>
                        </View>
                    }

                    <MyGap jarak={30} />

                    <MyButton title="Kirim" onPress={sendServer} />
                    <MyGap jarak={10} />
                    <MyButton title="Lihat Hasil" warna={colors.secondary} colorText={colors.black} iconColor={colors.black} Icons="search" onPress={() => navigation.navigate('AsupanAsiHasil', user)} />

                </View>

            </ScrollView>

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