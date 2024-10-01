import React, { useEffect, useState } from 'react';
import { ImageBackground, View, Image, Text, TouchableOpacity, FlatList, StyleSheet, Modal, PermissionsAndroid } from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Featuredicon from '../../assest/svg/Featuredicon.svg';
import { Screen } from 'react-native-screens';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { useSafeArea } from 'react-native-safe-area-context';

import { setProfileData, setselectlanguage } from '../../redux/index';
import { useSelector, useDispatch } from 'react-redux';
const Successfull = ({ navigation, route }) => {
    const type = route?.params?.type
    const insets = useSafeArea();

    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

    useEffect(() => {
        dispatch(setselectlanguage())
        i18n.changeLanguage(SelectlanguageReducer);
    }, [])

    return (
        <View
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                flex: 1
            }}
        >
            <View style={{ ...StylesGloble.container, justifyContent: "center", alignItems: "center" }}>

                <TouchableOpacity style={{ alignSelf: 'center', marginTop: 25 }}>
                    <Featuredicon />
                </TouchableOpacity>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 20,
                        marginLeft: 20,
                        marginRight: 20,
                    }}>
                    <Text
                        style={{
                            ...StylesGloble.font20700000000,
                            fontWeight: '600',
                        }}>
                        {
                            type == 1 ? t("Payment Successful") : t("Booking Successful")
                        }

                    </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: '500',
                            color: '#5D5D5D',
                            lineHeight: 19,
                            textAlign: 'center',
                            top: 10,
                        }}>
                        {
                            type == 1 ? t(`Your payment request has been successfully submitted for administrative review.`) : t(`Your appointment request has been successfully submitted.We'll contact you soon.`)
                        }

                    </Text>
                    <TouchableOpacity style={{ marginTop: 20, }} onPress={() => navigation.navigate('BottomTab', { screen: "Home" })}>
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '500',
                                color: '#9846D7',
                                textAlign: 'center',
                            }}>
                            {t('Go to Home')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    textper: {
        fontSize: 12,
        fontWeight: '400',
        color: '#000000',
    },
    namestyl: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6D6D6D',
    },
    textheadig: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6D6D6D',
        lineHeight: 19,
    },
});

export default Successfull;
