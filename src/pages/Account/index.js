import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { windowWidth, fonts, MyDimensi } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap, MyHeader } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { ScrollView } from 'react-native';

export default function ({ navigation, route }) {
    const [user, setUser] = useState({});
    const [com, setCom] = useState({});
    const isFocused = useIsFocused();
    const [wa, setWA] = useState('');
    const [open, setOpen] = useState(false);
    const [pont, setPoint] = useState({});



    useEffect(() => {


        if (isFocused) {
            getData('user').then(res => {
                console.log(res);

                setUser(res);
                axios.post(apiURL + 'poin', {
                    fid_user: res.id
                }).then(res => {
                    console.log(res.data.data);
                    setPoint(res.data.data)
                    setOpen(true);
                })


            });
        }




    }, [isFocused]);



    const btnKeluar = () => {
        Alert.alert(MYAPP, 'Apakah kamu yakin akan keluar ?', [
            {
                text: 'Batal',
                style: "cancel"
            },
            {
                text: 'Keluar',
                onPress: () => {
                    storeData('user', null);

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Splash' }],
                    });
                }
            }
        ])
    };

    const MyList = ({ label, value }) => {
        return (
            <View
                style={{
                    marginVertical: 2,
                    paddingTop: 2,
                    paddingHorizontal: 10,
                    backgroundColor: colors.white,
                    borderRadius: 5,
                }}>
                <Text
                    style={{
                        fontFamily: fonts.primary[400],
                        color: colors.primary,
                        fontSize: MyDimensi / 28,
                    }}>
                    {label}
                </Text>
                <Text
                    style={{
                        fontFamily: fonts.primary[400],
                        color: colors.black,
                        fontSize: MyDimensi / 28,
                    }}>
                    {value}
                </Text >
            </View >
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.background
        }}>


            <MyHeader judul="Profile" onPress={() => navigation.goBack()} />
            {!open && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}
            <ScrollView>
                {open &&
                    <>


                        <View style={{
                            margin: 5,
                            flex: 1,
                        }}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    width: 100,
                                    height: 100,
                                    borderWidth: 1,
                                    borderColor: colors.border,
                                    overflow: 'hidden',
                                    borderRadius: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>

                                    <Image source={{
                                        uri: user.foto_user
                                    }} style={{
                                        width: 100,
                                        height: 100,

                                    }} />

                                </View>
                            </View>
                            <Text style={{
                                fontFamily: fonts.secondary[800],
                                fontSize: 14,
                                textAlign: 'center',
                                marginVertical: 10,
                                color: colors.primary
                            }}>{user.level}</Text>
                            <View style={{ padding: 10, }}>
                                <MyList label="Nama Lengkap" value={user.nama_lengkap} />
                                <MyList label="Telepon / Whatsapp" value={user.telepon} />
                                <MyList label="Alamat" value={user.alamat} />
                                <MyList label="Kecamatan" value={user.kecamatan} />
                                <MyList label="Desa" value={user.desa} />
                                <MyList label="Posyandu" value={user.posyandu} />

                                {user.level == 'IBU' &&
                                    <>
                                        <MyList label="Nama Anak" value={user.nama_anak} />
                                        <MyList label="Tanggal Lahir Anak" value={moment(user.tanggal_lahir).format('DD MMMM YYYY')} />
                                        <MyList label="Jenis Kelamin" value={user.jenis_kelamin} />


                                        <View style={{
                                            marginTop: 10,
                                            padding: 10,
                                            borderWidth: 1,
                                            borderColor: colors.border,
                                            borderRadius: 10,
                                        }}>
                                            <Text style={{
                                                fontFamily: fonts.secondary[600],
                                                fontSize: 14
                                            }}>Poin Game Kuis</Text>
                                            <View style={{
                                                marginTop: 10,
                                                justifyContent: 'space-around'
                                            }}>
                                                <MyList label="STAGE 1" value={pont.stage1} />
                                                <MyList label="STAGE 2" value={pont.stage2} />
                                                <MyList label="STAGE 3" value={pont.stage3} />
                                                <MyList label="STAGE 4" value={pont.stage4} />
                                                <MyList label="STAGE 5" value={pont.stage5} />
                                                <MyList label="MPASI" value={pont.mpasi} />
                                            </View>
                                            <Text style={{
                                                fontFamily: fonts.secondary[800],
                                                fontSize: 18,
                                                color: colors.black,
                                                marginTop: 10,
                                            }}>Total : {parseFloat(parseFloat(pont.mpasi) + parseFloat(pont.stage1) + parseFloat(pont.stage2) + parseFloat(pont.stage3) + parseFloat(pont.stage4) + parseFloat(pont.stage5))} Poin</Text>
                                        </View>
                                    </>
                                }


                            </View>
                            {/* data detail */}
                        </View>
                    </>
                }
                <View style={{
                    padding: 20,
                }}>
                    <MyButton warna={colors.primary} title="Edit Profile" Icons="create-outline" onPress={() => navigation.navigate('AccountEdit', user)} />
                    <MyGap jarak={10} />
                    <MyButton onPress={btnKeluar} warna={colors.secondary} title="Log Out" Icons="log-out-outline" iconColor={colors.white} colorText={colors.white} />
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
