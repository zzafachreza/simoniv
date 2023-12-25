import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { MyDimensi, colors, fonts, windowWidth } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { getData } from '../../utils/localStorage';
import MyMenu from '../MyMenu';
export default function MyHeader({ onPress, judul }) {

  return (


    <View style={{
      flexDirection: 'row',
      backgroundColor: colors.white,
      padding: 5,
      height: 60,
      marginBottom: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    }}>
      <TouchableOpacity onPress={onPress} style={{
        padding: 5,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: colors.border,
      }}>
        <Icon type='ionicon' name='chevron-back-outline' size={MyDimensi / 2} color={colors.black} />
      </TouchableOpacity>
      <Text style={{
        flex: 1,
        left: 20,
        textAlign: 'left',
        fontFamily: fonts.secondary[600],
        fontSize: MyDimensi / 3,
        color: colors.black
      }}>{judul}</Text>
    </View>

  );
}

const styles = StyleSheet.create({});
