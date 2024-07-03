import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MyDimensi, colors, fonts, windowWidth } from '../../utils'
import { TouchableWithoutFeedback } from 'react-native'
import { Icon, ListItem, Button } from 'react-native-elements';
export default function MyRadio({ label, iconname, value, onPress, onPress2 }) {
    return (
        <View style={{

        }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 0,
                    position: 'relative'
                }}>
                <Icon type="ionicon" name={iconname} color={colors.primary} size={MyDimensi / 4} />
                <Text
                    style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.primary,
                        left: 10,
                        fontSize: MyDimensi / 7,
                        maxWidth: '95%'
                    }}>
                    {label}
                </Text>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
                width: '90%',
                paddingLeft: 10,
            }}>
                <TouchableWithoutFeedback onPress={onPress}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            width: 20,
                            height: 20,
                            backgroundColor: colors.border,
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>

                            {value == 'Ya' && <View style={{
                                width: 15,
                                height: 15,
                                backgroundColor: colors.primary,
                                borderRadius: 100,
                            }} />}
                        </View>

                        <Text style={{
                            left: 10,
                            fontFamily: fonts.secondary[600],
                            fontSize: MyDimensi / 7
                        }}>Ya</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={onPress2}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={{
                            width: 20,
                            height: 20,
                            backgroundColor: colors.border,
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {value == 'Tidak' && <View style={{
                                width: 15,
                                height: 15,
                                backgroundColor: colors.primary,
                                borderRadius: 100,
                            }} />}
                        </View>

                        <Text style={{
                            left: 10,
                            fontFamily: fonts.secondary[600],
                            fontSize: MyDimensi / 7
                        }}>Tidak</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})