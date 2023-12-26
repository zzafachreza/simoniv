import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import MyCarouser from '../../components/MyCarouser';
import { Rating } from 'react-native-ratings';
import { MyGap } from '../../components';

export default function Home({ navigation, route }) {



  const [user, setUser] = useState({});
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState({});

  const _getTransaction = async () => {


    await getData('user').then(u => {
      setUser(u);
    })

    await axios.post(apiURL + 'company').then(res => {

      setComp(res.data.data);

    });

    await axios.post(apiURL + 'menu').then(res => {

      console.log(res.data);
      setData(res.data);

    });
  }


  useEffect(() => {
    if (isFocus) {
      _getTransaction();
    }
  }, [isFocus]);

  const __renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate(item.modul, item)}>
        <View style={{
          flex: 1,
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: colors.secondary,
          // backgroundColor: colors.white,
          margin: 5,
          height: windowHeight / 8,
        }}>

          <Image source={{
            uri: item.image
          }} style={{
            // flex: 1,
            width: 40,
            height: 40,
            resizeMode: 'contain'
          }} />
          <Text style={{
            marginTop: 10,
            fontFamily: fonts.secondary[600],
            fontSize: 8,
            color: colors.secondary,
            textAlign: 'center'
          }}>{item.judul}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }


  return (

    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.background,
      position: 'relative'
    }}>







      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.myback,
        paddingHorizontal: 10,
        paddingTop: 10,
      }}>
        <Image source={{
          uri: user.foto_user
        }} style={{
          width: 50,
          height: 50,
          borderRadius: 30,
        }} />
        <View style={{
          flex: 1,
          paddingLeft: 10,
        }}>
          <Text style={{
            fontFamily: fonts.secondary[800],
            fontSize: MyDimensi / 3,
            color: colors.black
          }}>{user.nama_anak}</Text>

        </View>
        <Text style={{
          fontFamily: fonts.secondary[800],
          fontSize: MyDimensi / 3,
          color: colors.foourty
        }}>(Usia) Bulan</Text>

      </View>
      <View style={{
        backgroundColor: colors.myback,
        paddingBottom: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        {[
          parseFloat(moment().diff(user.tanggal_lahir, 'month', false)) - 2,
          parseFloat(moment().diff(user.tanggal_lahir, 'month', false)),
          parseFloat(moment().diff(user.tanggal_lahir, 'month', false)) + 1,
          parseFloat(moment().diff(user.tanggal_lahir, 'month', false)) + 2
        ].map(i => {
          return (
            <Text style={{
              fontFamily: fonts.secondary[800],
              fontSize: parseFloat(moment().diff(user.tanggal_lahir, 'month', false)) == i ? MyDimensi / 0.8 : MyDimensi / 1,
              color: parseFloat(moment().diff(user.tanggal_lahir, 'month', false)) == i ? colors.primary : colors.foourty
            }}>{i}</Text>
          )
        })}
      </View>

      {/* header */}


      <View style={{
        // flex: 1,
        marginTop: 20,
        padding: 10,
      }}>
        <FlatList numColumns={4} data={data} renderItem={({ item }) => {
          return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate(item.halaman)}>
              <View style={{
                flex: 1,
                borderWidth: 0,
                borderRadius: 10,
                borderColor: colors.border,
                backgroundColor: item.warna,
                margin: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Image source={{
                  uri: item.image
                }} style={{
                  marginTop: 10,
                  width: windowWidth / 7.5,
                  height: windowWidth / 7.5,
                }} />
                <View style={{
                  // backgroundColor: colors.primary,
                  width: '100%',
                  height: 40,
                  justifyContent: 'center'
                }}>
                  <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: MyDimensi / 4,
                    textAlign: 'center',

                  }}>{item.judul}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )
        }} />
        <MyGap jarak={30} />
        <View style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          marginBottom: 10,
        }}>
          <Text style={{
            flex: 1,
            fontFamily: fonts.secondary[600],
            fontSize: MyDimensi / 4
          }}>Artikel Terbaru</Text>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Artikel')}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: MyDimensi / 4,
              color: colors.primary
            }}>Lihat semua</Text>
          </TouchableWithoutFeedback>
        </View>
        <MyCarouser />
      </View>



    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  tulisan: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: fonts.secondary[600],
    color: colors.black,
    textAlign: 'justify'
  },
  tulisanJudul: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: fonts.secondary[800],
    color: colors.black,
    textAlign: 'justify'
  }
})