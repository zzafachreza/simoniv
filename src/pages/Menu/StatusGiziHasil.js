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
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
export default function StatusGiziHasil({ navigation, route }) {
    const user = route.params;


    const [berat, setBerat] = useState({
        label: [],
        value: []
    });

    const [bbtt, setBBtt] = useState({
        label: [],
        value: []
    });

    const [imt, setImt] = useState({
        label: [],
        value: []
    });

    const [tinggi, setTinggi] = useState({
        label: [],
        value: []
    });
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.post(apiURL + 'get_status_gizi', {
            fid_user: route.params.id
        }).then(res => {
            console.log(res.data);
            let bl = [];
            let bv = [];
            let tl = [];
            let tv = [];
            let bbttl = [];
            let bbttv = [];
            let imtl = [];
            let imtv = [];
            res.data.map(i => {
                bl.push(moment(i.tanggal).format('MMM-YY'));
                bv.push(parseFloat(i.berat_skor));


                tl.push(moment(i.tanggal).format('MMM-YY'));
                tv.push(parseFloat(i.tinggi_skor))

                bbttl.push(moment(i.tanggal).format('MMM-YY'));
                bbttv.push(parseFloat(i.bbtt_skor))

                imtl.push(moment(i.tanggal).format('MMM-YY'));
                imtv.push(parseFloat(i.imt_skor))
            })


            setBerat({
                label: bl,
                value: bv
            });
            setTinggi({
                label: tl,
                value: tv
            });

            setBBtt({
                label: bbttl,
                value: bbttv
            });

            setImt({
                label: imtl,
                value: imtv
            });
            setData(res.data);
            setLoading(false)
        })
    }, []);



    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.background
        }}>
            <MyHeader judul="Hasil Status Gizi" onPress={() => navigation.goBack()} />

            {!loading &&

                <ScrollView>

                    {/* BB */}
                    <View>
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
                                fontSize: MyDimensi / 4,
                                marginBottom: 10,
                                marginHorizontal: 10,
                            }}>Status Gizi Berat Badan Menurut Umur </Text>
                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: colors.primary,
                                borderBottomWidth: 1,
                                borderBottomColor: colors.primary,
                                paddingVertical: 10,
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: MyDimensi / 4,
                                    color: colors.white,
                                    flex: 0.5,
                                    textAlign: 'center'
                                }}>Bulan</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: MyDimensi / 4,
                                    color: colors.white,
                                    flex: 0.5,
                                    textAlign: 'center'
                                }}>Berat</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: MyDimensi / 4,
                                    color: colors.white,
                                    flex: 0.5,
                                    textAlign: 'center'
                                }}>Z-Score</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: MyDimensi / 4,
                                    color: colors.white,
                                    flex: 1,
                                    textAlign: 'center'
                                }}>Kategori</Text>
                            </View>
                            <FlatList data={data} renderItem={({ item, index }) => {
                                return (
                                    <View style={{
                                        flexDirection: 'row',
                                        borderBottomWidth: 1,
                                        borderBottomColor: colors.border,
                                        paddingVertical: 10,
                                    }}>
                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            fontSize: MyDimensi / 4,
                                            flex: 0.5,
                                            textAlign: 'center'
                                        }}>{moment(item.tanggal).format('MMM YYYY')}</Text>
                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            fontSize: MyDimensi / 4,
                                            flex: 0.5,
                                            textAlign: 'center'
                                        }}>{item.berat_badan}</Text>
                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            fontSize: MyDimensi / 4,
                                            flex: 0.5,
                                            textAlign: 'center'
                                        }}>{item.berat_skor}</Text>

                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            fontSize: MyDimensi / 4,
                                            flex: 1,
                                            textAlign: 'center'
                                        }}>{item.berat_status}</Text>
                                    </View>
                                )
                            }} />
                        </View>
                        <View style={{
                            paddingHorizontal: 10,
                        }}>
                            <LineChart
                                data={{
                                    labels: berat.label,
                                    datasets: [
                                        {
                                            data: berat.value
                                        }
                                    ]
                                }}
                                width={windowWidth - 20} // from react-native
                                height={220}
                                yAxisLabel=""
                                yAxisSuffix=""
                                yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    backgroundColor: colors.primary,
                                    backgroundGradientFrom: colors.primary,
                                    backgroundGradientTo: colors.primary,
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
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
                        </View>
                    </View>

                    {/* TT */}
                    <View>
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
                                color: colors.secondary,
                                fontSize: MyDimensi / 4,
                                marginBottom: 10,
                                marginHorizontal: 10,
                            }}>Status Gizi Panjang/Tinggi Badan Menurut Umur		</Text>
                            <View style={{
                                flexDirection: 'row',
                                borderBottomWidth: 1,
                                borderBottomColor: colors.secondary,
                                paddingVertical: 10,
                                backgroundColor: colors.secondary,
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: MyDimensi / 4,
                                    flex: 0.5,
                                    textAlign: 'center'
                                }}>Bulan</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: MyDimensi / 4,
                                    flex: 1,
                                    textAlign: 'center'
                                }}>Tinggi</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: MyDimensi / 4,
                                    flex: 1,
                                    textAlign: 'center'
                                }}>Z-Score</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: MyDimensi / 4,
                                    flex: 1,
                                    textAlign: 'center'
                                }}>Kategori</Text>
                            </View>
                            <FlatList data={data} renderItem={({ item, index }) => {
                                return (
                                    <View style={{
                                        flexDirection: 'row',
                                        borderBottomWidth: 1,
                                        borderBottomColor: colors.border,
                                        paddingVertical: 10,
                                    }}>
                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            fontSize: MyDimensi / 4,
                                            flex: 0.5,
                                            textAlign: 'center'
                                        }}>{moment(item.tanggal).format('MMM YYYY')}</Text>
                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            fontSize: MyDimensi / 4,
                                            flex: 0.5,
                                            textAlign: 'center'
                                        }}>{item.tinggi_badan}</Text>
                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            fontSize: MyDimensi / 4,
                                            flex: 0.5,
                                            textAlign: 'center'
                                        }}>{item.tinggi_skor}</Text>

                                        <Text style={{
                                            fontFamily: fonts.secondary[600],
                                            fontSize: MyDimensi / 4,
                                            flex: 1,
                                            textAlign: 'center'
                                        }}>{item.tinggi_status}</Text>
                                    </View>
                                )
                            }} />
                        </View>
                        <View style={{
                            paddingHorizontal: 10,
                        }}>

                            <LineChart
                                data={{
                                    labels: tinggi.label,
                                    datasets: [
                                        {
                                            data: tinggi.value
                                        }
                                    ]
                                }}
                                width={windowWidth - 20} // from react-native
                                height={220}
                                yAxisLabel=""
                                yAxisSuffix=""
                                yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    backgroundColor: colors.primary,
                                    backgroundGradientFrom: colors.secondary,
                                    backgroundGradientTo: colors.secondary,
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
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16
                                }}
                            />
                        </View>
                    </View>

                    {/* BBTT */}
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
                            color: colors.tertiary,
                            fontSize: MyDimensi / 4,
                            marginBottom: 10,
                            marginHorizontal: 10,
                        }}>Status Gizi Berat Badan Menurut Tinggi Badan</Text>
                        <View style={{
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderBottomColor: colors.tertiary,
                            paddingVertical: 10,
                            backgroundColor: colors.tertiary,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: MyDimensi / 4,
                                flex: 0.5,
                                textAlign: 'center'
                            }}>Bulan</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: MyDimensi / 4,
                                flex: 1,
                                textAlign: 'center'
                            }}>Tinggi</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: MyDimensi / 4,
                                flex: 1,
                                textAlign: 'center'
                            }}>Z-Score</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: MyDimensi / 4,
                                flex: 1,
                                textAlign: 'center'
                            }}>Kategori</Text>
                        </View>
                        <FlatList data={data} renderItem={({ item, index }) => {
                            return (
                                <View style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    borderBottomColor: colors.border,
                                    paddingVertical: 10,
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        fontSize: MyDimensi / 4,
                                        flex: 0.5,
                                        textAlign: 'center'
                                    }}>{moment(item.tanggal).format('MMM YYYY')}</Text>
                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        fontSize: MyDimensi / 4,
                                        flex: 0.5,
                                        textAlign: 'center'
                                    }}>{item.tinggi_badan}</Text>
                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        fontSize: MyDimensi / 4,
                                        flex: 0.5,
                                        textAlign: 'center'
                                    }}>{item.bbtt_skor}</Text>

                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        fontSize: MyDimensi / 4,
                                        flex: 1,
                                        textAlign: 'center'
                                    }}>{item.bbtt_status}</Text>
                                </View>
                            )
                        }} />
                    </View>
                    <View style={{
                        paddingHorizontal: 10,
                    }}>

                        <LineChart
                            data={{
                                labels: bbtt.label,
                                datasets: [
                                    {
                                        data: bbtt.value
                                    }
                                ]
                            }}
                            width={windowWidth - 20} // from react-native
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix=""
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: colors.tertiary,
                                backgroundGradientFrom: colors.tertiary,
                                backgroundGradientTo: colors.tertiary,
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
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        />
                    </View>

                    {/* IMT */}
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
                            color: colors.tertiary,
                            fontSize: MyDimensi / 4,
                            marginBottom: 10,
                            marginHorizontal: 10,
                        }}>Status Gizi Indeks Massa Tubuh menurut Umur</Text>
                        <View style={{
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderBottomColor: colors.foourty,
                            paddingVertical: 10,
                            backgroundColor: colors.foourty,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: MyDimensi / 4,
                                flex: 0.5,
                                textAlign: 'center'
                            }}>Bulan</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: MyDimensi / 4,
                                flex: 1,
                                textAlign: 'center'
                            }}>Tinggi</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: MyDimensi / 4,
                                flex: 1,
                                textAlign: 'center'
                            }}>Z-Score</Text>
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                fontSize: MyDimensi / 4,
                                flex: 1,
                                textAlign: 'center'
                            }}>Kategori</Text>
                        </View>
                        <FlatList data={data} renderItem={({ item, index }) => {
                            return (
                                <View style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    borderBottomColor: colors.border,
                                    paddingVertical: 10,
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        fontSize: MyDimensi / 4,
                                        flex: 0.5,
                                        textAlign: 'center'
                                    }}>{moment(item.tanggal).format('MMM YYYY')}</Text>
                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        fontSize: MyDimensi / 4,
                                        flex: 0.5,
                                        textAlign: 'center'
                                    }}>{item.tinggi_badan}</Text>
                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        fontSize: MyDimensi / 4,
                                        flex: 0.5,
                                        textAlign: 'center'
                                    }}>{item.imt_skor}</Text>

                                    <Text style={{
                                        fontFamily: fonts.secondary[600],
                                        fontSize: MyDimensi / 4,
                                        flex: 1,
                                        textAlign: 'center'
                                    }}>{item.imt_status}</Text>
                                </View>
                            )
                        }} />
                    </View>
                    <View style={{
                        paddingHorizontal: 10,
                    }}>

                        <LineChart
                            data={{
                                labels: imt.label,
                                datasets: [
                                    {
                                        data: imt.value
                                    }
                                ]
                            }}
                            width={windowWidth - 20} // from react-native
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix=""
                            yAxisInterval={1} // optional, defaults to 1
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
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                        />
                    </View>
                    <MyGap jarak={20} />
                </ScrollView>

            }

            {loading && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})