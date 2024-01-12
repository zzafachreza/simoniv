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


export default function AsupanMpasi({ navigation, route }) {
    const user = route.params;
    const BULAN = parseFloat(moment().diff(user.tanggal_lahir, 'month', false));
    const [loading, setLoading] = useState(false);
    const [kirim, setKirim] = useState({
        tanggal: moment().format('YYYY-MM-DD'),
        diberi_asi: '',
        frek_makanan: 1,
        frek_snack: 1,
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
        bahan_makanan: [[0, 0, 0, 0, 0, 0, 0, 0]],

    });

    const [snack, setSnack] = useState({
        tekstur: [],
        porsi: [],
        jenis_makanan: [],
        bahan_makanan: [[0, 0, 0, 0, 0, 0, 0, 0]],

    });

    const [arrMakan, setArrMakan] = useState([0]);
    const [arrSnack, setArrSnack] = useState([0]);

    const getJumlahMakanan = (x) => {
        let tmp = [];
        let tmpMakanan = [];
        for (let i = 0; i < x; i++) {
            tmp.push(i);
            tmpMakanan.push([0, 0, 0, 0, 0, 0, 0, 0])
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
        for (let i = 0; i <= x; i++) {
            tmp.push(i);
            tmpMakanan.push([0, 0, 0, 0, 0, 0, 0, 0])
        }
        console.log(tmp);
        setSnack({
            ...snack,
            bahan_makanan: tmpMakanan
        })
        setArrSnack(tmp)
    }


    const MyMakanan = ({ label, value, img, onPress }) => {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 0,
                marginHorizontal: 10,
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    paddingRight: windowWidth / 2,
                }}>

                    <TouchableWithoutFeedback onPress={onPress}>
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
                                marginHorizontal: 10,
                                fontFamily: fonts.secondary[600],
                                fontSize: MyDimensi / 4
                            }}>{label}</Text>

                            <Image source={img} style={{
                                width: MyDimensi / 2,
                                height: MyDimensi / 2
                            }} />

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


                    <MyCalendar label="Tanggal Pemberian" iconname="calendar-outline" value={kirim.tanggal} />
                    <MyGap jarak={10} />


                    <MyRadio onPress={() => {

                        if (BULAN >= 6 && BULAN <= 8) {
                            setKirim({
                                ...kirim,
                                diberi_asi: 'Ya',
                                frek_makanan: 2,
                                frek_snack: 1
                            });
                            getJumlahMakanan(2);
                            getJumlahSnack(1);
                        } else if (BULAN >= 9 && BULAN <= 11) {
                            setKirim({
                                ...kirim,
                                diberi_asi: 'Ya',
                                frek_makanan: 3,
                                frek_snack: 1
                            });
                            getJumlahMakanan(3);
                            getJumlahSnack(1);
                        } else if (BULAN >= 12) {
                            setKirim({
                                ...kirim,
                                diberi_asi: 'Ya',
                                frek_makanan: 3,
                                frek_snack: 1
                            });
                            getJumlahMakanan(3);
                            getJumlahSnack(1);
                        }

                    }}
                        onPress2={() => {
                            if (BULAN >= 6 && BULAN <= 8) {
                                setKirim({
                                    ...kirim,
                                    diberi_asi: 'Tidak',
                                    frek_makanan: 3,
                                    frek_snack: 1
                                });
                                getJumlahMakanan(3);
                                getJumlahSnack(1);
                            } else if (BULAN >= 9 && BULAN <= 11) {
                                setKirim({
                                    ...kirim,
                                    diberi_asi: 'Tidak',
                                    frek_makanan: 4,
                                    frek_snack: 1
                                });
                                getJumlahMakanan(4);
                                getJumlahSnack(1);
                            } else if (BULAN >= 12) {
                                setKirim({
                                    ...kirim,
                                    diberi_asi: 'Tidak',
                                    frek_makanan: 4,
                                    frek_snack: 1
                                });
                                getJumlahMakanan(4);
                                getJumlahSnack(1);
                            }
                        }}

                        iconname="options" value={kirim.diberi_asi} label="Apakah Anak Diberi ASI" />
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
                            Freq. Pemberian (Makanan Utama)
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 10,
                    }}>


                        <TouchableWithoutFeedback onPress={() => {
                            if (kirim.frek_makanan == 1) {
                                showMessage({
                                    message: 'Minimal Frekuensi Pemberian Makanan Utama 1',
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
                            Freq. Pemberian (Selingan / Snack)
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 10,
                    }}>


                        <TouchableWithoutFeedback onPress={() => {
                            if (kirim.frek_snack == 1) {
                                showMessage({
                                    message: 'Minimal Frekuensi Pemberian Snack 1',
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
                            <MyGap jarak={10} />
                            <MyPicker label="Jenis Makanan" data={[

                                { label: 'Home made', value: 'Home made' },
                                { label: 'Komersial', value: 'Komersial' },
                                { label: 'Home made + Komersial', value: 'Home made + Komersial' },

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
                            <MyMakanan

                                onPress={() => {
                                    let tmp = makan.bahan_makanan;
                                    tmp[item][0] = tmp[item][0] == 0 ? 1 : 0,
                                        console.log(tmp)
                                    setMakan({
                                        ...makan,
                                        bahan_makanan: tmp
                                    })

                                }}

                                value={makan.bahan_makanan[item][0]} label="ASI" img={require('../../assets/m1.png')} />
                            <MyMakanan
                                onPress={() => {
                                    let tmp = makan.bahan_makanan;
                                    tmp[item][1] = tmp[item][1] == 0 ? 1 : 0,
                                        console.log(tmp)
                                    setMakan({
                                        ...makan,
                                        bahan_makanan: tmp
                                    })

                                }}
                                value={makan.bahan_makanan[item][1]} label="Bahan Makanan Pokok" img={require('../../assets/m2.png')} />
                            <MyMakanan onPress={() => {
                                let tmp = makan.bahan_makanan;
                                tmp[item][2] = tmp[item][2] == 0 ? 1 : 0,
                                    console.log(tmp)
                                setMakan({
                                    ...makan,
                                    bahan_makanan: tmp
                                })

                            }} value={makan.bahan_makanan[item][2]} label="Protein Hewani" img={require('../../assets/m3.png')} />
                            <MyMakanan onPress={() => {
                                let tmp = makan.bahan_makanan;
                                tmp[item][3] = tmp[item][3] == 0 ? 1 : 0,
                                    console.log(tmp)
                                setMakan({
                                    ...makan,
                                    bahan_makanan: tmp
                                })

                            }} value={makan.bahan_makanan[item][3]} label="Telur" img={require('../../assets/m4.png')} />
                            <MyMakanan onPress={() => {
                                let tmp = makan.bahan_makanan;
                                tmp[item][4] = tmp[item][4] == 0 ? 1 : 0,
                                    console.log(tmp)
                                setMakan({
                                    ...makan,
                                    bahan_makanan: tmp
                                })

                            }} value={makan.bahan_makanan[item][4]} label="Nabati dan Kacang-kacangan" img={require('../../assets/m5.png')} />
                            <MyMakanan onPress={() => {
                                let tmp = makan.bahan_makanan;
                                tmp[item][5] = tmp[item][5] == 0 ? 1 : 0,
                                    console.log(tmp)
                                setMakan({
                                    ...makan,
                                    bahan_makanan: tmp
                                })

                            }} value={makan.bahan_makanan[item][5]} label="Susu dan Produk Susu" img={require('../../assets/m6.png')} />
                            <MyMakanan onPress={() => {
                                let tmp = makan.bahan_makanan;
                                tmp[item][6] = tmp[item][6] == 0 ? 1 : 0,
                                    console.log(tmp)
                                setMakan({
                                    ...makan,
                                    bahan_makanan: tmp
                                })

                            }} value={makan.bahan_makanan[item][6]} label="Buah & Sayur Tinggi Vit A" img={require('../../assets/m7.png')} />
                            <MyMakanan onPress={() => {
                                let tmp = makan.bahan_makanan;
                                tmp[item][7] = tmp[item][7] == 0 ? 1 : 0,
                                    console.log(tmp)
                                setMakan({
                                    ...makan,
                                    bahan_makanan: tmp
                                })

                            }} value={makan.bahan_makanan[item][7]} label="Buah & Sayur Lainnya" img={require('../../assets/m8.png')} />


                        </View>
                    )
                })}

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
                    <MyInput label="Merek Makanan Komersial" />
                    <MyGap jarak={10} />
                    <MyInput label="Rasa/varian Makanan Komersial" />
                </View>
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


                            <MyPicker label="Tekstur" data={[
                                { label: 'Cair', value: 'Cair' },
                                { label: 'Bubur Encer', value: 'Bubur Encer' },
                                { label: 'Bubur Kental', value: 'Bubur Kental' },
                                { label: 'Tim', value: 'Tim' },
                                { label: 'Makanan Keluarga', value: 'Makanan Keluarga' },

                            ]} />
                            <MyGap jarak={10} />
                            <MyPicker label="Porsi" data={[
                                { label: '< ½ mangkok', value: '< ½ mangkok' },
                                { label: '½ mangkok', value: '½ mangkok' },
                                { label: '¾ mangkok', value: '¾ mangkok' },
                                { label: '1 mangkok', value: '1 mangkok' },

                            ]} />
                            <MyGap jarak={10} />
                            <MyPicker label="Jenis Makanan" data={[

                                { label: 'Home made', value: 'Home made' },
                                { label: 'Komersial', value: 'Komersial' },
                                { label: 'Home made + Komersial', value: 'Home made + Komersial' },

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
                            <MyMakanan

                                onPress={() => {
                                    let tmp = snack.bahan_makanan;
                                    tmp[item][0] = tmp[item][0] == 0 ? 1 : 0,
                                        console.log(tmp)
                                    setSnack({
                                        ...snack,
                                        bahan_makanan: tmp
                                    })

                                }}

                                value={snack.bahan_makanan[item][0]} label="ASI" img={require('../../assets/m1.png')} />
                            <MyMakanan
                                onPress={() => {
                                    let tmp = snack.bahan_makanan;
                                    tmp[item][1] = tmp[item][1] == 0 ? 1 : 0,
                                        console.log(tmp)
                                    setSnack({
                                        ...snack,
                                        bahan_makanan: tmp
                                    })

                                }}
                                value={snack.bahan_makanan[item][1]} label="Bahan Makanan Pokok" img={require('../../assets/m2.png')} />
                            <MyMakanan onPress={() => {
                                let tmp = snack.bahan_makanan;
                                tmp[item][2] = tmp[item][2] == 0 ? 1 : 0,
                                    console.log(tmp)
                                setSnack({
                                    ...snack,
                                    bahan_makanan: tmp
                                })

                            }} value={snack.bahan_makanan[item][2]} label="Protein Hewani" img={require('../../assets/m3.png')} />
                            <MyMakanan onPress={() => {
                                let tmp = snack.bahan_makanan;
                                tmp[item][3] = tmp[item][3] == 0 ? 1 : 0,
                                    console.log(tmp)
                                setSnack({
                                    ...snack,
                                    bahan_makanan: tmp
                                })

                            }} value={snack.bahan_makanan[item][3]} label="Telur" img={require('../../assets/m4.png')} />
                            <MyMakanan onPress={() => {
                                let tmp = snack.bahan_makanan;
                                tmp[item][4] = tmp[item][4] == 0 ? 1 : 0,
                                    console.log(tmp)
                                setSnack({
                                    ...snack,
                                    bahan_makanan: tmp
                                })

                            }} value={snack.bahan_makanan[item][4]} label="Nabati dan Kacang-kacangan" img={require('../../assets/m5.png')} />
                            <MyMakanan onPress={() => {
                                let tmp = snack.bahan_makanan;
                                tmp[item][5] = tmp[item][5] == 0 ? 1 : 0,
                                    console.log(tmp)
                                setSnack({
                                    ...snack,
                                    bahan_makanan: tmp
                                })

                            }} value={snack.bahan_makanan[item][5]} label="Susu dan Produk Susu" img={require('../../assets/m6.png')} />
                            <MyMakanan onPress={() => {
                                let tmp = snack.bahan_makanan;
                                tmp[item][6] = tmp[item][6] == 0 ? 1 : 0,
                                    console.log(tmp)
                                setSnack({
                                    ...snacks,
                                    bahan_makanan: tmp
                                })

                            }} value={snack.bahan_makanan[item][6]} label="Buah & Sayur Tinggi Vit A" img={require('../../assets/m7.png')} />
                            <MyMakanan onPress={() => {
                                let tmp = snack.bahan_makanan;
                                tmp[item][7] = tmp[item][7] == 0 ? 1 : 0,
                                    console.log(tmp)
                                setSnack({
                                    ...snack,
                                    bahan_makanan: tmp
                                })

                            }} value={snack.bahan_makanan[item][7]} label="Buah & Sayur Lainnya" img={require('../../assets/m8.png')} />


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

                    <MyRadio onPress={() => {
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
                    <MyGap jarak={10} />
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

                        value={kirim.tambahan2} label="2. Anak diberikan salah satu minuman berikut: Minuman bersoda, minuman berperisa, sport drink, sirup, madu, minuman serbuk, susu berperisa, dan minuman lain yang ditambahkan gula atau pemanis?" />
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

                        value={kirim.tambahan3} label="3. Anak diberikan salah satu makanan berikut: Permen, coklat, manisan, buah yang dikeringkan, es krim, kue manis, biscuit manis, keripik, kerupuk, kentang goreng, mie instan? " />
                    <MyGap jarak={10} />
                    <MyRadio onPress={() => {
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
                    <MyGap jarak={10} />
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

                <View style={{
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                }}>
                    <MyButton title="Kirim" />
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