import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
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
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import ProgressCircle from 'react-native-progress-circle'

export default function AsupanAsiHasil({ navigation, route }) {
    const [data, setData] = useState([]);
    const user = route.params;
    const BULAN = parseFloat(moment().diff(user.tanggal_lahir, 'month', false));
    const [loading, setLoading] = useState(true);
    const [kirim, setKirim] = useState({
        awal: moment().format('YYYY-MM-DD'),
        akhir: moment().format('YYYY-MM-DD')
    });

    const [rekomendasi, setReokemdasi] = useState({
        frekuensi: '',
        tekstur: '',
        porsi: ''
    });

    const [level, setLevel] = useState('');


    const MyHasil = ({ label, value, oke, no, rek }) => {
        return (
            <View style={{
                paddingVertical: 10,
                marginTop: 30, paddingLeft: 10, borderRadius: 10, backgroundColor: value > 0 ? colors.primary : colors.danger, flexDirection: 'row', position: 'relative'
            }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: fonts.secondary[800], fontSize: MyDimensi / 3, color: colors.white }}>{label}</Text>
                    <Text style={{
                        marginTop: 5,
                        fontFamily: fonts.secondary[600],
                        fontSize: MyDimensi / 4,
                        color: colors.white
                    }}>{value > 0 ? oke : no}</Text>
                    <Text style={{
                        marginTop: 5,
                        fontFamily: fonts.secondary[400],
                        fontSize: MyDimensi / 5,
                        color: colors.white
                    }}>Rekomendasi : {rek}</Text>

                    {level !== 'IBU' && <>
                        <TouchableOpacity onPress={() => {
                            axios.post(apiURL + 'insert_pesan', {
                                fid_user: user.id,
                                label: label,
                                rekomendasi: rek
                            }).then(res => {
                                console.log(res.data);
                                if (res.data.status == 200) {

                                    SweetAlert.showAlertWithOptions({
                                        title: MYAPP,
                                        subTitle: res.data.message,
                                        style: 'success',
                                        cancellable: true
                                    });
                                }
                            })
                        }} style={{
                            backgroundColor: colors.white,
                            padding: 10,
                            borderRadius: 10,
                            marginTop: 10,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                flex: 1,
                                color: colors.primary,
                                fontFamily: fonts.secondary[800],
                                fontSize: MyDimensi / 4,
                            }}>Kirim Rekomedasi</Text>
                            <Icon type='ionicon' name='notifications-outline' size={MyDimensi / 3} color={colors.primary} />
                        </TouchableOpacity>
                    </>}
                </View>

                <View style={{ flex: 0.5, }}>
                    <Image style={{ width: 100, height: 100, resizeMode: 'contain', top: -30, zIndex: 99, }} source={value > 0 ? require('../../assets/oke.png') : require('../../assets/no.png')} />
                </View>
            </View>
        )
    }
    useEffect(() => {

        getData('user').then(uu => {
            setLevel(uu.level)
        })
        // #3 PORSI
        if (BULAN >= 6 && BULAN <= 8) {


            setReokemdasi({
                frekuensi: 'Frekuensi makan utama minimal 2 kali sehari dan selingan 1 kali sehari',
                tekstur: 'Tekstur makanan berupa bubur kental',
                porsi: '2-3 sdt - 1/2 mangkok 250 ml',
                bahan: 'Berikan minimal 5 jenis bahan makanan berikut perhari (ASI, makanan pokok, nabati, hewani, telur, susu/produk susu, sayur buah tinggi vit A , sayur buah lainnya',
                konsumsi: 'Berikan telur atau makanan hewani setiap hari',
                minuman: 'Anak seharusnya tidak diberikan minuman manis dan mengandung gula yang tinggi',
                jajanan: 'Anak seharusnya tidak diberikan makanan jajanan tidak sehat',
                sayur_buah: 'Berikan sayur dan buah setiap hari',
                pemberian: 'Tingkatkan interaksi dengan anak  dalam memberikan MPASI',
                kebersihan: 'Perhatikan kebersihan dalam memberikan MPASI',
            })


        } else if (BULAN >= 9 && BULAN <= 11) {

            setReokemdasi({
                frekuensi: 'Frekuensi makan utama minimal 3 kali sehari dan selingan 1 kali sehari',
                tekstur: 'Tekstur makanan berupa makanan cincang dan bisa digenggam',
                porsi: '1/2 - 3/4 mangkok ukuran 250 ml',
                bahan: 'Berikan minimal 5 jenis bahan makanan berikut perhari (ASI, makanan pokok, nabati, hewani, telur, susu/produk susu, sayur buah tinggi vit A , sayur buah lainnya',
                konsumsi: 'Berikan telur atau makanan hewani setiap hari',
                minuman: 'Anak seharusnya tidak diberikan minuman manis dan mengandung gula yang tinggi',
                jajanan: 'Anak seharusnya tidak diberikan makanan jajanan tidak sehat',
                sayur_buah: 'Berikan sayur dan buah setiap hari',
                pemberian: 'Tingkatkan interaksi dengan anak  dalam memberikan MPASI',
                kebersihan: 'Perhatikan kebersihan dalam memberikan MPASI',
            })

        } else if (BULAN >= 12) {
            setReokemdasi({
                frekuensi: 'Frekuensi makan utama minimal 3 kali sehari dan selingan 1 kali sehari',
                tekstur: 'Tekstur makanan Keluarga',
                porsi: '3/4 - 1 mangkok ukuran 250 ml.',
                bahan: 'Berikan minimal 5 jenis bahan makanan berikut perhari (ASI, makanan pokok, nabati, hewani, telur, susu/produk susu, sayur buah tinggi vit A , sayur buah lainnya',
                konsumsi: 'Berikan telur atau makanan hewani setiap hari',
                minuman: 'Anak seharusnya tidak diberikan minuman manis dan mengandung gula yang tinggi',
                jajanan: 'Anak seharusnya tidak diberikan makanan jajanan tidak sehat',
                sayur_buah: 'Berikan sayur dan buah setiap hari',
                pemberian: 'Tingkatkan interaksi dengan anak  dalam memberikan MPASI',
                kebersihan: 'Perhatikan kebersihan dalam memberikan MPASI',
            })

        }


        __getTransaction();
    }, []);

    const [summary, setSummary] = useState({
        total: 0,
        oke: 0,
        no: 0,
    });

    const [all, setAll] = useState({
        total: 0,
        oke: 0,
        no: 0,
    })

    const item_nilai = [
        'Frekuensi',
        'Tekstur',
        'Porsi',
        'Bahan',
        'Konsumsi telur/hewani',
        'Minuman manis',
        'Jajanan tidak sehat',
        'Sayur buah',
        'Cara pemberian',
        'Higienitas',
    ]

    const __getTransaction = () => {
        setLoading(true);
        axios.post(apiURL + 'get_asupan_mpasi', {
            fid_user: route.params.id,
            awal: kirim.awal,
            akhir: kirim.akhir,
        }).then(res => {
            console.log(res.data);
            if (res.data.length > 0) {
                setData(res.data);

                let total = {
                    0: [],
                    1: [],
                    2: [],
                    3: [],
                    4: [],
                    5: [],
                    6: [],
                    7: [],
                    8: [],
                    9: [],

                };
                let oke = {
                    0: [],
                    1: [],
                    2: [],
                    3: [],
                    4: [],
                    5: [],
                    6: [],
                    7: [],
                    8: [],
                    9: [],
                };
                let no = {
                    0: [],
                    1: [],
                    2: [],
                    3: [],
                    4: [],
                    5: [],
                    6: [],
                    7: [],
                    8: [],
                    9: [],
                };

                res.data.map((i, index) => {
                    total[0].push(i.frekuensi);
                    total[1].push(i.tekstur);
                    total[2].push(i.porsi);
                    total[3].push(i.bahan);
                    total[4].push(i.konsumsi);
                    total[5].push(i.minuman);
                    total[6].push(i.jajanan);
                    total[7].push(i.sayur_buah);
                    total[8].push(i.pemberian);
                    total[9].push(i.kebersihan);

                    i.frekuensi > 0 ? oke[0].push(1) : no[0].push(1);
                    i.tekstur > 0 ? oke[1].push(1) : no[1].push(1);
                    i.porsi > 0 ? oke[2].push(1) : no[2].push(1);
                    i.bahan > 0 ? oke[3].push(1) : no[3].push(1);
                    i.konsumsi > 0 ? oke[4].push(1) : no[4].push(1);
                    i.minuman > 0 ? oke[5].push(1) : no[5].push(1);
                    i.jajanan > 0 ? oke[6].push(1) : no[6].push(1);
                    i.sayur_buah > 0 ? oke[7].push(1) : no[7].push(1);
                    i.pemberian > 0 ? oke[8].push(1) : no[8].push(1);
                    i.kebersihan > 0 ? oke[9].push(1) : no[9].push(1);

                });
                setSummary({
                    total: total,
                    oke: oke,
                    no: no
                });

                let allTotal = 0;
                let allOke = 0;
                let allNo = 0;

                item_nilai.map((item, index) => {
                    allTotal += total[index].length;
                    allOke += oke[index].length;
                    allNo += no[index].length;
                });

                setAll({
                    total: allTotal,
                    oke: allOke,
                    no: allNo
                });

                setLoading(false)



            } else {
                showMessage({
                    message: 'Tidak ada riwayat hari ini !'
                })
            }
            // setData(res.data);

        }).finally(() => {
            setLoading(false)
        })
    }


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader judul="Hasil Asupan MPASI" onPress={() => navigation.goBack()} />

            {/* filter */}
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: 10,
                alignItems: 'center'
            }}>
                <View style={{
                    flex: 1,
                    paddingRight: 5,

                }}>
                    <MyCalendar label="Dari" value={kirim.awal} onDateChange={x => {
                        setKirim({
                            ...kirim,
                            awal: x
                        })
                    }} iconname="calendar-outline" />
                </View>
                <View style={{
                    flex: 1,
                    paddingRight: 5,

                }}>
                    <MyCalendar value={kirim.akhir} onDateChange={x => {
                        setKirim({
                            ...kirim,
                            akhir: x
                        })
                    }} label="Sampai" iconname="calendar-outline" />
                </View>
                <View style={{
                    flex: 0.5,
                    // paddingLeft: 5,
                    paddingTop: 20,
                    justifyContent: 'center',

                }}>
                    <TouchableOpacity onPress={__getTransaction} style={{
                        backgroundColor: colors.primary,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 30,
                    }}>
                        <Icon color={colors.white} type='ionicon' name='search' />
                    </TouchableOpacity>
                </View>
            </View>

            {!loading && data.length > 0 &&

                <View style={{
                    flex: 1,
                }}>


                    {data.length == 1 &&

                        <ScrollView style={{
                            padding: 20,
                        }}>
                            <MyHasil label="Frekuensi" value={data[0].frekuensi} oke="Frekuensi  makan sudah sesuai dengan rekomendasi menurut umur" no="Frekuensi pemberian kurang dari 3 kali / anak belum diberikan snack" rek={rekomendasi.frekuensi} />

                            <MyHasil label="Tekstur" value={data[0].tekstur} oke="Tekstur makanan sudah sesuai dengan rekomendasi menurut umur" no="Tekstur makanan sesuai usia seharusnya dalam bentuk tim / bubur kental" rek={rekomendasi.tekstur} />
                            <MyHasil label="Porsi" value={data[0].porsi} oke="Porsi makanan sudah sesuai dengan rekomendasi menurut umur" no="Porsi makanan kurang dari 3/4 mangkok" rek={rekomendasi.porsi} />
                            <MyHasil label="Bahan" value={data[0].bahan} oke="Anak sudah diberikan sumber bahan makanan yang beraneka ragam" no="Anak belum mendapatkan bahan makanan hewani/susu dan produk susu/telur/sayur dan buah tinggi vitamin A" rek={rekomendasi.bahan} />
                            <MyHasil label="Konsumsi telur/hewani" value={data[0].konsumsi} oke="Anak sudah mendapatkan telur dan sumber protein hewani" no="Anak belum mendapatkan telur dan sumber protein hewani" rek={rekomendasi.konsumsi} />
                            <MyHasil label="Minuman manis" value={data[0].minuman} oke="Anak tidak diberikan minuman manis" no="Anak diberikan minuman manis" rek={rekomendasi.minuman} />

                            <MyHasil label="Jajanan tidak sehat" value={data[0].jajanan} oke="Anak tidak diberikan jajanan tidak sehat" no="Anak diberikan jajanan tidak sehat" rek={rekomendasi.jajanan} />

                            <MyHasil label="Sayur buah" value={data[0].sayur_buah} oke="Anak sudah diberikan sayur buah" no="Anak sudah diberikan sayur buah" rek={rekomendasi.sayur_buah} />
                            <MyHasil label="Cara pemberian" value={data[0].pemberian} oke="Cara pemberian sudah sesuai" no="Cara pemberian belum sesuai" rek={rekomendasi.pemberian} />
                            <MyHasil label="Higienitas" value={data[0].kebersihan} oke="Higienitas sudah sesuai" no="Higienitas belum sesuai" rek={rekomendasi.kebersihan} />

                            <MyGap jarak={40} />
                        </ScrollView>

                    }


                    {data.length > 1 &&
                        <ScrollView style={{
                            padding: 20,
                        }}>
                            {item_nilai.map((i, index) => {
                                return (
                                    <View style={{
                                        borderWidth: 1,
                                        padding: 10,
                                        borderRadius: 10,
                                        marginVertical: 5,
                                        borderColor: colors.border,
                                    }}>
                                        <Text style={{
                                            fontFamily: fonts.secondary[800],
                                            fontSize: MyDimensi / 3
                                        }}>{i}</Text>
                                        <View style={{
                                            flexDirection: 'row'
                                        }}>
                                            <View style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <Text style={{
                                                    fontFamily: fonts.secondary[600],
                                                    fontSize: MyDimensi / 4
                                                }}>Total Pengisian</Text>
                                                <Text style={{
                                                    fontFamily: fonts.secondary[800],
                                                    fontSize: MyDimensi / 4
                                                }}>{summary.total[index].length}</Text>
                                            </View>
                                            <View style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <Text style={{
                                                    fontFamily: fonts.secondary[600],
                                                    fontSize: MyDimensi / 4
                                                }}>Sesuai</Text>
                                                <Text style={{
                                                    fontFamily: fonts.secondary[800],
                                                    fontSize: MyDimensi / 4
                                                }}>{summary.oke[index].length}</Text>
                                            </View>
                                            <View style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <Text style={{
                                                    fontFamily: fonts.secondary[600],
                                                    fontSize: MyDimensi / 4
                                                }}>Tidak Sesuai</Text>
                                                <Text style={{
                                                    fontFamily: fonts.secondary[800],
                                                    fontSize: MyDimensi / 4
                                                }}>{summary.no[index].length}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })}

                            <View style={{
                                padding: 10,
                                borderWidth: 1,
                                borderRadius: 10,
                                borderColor: colors.primary,

                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[800],
                                    fontSize: MyDimensi / 3.2,
                                    color: colors.primary
                                }}>Persentase kesesuaian praktek MPASI</Text>

                                <View style={{
                                    flex: 1,
                                    padding: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>

                                    <ProgressCircle
                                        percent={(all.oke / all.total) * 100}
                                        radius={50}
                                        borderWidth={8}
                                        color={colors.primary}
                                        shadowColor={colors.danger}
                                        bgColor="#fff"
                                    >
                                        <Text style={{ fontSize: MyDimensi / 2 }}>{(all.oke / all.total) * 100}%</Text>
                                    </ProgressCircle>

                                    <PieChart
                                        data={[
                                            {
                                                name: "Sesuai",
                                                population: parseFloat(all.oke),
                                                color: colors.primary,
                                                legendFontColor: "#7F7F7F",
                                                legendFontSize: 15
                                            },
                                            {
                                                name: "Tidak Sesuai",
                                                population: parseFloat(all.no),
                                                color: colors.danger,
                                                legendFontColor: "#7F7F7F",
                                                legendFontSize: 15
                                            }
                                        ]}
                                        width={windowWidth - 50}
                                        height={windowWidth / 2}
                                        chartConfig={{
                                            backgroundColor: colors.foourty,
                                            backgroundGradientFrom: colors.foourty,
                                            backgroundGradientTo: colors.foourty,
                                            decimalPlaces: 2, // optional, defaults to 2dp
                                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                            style: {
                                                borderRadius: 16
                                            },
                                            propsForDots: {
                                                r: "6",
                                                strokeWidth: "2",
                                                stroke: "#ffa726",
                                                strokeDasharray: [0, 3]
                                            }
                                        }}
                                        hasLegend

                                        accessor={"population"}
                                        backgroundColor={"transparent"}
                                        paddingLeft={"0"}
                                        // center={[10, 50]}
                                        absolute
                                    />
                                </View>
                            </View>
                            <MyGap jarak={40} />
                        </ScrollView>

                    }


                </View>}

            {
                loading && <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>
            }
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})