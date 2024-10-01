import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, PermissionsAndroid, Modal, Dimensions, Platform } from 'react-native';
import { StylesGloble } from '../../../helper/GlobleCss';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {  setselectlanguage } from '../../../redux/index';
import { useTranslation } from 'react-i18next';
import '../../../language/i18';

const Immigration = (props) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

    useEffect(() => {
        dispatch(setselectlanguage())
        i18n.changeLanguage(SelectlanguageReducer);
    }, [])

    return (
        <View >
            <View style={{borderWidth: 1,borderColor: '#D1D1D1',borderRadius: 10,backgroundColor: '#FFFFFF', marginTop: 25,padding: 15}}>
                <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ ...StylesGloble.font16600black,fontWeight: '700', alignSelf: "center"}}>
                            {t('Details')}
                        </Text>
                        {
                            props.bookingdetail.booking_status == 'In-Progress' ? (
                                <View style={{ alignSelf: "center" }}>
                                    <Text style={{ fontSize: 14, color: "#FFC700", fontWeight: "500", backgroundColor: "#FFC70030", padding: 5, borderRadius: 25 }}>
                                        {props.bookingdetail.booking_status}
                                    </Text>
                                </View>
                            ) : props.bookingdetail.booking_status == "Pending" ? (
                                <View style={{ alignSelf: "center" }}>
                                    <Text style={{ fontSize: 14, color: "#FFC700", fontWeight: "500", backgroundColor: "#FFC70030", padding: 5, borderRadius: 25 }}>
                                        {props.bookingdetail.booking_status}
                                    </Text>
                                </View>
                            ) : props.bookingdetail.booking_status == 'Completed' ? (
                                <View style={{ alignSelf: "center" }}>
                                    <Text style={{ fontSize: 14, color: "#039B00", fontWeight: "500", backgroundColor: "#039B0030", padding: 5, borderRadius: 25 }}>
                                        {props.bookingdetail.booking_status}
                                    </Text>
                                </View>
                            ) : props.bookingdetail.booking_status == 'Rejected' ? (
                                <View style={{ alignSelf: "center" }}>
                                    <Text style={{ fontSize: 14, color: "#FF0000", fontWeight: "500", backgroundColor: "#FF000030", padding: 5, borderRadius: 25 }}>
                                        {props.bookingdetail.booking_status}
                                    </Text>
                                </View>
                            ) : null
                        }
                    </View>
                    <View style={{borderBottomWidth: 1,borderBottomColor: '#D1D1D1',marginTop: 15, marginBottom: 15}}/>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between',}}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Mode')}</Text>
                        <Text style={{...StylesGloble.fon14700b000000,fontWeight: '600',}}>
                            {props.bookingdetail?.bookingDetails?.mode}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between',marginTop: 10,}}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('First name')}</Text>
                        <Text style={{...StylesGloble.fon14700b000000,fontWeight: '600',}}>
                            {props.bookingdetail?.bookingDetails?.first_name}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between',marginTop: 10,}}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Middle name')}</Text>
                        <Text style={{...StylesGloble.fon14700b000000,fontWeight: '600',}}>
                            {props.bookingdetail?.bookingDetails?.middle_name}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between',marginTop: 10,}}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Last name')}</Text>
                        <Text style={{...StylesGloble.fon14700b000000,fontWeight: '600',}}>
                            {props.bookingdetail?.bookingDetails?.last_name}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between',marginTop: 10,}}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Date of birth')}</Text>
                        <Text style={{...StylesGloble.fon14700b000000,fontWeight: '600',}}>
                            {moment(props.bookingdetail?.bookingDetails?.date_of_birth).format('ll')}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between',marginTop: 10,}}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Place of birth')}</Text>
                        <Text style={{...StylesGloble.fon14700b000000,fontWeight: '600',}}>
                            {props.bookingdetail?.bookingDetails?.birth_city}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between',marginTop: 10,}}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Country')}</Text>
                        <Text style={{...StylesGloble.fon14700b000000,fontWeight: '600',}}>
                            {props.bookingdetail?.bookingDetails?.country}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between',marginTop: 10,}}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Nationality')}</Text>
                        <Text style={{...StylesGloble.fon14700b000000,fontWeight: '600',}}>
                            {props.bookingdetail?.bookingDetails?.nationality}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between',marginTop: 10,}}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Alien Registration Number')}</Text>
                        <Text style={{...StylesGloble.fon14700b000000,fontWeight: '600',}}>
                            {props.bookingdetail?.bookingDetails?.alien_registration}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between',marginTop: 10,}}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Gender')}</Text>
                        <Text style={{...StylesGloble.fon14700b000000,fontWeight: '600',}}>
                            {props.bookingdetail?.bookingDetails?.sex}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop: 10,}}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Marital Status')}</Text>
                        <Text style={{...StylesGloble.fon14700b000000,fontWeight: '600',}}>
                            {props.bookingdetail?.bookingDetails?.marital_status}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{borderWidth: 1, borderColor: '#D1D1D1',borderRadius: 10,backgroundColor: '#FFFFFF',marginTop: 25,padding: 15}}>
                <View>
                    <View style={{ flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center',}}>
                        <View>
                            <Text style={{...StylesGloble.font16600black,fontWeight: '700',}}>
                                {t('Permanent Address')}
                            </Text>
                        </View>
                    </View>
                    <View style={{borderBottomWidth: 1, borderBottomColor: '#D1D1D1',marginTop: 15, marginBottom: 15}}/>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between',}}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Mailing Address')}</Text>
                        <Text style={{...StylesGloble.fon14700b000000,fontWeight: '600',}}>
                            {props.bookingdetail?.bookingDetails?.permanent_mailing_address}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop: 10}}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Street and Number')}</Text>
                        <Text style={{...StylesGloble.fon14700b000000,fontWeight: '600',}}>
                            {props.bookingdetail?.bookingDetails?.permanent_street_number}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop: 10}}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Apartment or Unit')}</Text>
                        <Text style={{...StylesGloble.fon14700b000000,fontWeight: '600',}}>
                            {props.bookingdetail?.bookingDetails?.permanent_apartment}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('City')}</Text>
                        <Text style={{...StylesGloble.fon14700b000000,fontWeight: '600',}}>
                            {props.bookingdetail?.bookingDetails?.permanent_city}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop: 10}}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('State')}</Text>
                        <Text style={{...StylesGloble.fon14700b000000,fontWeight: '600',}}>
                            {props.bookingdetail?.bookingDetails?.permanent_state}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between', marginTop: 10}}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Zip Code')}</Text>
                        <Text style={{...StylesGloble.fon14700b000000,fontWeight: '600',}}>
                            {props.bookingdetail?.bookingDetails?.permanent_zip_code}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{borderWidth: 1,borderColor: '#D1D1D1',borderRadius: 10,backgroundColor: '#FFFFFF',marginTop: 25,padding: 15}}>
                <View>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',}}>
                        <View>
                            <Text style={{...StylesGloble.font16600black,fontWeight: '700',}}>
                                {t('Current Address')}
                            </Text>
                        </View>
                    </View>
                    <View style={{borderBottomWidth: 1,borderBottomColor: '#D1D1D1', marginTop: 15, marginBottom: 15}}/>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Mailing Address')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.bookingDetails?.current_mailing_address}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between', marginTop: 10
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Street and Number')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.bookingDetails?.current_street_number}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between', marginTop: 10
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Apartment or Unit')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.bookingDetails?.current_apartment}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between', marginTop: 10
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('City')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.bookingDetails?.current_city}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between', marginTop: 10
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('State')}</Text>
                        <Text
                            style={{
                                ...StylesGloble.fon14700b000000,
                                fontWeight: '600',
                            }}>
                            {props.bookingdetail?.bookingDetails?.current_state}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between', marginTop: 10
                        }}>
                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Zip Code')}</Text>
                        <Text style={{...StylesGloble.fon14700b000000,fontWeight: '600',}}>
                            {props.bookingdetail?.bookingDetails?.current_zip_code}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};
export default Immigration;