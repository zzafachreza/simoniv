import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    ScrollView,
    ImageBackground,
    Dimensions,
    Switch,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { colors } from '../../utils/colors';
import { MyDimensi, fonts, windowWidth } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker, MyCalendar } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { apiURL, api_token, MYAPP } from '../../utils/localStorage';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import { Icon } from 'react-native-elements';
import SweetAlert from 'react-native-sweet-alert';

export default function Register({ navigation }) {

    const LOKASI = [
        {
            id: "1",
            posyandu: "Kasih ibu 15",
            desa: "Kertamulya",
            kecamatan: "Padalarang"
        },
        {
            id: "2",
            posyandu: "Kasih ibu 13",
            desa: "Kertamulya",
            kecamatan: "Padalarang"
        },
        {
            id: "3",
            posyandu: "Kasih ibu 05",
            desa: "Kertamulya",
            kecamatan: "Padalarang"
        },
        {
            id: "4",
            posyandu: "Kasih ibu 05",
            desa: "Kertamulya",
            kecamatan: "Padalarang"
        },
        {
            id: "5",
            posyandu: "kasih Ibu 22",
            desa: "Kertamulya",
            kecamatan: "Padalarang"
        },
        {
            id: "6",
            posyandu: "Mawar Merah",
            desa: "Mekarjaya",
            kecamatan: "Cihampelas"
        },
        {
            id: "7",
            posyandu: "Pitaloka",
            desa: "Mekarjaya",
            kecamatan: "Cihampelas"
        },
        {
            id: "8",
            posyandu: "Dahlia Kuning",
            desa: "Mekarjaya",
            kecamatan: "Cihampelas"
        },
        {
            id: "9",
            posyandu: "Anggrek putih",
            desa: "Mekarjaya",
            kecamatan: "Cihampelas"
        },
        {
            id: "10",
            posyandu: "Kasih Bunda",
            desa: "Mekarjaya",
            kecamatan: "Cihampelas"
        },
        {
            id: "11",
            posyandu: "Anggrek Ungu",
            desa: "Sirnajaya",
            kecamatan: "Gunung Halu"
        },
        {
            id: "12",
            posyandu: "Anyelin",
            desa: "Sirnajaya",
            kecamatan: "Gunung Halu"
        },
        {
            id: "13",
            posyandu: "Al-Hidayah",
            desa: "Sirnajaya",
            kecamatan: "Gunung Halu"
        },
        {
            id: "14",
            posyandu: "Assalam",
            desa: "Sirnajaya",
            kecamatan: "Gunung Halu"
        },
        {
            id: "15",
            posyandu: "Al-Ikhlas",
            desa: "Sirnajaya",
            kecamatan: "Gunung Halu"
        }
    ];


    const [loading, setLoading] = useState(false);
    const [sama, setSama] = useState(true)
    const [data, setData] = useState({
        api_token: api_token,
        level: 'IBU',
        posyandu: "Kasih ibu 15",
        desa: "Kertamulya",
        kecamatan: "Padalarang",
        nama_lengkap: '',
        telepon: '',
        nama_anak: '',
        tanggal_lahir: moment().format('YYYY-MM-DD'),
        jenis_kelamin: 'Laki-laki',
        password: '',
        repassword: '',


    });

    const simpan = () => {


        console.log(data);
        if (
            data.nama_lengkap.length === 0 &&
            data.telepon.length === 0 &&
            data.password.length === 0

        ) {
            showMessage({
                message: 'Formulir pendaftaran tidak boleh kosong !',
            });
        } else if (data.nama_lengkap.length === 0) {
            showMessage({
                message: 'Masukan nama lengkap ibu',
            });
        }

        else if (data.telepon.length === 0) {
            showMessage({
                message: 'Masukan nomor telepon',
            });
        }
        else if (data.password.length === 0) {
            showMessage({
                message: 'Masukan kata sandi kamu',
            });
        } else if (data.repassword.length === 0) {
            showMessage({
                message: 'Ulangi kata sandi kamu',
            });
        } else {



            setLoading(true);
            axios
                .post(apiURL + 'register', data)
                .then(res => {
                    console.warn(res.data);
                    setLoading(false);
                    if (res.data.status == 404) {
                        SweetAlert.showAlertWithOptions({
                            title: MYAPP,
                            subTitle: res.data.message,
                            style: 'error',
                            cancellable: true
                        },
                            callback => navigation.navigate('Login'));

                    } else {
                        SweetAlert.showAlertWithOptions({
                            title: MYAPP,
                            subTitle: res.data.message,
                            style: 'success',
                            cancellable: true
                        },
                            callback => navigation.navigate('Login'));

                    }


                });
        }
    };



    useEffect(() => {

        __getKecamatan();
    }, []);

    const [kecamatan, setKecamatan] = useState([]);
    const [desa, setDesa] = useState([
        { label: 'Kertamulya', value: 'Kertamulya' }
    ]);
    const [posyandu, setPosyandu] = useState([
        { label: 'Kasih ibu 15', value: 'Kasih ibu 15' }
    ]);

    const __getKecamatan = () => {
        let tmp = [];

        LOKASI.map((i, index) => {
            if (index == 0) {

                tmp.push({
                    label: i.kecamatan,
                    value: i.kecamatan
                })
            } else if (index !== 0 && LOKASI[index - 1].kecamatan !== i.kecamatan) {
                tmp.push({
                    label: i.kecamatan,
                    value: i.kecamatan
                })
            }
        })
        console.log(tmp);
        setKecamatan(tmp)
    }

    const _getDesa = (x) => {
        let tmp = [];

        LOKASI.filter(i => i.kecamatan.toLowerCase().indexOf(x.toLowerCase()) > -1).map((i, index) => {
            if (index == 0) {
                tmp.push({
                    label: i.desa,
                    value: i.desa
                })
                setData({
                    ...data,
                    desa: i.desa
                })
            }
        })

        let tmpPOS = [];
        LOKASI.filter(i => i.kecamatan.toLowerCase().indexOf(x.toLowerCase()) > -1).map((i, index) => {
            if (index == 0) {
                setData({
                    ...data,
                    posyandu: i.posyandu
                })
            }
            tmpPOS.push({
                label: i.posyandu,
                value: i.posyandu
            })

        })
        console.log(tmp);
        setDesa(tmp);
        setPosyandu(tmpPOS);

    }





    return (
        <>
            <ImageBackground
                style={{
                    flex: 1,
                    backgroundColor: colors.background,
                    padding: 10,
                    position: 'relative'
                }}>

                {/* <Switch onValueChange={toggleSwitch} value={isEnabled} /> */}
                <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>




                    <View style={{
                        paddingHorizontal: 10,
                    }}>
                        <Text style={{
                            fontSize: MyDimensi / 2,
                            fontFamily: fonts.primary[800],
                            color: colors.black,
                        }}>Daftar</Text>
                        <Text style={{
                            fontSize: MyDimensi / 4,
                            fontFamily: fonts.primary[400],
                            color: colors.black,
                            marginBottom: 10,
                        }}>Silahkan daftar agar bisa login</Text>

                        <MyPicker onValueChange={x => {
                            setData({
                                ...data,
                                level: x
                            })
                        }} label="Jenis Pengguna" iconname="options" value={data.level} data={[
                            { label: 'IBU', value: 'IBU' },
                            { label: 'KADER / NUTRISIONIS', value: 'KADER / NUTRISIONIS' },
                        ]} />


                        <MyGap jarak={10} />
                        <MyPicker onValueChange={x => {
                            setData({
                                ...data,
                                kecamatan: x
                            });

                            _getDesa(x);
                        }} label="Kecamatan" iconname="location-outline" value={data.kecamatan} data={kecamatan} />

                        <MyGap jarak={10} />
                        <MyPicker onValueChange={x => {
                            setData({
                                ...data,
                                desa: x
                            })
                        }} label="Desa" iconname="location-outline" value={data.desa} data={desa} />

                        <MyGap jarak={10} />
                        <MyPicker onValueChange={x => {
                            setData({
                                ...data,
                                posyandu: x
                            })
                        }} label="Posyandu" iconname="home-outline" value={data.posyandu} data={posyandu} />


                        <MyGap jarak={10} />
                        <MyInput
                            placeholder="Masukan nama lengkap"
                            label="Nama Lengkap"
                            iconname="person-outline"
                            value={data.nama_lengkap}
                            onChangeText={value =>
                                setData({
                                    ...data,
                                    nama_lengkap: value,
                                })
                            }
                        />
                        <MyGap jarak={10} />
                        <MyInput
                            placeholder="Masukan alamat"
                            label="Alamat"
                            iconname="location-outline"
                            value={data.alamat}
                            onChangeText={value =>
                                setData({
                                    ...data,
                                    alamat: value,
                                })
                            }
                        />
                        <MyGap jarak={10} />

                        {data.level == 'IBU' &&
                            <>
                                <MyInput
                                    placeholder="Masukan nama anak"
                                    label="Nama Anak"
                                    iconname="person-outline"
                                    value={data.nama_anak}
                                    onChangeText={value =>
                                        setData({
                                            ...data,
                                            nama_anak: value,
                                        })
                                    }
                                />
                                <MyGap jarak={10} />
                                <MyCalendar valueShow={moment(data.tanggal_lahir).format('DD MMMM YYYY')} value={data.tanggal_lahir} onDateChange={x => {
                                    setData({
                                        ...data,
                                        tanggal_lahir: x
                                    })
                                }} iconname="calendar-outline" label="Tanggal Lahir Anak" />
                                <MyGap jarak={10} />
                                <MyPicker value={data.jenis_kelamin} onValueChange={x => {
                                    setData({
                                        ...data,
                                        jenis_kelamin: x
                                    })
                                }} label="Jenis Kelamin Anak" iconname="male-female" data={[
                                    { label: 'Laki-laki', value: 'Laki-laki' },
                                    { label: 'Perempuan', value: 'Perempuan' },
                                ]} />
                                <MyGap jarak={10} />

                            </>

                        }



                        <MyInput
                            placeholder="Masukan nomor telepon"
                            label="Telepon"
                            iconname="call-outline"
                            keyboardType="phone-pad"
                            value={data.telepon}
                            onChangeText={value =>
                                setData({
                                    ...data,
                                    telepon: value,
                                })
                            }
                        />









                        <MyGap jarak={10} />
                        <MyInput
                            placeholder="Masukan kata sandi"
                            label="Kata Sandi"
                            iconname="lock-closed-outline"
                            secureTextEntry
                            value={data.password}
                            onChangeText={value =>
                                setData({
                                    ...data,
                                    password: value,
                                })
                            }
                        />
                        <MyGap jarak={10} />
                        <MyInput
                            borderColor={sama ? colors.primary : colors.danger}
                            borderWidth={sama ? 1 : 1}
                            placeholder="Masukan ulang kata sandi"
                            label="Masukan ulang kata sandi"
                            iconname="lock-closed-outline"
                            secureTextEntry
                            value={data.repassword}
                            onChangeText={value => {

                                if (value !== data.password) {
                                    setSama(false)
                                } else {
                                    setSama(true)
                                }

                                setData({
                                    ...data,
                                    repassword: value,
                                })
                            }

                            }
                        />
                    </View>
                    <MyGap jarak={20} />




                    {!loading &&
                        <>
                            <MyButton


                                title="Daftar"
                                Icons="log-in"
                                onPress={simpan}
                            />

                        </>
                    }

                    <MyGap jarak={10} />
                    {loading && <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ActivityIndicator color={colors.primary} size="large" />
                    </View>}
                </ScrollView>

            </ImageBackground>

        </>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 10,
    },
    image: {
        width: 620 / 4,
        height: 160 / 4,
    },
});
