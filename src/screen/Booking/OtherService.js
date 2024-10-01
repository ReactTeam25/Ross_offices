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
import { setBookingData } from '../../redux/index';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const OtherService = ({ navigation }) => {
    const [showskeleton, setshowskeleton] = useState(1)
    const dispatch = useDispatch();
    const BookingReducer = useSelector(state => state.BookingReducer.data);
    console.log('Homestate-------->', BookingReducer);

    useEffect(() => {
        dispatch(setBookingData());
    }, []);

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
                                {
                                    item.booking_type == 'NULL' ? (
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
                                                    booking_id: item.id
                                                })
                                            }>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}>
                                                <Image
                                                    style={{ height: 45, width: 45 }}
                                                    source={Imagepath.Workpermit}
                                                />
                                                <View style={{ marginLeft: 10 }}>
                                                    <Text style={StylesGloble.font16600black}>
                                                        {item.service?.service_name}
                                                    </Text>
                                                    <Text style={styles.textper}>{item.service?.service_sub_name}</Text>
                                                </View>
                                            </View>

                                            <View
                                                style={{
                                                    borderBottomWidth: 1,
                                                    borderBottomColor: '#D1D1D1',
                                                    marginTop: 12,
                                                }}
                                            />
                                            {
                                                item.service?.service_docs ? (
                                                    <FlatList
                                                        keyExtractor={(item, index) => index}
                                                        style={{
                                                            width: "100%", marginBottom: 0,
                                                        }}
                                                        showsVerticalScrollIndicator={false}
                                                        data={item.service?.service_docs}
                                                        renderItem={({ item }) => <>
                                                            <View
                                                                style={{
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    marginTop: 10,
                                                                }}>
                                                                <View
                                                                    style={{
                                                                        backgroundColor: '#6D6D6D',
                                                                        height: 5,
                                                                        width: 5,
                                                                        borderRadius: 5,
                                                                    }}
                                                                />
                                                                <Text style={{ ...styles.namestyl, marginLeft: 10 }}>
                                                                    {item}
                                                                </Text>
                                                            </View>
                                                        </>} />
                                                ) : null
                                            }
                                            <View
                                                style={{
                                                    borderBottomWidth: 1,
                                                    borderBottomColor: '#D1D1D1',
                                                    marginTop: 10,
                                                }}
                                            />

                                            <Text style={{ ...styles.textheadig, marginTop: 10 }}>
                                                {item.service?.service_description}
                                            </Text>
                                        </TouchableOpacity>
                                    ) : item.booking_type == 'TRAVEL_BOOKING' ? (
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
                                                    booking_id: item.id
                                                })
                                            }>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}>
                                                <Image
                                                    style={{ height: 45, width: 45 }}
                                                    source={Imagepath.Workpermit}
                                                />
                                                <View style={{ marginLeft: 10, alignSelf: "center" }}>
                                                    <Text style={StylesGloble.font16600black}>
                                                        Travel Booking
                                                    </Text>
                                                </View>
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
                                                <Text style={StylesGloble.font14500g6D6D6D}>Name</Text>
                                                <Text
                                                    style={{
                                                        ...StylesGloble.fon14700b000000,
                                                        fontWeight: '600',
                                                    }}>
                                                    {item.bookingDetails?.first_name} {item.bookingDetails?.last_name}
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    marginTop: 10,
                                                }}>
                                                <Text style={StylesGloble.font14500g6D6D6D}>Email</Text>
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
                                                <Text style={StylesGloble.font14500g6D6D6D}>Phone</Text>
                                                <Text
                                                    style={{
                                                        ...StylesGloble.fon14700b000000,
                                                        fontWeight: '600',
                                                    }}>
                                                    {item.bookingDetails?.phone}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    ) : (
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
                                                    booking_id: item.id
                                                })
                                            }>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}>
                                                <Image
                                                    style={{ height: 45, width: 45 }}
                                                    source={Imagepath.Workpermit}
                                                />
                                                <View style={{ marginLeft: 10, alignSelf: "center" }}>
                                                    <Text style={StylesGloble.font16600black}>
                                                        {item.bookingDetails?.title}
                                                    </Text>
                                                </View>
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
                                                <Text style={StylesGloble.font14500g6D6D6D}>Name</Text>
                                                <Text
                                                    style={{
                                                        ...StylesGloble.fon14700b000000,
                                                        fontWeight: '600',
                                                    }}>
                                                    {item.bookingDetails?.first_name} {item.bookingDetails?.last_name}
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    marginTop: 10,
                                                }}>
                                                <Text style={StylesGloble.font14500g6D6D6D}>Email</Text>
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
                                                <Text style={StylesGloble.font14500g6D6D6D}>Phone</Text>
                                                <Text
                                                    style={{
                                                        ...StylesGloble.fon14700b000000,
                                                        fontWeight: '600',
                                                    }}>
                                                    {item.bookingDetails?.phone}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )

                                }
                            </>

                        )}
                    />
                ) : (
                    <View style={{ justifyContent: "center", marginTop: "80%" }}>
                        <Text style={{ ...StylesGloble.font20700000000, fontSize: 15, fontWeight: "500", color: "#000000", fontStyle: "italic", textAlign: 'center' }}>No Data Found!!</Text>
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

export default OtherService;
