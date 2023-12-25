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
    const [loading, setLoading] = useState(false);
    const [sama, setSama] = useState(true)
    const [data, setData] = useState({
        api_token: api_token,
        nama_lengkap: '',
        telepon: '',
        nama_anak: '',
        tanggal_lahir: moment().format('YYYY-MM-DD'),
        jenis_kelamin: 'Laki-laki',
        password: '',
        repassword: '',


    });

    const simpan = () => {



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
        } else if (data.password.length === 0) {
            showMessage({
                message: 'Masukan kata sandi kamu',
            });
        } else if (data.repassword.length === 0) {
            showMessage({
                message: 'Ulangi kata sandi kamu',
            });
        } else {

            console.log(data);

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

    const [desa, setDesa] = useState([]);



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
                        <MyInput
                            placeholder="Masukan nama lengkap ibu"
                            label="Nama Lengkap Ibu"
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
