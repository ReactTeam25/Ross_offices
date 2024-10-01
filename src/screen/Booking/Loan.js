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
import BlankScreen from '../../helper/BlankScreen';
import { setselectlanguage } from '../../redux/index';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
const Loan = ({ navigation, BookingReducer }) => {
    const [showskeleton, setshowskeleton] = useState(1)
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);
    
    useEffect(()=>{
        dispatch(setselectlanguage())
        i18n.changeLanguage(SelectlanguageReducer);
    },[])
    useEffect(() => {
        setTimeout(() => {
            setshowskeleton(2)
        }, 2000)
    }, []);

    return (
        <View style={{ ...StylesGloble.container, backgroundColor: '#FFFFFF' }}>
            {
                BookingReducer?.length > 0 ? (
                    <FlatList
                        data={BookingReducer}
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
                                        navigation.navigate('Residencyapplications', {
                                            booking_id: item.id,type :3
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
                                                    {item.service?.service_name}
                                                </Text>
                                            </View>
                                        </View>
                                        {
                                            item.booking_status == 'In-Progress' ? (
                                                <View style={{ alignSelf: "center",width:90 }}>
                                                <Text style={{ fontSize: 14, color: "#FFC700", fontWeight: "500", backgroundColor: "#FFC70030", padding: 5, borderRadius: 25 ,textAlign:"center"}}>
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
                                                    <Text style={{ fontSize: 14, color: "#039B00", fontWeight: "500", backgroundColor: "#039B0030", padding: 5, borderRadius: 25,textAlign:"center" }}>
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
                                            {item.bookingDetails?.mode}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginTop: 10,
                                        }}>
                                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Full name')}</Text>
                                        <Text
                                            style={{
                                                ...StylesGloble.fon14700b000000,
                                                fontWeight: '600',
                                            }}>
                                            {item.bookingDetails?.full_name}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginTop: 10,
                                        }}>
                                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Email')}</Text>
                                        <Text
                                            style={{
                                                ...StylesGloble.fon14700b000000,
                                                fontWeight: '600',
                                            }}>
                                            {item.bookingDetails?.email}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginTop: 10,
                                        }}>
                                        <Text style={StylesGloble.font14500g6D6D6D}>{t('Phone')}</Text>
                                        <Text
                                            style={{
                                                ...StylesGloble.fon14700b000000,
                                                fontWeight: '600',
                                            }}>
                                            {item.bookingDetails?.phone}
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

export default Loan;
