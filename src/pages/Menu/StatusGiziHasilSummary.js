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

export default function StatusGiziHasilSummary({ navigation, route }) {
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
        axios.post(apiURL + 'get_status_gizi_kader', {
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


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader judul="Hasil Status Gizi" onPress={() => navigation.goBack()} />

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
                    fontSize: MyDimensi / 4.5,
                    marginBottom: 10,
                    marginHorizontal: 10,
                }}>Periode {moment(kirim.awal).format('DD MMMM YYYY')} s/d {moment(kirim.akhir).format('DD MMMM YYYY')}</Text>

                <FlatList data={data} renderItem={({ item, index }) => {
                    return (
                        <View style={{
                            marginVertical: 5,
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: colors.border,
                            padding: 10,
                        }}>
                            <View style={{
                                flex: 0.7,
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    color: colors.primary,
                                    fontSize: MyDimensi / 4
                                }}>Nama Ibu</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    color: colors.black,
                                    fontSize: MyDimensi / 4
                                }}>{item.userdata.nama_lengkap}</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    color: colors.primary,
                                    fontSize: MyDimensi / 4
                                }}>Nama Anak</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    color: colors.black,
                                    fontSize: MyDimensi / 4
                                }}>{item.userdata.nama_anak} <Text style={{
                                    color: colors.danger
                                }}>( {parseFloat(moment().diff(item.userdata.tanggal_lahir, 'month', false))} Bulan )</Text></Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    color: colors.primary,
                                    fontSize: MyDimensi / 4
                                }}>Jenis Kelamin</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    color: colors.black,
                                    fontSize: MyDimensi / 4
                                }}>{item.userdata.jenis_kelamin}</Text>
                            </View>
                            <View style={{
                                marginTop: 10,
                                borderWidth: 1,
                                borderColor: colors.border,
                                borderRadius: 10,
                                flex: 1,
                            }}>

                                {/* BB */}
                                <View>
                                    <View style={{
                                        flex: 1,
                                        borderRadius: 10,
                                        borderColor: colors.border,
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

                                    </View>

                                </View>

                                {/* TT */}
                                <View>
                                    <View style={{
                                        marginTop: 10,
                                        flex: 1,
                                        borderColor: colors.border,
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

                                    </View>

                                </View>
                                {/* BBTT */}
                                <View style={{
                                    marginTop: 10,
                                    flex: 1,
                                    borderColor: colors.border,
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

                                </View>

                                {/* IMT */}
                                <View style={{
                                    marginTop: 10,
                                    flex: 1,
                                    borderColor: colors.border,
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

                                    <View style={{
                                        flexDirection: 'row',

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

                                </View>

                            </View>
                        </View>
                    )
                }} />

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