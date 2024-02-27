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

export default function AsupanAsiHasil({ navigation, route }) {
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
        axios.post(apiURL + 'get_asupan_asi', {
            fid_user: route.params.id,
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


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader judul="Hasil Asupan Asi" onPress={() => navigation.goBack()} />

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
                        });

                        axios.post(apiURL + 'get_asupan_asi', {
                            fid_user: route.params.id,
                            awal: x,
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
                        });

                        axios.post(apiURL + 'get_asupan_asi', {
                            fid_user: route.params.id,
                            awal: kirim.awal,
                            akhir: x,
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
                        __getTransaction();
                    }} label="Sampai" iconname="calendar-outline" />
                </View>

            </View>

            {!loading && data.length > 0 && <View style={{
                flex: 1,
            }}>
                <View style={{
                    margin: 10,
                    flex: 1,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: colors.border,
                    paddingVertical: 10,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        color: colors.primary,
                        fontSize: MyDimensi / 3,
                        marginHorizontal: 10,
                    }}>Asupan ASI</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                        fontSize: MyDimensi / 4.2,
                        marginBottom: 10,
                        marginHorizontal: 10,
                    }}>Periode {moment(kirim.awal).format('DD MMMM YYYY')} s/d {moment(kirim.akhir).format('DD MMMM YYYY')}</Text>

                    <View style={{
                        marginVertical: 5,
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: colors.tertiary,
                        padding: 10,
                        backgroundColor: colors.tertiary,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: MyDimensi / 3,
                            flex: 1,
                        }}>Volume ASI Perah </Text>
                        <Text style={{
                            fontFamily: fonts.secondary[800],
                            fontSize: MyDimensi,
                            flex: 1,
                            textAlign: 'center'
                        }}>{data[0].volume} <Text style={{
                            fontSize: MyDimensi / 5,
                            fontFamily: fonts.secondary[800],
                        }}>ml</Text></Text>

                    </View>

                    <View style={{
                        marginVertical: 5,
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: colors.secondary,
                        padding: 10,
                        backgroundColor: colors.secondary,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: MyDimensi / 3,
                            flex: 1,
                        }}>Frekuensi pemberian </Text>
                        <Text style={{
                            fontFamily: fonts.secondary[800],
                            fontSize: MyDimensi,
                            flex: 1,
                            textAlign: 'center'
                        }}>{data[0].frek} <Text style={{
                            fontSize: MyDimensi / 5,
                            fontFamily: fonts.secondary[800],
                        }}>kali per hari</Text></Text>

                    </View>

                    <View style={{
                        marginVertical: 5,
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderBottomColor: colors.primary,
                        padding: 10,
                        backgroundColor: colors.primary,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: MyDimensi / 3,
                            flex: 1,
                        }}>Rata-rata durasi pemberian </Text>
                        <Text style={{
                            fontFamily: fonts.secondary[800],
                            fontSize: MyDimensi,
                            flex: 1,
                            textAlign: 'center'
                        }}>{data[0].durasi} <Text style={{
                            fontSize: MyDimensi / 5,
                            fontFamily: fonts.secondary[800],
                        }}>/ menit</Text></Text>

                    </View>


                    {/* <View style={{
                        flex: 1,
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <PieChart
                            data={[
                                {
                                    name: "Frekuensi",
                                    population: parseFloat(data[0].frek),
                                    color: colors.secondary,
                                    legendFontColor: "#7F7F7F",
                                    legendFontSize: 15
                                },
                                {
                                    name: "Durasi",
                                    population: parseFloat(data[0].durasi),
                                    color: colors.primary,
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
                    </View> */}
                </View>
            </View>}

            {loading && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator color={colors.primary} size="large" />
            </View>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})