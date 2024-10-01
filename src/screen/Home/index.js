import React, { useEffect, useState } from 'react';
import {
	ImageBackground,
	View,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
	StyleSheet,
	FlatList,RefreshControl
} from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Imagepath from '../../constant/Imagepath';
import Search from '../../assest/svg/Search.svg';
import Message from '../../assest/svg/Message.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setHomeData, setProfileData, setselectlanguage } from '../../redux/index';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import messaging from "@react-native-firebase/messaging";
import NotificationModal from '../../helper/NotificationModal';
import ApiDataService from '../../services/Apiservice.service';
import Homeimmienable from '../../assest/svg/Homeimmienable.svg';
import Hometaxenable from '../../assest/svg/Hometaxenable.svg';
import HomeLoanenable from '../../assest/svg/HomeLoanenable.svg';
import Hometripenable from '../../assest/svg/Hometripenable.svg';
import Homepassenable from '../../assest/svg/Homepassenable.svg'
import Immegration from './Immegration';
import Homeimmiactive from '../../assest/svg/Homeimmiactive.svg';
import Hometaxactive from '../../assest/svg/Hometaxactive.svg';
import HomeLoanactive from '../../assest/svg/HomeLoanactive.svg';
import Honetripsactive from '../../assest/svg/Honetripsactive.svg';
import HomepassActive from '../../assest/svg/HomepassActive.svg'
import Tax from './Tax';
import Loan from './Loan';
import Passport from './Passport';
import Trips from './Trips';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { useSafeArea } from 'react-native-safe-area-context';

const category = [
	{
		id: 1,
		name: "Immigration",
		namees:"Inmigración"
	},
	{
		id: 2,
		name: "Tax",
		namees:"Impuesto"
	},
	{
		id: 3,
		name: "Loan",
		namees:"Préstamo"

	},
	{
		id: 4,
		name: 'Trips',
		namees:"Viajes"

	},
	{
		id: 5,
		name: "Passport",
		namees:"Pasaporte"

	},
]

