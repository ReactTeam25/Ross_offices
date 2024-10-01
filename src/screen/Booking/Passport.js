import React, { useState, useEffect } from 'react';
import {
    ImageBackground,
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    FlatList,
} from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Imagepath from '../../constant/Imagepath';
import Search from '../../assest/svg/Search.svg';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ApiDataService from '../../services/Apiservice.service'
import BlankScreen from '../../helper/BlankScreen';
import { setselectlanguage } from '../../redux/index';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
const Passport = ({ navigation, BookingReducer }) => {
    console.log('BookingReducer-----------', BookingReducer);

    const [passportlist, setpassportlist] = useState([])

    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

    useEffect(() => {
        dispatch(setselectlanguage())
        i18n.changeLanguage(SelectlanguageReducer);
    }, [])
    useEffect(() => {
        const data = BookingReducer?.filter(item => item.passportDetails?.completed_status ==  "7")
        setpassportlist(data)
    }, [BookingReducer])




    return (
        <View style={{ ...StylesGloble.container, backgroundColor: '#FFFFFF' }}>
            {
                passportlist?.length > 0 ? (
                    <FlatList
                        data={passportlist}
                        keyExtractor={(item, index) => index}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <>
                                <TouchableOpacity
                                    style={{
                                        borderWidth: 1,
                                        borderColor: '#D1D1D1',
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: 10,
                                        marginTop: 20,
                                        padding: 15
                                    }}
                                    onPress={() =>
                                        navigation.navigate
                                            ('Residencyapplications', {
                                                booking_id: item.id, type: 5
                                            })
                                    }>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                            <Image
                                                style={{ height: 45, width: 45 }}
                                                source={Imagepath.Workpermit}
                                            />
                                            <View style={{ marginLeft: 10, alignSelf: "center",width:'55%' }}>
                                                <Text style={StylesGloble.font16600black}>
                                                    {item.passportDetails?.consular_service_request}
                                                </Text>
                                            </View>
                                        </View>
                                        {
                                            item.booking_status == 'In-Progress' ? (
                                                <View style={{ alignSelf: "center",width:90 }}>
                                                    <Text style={{ fontSize: 14, color: "#FFC700", fontWeight: "500", backgroundColor: "#FFC70030", padding: 5, borderRadius: 25 ,textAlign:"center",}}>
                                                        {item.booking_status}
                                                    </Text>
                                                </View>
                                            ) : item.booking_status == "Pending" ? (
                                                <View style={{ alignSelf: "center",width:90 }}>
                                                    <Text style={{ fontSize: 14, color: "#FFC700", fontWeight: "500", backgroundColor: "#FFC70030", padding: 5, borderRadius: 25,textAlign:"center" }}>
                                                        {item.booking_status}
                                                    </Text>
                                                </View>
                                            ) : item.booking_status == 'Completed' ? (
                                                <View style={{ alignSelf: "center",width:90 }}>
                                                    <Text style={{ fontSize: 14, color: "#039B00", fontWeight: "500", backgroundColor: "#039B0030", padding: 5, borderRadius: 25 ,textAlign:"center"}}>
                                                        {item.booking_status}
                                                    </Text>
                                                </View>
                                            ) : item.booking_status == 'Rejected' ? (
                                                <View style={{ alignSelf: "center",width:90 }}>
                                                    <Text style={{ fontSize: 14, color: "#FF0000", fontWeight: "500", backgroundColor: "#FF000030", padding: 5, borderRadius: 25,textAlign:"center" }}>
                                                        {item.booking_status}
                                                    </Text>
                                                </View>
                                            ) : null
                                        }

                                    </View>

                                    <View
                                        style={{
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#D1D1D1',
                                            marginTop: 12,
                                        }}
                                    />
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginTop: 10,
                                        }}>
                                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Mode')}</Text>
                                        <Text
                                            style={{
                                                ...StylesGloble.fon14700b000000,
                                                fontWeight: '600',
                                            }}>
                                            {item.passportDetails?.mode}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginTop: 10,
                                        }}>
                                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Application Date')}</Text>
                                        <Text
                                            style={{
                                                ...StylesGloble.fon14700b000000,
                                                fontWeight: '600',
                                            }}>
                                            {item.passportDetails?.application_date}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginTop: 10,
                                        }}>
                                        <Text style={StylesGloble.font14500g6D6D6D}>{t('First Name')}</Text>
                                        <Text
                                            style={{
                                                ...StylesGloble.fon14700b000000,
                                                fontWeight: '600',
                                            }}>
                                            {item.passportDetails?.first_name}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginTop: 10,
                                        }}>
                                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Surname')}</Text>
                                        <Text
                                            style={{
                                                ...StylesGloble.fon14700b000000,
                                                fontWeight: '600',
                                            }}>
                                            {item.passportDetails?.surname}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginTop: 10,
                                        }}>
                                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Place of Birth')}</Text>
                                        <Text
                                            style={{
                                                ...StylesGloble.fon14700b000000,
                                                fontWeight: '600',
                                            }}>
                                            {item.passportDetails?.country}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginTop: 10,
                                        }}>
                                        <Text style={StylesGloble.font14500g6D6D6D}>{t("Date of Birth")}</Text>
                                        <Text
                                            style={{
                                                ...StylesGloble.fon14700b000000,
                                                fontWeight: '600',
                                            }}>
                                            {item.passportDetails?.date_of_birth}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </>

                        )}
                    />
                ) : (
                    <View style={{ justifyContent: "center", marginTop: "30%", alignSelf: "center" }}>
                        <BlankScreen />
                    </View>
                )
            }

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

export default Passport;
