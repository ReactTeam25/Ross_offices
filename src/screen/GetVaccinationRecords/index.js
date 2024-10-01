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
import LoadingPage from '../../helper/LoadingPage';
import Servicescard from '../../components/Servicescard';
import Header from '../../helper/Header';
import Deletedoc from '../../assest/svg/Deletedoc.svg'
import Editdoc from '../../assest/svg/Editdoc.svg'
import Plusicom from '../../assest/svg/Plusicom.svg'
import LinearGradient from 'react-native-linear-gradient';
import Reddelete from '../../assest/svg/Reddelete.svg'
import { setVaccinelistData,setselectlanguage } from '../../redux/index';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import BlankScreen from '../../helper/BlankScreen';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { useSafeArea } from 'react-native-safe-area-context';

const GetVaccinationRecords = ({ navigation }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const insets = useSafeArea();

    const Vaccinedata = useSelector((state) => state.VaccinelistReducer.data);
    const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);
    
    useEffect(()=>{
        dispatch(setselectlanguage())
        i18n.changeLanguage(SelectlanguageReducer);
    },[])
    const [loading, setloading] = useState(false);
    const [showskeleton, setshowskeleton] = useState(1)
    const [deletmodal, setdeletmodal] = useState(false)
    const [recordid, setrecordid] = useState('')

    useEffect(() => {
        dispatch(setVaccinelistData(SelectlanguageReducer));
    }, [])


    useEffect(() => {
        setTimeout(() => {
            setshowskeleton(2)
        }, 2000)
    }, []);

    const Deletevaccinerecord = () => {
        let url = `travel/vaccination-record/${recordid}?lang=${SelectlanguageReducer}`
        setloading(true);
        ApiDataService.DeleteTokenapi(url)
            .then(response => {
                setloading(false);
                if (response.status == 200) {
                    calltoastmessage(response.data.message);
                    dispatch(setVaccinelistData());
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
            {loading && (
                <View style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: 999999, }}>
                    <LoadingPage />
                </View>
            )}

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
                        <Header name={t('Vaccination Records')} />
                        <View style={{ ...StylesGloble.marginscreen }}>
                            {
                                Vaccinedata?.length > 0 ? (
                                    <FlatList
                                        data={Vaccinedata}
                                        style={{ marginBottom: 100 }}
                                        keyExtractor={(item, index) => index}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity style={{ borderWidth: 1, borderColor: "#E7E7E7", marginTop: 15, padding: 10, borderRadius: 10 }}>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                    <View>
                                                        <Text style={{ fontSize: 10, fontWeight: "400", color: "#000000" }}>
                                                            {t('Vaccine name')}
                                                        </Text>
                                                        <Text style={{ fontSize: 16, fontWeight: "600", color: "#000000" }}>
                                                            {item.vaccination_name}
                                                        </Text>

                                                    </View>
                                                    <View style={{ flexDirection: "row", alignSelf: "center", }}>
                                                        <TouchableOpacity style={{ marginRight: 5 }} onPress={() => navigation.navigate('EditVaccineRecord',{recordid:item.id,vaccine_name:item.vaccination_name,vaccine_date:item.vaccination_date,expiry_date:item.expiration_date,notes:item.notes})}>
                                                            <Editdoc />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => { setdeletmodal(true); setrecordid(item.id) }}>
                                                            <Deletedoc />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <View style={{ borderBottomWidth: 1, borderBottomColor: "#D1D1D1", marginTop: 10, marginBottom: 10 }} />
                                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                    <View>
                                                        <Text style={{ fontSize: 12, fontWeight: "500", color: "#000000" }}>
                                                            {t('Date')}
                                                        </Text>
                                                        <Text style={{ fontSize: 14, fontWeight: "400", color: "#6D6D6D", marginTop: 3 }}>
                                                            {moment(item.vaccination_date).format('ll')}
                                                        </Text>

                                                    </View>
                                                    <View style={{}}>
                                                        <Text style={{ fontSize: 12, fontWeight: "500", color: "#000000" }}>
                                                            {t('Expiration')}
                                                        </Text>
                                                        <Text style={{ fontSize: 14, fontWeight: "400", color: "#6D6D6D", marginTop: 3 }}>
                                                            {moment(item.expiration_date).format('ll')}
                                                        </Text>

                                                    </View>
                                                </View>
                                                <View style={{ marginTop: 15 }}>
                                                    <Text style={{ fontSize: 12, fontWeight: "500", color: "#000000" }}>
                                                        {t('Notes')}
                                                    </Text>
                                                    <Text style={{ fontSize: 14, fontWeight: "400", color: "#6D6D6D", marginTop: 3 }}>
                                                        {item.notes}
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
                            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => navigation.navigate('AddVaccineRecord')}>
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

                                <TouchableOpacity onPress={() => { setdeletmodal(false); Deletevaccinerecord() }}>
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

export default GetVaccinationRecords;