const Home = ({ navigation }) => {
	const [showskeleton, setshowskeleton] = useState(1)
	const [NotiModal, setNotiModal] = useState(false)
	const dispatch = useDispatch();
const insets = useSafeArea();

	const { t, i18n } = useTranslation();
	const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);
	const ProfileReducer = useSelector(state => state.ProfileReducer.data);
	const Homestate = useSelector(state => state.HomeReducer.data);
	console.log('Homestate__________',Homestate);
	const [notificationdata, setnotificationdata] = useState(false);
	useEffect(() => {
		dispatch(setselectlanguage())
		dispatch(setProfileData(SelectlanguageReducer))
		i18n.changeLanguage(SelectlanguageReducer);
	}, [])

	
	
	useEffect(() => {
		setTimeout(() => {
			setNotiModal(false)
		}, 1000);
	}, [NotiModal])
	
	useEffect(() => {
		messaging().onMessage(async remoteMessage => {
			console.log('remoteMessageremoteMessage--------------------------', remoteMessage);
			setNotiModal(true)
			setnotificationdata(remoteMessage.notification);
		});
	}, [])
	const closenotimodal = () => {
		setNotiModal(false)
	}
	
	

	const [getallservices, setgetallservices] = useState([])
	const [catid, setcatid] = useState('Immigration')

	useEffect(() => {
		dispatch(setHomeData(catid, '',SelectlanguageReducer))
	}, [catid]);

	const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        try {
            dispatch(setHomeData(catid, '',SelectlanguageReducer))
        } catch (error) {
            console.error('Error refreshing data:', error);
        }
        setRefreshing(false);
    };

	// const getbookings = () => {
	// 	let url = `service`
	// 	console.log('url----------', url);
	// 	ApiDataService.GetTokenapi(url)
	// 		.then(response => {
	// 			console.log('booking---service-----', response);
	// 			if (response.status == 200) {
	// 				setgetallservices(response.data.data.services)
	// 			}
	// 		})
	// 		.catch(e => {
	// 			console.log('e--------', e);
	// 		});
	// };


	useEffect(() => {
		setTimeout(() => {
			setshowskeleton(2)
		}, 2000)
	}, []);
	const [search, setSearch] = useState('');

	const handleSearch = (text) => {
		setSearch(text);
		dispatch(setHomeData(catid, text,SelectlanguageReducer))
	};

	const selectcategoryfunc = (name) => {
		setcatid(name)
	}


	return (
		<View
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                flex: 1
            }}
        >
			<View style={StylesGloble.container}>
			<FlatList
				style={{ marginBottom: 30 }}
				data={[{ name: 'abcd' }]}
				showsVerticalScrollIndicator={false}
				refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
				renderItem={({ item }) => (

					<>
						<ImageBackground
							imageStyle={{
								borderBottomLeftRadius: 25,
								borderBottomRightRadius: 25,
								alignSelf: 'center',
							}}
							style={{ height: 180, width: '100%' }}
							source={Imagepath.SeviceGroup}>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-between',
									marginLeft: 20,
									marginRight: 20,
									flex: 1,
								}}>
								<View>
									<Text style={StylesGloble.fon24700FFFFFF}>{t('Let’s find your')}</Text>
									<Text style={StylesGloble.fon24700FFFFFF}>{t('best Services')}</Text>
								</View>

								<TouchableOpacity onPress={() => navigation.navigate('ChatScreen', { user_id: ProfileReducer.id, admin_id: ProfileReducer?.admin?.id, admin_name: ProfileReducer?.admin?.full_name, })}>
									<Message />
								</TouchableOpacity>
							</View>
						</ImageBackground>
						<View style={StylesGloble.marginscreen}>
							<View
								style={{
									backgroundColor: '#FFFFFF',
									borderWidth: 1,
									borderColor: '#E7E7E7',
									borderRadius: 8,
									height: 46,
									flexDirection: 'row',
									alignItems: 'center',
									paddingLeft: 10,
									marginTop: -23,
								}}>
								<Search />

								<TextInput
									style={{
										paddingLeft: 10,
										width: '90%',
										fontSize: 12,
										fontWeight: '400',
										color:"#000000" 
									}}
									value={search}
									onChangeText={(val) => handleSearch(val)}
									placeholder={t("Search anything....")}
									placeholderTextColor={'#6D6D6D'}
								/>
							</View>
							<View style={{ marginTop: 20 }}>
								<Text style={StylesGloble.font20700000000}>{t('Category')}</Text>
							</View>
							<FlatList
								data={category}
								horizontal={true}
								keyExtractor={(item, index) => index}
								showsHorizontalScrollIndicator={false}
								renderItem={({ item }) => (
									<TouchableOpacity style={{ marginHorizontal: 5, marginTop: 15 }} onPress={() => selectcategoryfunc(item.name)}>
										<View>
											{
												item.name == 'Immigration' ? (
													<>
														{
															item.name == catid ? (
																<Homeimmiactive />
															) : (
																<Homeimmienable />
															)
														}
													</>

												) : item.name == 'Tax' ? (
													<>
														{
															item.name == catid ? (
																<Hometaxactive />
															) : (
																<Hometaxenable />
															)
														}
													</>
												) : item.name == 'Loan' ? (
													<>
														{
															item.name == catid ? (
																<HomeLoanactive />
															) : (
																<HomeLoanenable />
															)
														}
													</>
												) : item.name == 'Trips' ? (
													<>
														{
															item.name == catid ? (
																<Honetripsactive />
															) : (
																<Hometripenable />
															)
														}
													</>
												) : item.name == 'Passport' ? (
													<>
														{
															item.name == catid ? (
																<HomepassActive />
															) : (
																<Homepassenable />
															)
														}
													</>
												) : null
											}

										</View>
										<View style={{ marginTop: 5 }}>
											<Text style={{ textAlign: "center", fontSize: 12, fontWeight: "500", color: item.name == catid ? "#9846D7" : "#000000" }}>

												{
													SelectlanguageReducer == 'es' ? item.namees : item.name
												}
											</Text>
										</View>

									</TouchableOpacity>
								)}
							/>
							<View style={{ marginTop: 0 }}>
								{
									catid == 'Immigration' ? (
										<Immegration navigation={navigation} Homestate={Homestate} />
									) : catid == 'Tax' ? (
										<Tax navigation={navigation} Homestate={Homestate} />
									) : catid == 'Loan' ? (
										<Loan navigation={navigation} Homestate={Homestate} />
									) : catid == 'Trips' ? (
										<Trips navigation={navigation} Homestate={Homestate} />
									) : catid == 'Passport' ? (
										<Passport navigation={navigation} Homestate={Homestate} />
									) : null
								}
							</View>

						</View>

					</>
				)}
			/>
			{
				NotiModal &&
				<View style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "100%", zIndex: 999999 }}>
					<NotificationModal data={notificationdata} notificationclosefunc={closenotimodal} navigation={navigation} />
				</View>
			}
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

export default Home;
