import React, { useState, useEffect } from 'react';
import {
    ImageBackground,
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    Modal,
} from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Header from '../../helper/Header';
import Arrowright from '../../assest/svg/Arrowright.svg';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { setProfileData, setselectlanguage } from '../../redux/index';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';

const TravelHealthInfo = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
const insets = useSafeArea();

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
<View style={StylesGloble.container}>
            <Header name={t('Travel Health Information')} />

            <View style={{ ...StylesGloble.marginscreen, marginTop: 15 }}>
                <TouchableOpacity
                    style={{ flexDirection: "row", justifyContent: "space-between" }} onPress={() => navigation.navigate('GetVaccinationRecords')}>
                    <View
                        style={{}}>
                        <Text style={{ ...StylesGloble.font165005D5D5D, }}>
                            {t('Vaccination Records')}
                        </Text>
                    </View>
                    <View>
                        <Arrowright />
                    </View>


                </TouchableOpacity>
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderBottomColor: '#D1D1D1',
                        marginTop: 15,
                        marginBottom: 15
                    }}
                />

                <TouchableOpacity
                    style={{ flexDirection: "row", justifyContent: "space-between" }} onPress={() => navigation.navigate('GetTravelHistory')}>
                    <View
                        style={{}}>
                        <Text style={{ ...StylesGloble.font165005D5D5D, }}>
                            {t('Travel History')}
                        </Text>
                    </View>
                    <View>
                        <Arrowright />
                    </View>


                </TouchableOpacity>
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderBottomColor: '#D1D1D1',
                        marginTop: 15,
                        marginBottom: 15
                    }}
                />
                <TouchableOpacity
                    style={{ flexDirection: "row", justifyContent: "space-between" }} onPress={() => navigation.navigate('GetInsuranceInfo')}>
                    <View
                        style={{}}>
                        <Text style={{ ...StylesGloble.font165005D5D5D, }}>
                            {t('Insurance Information')}
                        </Text>
                    </View>
                    <View>
                        <Arrowright />
                    </View>


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

export default TravelHealthInfo;
