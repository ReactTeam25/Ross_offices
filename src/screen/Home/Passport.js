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
import BlankScreen from '../../helper/BlankScreen';

import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { useDispatch, useSelector } from 'react-redux';
import { setselectlanguage } from '../../redux/index';

const Passport = ({ navigation, Homestate }) => {
    const [showskeleton, setshowskeleton] = useState(1)
    const [passportmodal, setpassportmodal] = useState(false)
    const dispatch = useDispatch();
	const { t, i18n } = useTranslation();
	const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

	useEffect(() => {
		dispatch(setselectlanguage())
		i18n.changeLanguage(SelectlanguageReducer);
	}, [])

    useEffect(() => {
        setTimeout(() => {
            setshowskeleton(2)
        }, 2000)
    }, []);
    const getpassportcheckremains = () => {
        ApiDataService.GetTokenapi('passport/check-remains')
            .then(response => {
                console.log('response------passport/check-remains----->', response);
                if (response.status == 200) {
                    if (response.data.data.IsAlreadyRemains == true) {
                        setpassportmodal(true)
                    } else {
                        navigation.navigate('PassportApplication');
                    }
                }
            })
            .catch(e => {
                console.log('error------>', e);
            });
    };

    const continueform = () => {
		ApiDataService.GetTokenapi('passport/check-remains')
			.then(response => {
				console.log('response------passport/check-remains----->', response);
				if (response.status == 200) {

					if (response.data.data.booking.completed_status == 1) {
						navigation.navigate('TwoPassportApplication', { booking_id: response.data.data.booking.id })
					} else if (response.data.data.booking.completed_status == 2) {
						navigation.navigate('ThreePassportApplication', { booking_id: response.data.data.booking.id })
					} else if (response.data.data.booking.completed_status == 3) {
						navigation.navigate('FourPassportApplication', { booking_id: response.data.data.booking.id })
					} else if (response.data.data.booking.completed_status == 4) {
						navigation.navigate('FivePassportApplication', { booking_id: response.data.data.booking.id })
					} else if (response.data.data.booking.completed_status == 5) {
						navigation.navigate('SixPassportApplication', { booking_id: response.data.data.booking.id })
					} else if (response.data.data.booking.completed_status == 6) {
						navigation.navigate('SevenPassportApplication', { booking_id: response.data.data.booking.id })
					} else if (response.data.data.booking.completed_status == 7) {
						navigation.navigate('AttPassportApplication', { booking_id: response.data.data.booking.id })
					} else {
						navigation.navigate('PassportApplication');
					}
				}
			})
			.catch(e => {
				console.log('error------>', e);
			});

	}
	const deleteform = () => {
		ApiDataService.DeleteTokenapi('passport/delete-remains')
			.then(response => {
				console.log('response------passport/check-remains----->', response);
				if (response.status == 200) {
					navigation.navigate('PassportApplication');
				}
			})
			.catch(e => {
				console.log('error------>', e);
			});

	}


    return (
        <View style={StylesGloble.container}>

            {
                showskeleton == 1 ? (
                    <View style={{ width: "100%", height: '80%', position: "relative", }}>
                        <SkeletonPlaceholder borderRadius={4} >
                            <SkeletonPlaceholder.Item style={{ marginTop: 30, marginLeft: 0, width: '90%', height: 320, marginTop: 20, flexDirection: "row" }}>
                                <SkeletonPlaceholder.Item width={'100%'} height={300} borderRadius={12} alignSelf='flex-end' />
                            </SkeletonPlaceholder.Item>
                            <SkeletonPlaceholder.Item style={{ marginTop: 30, marginLeft: 0, width: '90%', height: 320, marginTop: 20, flexDirection: "row" }}>
                                <SkeletonPlaceholder.Item width={'100%'} height={300} borderRadius={12} alignSelf='flex-end' />
                            </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder>
                    </View>
                ) : (
                    <View >
                        {
                            Homestate?.length > 0 ? (
                                <>
                                    <View style={{ marginTop: 20 }}>
                                        <Text style={StylesGloble.font20700000000}>{t('Passport Services')}</Text>
                                    </View>

                                    <FlatList
                                        data={Homestate}
                                        keyExtractor={(item, index) => index}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({ item }) => (
                                            <Servicescard navigation={navigation} type={5} data={item} getpassportcheckremains={getpassportcheckremains} />
                                        )}
                                    />
                                </>

                            ) : (
                                <View style={{ justifyContent: "center", marginTop: "10%", alignSelf: "center" }}>
                                    <BlankScreen />
                                </View>
                            )
                        }


                    </View>
                )
            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={passportmodal}
                onRequestClose={() => setpassportmodal(false)}
                //  onRequestClose={toggleModal(false)}
                onPress={() => setpassportmodal(true)}>
                <View
                    style={{
                        height: '100%',
                        marginTop: 'auto',
                        position: 'relative',
                        backgroundColor: '#D1D1D599',
                        zIndex: 999999,
                    }}>
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 20,
                            right: 20,
                            height: '22%',
                            backgroundColor: '#ffffff',
                            padding: 20,
                            top: '45%',
                            borderRadius: 24,
                            borderWidth: 1,
                            borderColor: '#D1D1D1',
                        }}>
                        <View style={StylesGloble.marginscreen}>
                            <View style={{ marginTop: 0 }}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: '500',
                                        color: '#5D5D5D',
                                        lineHeight: 19,
                                        textAlign: 'center',
                                    }}>
                                    {t('Do you want to continue filling out the existing form or start a new one?')}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-evenly',
                                    marginTop: 30,
                                }}>
                                <TouchableOpacity onPress={() => { setpassportmodal(false); deleteform() }} style={{marginRight:10}}>
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
                                            {t('start new')}
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { setpassportmodal(false); continueform(); }} style={{marginLeft:10}}>
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
                                            {t('continue')}
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

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
