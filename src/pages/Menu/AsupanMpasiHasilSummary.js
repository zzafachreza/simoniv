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

export default function AsupanMpasiHasilSummary({ navigation, route }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [kirim, setKirim] = useState({
        awal: moment().format('YYYY-MM-DD'),
        akhir: moment().format('YYYY-MM-DD')
    })
    useEffect(() => {

        __getTransaction();
    }, []);

    const __getTransaction = () => {
        axios.post(apiURL + 'get_asupan_mpasi_kader', {
            user: route.params,
            awal: kirim.awal,
            akhir: kirim.akhir,
        }).then(res => {
            console.log(res.data);
            if (res.data.length > 0) {
                setData(res.data);

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


    const MyList = ({ label, jumlah, ya, no }) => {

        return (
            <View style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                paddingVertical: 2,
                borderBottomColor: colors.border,
                alignItems: 'center'
            }}>
                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    color: colors.primary,
                    fontSize: 10,
                }}>{label}</Text>
                <Text style={{
                    flex: 0.5,
                    fontFamily: fonts.secondary[600],
                    color: colors.black,
                    fontSize: 10,
                    textAlign: 'center'
                }}>{jumlah}</Text>
                <Text style={{
                    flex: 0.5,
                    fontFamily: fonts.secondary[600],
                    color: colors.black,
                    fontSize: 10,
                    textAlign: 'center'
                }}>{ya}</Text>
                <Text style={{
                    flex: 0.5,
                    fontFamily: fonts.secondary[600],
                    color: colors.black,
                    fontSize: 10,
                    textAlign: 'center'
                }}>{no}</Text>

            </View>
        )
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

            {!loading && data.length > 0 && <View style={{
                flex: 1,
                padding: 20,
            }}>

                <Text style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.black,
                    fontSize: MyDimensi / 28.5,
                    marginBottom: 10,
                    marginHorizontal: 10,
                }}>Periode {moment(kirim.awal).format('DD MMMM YYYY')} s/d {moment(kirim.akhir).format('DD MMMM YYYY')}</Text>




                <FlatList data={data} renderItem={({ item, index }) => {

                    let totalIsi =
                        parseFloat(item.frekuensi_all) +
                        parseFloat(item.tekstur_all) +
                        parseFloat(item.porsi_all) +
                        parseFloat(item.bahan_all) +
                        parseFloat(item.konsumsi_all) +
                        parseFloat(item.minuman_all) +
                        parseFloat(item.jajanan_all) +
                        parseFloat(item.sayur_buah_all) +
                        parseFloat(item.pemberian_all) +
                        parseFloat(item.kebersihan_all) +
                        parseFloat(item.beragam_all);

                    let totalSesuai =

                        parseFloat(item.frekuensi_ya) +
                        parseFloat(item.tekstur_ya) +
                        parseFloat(item.porsi_ya) +
                        parseFloat(item.bahan_ya) +
                        parseFloat(item.konsumsi_ya) +
                        parseFloat(item.minuman_ya) +
                        parseFloat(item.jajanan_ya) +
                        parseFloat(item.sayur_buah_ya) +
                        parseFloat(item.pemberian_ya) +
                        parseFloat(item.kebersihan_ya) +
                        parseFloat(item.beragam_ya);

                    return (
                        <TouchableWithoutFeedback onPress={() => {
                            navigation.navigate('AsupanMpasiHasil', item.userdata)


                        }}>
                            <View style={{
                                marginVertical: 5, borderWidth: 1, borderRadius: 10, borderColor: colors.border, padding: 10,
                            }}>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <View style={{
                                        flex: 1,
                                        marginBottom: 10,
                                    }}>
                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            color: colors.primary,
                                            fontSize: MyDimensi / 28
                                        }}>Nama Ibu</Text>
                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            color: colors.black,
                                            fontSize: MyDimensi / 28
                                        }}>{item.nama_lengkap}</Text>
                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            color: colors.primary,
                                            fontSize: MyDimensi / 28
                                        }}>Nama Anak</Text>
                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            color: colors.black,
                                            fontSize: MyDimensi / 28
                                        }}>{item.nama_anak} <Text style={{
                                            color: colors.danger
                                        }}>( {parseFloat(moment().diff(item.tanggal_lahir, 'month', false))} Bulan )</Text></Text>
                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            color: colors.primary,
                                            fontSize: MyDimensi / 28
                                        }}>Jenis Kelamin</Text>
                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            color: colors.black,
                                            fontSize: MyDimensi / 28
                                        }}> {item.jenis_kelamin}</Text >
                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            color: colors.primary,
                                            fontSize: MyDimensi / 28
                                        }}>Kecamatan / Desa / Posyandu</Text>
                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            color: colors.black,
                                            fontSize: MyDimensi / 28
                                        }}>{item.kecamatan} / {item.desa} / {item.posyandu}</Text>
                                    </View >
                                    <View>
                                        <View style={{
                                            padding: 10,
                                        }}>
                                            <ProgressCircle
                                                percent={(totalSesuai / totalIsi) * 100}
                                                radius={50}
                                                borderWidth={8}
                                                color={colors.primary}
                                                shadowColor={colors.danger}
                                                bgColor="#fff"
                                            >
                                                <Text style={{ fontSize: 18 }}>{((totalSesuai / totalIsi) * 100).toFixed(1)}%</Text>
                                            </ProgressCircle>
                                        </View>
                                    </View>
                                </View >
                                <View style={{
                                    flex: 1,
                                    borderWidth: 1,
                                    padding: 10,
                                    borderRadius: 10,
                                    borderColor: colors.secondary
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        borderBottomWidth: 1,
                                        paddingVertical: 2,
                                        borderBottomColor: colors.border,
                                    }}>
                                        <Text style={{
                                            flex: 1,
                                            fontFamily: fonts.secondary[600],
                                            color: colors.primary,
                                            fontSize: 10,
                                        }}>Item Penilaian</Text>
                                        <Text style={{
                                            flex: 0.5,
                                            fontFamily: fonts.secondary[600],
                                            color: colors.black,
                                            fontSize: 10,
                                            textAlign: 'center'
                                        }}>Pengisian</Text>
                                        <Text style={{
                                            flex: 0.5,
                                            fontFamily: fonts.secondary[600],
                                            color: colors.black,
                                            fontSize: 10,
                                            textAlign: 'center'
                                        }}>Sesuai</Text>
                                        <Text style={{
                                            flex: 0.5,
                                            fontFamily: fonts.secondary[600],
                                            color: colors.black,
                                            fontSize: 10,
                                            textAlign: 'center'
                                        }}>Tidak Sesuai</Text>

                                    </View>
                                    <MyList label="Frekuensi" jumlah={item.frekuensi_all} ya={item.frekuensi_ya} no={item.frekuensi_no} />
                                    <MyList label="Tekstur" jumlah={item.tekstur_all} ya={item.tekstur_ya} no={item.tekstur_no} />
                                    <MyList label="Porsi" jumlah={item.porsi_all} ya={item.porsi_ya} no={item.porsi_no} />
                                    <MyList label="Bahan" jumlah={item.bahan_all} ya={item.bahan_ya} no={item.bahan_no} />
                                    <MyList label="Konsumsi telur/hewani" jumlah={item.konsumsi_all} ya={item.konsumsi_ya} no={item.konsumsi_no} />
                                    <MyList label="MP-ASI beragam dan mengandung hewani" jumlah={item.beragam_all} ya={item.beragam_ya} no={item.beragam_no} />
                                    <MyList label="Minuman manis" jumlah={item.minuman_all} ya={item.minuman_ya} no={item.minuman_no} />
                                    <MyList label="Jajanan tidak sehat" jumlah={item.jajanan_all} ya={item.jajanan_ya} no={item.jajanan_no} />
                                    <MyList label="Sayur buah" jumlah={item.sayur_buah_all} ya={item.sayur_buah_ya} no={item.sayur_buah_no} />
                                    <MyList label="Cara pemberian" jumlah={item.pemberian_all} ya={item.pemberian_ya} no={item.pemberian_no} />
                                    <MyList label="Higienitas" jumlah={item.kebersihan_all} ya={item.kebersihan_ya} no={item.kebersihan_no} />



                                </View>
                            </View >
                        </TouchableWithoutFeedback >
                    )
                }} />


            </View >}

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