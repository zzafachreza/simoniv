import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { apiURL } from '../../utils/localStorage';
import moment from 'moment';
import { MyHeader } from '../../components';
export default function Game({ navigation, route }) {
    const item = route.params;
    const [data, setData] = useState([

        {
            stage: 'STAGE 1'
        },
        {
            stage: 'STAGE 2'
        },
        {
            stage: 'STAGE 3'
        },
        {
            stage: 'STAGE 4'
        },
        {
            stage: 'STAGE 5'
        },
    ]);
    const [loading, setLoading] = useState(false);


    const __renderItem = ({ item, index }) => {
        return (

            <TouchableWithoutFeedback onPress={() => {
                navigation.navigate('GameDetail', item)
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: windowHeight / 7,
                    backgroundColor: colors.primary,
                    marginVertical: 10,
                    padding: 10,

                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: MyDimensi / 2,
                        color: colors.white,
                        flex: 1,
                    }}>{item.stage}</Text>
                    <Icon type='ionicon' name='arrow-forward-circle-outline' color={colors.white} size={MyDimensi} />
                </View>
            </TouchableWithoutFeedback>

        )
    }

    const [key, setKey] = useState('');
    const [TMP, setTMP] = useState({});

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <MyHeader judul="Game Kuis" onPress={() => navigation.goBack()} />
            {!loading &&
                <View style={{
                    flex: 1,
                    paddingHorizontal: 20,
                }}>

                    <FlatList data={data} numColumns={1} showsVerticalScrollIndicator={false} renderItem={__renderItem} />

                </View>
            }
            {loading &&
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size="large" color={colors.primary} />

                </View>
            }



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})