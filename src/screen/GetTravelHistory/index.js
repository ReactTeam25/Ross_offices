import React, { useEffect, useState } from 'react';
import {
    ImageBackground,
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    FlatList, Modal
} from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Imagepath from '../../constant/Imagepath';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ApiDataService from '../../services/Apiservice.service'
import Servicescard from '../../components/Servicescard';
import Header from '../../helper/Header';
import Deletedoc from '../../assest/svg/Deletedoc.svg'
import Editdoc from '../../assest/svg/Editdoc.svg'
import Plusicom from '../../assest/svg/Plusicom.svg'
import Reddelete from '../../assest/svg/Reddelete.svg'
import LinearGradient from 'react-native-linear-gradient';
import { setTravelhistoryData, setselectlanguage } from '../../redux/index';
import { useSelector, useDispatch } from 'react-redux';
import BlankScreen from '../../helper/BlankScreen';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import LoadingPage from '../../helper/LoadingPage';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { useSafeArea } from 'react-native-safe-area-context';

const GetTravelHistory = ({ navigation }) => {
    const insets = useSafeArea();

    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const Travelhistorydata = useSelector((state) => state.TravelhistoryReducer.data);
    const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

    useEffect(() => {
        dispatch(setselectlanguage())
        i18n.changeLanguage(SelectlanguageReducer);
    }, [])
    const [showskeleton, setshowskeleton] = useState(1)
    const [deletmodal, setdeletmodal] = useState(false)
    const [loading, setloading] = useState(false);
    const [historyid, sethistoryid] = useState('')

    useEffect(() => {
        dispatch(setTravelhistoryData(SelectlanguageReducer));
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setshowskeleton(2)
        }, 2000)
    }, []);

    const Deletetravelhistory = () => {
        let url = `travel/history/${historyid}?lang=${SelectlanguageReducer}`
        setloading(true);
        ApiDataService.DeleteTokenapi(url)
            .then(response => {
                setloading(false);
                if (response.status == 200) {
                    calltoastmessage(response.data.message);
                    dispatch(setTravelhistoryData());
                }
            })
            .catch(e => {
                setloading(false);
                console.log('error------>', e);
            });
    };

    const calltoastmessage = data => {
        Toast.showWithGravity(data, Toast.LONG, Toast.BOTTOM);
    };


    return (
        <View
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                flex: 1
            }}
        >
            <View style={StylesGloble.container}>

                {
                    showskeleton == 1 ? (
                        <View style={{ width: "100%", height: '80%', position: "relative", }}>
                            <SkeletonPlaceholder borderRadius={4} >
                                <SkeletonPlaceholder.Item style={{ marginLeft: 0, width: '90%', height: 320, flexDirection: "row" }}>
                                    <SkeletonPlaceholder.Item width={'100%'} height={80} alignSelf='flex-end' />
                                </SkeletonPlaceholder.Item>
                                <SkeletonPlaceholder.Item style={{ marginTop: 30, marginLeft: 0, width: '90%', height: 320, marginTop: 20, flexDirection: "row", marginLeft: 20, marginRight: 20 }}>
                                    <SkeletonPlaceholder.Item width={'100%'} height={200} borderRadius={12} alignSelf='flex-end' />
                                </SkeletonPlaceholder.Item>
                                <SkeletonPlaceholder.Item style={{ marginTop: 30, marginLeft: 0, width: '90%', height: 320, marginTop: 20, flexDirection: "row", marginLeft: 20, marginRight: 20 }}>
                                    <SkeletonPlaceholder.Item width={'100%'} height={200} borderRadius={12} alignSelf='flex-end' />
                                </SkeletonPlaceholder.Item>

                            </SkeletonPlaceholder>
                        </View>
                    ) : (
                        <>
                            <Header name={t('Travel History')} />
                            <View style={{ ...StylesGloble.marginscreen }}>
                                {
                                    Travelhistorydata?.length > 0 ? (
                                        <FlatList
                                            data={Travelhistorydata}
                                            style={{ marginBottom: 100 }}
                                            keyExtractor={(item, index) => index}
                                            showsVerticalScrollIndicator={false}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity style={{ borderWidth: 1, borderColor: "#E7E7E7", marginTop: 15, padding: 10, borderRadius: 10 }}>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                        <View>
                                                            <Text style={{ fontSize: 10, fontWeight: "400", color: "#000000" }}>
                                                                {t('Date')}
                                                            </Text>
                                                            <Text style={{ fontSize: 16, fontWeight: "600", color: "#000000" }}>
                                                                {moment(item.travel_date).format('ll')}
                                                            </Text>

                                                        </View>
                                                        <View style={{ flexDirection: "row", alignSelf: "center", }}>
                                                            <TouchableOpacity style={{ marginRight: 5 }} onPress={() => navigation.navigate('EditTravelHistory', { historyid: item.id, city: item.city, country: item.country, travel_date: item.travel_date, purpose: item.purpose })}>
                                                                <Editdoc />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => { setdeletmodal(true); sethistoryid(item.id) }}>
                                                                <Deletedoc />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                    <View style={{ borderBottomWidth: 1, borderBottomColor: "#D1D1D1", marginTop: 10, marginBottom: 10 }} />
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                        <View>
                                                            <Text style={{ fontSize: 12, fontWeight: "500", color: "#000000" }}>
                                                                {t('Country')}
                                                            </Text>
                                                            <Text style={{ fontSize: 14, fontWeight: "400", color: "#6D6D6D", marginTop: 3 }}>
                                                                {item.country}
                                                            </Text>

                                                        </View>
                                                        <View style={{}}>
                                                            <Text style={{ fontSize: 12, fontWeight: "500", color: "#000000" }}>
                                                                {t('City')}
                                                            </Text>
                                                            <Text style={{ fontSize: 14, fontWeight: "400", color: "#6D6D6D", marginTop: 3 }}>
                                                                {item.city}
                                                            </Text>

                                                        </View>
                                                    </View>
                                                    <View style={{ marginTop: 15 }}>
                                                        <Text style={{ fontSize: 12, fontWeight: "500", color: "#000000" }}>
                                                            {t('Purpose')}
                                                        </Text>
                                                        <Text style={{ fontSize: 14, fontWeight: "400", color: "#6D6D6D", marginTop: 3 }}>
                                                            {item.purpose}
                                                        </Text>
                                                    </View>

                                                </TouchableOpacity>
                                            )}
                                        />
                                    ) : (
                                        <View style={{ justifyContent: "center", marginTop: "40%", alignSelf: "center" }}>
                                            <BlankScreen />
                                        </View>
                                    )
                                }
                            </View>
                            <View style={{ position: "absolute", bottom: 10, alignSelf: "center" }}>
                                <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => navigation.navigate('AddTravelHistory')}>
                                    <Plusicom />
                                </TouchableOpacity>
                            </View>
                        </>

                    )
                }
                <View>
                    <Modal
                        transparent={true}
                        visible={deletmodal}
                        onRequestClose={() => setdeletmodal(false)}>
                        <View
                            style={{
                                height: '100%',
                                marginTop: 'auto',
                                position: 'relative',
                                backgroundColor: '#D1D1D199',
                                zIndex: 999999,
                            }}>
                            <View
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#D1D1D1',
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: 24,
                                    height: 306,
                                    width: 305,
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    marginTop: '50%',
                                }}>
                                <View style={{ alignSelf: "center" }}>
                                    <Reddelete />
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            fontWeight: '600',
                                            color: '#000000',
                                            textAlign: 'center',
                                        }}>
                                        Delete
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: '500',
                                            color: '#5D5D5D',
                                            lineHeight: 19,
                                            textAlign: 'center',
                                        }}>
                                        Are you sure you want to Delete
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-evenly',
                                        marginTop: 30,
                                    }}>
                                    <TouchableOpacity onPress={() => setdeletmodal(false)}>
                                        <View
                                            style={{
                                                borderWidth: 1,
                                                borderColor: '#888888',
                                                borderRadius: 8,
                                                height: 39,
                                                padding: 6,
                                                width: 120,
                                            }}>
                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: '600',
                                                    color: '#888888',
                                                    textAlign: 'center',
                                                }}>
                                                Cancel
                                            </Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => { setdeletmodal(false); Deletetravelhistory() }}>
                                        <LinearGradient
                                            colors={['#9846D7', '#C490F0']}
                                            style={{
                                                borderRadius: 8,
                                                height: 39,
                                                padding: 8,
                                                width: 120,
                                            }}>
                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    fontWeight: '600',
                                                    color: '#FFFFFF',
                                                    textAlign: 'center',
                                                }}>
                                                Confirm
                                            </Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
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

export default GetTravelHistory;
