import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { MYAPP, apiURL } from '../../utils/localStorage';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker, MyRadio } from '../../components';
import { ScrollView } from 'react-native';
import SweetAlert from 'react-native-sweet-alert';

export default function AsupanMpasi({ navigation, route }) {
    const user = route.params;
    const BULAN = parseFloat(moment().diff(user.tanggal_lahir, 'month', false));
    const [loading, setLoading] = useState(false);
    const [ceklis, setCeklis] = useState(false)
    const [kirim, setKirim] = useState({
        fid_user: route.params.id,
        umur: BULAN,
        tanggal: moment().format('YYYY-MM-DD'),
        diberi_asi: '',
        frek_makanan: 0,
        frek_snack: 0,
        merek_komersial: '',
        rasa_komersial: '',
        tambahan1: '',
        tambahan2: '',
        tambahan3: '',
        tambahan4: '',
        beri1: '',
        beri2: '',
        beri3: '',
        beri4: '',
        bersih1: '',
        bersih2: '',

    });

    const [makan, setMakan] = useState({
        tekstur: [],
        porsi: [],
        jenis_makanan: [],
        bahan_makanan: [[0, 0, 0, 0, 0, 0, 0, 0, 0]],

    });

    const [snack, setSnack] = useState({
        tekstur: [],
        porsi: [],
        jenis_makanan: [],
        bahan_makanan: [[0, 0, 0, 0, 0, 0, 0, 0, 0]],

    });

    const [arrMakan, setArrMakan] = useState([0]);
    const [arrSnack, setArrSnack] = useState([0]);

    const getJumlahMakanan = (x) => {
        let tmp = [];
        let tmpMakanan = [];
        for (let i = 0; i < x; i++) {
            tmp.push(i);
            tmpMakanan.push([0, 0, 0, 0, 0, 0, 0, 0, 0])
        }
        console.log(tmpMakanan);
        setMakan({
            ...makan,
            bahan_makanan: tmpMakanan
        })
        setArrMakan(tmp);
    }

    const getJumlahSnack = (x) => {
        // alert(x)
        let tmp = [];
        let tmpMakanan = [];
        for (let i = 0; i < x; i++) {
            tmp.push(i);
            tmpMakanan.push([0, 0, 0, 0, 0, 0, 0, 0, 0])
        }
        console.log(tmp);
        setSnack({
            ...snack,
            bahan_makanan: tmpMakanan
        })
        setArrSnack(tmp)
    }


    const MyMakanan = ({ label, value, img, onPress, img2 }) => {
        return (
            <View style={{
                borderWidth: 1,
                borderColor: value > 0 ? colors.primary : colors.border,
                marginVertical: 2,
                borderRadius: 10,
                paddingHorizontal: 5,
                marginHorizontal: 10,
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                }}>

                    <TouchableWithoutFeedback onPress={onPress}>
                        <View>
                            <View style={{

                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    width: MyDimensi / 2,
                                    height: MyDimensi / 2,
                                    backgroundColor: colors.border,
                                    borderRadius: MyDimensi / 4,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>

                                    {value > 0 &&

                                        <View style={{
                                            width: MyDimensi / 3,
                                            height: MyDimensi / 3,
                                            backgroundColor: colors.primary,
                                            borderRadius: MyDimensi / 6,
                                        }} />
                                    }
                                </View>

                                <Text style={{
                                    marginLeft: 10,
                                    // marginHorizontal: 10,
                                    fontFamily: fonts.secondary[600],
                                    fontSize: MyDimensi / 4
                                }}>{label}</Text>

                                <Image source={img} style={{
                                    left: 10,
                                    width: MyDimensi / 2,
                                    height: MyDimensi / 2
                                }} />

                            </View>
                            <View style={{
                                flex: 1,
                                marginTop: 5,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image source={img2} style={{
                                    width: windowWidth / 1.5,
                                    height: 180,
                                    resizeMode: 'contain',
                                    alignSelf: 'center'
                                }} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

            </View>

        )
    }


    const MyTexktur = ({ img, label }) => {
        return (
            <View style={{
                marginHorizontal: 10, marginTop: 5, borderColor: colors.border, borderWidth: 1, borderRadius: 10, padding: 10, flexDirection: 'row', alignItems: 'center',
            }}>
                <Image source={img} style={{
                    width: 60, height: 60, borderRadius: 10,
                }} />
                <View style={{ paddingHorizontal: 10, }}>
                    <Text style={{ maxWidth: '92%', fontFamily: fonts.secondary[400], fontSize: MyDimensi / 4, }}>
                        {label}
                    </Text>
                </View>
            </View>
        )
    }

    const sendServer = () => {
        if (!ceklis) {
            SweetAlert.showAlertWithOptions({
                title: MYAPP,
                subTitle: 'Anda harus centang pernyataan dibawah terlebih dahulu !',
                style: 'error',
                cancellable: true
            })
        } else {
            setLoading(true);

            let FREKUENSI = 0;
            let TEKSTUR = 0;
            let PORSI = 0;
            let BAHAN = 0;
            let KONSUMSI = 0;
            let MINUMAN = 0;
            let JAJANAN = 0;
            let SAYUR_BUAH = 0;
            let PEMBERIAN = 0;
            let KEBERSIHAN = 0;
            let BERAGAM = 0;



            try {

                // #1 FREKUENSI
                if (BULAN >= 6 && BULAN <= 8) {
                    if (kirim.diberi_asi == 'Ya') {
                        if (kirim.frek_makanan >= 2 && kirim.frek_snack >= 1) {
                            FREKUENSI = 1;
                        } else {
                            FREKUENSI = 0;
                        }
                    } else {
                        if (kirim.frek_makanan >= 3 && kirim.frek_snack >= 1) {
                            FREKUENSI = 1;
                        } else {
                            FREKUENSI = 0;
                        }
                    }
                } else if (BULAN >= 9 && BULAN <= 11) {

                    if (kirim.diberi_asi == 'Ya') {
                        if (kirim.frek_makanan >= 3 && kirim.frek_snack >= 1) {
                            FREKUENSI = 1;
                        } else {
                            FREKUENSI = 0;
                        }
                    } else {
                        if (kirim.frek_makanan >= 4 && kirim.frek_snack >= 1) {
                            FREKUENSI = 1;
                        } else {
                            FREKUENSI = 0;
                        }
                    }

                } else if (BULAN >= 12) {
                    if (kirim.diberi_asi == 'Ya') {
                        if (kirim.frek_makanan >= 3 && kirim.frek_snack >= 1) {
                            FREKUENSI = 1;
                        } else {
                            FREKUENSI = 0;
                        }
                    } else {
                        if (kirim.frek_makanan >= 4 && kirim.frek_snack >= 1) {
                            FREKUENSI = 1;
                        } else {
                            FREKUENSI = 0;
                        }
                    }
                }

                // #2 TEKSTUR
                if (BULAN >= 6 && BULAN <= 8) {
                    let FILMAK = makan.tekstur.filter(i => i.toLowerCase().indexOf(('Bubur Kental').toLowerCase()) > -1);
                    if (FILMAK.length >= 1) {
                        TEKSTUR = 1;
                    } else {
                        TEKSTUR = 0
                    }
                } else if (BULAN >= 9 && BULAN <= 11) {
                    let FILMAK = makan.tekstur.filter(i => i.toLowerCase().indexOf(('Tim').toLowerCase()) > -1);
                    if (FILMAK.length >= 1) {
                        TEKSTUR = 1;
                    } else {
                        TEKSTUR = 0
                    }

                } else if (BULAN >= 12) {
                    let FILMAK = makan.tekstur.filter(i => i.toLowerCase().indexOf(('Makanan Keluarga').toLowerCase()) > -1);
                    if (FILMAK.length >= 1) {
                        TEKSTUR = 1;
                    } else {
                        TEKSTUR = 0
                    }

                }
                // #3 PORSI
                if (BULAN >= 6 && BULAN <= 8) {

                    makan.porsi;
                    let tmp = 0
                    makan.porsi.map(i => {
                        if (i >= 0.25 && i <= 0.50) {
                            tmp += 1;
                        } else {
                            tmp += 0;
                        }
                    })

                    if (makan.porsi.length == tmp) {
                        PORSI = 1
                    } else {
                        PORSI = 0;
                    }



                } else if (BULAN >= 9 && BULAN <= 11) {

                    makan.porsi;
                    let tmp = 0
                    makan.porsi.map(i => {

                        if (i >= 0.50 && i <= 0.75) {
                            tmp += 1;
                        } else {
                            tmp += 0;
                        }
                    })




                    if (makan.porsi.length == tmp) {
                        PORSI = 1
                    } else {
                        PORSI = 0;
                    }



                } else if (BULAN >= 12) {

                    makan.porsi;
                    let tmp = 0
                    makan.porsi.map(i => {
                        if (i >= 0.75 && i <= 1) {
                            tmp += 1;
                        } else {
                            tmp += 0;
                        }
                    })

                    if (makan.porsi.length == tmp) {
                        PORSI = 1
                    } else {
                        PORSI = 0;
                    }
                }

                // #4 BAHAN

                if (makan.bahan_makanan[0][1] == 1 || makan.bahan_makanan[0][8] == 1) {
                    BAHAN = 1;
                } else {
                    BAHAN = 0;
                }

                // #5 KONSUMSI
                if (makan.bahan_makanan[0][2] == 1 && makan.bahan_makanan[0][3] == 1) {
                    KONSUMSI = 1;
                } else {
                    KONSUMSI = 0;
                }

                // #6 MINUMAN
                if (kirim.tambahan2 == 'Ya') {
                    MINUMAN = 0;
                } else {
                    MINUMAN = 1;
                }

                // #7 JAJAAN
                if (kirim.tambahan3 == 'Ya') {
                    JAJANAN = 0;
                } else {
                    JAJANAN = 1;
                }

                // #8 SAYUR_BUAH
                if (makan.bahan_makanan[0][6] == 1 && makan.bahan_makanan[0][7] == 1) {
                    SAYUR_BUAH = 1;
                } else {
                    SAYUR_BUAH = 0;
                }

                // #9 PEMBERIAN
                if (kirim.beri1 == 'Ya' && kirim.beri2 == 'Tidak' && kirim.beri3 == 'Ya' && kirim.beri4 == 'Ya') {
                    PEMBERIAN = 1;
                } else {
                    PEMBERIAN = 0;
                }

                // #10 KEBERSIHAN
                if (kirim.bersih1 == 'Ya' && kirim.bersih2 == 'Ya') {
                    KEBERSIHAN = 1;
                } else {
                    KEBERSIHAN = 0;
                }



                // #11 BERAGAM
                if (BAHAN == 1 && KONSUMSI == 1) {
                    BERAGAM = 1;
                } else {
                    BERAGAM = 0;
                }




                console.log({
                    formulir: kirim,
                    makanan: makan,
                    snack: snack,
                    rumus: {
                        frekuensi: FREKUENSI,
                        tekstur: TEKSTUR,
                        porsi: PORSI,
                        bahan: BAHAN,
                        konsumsi: KONSUMSI,
                        minuman: MINUMAN,
                        jajanan: JAJANAN,
                        sayur_buah: SAYUR_BUAH,
                        pemberian: PEMBERIAN,
                        kebersihan: KEBERSIHAN,
                        beragam: BERAGAM

                    }
                })


                axios.post(apiURL + 'insert_mpasi', {
                    formulir: kirim,
                    makanan: makan,
                    snack: snack,
                    rumus: {
                        frekuensi: FREKUENSI,
                        tekstur: TEKSTUR,
                        porsi: PORSI,
                        bahan: BAHAN,
                        konsumsi: KONSUMSI,
                        minuman: MINUMAN,
                        jajanan: JAJANAN,
                        sayur_buah: SAYUR_BUAH,
                        pemberian: PEMBERIAN,
                        kebersihan: KEBERSIHAN,
                        beragam: BERAGAM

                    }
                }).then(res => {

                    if (res.data.status == 200) {
                        SweetAlert.showAlertWithOptions({
                            title: MYAPP,
                            subTitle: res.data.message,
                            style: 'success',
                            cancellable: true
                        }, callback => {
                            navigation.replace('AsupanMpasiHasil', user)
                        })
                    }
                }).finally(() => {
                    setLoading(false)
                })


            } catch (error) {

            }
        }
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <MyHeader judul="Asupan MPASI" onPress={() => navigation.goBack()} />
            <ScrollView>
                <Text style={{
                    fontFamily: fonts.secondary[800],
                    color: colors.primary,
                    textAlign: 'center',
                    fontSize: MyDimensi / 2.5
                }}>Input MPASI Disini</Text>


                <Text style={{
                    fontFamily: fonts.secondary[800],
                    color: colors.foourty,
                    textAlign: 'center',
                    fontSize: MyDimensi / 3
                }}>Umur Anak : {BULAN} Bulan</Text>








                <View style={{
                    padding: 10,
                    borderWidth: 1,
                    margin: 20,
                    borderRadius: 10,
                    borderColor: colors.border
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        color: colors.secondary,
                        fontSize: MyDimensi / 3,
                        marginBottom: 20
                    }}>Frekuensi Pemberian Makanan</Text>


                    <MyCalendar label="Tanggal Pemberian" onDateChange={x => {
                        setKirim({
                            ...kirim,
                            tanggal: x
                        })
                    }} iconname="calendar-outline" value={kirim.tanggal} />
                    <MyGap jarak={10} />


                    <MyRadio onPress={() => {

                        if (BULAN >= 6 && BULAN <= 8) {
                            setKirim({
                                ...kirim,
                                diberi_asi: 'Ya',

                            });

                        } else if (BULAN >= 9 && BULAN <= 11) {
                            setKirim({
                                ...kirim,
                                diberi_asi: 'Ya',

                            });

                        } else if (BULAN >= 12) {
                            setKirim({
                                ...kirim,
                                diberi_asi: 'Ya',

                            });

                        } else {
                            showMessage({
                                message: 'Umur anak masih dibawah 6 Bulan'
                            })
                        }

                    }}
                        onPress2={() => {
                            if (BULAN >= 6 && BULAN <= 8) {
                                setKirim({
                                    ...kirim,
                                    diberi_asi: 'Tidak',

                                });

                            } else if (BULAN >= 9 && BULAN <= 11) {
                                setKirim({
                                    ...kirim,
                                    diberi_asi: 'Tidak',

                                });

                            } else if (BULAN >= 12) {
                                setKirim({
                                    ...kirim,
                                    diberi_asi: 'Tidak',

                                });

                            } else {
                                showMessage({
                                    message: 'Umur anak masih dibawah 6 Bulan'
                                })
                            }
                        }}

                        iconname="options" value={kirim.diberi_asi} label="Apakah anak diberi ASI ?" />
                    <MyGap jarak={10} />


                    {/* rekomendasi */}
                    {BULAN >= 6 && BULAN <= 8 &&
                        <View style={{
                            marginBottom: 10,
                        }}>
                            {kirim.diberi_asi == 'Ya' &&
                                <Text style={{ fontFamily: fonts.secondary[400], color: colors.black, fontSize: MyDimensi / 4 }}>
                                    Frekuensi makan utama minimal 2 kali sehari dan selingan 1 kali sehari
                                </Text>
                            }
                            {kirim.diberi_asi == 'Tidak' &&
                                <Text style={{ fontFamily: fonts.secondary[400], color: colors.black, fontSize: MyDimensi / 4 }}>
                                    Frekuensi makan utama minimal 3 kali sehari dan selingan 1 kali sehari
                                </Text>
                            }
                        </View>
                    }

                    {BULAN >= 9 && BULAN <= 11 &&
                        <View style={{
                            marginBottom: 10,
                        }}>
                            {kirim.diberi_asi == 'Ya' &&
                                <Text style={{ fontFamily: fonts.secondary[400], color: colors.black, fontSize: MyDimensi / 4 }}>
                                    Frekuensi makan utama minimal 3 kali sehari dan selingan 1 kali sehari
                                </Text>
                            }
                            {kirim.diberi_asi == 'Tidak' &&
                                <Text style={{ fontFamily: fonts.secondary[400], color: colors.black, fontSize: MyDimensi / 4 }}>
                                    Frekuensi makan utama minimal 4 kali sehari dan selingan 1 kali sehari
                                </Text>
                            }
                        </View>
                    }

                    {BULAN >= 12 &&
                        <View style={{
                            marginBottom: 10,
                        }}>
                            {kirim.diberi_asi == 'Ya' &&
                                <Text style={{ fontFamily: fonts.secondary[400], color: colors.black, fontSize: MyDimensi / 4 }}>
                                    Frekuensi makan utama minimal 3 kali sehari dan selingan 1 kali sehari
                                </Text>
                            }
                            {kirim.diberi_asi == 'Tidak' &&
                                <Text style={{ fontFamily: fonts.secondary[400], color: colors.black, fontSize: MyDimensi / 4 }}>
                                    Frekuensi makan utama minimal 4 kali sehari dan selingan 1 kali sehari
                                </Text>
                            }
                        </View>
                    }


                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 0,
                            position: 'relative'
                        }}>
                        <Icon type="ionicon" name="fast-food-outline" color={colors.primary} size={MyDimensi / 4} />
                        <Text
                            style={{
                                fontFamily: fonts.secondary[600],
                                color: colors.primary,
                                left: 10,
                                fontSize: MyDimensi / 4,
                            }}>
                            Frekuensi pemberian makan utama
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 10,
                    }}>


                        <TouchableWithoutFeedback onPress={() => {
                            if (kirim.frek_makanan == 0) {
                                showMessage({
                                    message: 'Minimal Frekuensi Pemberian Makanan Utama 0',
                                    type: 'danger'
                                })
                            } else {
                                setKirim({
                                    ...kirim,
                                    frek_makanan: kirim.frek_makanan - 1
                                });
                                getJumlahMakanan(kirim.frek_makanan - 1)
                            }
                        }}>
                            <View style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <View style={{
                                    width: MyDimensi / 1.5,
                                    height: MyDimensi / 1.5,
                                    backgroundColor: colors.primary,
                                    borderRadius: MyDimensi / 3,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon type='ionicon' name='remove' color={colors.white} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[800],
                            fontSize: MyDimensi / 2.5,
                            textAlign: 'center',
                        }}>{kirim.frek_makanan}</Text>
                        <TouchableWithoutFeedback onPress={() => {
                            setKirim({
                                ...kirim,
                                frek_makanan: kirim.frek_makanan + 1
                            });
                            getJumlahMakanan(kirim.frek_makanan + 1)
                        }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    width: MyDimensi / 1.5,
                                    height: MyDimensi / 1.5,
                                    backgroundColor: colors.primary,
                                    borderRadius: MyDimensi / 3,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon type='ionicon' name='add' color={colors.white} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <MyGap jarak={10} />
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 0,
                            position: 'relative'
                        }}>
                        <Icon type="ionicon" name="fast-food-outline" color={colors.primary} size={MyDimensi / 4} />
                        <Text
                            style={{
                                fontFamily: fonts.secondary[600],
                                color: colors.primary,
                                left: 10,
                                fontSize: MyDimensi / 4,
                            }}>
                            Frekuensi pemberian selingan
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 10,
                    }}>


                        <TouchableWithoutFeedback onPress={() => {
                            if (kirim.frek_snack == 0) {
                                showMessage({
                                    message: 'Minimal Frekuensi Pemberian Snack 0',
                                    type: 'danger'
                                })
                            } else {
                                setKirim({
                                    ...kirim,
                                    frek_snack: kirim.frek_snack - 1
                                });
                                getJumlahSnack(kirim.frek_snack - 1)

                            }
                        }}>
                            <View style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <View style={{
                                    width: MyDimensi / 1.5,
                                    height: MyDimensi / 1.5,
                                    backgroundColor: colors.primary,
                                    borderRadius: MyDimensi / 3,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon type='ionicon' name='remove' color={colors.white} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[800],
                            fontSize: MyDimensi / 2.5,
                            textAlign: 'center',
                        }}>{kirim.frek_snack}</Text>
                        <TouchableWithoutFeedback onPress={() => {
                            setKirim({
                                ...kirim,
                                frek_snack: kirim.frek_snack + 1
                            });
                            getJumlahSnack(kirim.frek_snack + 1)
                        }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    width: MyDimensi / 1.5,
                                    height: MyDimensi / 1.5,
                                    backgroundColor: colors.primary,
                                    borderRadius: MyDimensi / 3,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon type='ionicon' name='add' color={colors.white} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    {/* makanan */}

                    <MyGap jarak={10} />
                    <MyPicker onValueChange={x => {

                        let tmp = makan;
                        tmp.jenis_makanan[0] = x
                        setMakan({
                            ...makan,
                            jenis_makanan: tmp.jenis_makanan
                        })

                    }} label="Jenis Makanan" data={[
                        { label: '', value: '' },
                        { label: 'MPASI Rumahan', value: 'MPASI Rumahan' },
                        { label: 'MPASI Instan', value: 'MPASI Instan' },
                        { label: 'MPASI Rumahan + MPASI Instan', value: 'MPASI Rumahan + MPASI Instan' },

                    ]} />
                    <MyGap jarak={10} />


                    <Text
                        style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.primary,
                            left: 10,
                            fontSize: MyDimensi / 4,
                        }}>
                        Jenis Bahan Makanan
                    </Text>


                    {kirim.diberi_asi == 'Ya' &&
                        <MyMakanan

                            onPress={() => {
                                let tmp = makan.bahan_makanan;
                                tmp[0][0] = tmp[0][0] == 0 ? 1 : 0,
                                    console.log(tmp)
                                setMakan({
                                    ...makan,
                                    bahan_makanan: tmp
                                })

                            }}

                            value={makan.bahan_makanan[0][0]} label="ASI" img={require('../../assets/m1.png')} img2={require('../../assets/m11.png')} />

                    }

                    {makan.jenis_makanan[0] !== 'MPASI Rumahan' && makan.jenis_makanan[0] !== undefined &&

                        <MyMakanan onPress={() => {
                            let tmp = makan.bahan_makanan;
                            tmp[0][8] = tmp[0][8] == 0 ? 1 : 0,
                                console.log(tmp)
                            setMakan({
                                ...makan,
                                bahan_makanan: tmp
                            })

                        }} value={makan.bahan_makanan[0][8]} label="MPASI Instan" img2={require('../../assets/m99.png')} img={require('../../assets/m9.png')} />

                    }


                    {makan.jenis_makanan[0] !== 'MPASI Instan' &&
                        <>
                            <MyMakanan
                                onPress={() => {
                                    let tmp = makan.bahan_makanan;
                                    tmp[0][1] = tmp[0][1] == 0 ? 1 : 0,
                                        console.log(tmp)
                                    setMakan({
                                        ...makan,
                                        bahan_makanan: tmp
                                    })

                                }}
                                value={makan.bahan_makanan[0][1]} label="Bahan Makanan Pokok" img2={require('../../assets/m22.png')} img={require('../../assets/m2.png')} />

                            <MyMakanan onPress={() => {
                                let tmp = makan.bahan_makanan;
                                tmp[0][2] = tmp[0][2] == 0 ? 1 : 0,
                                    console.log(tmp)
                                setMakan({
                                    ...makan,
                                    bahan_makanan: tmp
                                })

                            }} value={makan.bahan_makanan[0][2]} label="Protein Hewani" img={require('../../assets/m3.png')} img2={require('../../assets/m33.png')} />
                            <MyMakanan onPress={() => {
                                let tmp = makan.bahan_makanan;
                                tmp[0][3] = tmp[0][3] == 0 ? 1 : 0,
                                    console.log(tmp)
                                setMakan({
                                    ...makan,
                                    bahan_makanan: tmp
                                })

                            }} value={makan.bahan_makanan[0][3]} label="Telur" img={require('../../assets/m4.png')} img2={require('../../assets/m44.png')} />
                            <MyMakanan onPress={() => {
                                let tmp = makan.bahan_makanan;
                                tmp[0][4] = tmp[0][4] == 0 ? 1 : 0,
                                    console.log(tmp)
                                setMakan({
                                    ...makan,
                                    bahan_makanan: tmp
                                })

                            }} value={makan.bahan_makanan[0][4]} label="Nabati dan Kacang-kacangan" img={require('../../assets/m5.png')} img2={require('../../assets/m55.png')} />
                            <MyMakanan onPress={() => {
                                let tmp = makan.bahan_makanan;
                                tmp[0][5] = tmp[0][5] == 0 ? 1 : 0,
                                    console.log(tmp)
                                setMakan({
                                    ...makan,
                                    bahan_makanan: tmp
                                })

                            }} value={makan.bahan_makanan[0][5]} label="Susu dan Produk Susu" img={require('../../assets/m6.png')} img2={require('../../assets/m66.png')} />
                            <MyMakanan onPress={() => {
                                let tmp = makan.bahan_makanan;
                                tmp[0][6] = tmp[0][6] == 0 ? 1 : 0,
                                    console.log(tmp)
                                setMakan({
                                    ...makan,
                                    bahan_makanan: tmp
                                })

                            }} value={makan.bahan_makanan[0][6]} label="Buah & Sayur Tinggi Vit A" img={require('../../assets/m7.png')} img2={require('../../assets/m77.png')} />
                            <MyMakanan onPress={() => {
                                let tmp = makan.bahan_makanan;
                                tmp[0][7] = tmp[0][7] == 0 ? 1 : 0,
                                    console.log(tmp)
                                setMakan({
                                    ...makan,
                                    bahan_makanan: tmp
                                })

                            }} value={makan.bahan_makanan[0][7]} label="Buah & Sayur Lainnya" img={require('../../assets/m8.png')} img2={require('../../assets/m88.png')} />


                        </>
                    }

                </View>

                {/* maknan utama */}

                {arrMakan.map((item, index) => {
                    return (
                        <View style={{
                            padding: 10,
                            borderWidth: 1,
                            margin: 20,
                            borderRadius: 10,
                            borderColor: colors.border
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[800],
                                color: colors.secondary,
                                fontSize: MyDimensi / 3,
                                marginBottom: 20
                            }}>Makanan Utama {item + 1}x</Text>

                            <MyPicker label="Tekstur" onValueChange={x => {

                                let tmp = makan;
                                tmp.tekstur[item] = x
                                setMakan({
                                    ...makan,
                                    tekstur: tmp.tekstur
                                })

                            }} data={[
                                { label: '', value: '' },
                                { label: 'Cair', value: 'Cair' },
                                { label: 'Bubur Encer', value: 'Bubur Encer' },
                                { label: 'Bubur Kental', value: 'Bubur Kental' },
                                { label: 'Tim', value: 'Tim' },
                                { label: 'Makanan Keluarga', value: 'Makanan Keluarga' },

                            ]} />

                            {makan.tekstur[item] == 'Cair' &&
                                <MyTexktur img={require('../../assets/t1.png')} label="MPASI yang berbentuk cair seperti susu, jus buah, kuah kaldu." />
                            }

                            {makan.tekstur[item] == 'Bubur Encer' &&
                                <MyTexktur img={require('../../assets/t2.png')} label="Makanan lunak apabila disendok lalu dimiringkan, bubur mudah tumpah" />
                            }

                            {makan.tekstur[item] == 'Bubur Kental' &&
                                <MyTexktur img={require('../../assets/t3.png')} label="Makanan lunak apabila disendok lalu dimiringkan, bubur tidak mudah tumpah" />
                            }

                            {makan.tekstur[item] == 'Tim' &&

                                <MyTexktur img={require('../../assets/t4.png')} label="Makanan setengah padat, lembek dan bahan makanan masih bisa dikenali" />
                            }

                            {makan.tekstur[item] == 'Makanan Keluarga' &&
                                <MyTexktur img={require('../../assets/t5.png')} label="Makanan padat dengan tekstur seperti makanan keluarga pada umumnya contohnya nasi, lauk pauk, sayur" />
                            }


                            <MyGap jarak={10} />
                            <MyPicker label="Porsi sekali makan (ukuran mangkok 250 ml)"

                                onValueChange={x => {

                                    let tmp = makan;
                                    tmp.porsi[item] = x
                                    setMakan({
                                        ...makan,
                                        porsi: tmp.porsi
                                    })

                                }}

                                data={[
                                    { label: '', value: '' },
                                    { label: '< 1/2 mangkok', value: '0.25' },
                                    { label: '1/2 mangkok', value: '0.50' },
                                    { label: '3/4 mangkok', value: '0.75' },
                                    { label: '1 mangkok', value: '1' },

                                ]} />

                            {makan.porsi[item] == '0.25' &&
                                <MyTexktur img={require('../../assets/p1.png')} label="Apabila MPASI yang dihabiskan kurang dari ½ mangkok 250 ml atau 25 sendok teh pres ukuran 5 ml" />
                            }

                            {makan.porsi[item] == '0.50' &&
                                <MyTexktur img={require('../../assets/p2.png')} label="Apabila MPASI yang dihabiskan sekitar ½ mangkok 250 ml atau 25 sendok teh pres ukuran 5 ml" />
                            }

                            {makan.porsi[item] == '0.75' &&
                                <MyTexktur img={require('../../assets/p3.png')} label="Apabila MPASI yang dihabiskan sekitar ¾ mangkok 250 ml atau sktr 13 - 15 sendok makan" />
                            }

                            {makan.porsi[item] == '1' &&
                                <MyTexktur img={require('../../assets/p4.png')} label="Apabila MPASI yang dihabiskan 1 mangkok 250 ml atau sekitar 18-20 sendok makan" />
                            }


                        </View>
                    )
                })}



                {makan.jenis_makanan[0] !== 'MPASI Rumahan' && makan.jenis_makanan[0] !== undefined &&
                    <View style={{
                        padding: 10,
                        borderWidth: 1,
                        margin: 20,
                        borderRadius: 10,
                        borderColor: colors.border
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[400],
                            fontSize: MyDimensi / 5,
                            color: colors.primary,
                        }}>* inputan khusus untuk memilih jenis makanan komersial</Text>
                        <MyInput label="Merek MPASI Instan" onChangeText={x => {
                            setKirim({
                                ...kirim,
                                merek_komersial: x
                            })
                        }} />
                        <MyGap jarak={10} />
                        <MyInput label="Rasa/varian MPASI Instan" onChangeText={x => {
                            setKirim({
                                ...kirim,
                                rasa_komersial: x
                            })
                        }} />
                    </View>

                }
                {/* maknan utama */}

                {arrSnack.map((item, index) => {
                    return (
                        <View style={{
                            padding: 10,
                            borderWidth: 1,
                            margin: 20,
                            borderRadius: 10,
                            borderColor: colors.border
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[800],
                                color: colors.secondary,
                                fontSize: MyDimensi / 3,
                                marginBottom: 20
                            }}>Snack {item + 1}x</Text>

                            <MyInput label="Nama makanan" />


                        </View>
                    )
                })}

                {/* informasi tambahan */}

                <View style={{
                    padding: 10,
                    borderWidth: 1,
                    margin: 20,
                    borderRadius: 10,
                    borderColor: colors.border
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        color: colors.secondary,
                        fontSize: MyDimensi / 3,
                        marginBottom: 20
                    }}>Informasi Tambahan</Text>

                    {/* <MyRadio onPress={() => {
                        setKirim({
                            ...kirim,
                            tambahan1: 'Ya'
                        })
                    }}
                        onPress2={() => {
                            setKirim({
                                ...kirim,
                                tambahan1: 'Tidak'
                            })
                        }}

                        value={kirim.tambahan1} label="1. Anak diberikan salah satu bahan makanan berikut: Telur, Daging, Ikan, Ayam?" />
                    <MyGap jarak={10} /> */}
                    <MyRadio onPress={() => {
                        setKirim({
                            ...kirim,
                            tambahan2: 'Ya'
                        })
                    }}
                        onPress2={() => {
                            setKirim({
                                ...kirim,
                                tambahan2: 'Tidak'
                            })
                        }}

                        value={kirim.tambahan2} label="1. Anak diberikan salah satu minuman berikut: Minuman bersoda, minuman berperisa, sport drink, sirup, madu, minuman serbuk, susu berperisa, dan minuman lain yang ditambahkan gula atau pemanis?" />
                    <MyGap jarak={10} />
                    <MyRadio onPress={() => {
                        setKirim({
                            ...kirim,
                            tambahan3: 'Ya'
                        })
                    }}
                        onPress2={() => {
                            setKirim({
                                ...kirim,
                                tambahan3: 'Tidak'
                            })
                        }}

                        value={kirim.tambahan3} label="2. Anak diberikan salah satu makanan berikut: Permen, coklat, manisan, buah yang dikeringkan, es krim, kue manis, biscuit manis, keripik, kerupuk, kentang goreng, mie instan? " />
                    <MyGap jarak={10} />
                    {/* <MyRadio onPress={() => {
                        setKirim({
                            ...kirim,
                            tambahan4: 'Ya'
                        })
                    }}
                        onPress2={() => {
                            setKirim({
                                ...kirim,
                                tambahan4: 'Tidak'
                            })
                        }}

                        value={kirim.tambahan4} label="4. Anak diberikan sayur dan buah?" />
                    <MyGap jarak={10} /> */}
                </View>

                {/* iCara Pemberian */}

                <View style={{
                    padding: 10,
                    borderWidth: 1,
                    margin: 20,
                    borderRadius: 10,
                    borderColor: colors.border
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        color: colors.secondary,
                        fontSize: MyDimensi / 3,
                        marginBottom: 20
                    }}>Cara Pemberian</Text>

                    <MyRadio onPress={() => {
                        setKirim({
                            ...kirim,
                            beri1: 'Ya'
                        })
                    }}
                        onPress2={() => {
                            setKirim({
                                ...kirim,
                                beri1: 'Tidak'
                            })
                        }}

                        value={kirim.beri1} label="1. Mengajak anak berbicara atau menyajikan lagu atau bercerita/bercanda dengan anak selama memberikan MPASI?" />
                    <MyGap jarak={10} />
                    <MyRadio onPress={() => {
                        setKirim({
                            ...kirim,
                            beri2: 'Ya'
                        })
                    }}
                        onPress2={() => {
                            setKirim({
                                ...kirim,
                                beri2: 'Tidak'
                            })
                        }}

                        value={kirim.beri2} label="2. Memberikan makan anak sambil bermain atau menonton televisi/hp?" />
                    <MyGap jarak={10} />
                    <MyRadio onPress={() => {
                        setKirim({
                            ...kirim,
                            beri3: 'Ya'
                        })
                    }}
                        onPress2={() => {
                            setKirim({
                                ...kirim,
                                beri3: 'Tidak'
                            })
                        }}

                        value={kirim.beri3} label="3. MPASI dibuat sesaat sebelum disajikan kepada anak?" />
                    <MyGap jarak={10} />
                    <MyRadio onPress={() => {
                        setKirim({
                            ...kirim,
                            beri4: 'Ya'
                        })
                    }}
                        onPress2={() => {
                            setKirim({
                                ...kirim,
                                beri4: 'Tidak'
                            })
                        }}

                        value={kirim.beri4} label="4. Apakah makanan utama disajikan dalam keadaan hangat?" />
                    <MyGap jarak={10} />
                </View>

                {/* Kebersihan/Higienitas */}

                <View style={{
                    padding: 10,
                    borderWidth: 1,
                    margin: 20,
                    borderRadius: 10,
                    borderColor: colors.border
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        color: colors.secondary,
                        fontSize: MyDimensi / 3,
                        marginBottom: 20
                    }}>Kebersihan/Higienitas</Text>

                    <MyRadio onPress={() => {
                        setKirim({
                            ...kirim,
                            bersih1: 'Ya'
                        })
                    }}
                        onPress2={() => {
                            setKirim({
                                ...kirim,
                                bersih1: 'Tidak'
                            })
                        }}

                        value={kirim.bersih1} label="1. Mencuci tangan dengan sabun sebelum memasak dan menyiapkan MPASI?" />
                    <MyGap jarak={10} />
                    <MyRadio onPress={() => {
                        setKirim({
                            ...kirim,
                            bersih2: 'Ya'
                        })
                    }}
                        onPress2={() => {
                            setKirim({
                                ...kirim,
                                bersih2: 'Tidak'
                            })
                        }}

                        value={kirim.bersih2} label="2. Memasak air yang digunakan untuk MPASI?" />
                    <MyGap jarak={10} />

                </View>

                <TouchableWithoutFeedback onPress={() => {
                    setCeklis(!ceklis)
                }}>
                    <View style={{
                        padding: 10,
                        margin: 20,
                        borderRadius: 10,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Icon type='ionicon' size={25} color={colors.primary} name={ceklis ? 'checkbox' : 'checkbox-outline'} />
                        <Text style={{
                            left: 10,
                            flex: 1,
                            fontFamily: fonts.secondary[600],
                            fontSize: 12,
                        }}>Pengisian data ini adalah benar dan sesuai pemberian MP-ASI yang sesungguhnya agar ibu memperoleh saran yang tepat untuk perbaikan MP-ASI dan sebagai informasi yang valid dalam upaya pencegahan stunting.</Text>
                    </View>
                </TouchableWithoutFeedback>

                {!loading && <View style={{
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                }}>
                    <MyButton title="Kirim" onPress={sendServer} />
                </View>}


                {!loading &&
                    <View style={{
                        paddingHorizontal: 20,
                        paddingBottom: 20,
                    }}>
                        <MyButton title="Hasil" warna={colors.secondary} colorText={colors.black} iconColor={colors.black} Icons="search" onPress={() => navigation.navigate('AsupanMpasiHasil', user)} />
                    </View>

                }
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