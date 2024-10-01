import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState,useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Modal,Dimensions } from 'react-native';
import Imagepath from '../constant/Imagepath';
import Notification from '../screen/Notification';
import Profile from '../screen/Profile';
import Home from '../screen/Home';
import Booking from '../screen/Booking';
import Homeclose from '../assest/svg/Homeclose.svg';
import Homeopen from '../assest/svg/Homeopen.svg';
import CalendaroOpen from '../assest/svg/CalendaroOpen.svg';
import ProfilOpen from '../assest/svg/ProfilOpen.svg';
import NotificationOpen from '../assest/svg/NotificationOpen.svg';
import CalendarClose from '../assest/svg/CalendarClose.svg';
import NotificationClose from '../assest/svg/NotificationClose.svg';
import ProfileClose from '../assest/svg/ProfileClose.svg';
import Login from '../screen/Login';
import { StylesGloble } from '../helper/GlobleCss';
import ApiDataService from '../services/Apiservice.service';
import LinearGradient from 'react-native-linear-gradient';
import OnlineService from '../screen/OnlineService'
import { useDispatch, useSelector } from 'react-redux';
import {setselectlanguage} from '../redux/index'
import { useTranslation } from 'react-i18next';
import '../language/i18';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const Tab = createBottomTabNavigator();

