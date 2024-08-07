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
        posyandu: "",
        provinsi: '',
        kota: '',
        desa: "",
        kecamatan: "",
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
        else if (data.nama_anak.length === 0) {
            showMessage({
                message: 'Masukan nama anak',
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
        __getProvinsi();

    }, []);

    const [provinsi, setProvinsi] = useState([]);
    const [kota, setKota] = useState([]);
    const [kecamatan, setKecamatan] = useState([]);
    const [desa, setDesa] = useState([]);

    const __getProvinsi = () => {
        axios.get('https://zzafachreza.github.io/api-wilayah-indonesia/api/provinces.json').then(res => {

            let tmp = [];
            tmp.push({ label: '', value: '' })
            res.data.map(i => {
                tmp.push({
                    label: i.name,
                    value: i.id + '#' + i.name
                })
            })
            setProvinsi(tmp);
        })
    }

    const __getKota = (x) => {
        axios.get(`https://zzafachreza.github.io/api-wilayah-indonesia/api/regencies/${x}.json`).then(res => {
            let tmp = [];
            tmp.push({ label: '', value: '' })
            res.data.map(i => {
                tmp.push({
                    label: i.name,
                    value: i.id + '#' + i.name
                })
            })
            setKota(tmp);

        })
    }

    const __getKecamatan = (x) => {
        axios.get(`https://zzafachreza.github.io/api-wilayah-indonesia/api/districts/${x}.json`).then(res => {

            let tmp = [];
            tmp.push({ label: '', value: '' })
            res.data.map(i => {
                tmp.push({
                    label: i.name,
                    value: i.id + '#' + i.name
                })
            })
            setKecamatan(tmp);

        })
    }

    const __getDesa = (x) => {
        axios.get(`https://zzafachreza.github.io/api-wilayah-indonesia/api/villages/${x}.json`).then(res => {


            let tmp = [];
            tmp.push({ label: '', value: '' })
            res.data.map(i => {
                tmp.push({
                    label: i.name,
                    value: i.id + '#' + i.name
                })
            })
            setDesa(tmp);
        })
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
                            fontSize: MyDimensi / 20,
                            fontFamily: fonts.primary[800],
                            color: colors.black,
                        }}>Daftar</Text>
                        <Text style={{
                            fontSize: MyDimensi / 24,
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
                            { label: 'KADER', value: 'KADER' },
                            { label: 'TENAGA KESEHATAN', value: 'TENAGA KESEHATAN' },
                        ]} />


                        <MyGap jarak={10} />
                        <MyPicker onValueChange={x => {

                            setData({
                                ...data,
                                provinsi: x.split("#")[1],
                            });
                            __getKota(x.split("#")[0]);
                        }} label="Provinsi" iconname="options" data={provinsi} />

                        <MyGap jarak={10} />
                        <MyPicker onValueChange={x => {
                            setData({
                                ...data,
                                kota: x.split("#")[1],
                            });
                            __getKecamatan(x.split("#")[0]);
                        }} label="Kabupaten / Kota" iconname="options" data={kota} />


                        <MyGap jarak={10} />
                        <MyPicker onValueChange={x => {
                            setData({
                                ...data,
                                kecamatan: x.split("#")[1],
                            });

                            __getDesa(x.split("#")[0]);
                        }} label="Kecamatan" iconname="location-outline" data={kecamatan} />

                        <MyGap jarak={10} />
                        {data.level != 'TENAGA KESEHATAN' &&
                            <>
                                <MyPicker onValueChange={x => {
                                    setData({
                                        ...data,
                                        desa: x.split("#")[1],
                                    })
                                }} label="Desa / Kelurahan" iconname="location-outline" data={desa} />

                                <MyGap jarak={10} />
                                <MyInput iconname="home-outline" label="Posyandu" onChangeText={x => {
                                    setData({
                                        ...data,
                                        posyandu: x
                                    })
                                }} />
                                <MyGap jarak={10} />
                            </>

                        }

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