function BottomTab({ navigation }) {
	const dispatch = useDispatch();
	const { t, i18n } = useTranslation();
	const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

	useEffect(() => {
		dispatch(setselectlanguage())
		i18n.changeLanguage(SelectlanguageReducer);
	}, [])
	const [focus, setfocus] = useState(false);
	const [isModalVisible, setModalVisible] = useState(false);
	const [askingpassport, setaskingpassport] = useState(false)

	const checkostype = ()=>{
        if(Platform.OS=='android'){
            return true
        }else{
            return false
        }
    } 

	const getpassportcheckremains = () => {
		ApiDataService.GetTokenapi('passport/check-remains')
			.then(response => {
				console.log('response------passport/check-remains----->', response);
				if (response.status == 200) {
					// navigation.navigate('PassportApplication');
					if (response.data.data.IsAlreadyRemains == true) {
						setaskingpassport(true)
					} else {
						navigation.navigate('PassportApplication');
						// if (response.data.data.booking.completed_status == 1) {
						// 	navigation.navigate('TwoPassportApplication', { booking_id: response.data.data.booking.id })
						// } else if (response.data.data.booking.completed_status == 2) {
						// 	navigation.navigate('ThreePassportApplication', { booking_id: response.data.data.booking.id })
						// } else if (response.data.data.booking.completed_status == 3) {
						// 	navigation.navigate('FourPassportApplication', { booking_id: response.data.data.booking.id })
						// } else if (response.data.data.booking.completed_status == 4) {
						// 	navigation.navigate('FivePassportApplication', { booking_id: response.data.data.booking.id })
						// } else if (response.data.data.booking.completed_status == 5) {
						// 	navigation.navigate('SixPassportApplication', { booking_id: response.data.data.booking.id })
						// } else if (response.data.data.booking.completed_status == 6) {
						// 	navigation.navigate('SevenPassportApplication', { booking_id: response.data.data.booking.id })
						// } else if (response.data.data.booking.completed_status == 7) {
						// 	navigation.navigate('AttPassportApplication', { booking_id: response.data.data.booking.id })
						// } else {
						// 	navigation.navigate('PassportApplication');
						// }
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
		<>
			<Tab.Navigator
				initialRouteName={'Home'}
				screenOptions={{
					headerShown: false,
					activeTintColor: '#ffffff',
					inactiveTintColor: '#d9d9d9',
					activeColor: '#ffffff',
					inactiveColor: '#443f47',
					tabBarShowLabel: true,

					tabBarStyle: {
						backgroundColor: '#ffffff',

						height:checkostype()==true ? height*.09 :height*.12,
						activeTintColor: '#ffffff',
					},
					tabBarLabelStyle: {
						fontSize: 13,
						color: '#FFFFFF',
					},
				}}>
				<Tab.Screen
					name={'Home'}
					component={Home}
					activeColor={'#ffffff'}
					screenOptions={{
						headerShown: false,
					}}
					inactiveColor={'#443f47'}
					options={{
						tabBarShowLabel: false,
						tabBarIcon: ({ focused }) => {
							return (
								<View
									style={{
										position: 'absolute',
										bottom: checkostype()==true ? 2 :-10, 
										left: 0,
										height:checkostype()==true ? height*.09 :height*.12,
										width: 68,
										borderRadius: 68,
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									{/* <Image
                                style={{
                                    tintColor: focused ? '#F3691C' : '#999999',
                                    width:24,
                                    height:24
                                }}
                                source={Imagepath.HomeActive} /> */}

									{focused ? <Homeclose /> : <Homeopen />}

									<Text
										style={{
											color: focused ? '#9846D7' : '#5D5D5D',
											fontSize: 12,
											fontWeight: '500',
										}}>
										{t('Home')}
									</Text>
								</View>
							);
						},
					}}
				/>
				<Tab.Screen
					name={'Booking'}
					component={Booking}
					options={{
						tabBarShowLabel: false,
						tabBarIcon: ({ focused }) => {
							return (
								<View
									style={{
										position: 'absolute',
										bottom: checkostype()==true ? 2 :-10, 
										left: 0,
										height:checkostype()==true ? height*.09 :height*.12,
										width: 80,
										borderRadius: 68,
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									{focused ? <CalendarClose /> : <CalendaroOpen />}

									<Text
										style={{
											color: focused ? '#9846D7' : '#5D5D5D',
											fontSize: 12,
											fontWeight: '500',
										}}>
										{t('Booking')}
									</Text>
								</View>
							);
						},
					}}
				/>
				<Tab.Screen
					name={'OnlineService'}
					component={OnlineService}
					options={{
						tabBarShowLabel: false,
						tabBarIcon: ({ focused }) => {
							return (
								<View
									style={{
										position: 'absolute',
										bottom: checkostype()==true ? 2 :-10, 
										left: 0,
										height:checkostype()==true ? height*.09 :height*.12,
										width: 80,
										borderRadius: 68,
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									<View
										style={{
											width: 60,
											height: 60,
											backgroundColor: '#9846D7',
											borderRadius: 30,
											justifyContent: 'center',
											alignItems: 'center',
											borderWidth: 5,
											borderColor: '#ffffff',
											marginTop: -60,
											
										}}>
										<Text style={{ color: 'white', fontSize: 24 }}>+</Text>
									</View>
								</View>
							);
						},
					}}
				/>
				<Tab.Screen
					name={'Notification'}
					component={Notification}
					options={{
						tabBarShowLabel: false,
						tabBarIcon: ({ focused }) => {
							return (
								<View
									style={{
										position: 'absolute',
										bottom: checkostype()==true ? 2 :-10,
										left: 0,
										height:checkostype()==true ? height*.09 :height*.12,
										width: 70,
										borderRadius: 68,
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									{/* <Image
                                style={{
                                    tintColor: focused ? '#F3691C' : '#999999',
                                    width:24,
                                    height:24
                                }}
                                source={Imagepath.Notification} /> */}
									{focused ? <NotificationClose /> : <NotificationOpen />}
									<Text
										style={{
											color: focused ? '#9846D7' : '#5D5D5D',
											fontSize: 12,
											fontWeight: '500',
										}}>
										{t('Notification')}
									</Text>
								</View>
							);
						},
					}}
				/>
				<Tab.Screen
					name={'Profile'}
					component={Profile}
					options={{
						tabBarShowLabel: false,
						tabBarIcon: ({ focused }) => {
							return (
								<View
									style={{
										position: 'absolute',
										bottom: checkostype()==true ? 2 :-10,
										left: 0,
										height:checkostype()==true ? height*.09 :height*.12,
										width: 80,
										borderRadius: 68,
										justifyContent: 'center',
										alignItems: 'center',
									}}>
									{/* <Image
                                style={{
                                    tintColor: focused ? '#F3691C' : '#999999',
                                    width:24,
                                    height:24
                                }}
                                source={Imagepath.Profile} /> */}
									{focused ? <ProfileClose /> : <ProfilOpen />}
									<Text
										style={{
											color: focused ? '#9846D7' : '#5D5D5D',
											fontSize: 12,
											fontWeight: '500',
										}}>
										{t('Profile')}
									</Text>
								</View>
							);
						},
					}}
				/>
			</Tab.Navigator>
			<Modal
				animationType="slide"
				transparent={true}
				visible={isModalVisible}
				onRequestClose={() => setModalVisible(false)}
				//  onRequestClose={toggleModal(false)}
				onPress={() => setModalVisible(true)}>
				<View
					style={{
						height: '100%',
						marginTop: 'auto',
						position: 'relative',
						backgroundColor: '#D1D1D599',
						zIndex: 999999,
					}}>
					<TouchableOpacity style={{ position: 'absolute', bottom: 0, width: '100%', height: "100%" }} onPress={() => setModalVisible(false)}>
					</TouchableOpacity>
					<View

						style={{
							position: 'absolute',
							bottom: 0,
							left: 20,
							right: 20,
							height: '37%',
							backgroundColor: '#ffffff',
							padding: 20,
							top: '35%',
							borderRadius: 24,
							borderWidth: 1,
							borderColor: '#D1D1D1',
						}}>
						<View style={StylesGloble.marginscreen}>
							<TouchableOpacity
								style={{ flexDirection: 'row', justifyContent: 'space-between' }}
								onPress={() => {
									setModalVisible(false);
									navigation.navigate('OnlineService');
								}}>
								<Text style={StylesGloble.font16500b000000}>
									Online Service
								</Text>

								<Image
									style={{ height: 24, width: 24 }}
									source={Imagepath.EathGroup}
								/>
							</TouchableOpacity>

							<View
								style={{
									borderBottomWidth: 1,
									borderBottomColor: '#D1D1D1',
									marginTop: 20,
								}}
							/>

							<TouchableOpacity
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
									marginTop: 20,
								}}
								onPress={() => {
									setModalVisible(false);
									navigation.navigate('OfflineService');
								}}>
								<Text style={StylesGloble.font16500b000000}>
									Offline Service
								</Text>
								<Image
									style={{ height: 24, width: 24 }}
									source={Imagepath.Earthcut}
								/>
							</TouchableOpacity>
							<View
								style={{
									borderBottomWidth: 1,
									borderBottomColor: '#D1D1D1',
									marginTop: 20,
								}}
							/>

							<TouchableOpacity
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
									marginTop: 20,
								}}
								onPress={() => {
									setModalVisible(false);
									navigation.navigate('TravelBooking');
								}}>
								<Text style={{ ...StylesGloble.font16500b000000 }}>
									Travel Booking
								</Text>
								<Image
									style={{ height: 24, width: 24 }}
									source={Imagepath.BokingArrow}
								/>
							</TouchableOpacity>

							<View
								style={{
									borderBottomWidth: 1,
									borderBottomColor: '#D1D1D1',
									marginTop: 20,
								}}
							/>

							<TouchableOpacity
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
									marginTop: 20,
								}}
								onPress={() => {
									setModalVisible(false);
									getpassportcheckremains()
								}}>
								<Text style={{ ...StylesGloble.font16500b000000 }}>
									Passport Application
								</Text>
								<Image
									style={{ height: 24, width: 24 }}
									source={Imagepath.passport}
								/>

							</TouchableOpacity>

						</View>
					</View>
				</View>
			</Modal>
			<Modal
				animationType="slide"
				transparent={true}
				visible={askingpassport}
				onRequestClose={() => setaskingpassport(false)}
				//  onRequestClose={toggleModal(false)}
				onPress={() => setaskingpassport(true)}>
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
									Do you want to continue filling out the existing form or start a new one?
								</Text>
							</View>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-evenly',
									marginTop: 30,
								}}>
								<TouchableOpacity onPress={() => { setaskingpassport(false); deleteform() }}>
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
											start new
										</Text>
									</View>
								</TouchableOpacity>

								<TouchableOpacity onPress={() => { setaskingpassport(false); continueform(); }}>
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
											continue
										</Text>
									</LinearGradient>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		</>
	);
}

export default BottomTab;
