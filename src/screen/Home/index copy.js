import React, { useEffect, useState } from 'react';
import {
	ImageBackground,
	View,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
	StyleSheet,
	FlatList,
} from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Imagepath from '../../constant/Imagepath';
import Search from '../../assest/svg/Search.svg';
import Message from '../../assest/svg/Message.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setHomeData, setProfileData } from '../../redux/index';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import messaging from "@react-native-firebase/messaging";
import NotificationModal from '../../helper/NotificationModal';
import ApiDataService from '../../services/Apiservice.service';
import Homeimmienable from '../../assest/svg/Homeimmienable.svg';
import Hometaxenable from '../../assest/svg/Hometaxenable.svg';
import HomeLoanenable from '../../assest/svg/HomeLoanenable.svg';
import Hometripenable from '../../assest/svg/Hometripenable.svg';
import Homepassenable from '../../assest/svg/Homepassenable.svg'

const category = [
	{
		id: 1,
		name: "Immegration"
	},
	{
		id: 2,
		name: "Tax",
	},
	{
		id: 3,
		name: "Loan"
	},
	{
		id: 4,
		name: 'Trips'
	},
	{
		id: 5,
		name: "Passport"
	}
]

const Home = ({ navigation }) => {
	const [showskeleton, setshowskeleton] = useState(1)
	const [NotiModal, setNotiModal] = useState(false)
	const [notificationdata, setnotificationdata] = useState(false);
	const closenotimodal = () => {
		setNotiModal(false)
	}
	useEffect(() => {
		setTimeout(() => {
			setNotiModal(false)
		}, 1000);
	}, [NotiModal])
	useEffect(() => {
		messaging().onMessage(async remoteMessage => {
			console.log('remoteMessageremoteMessage--------------------------', remoteMessage);
			setNotiModal(true)
			setnotificationdata(JSON.parse(remoteMessage.data.notification));
		});
	}, [])
	const dispatch = useDispatch();
	const ProfileReducer = useSelector(state => state.ProfileReducer.data);

	console.log('ProfileReducer-------->', ProfileReducer);

	useEffect(() => {
		dispatch(setProfileData())
	}, []);
	const [Homestate, setHomestate] = useState([])
	const [getallservices, setgetallservices] = useState([])
	const [catid,setcatid] = useState('')
	const getbookings = () => {
		let url = `service`
		console.log('url----------', url);
		ApiDataService.GetTokenapi(url)
			.then(response => {
				console.log('booking---service-----', response);
				if (response.status == 200) {
					setHomestate(response.data.data.services)
					setgetallservices(response.data.data.services)
				}
			})
			.catch(e => {
				console.log('e--------', e);
			});
	};

	useEffect(() => {
		getbookings()
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setshowskeleton(2)
		}, 2000)
	}, []);
	const [search, setSearch] = useState('');

	const handleSearch = (text) => {
		setSearch(text);
		if (!text) {
			setHomestate(getallservices);
			return;
		}
		const filtered = getallservices.filter(item => {
			return item?.service_name?.toLowerCase().includes(text.toLowerCase());
		});
		console.log('filtered---------', filtered);
		setHomestate(filtered);
	};

	const selectcategoryfunc=(name)=>{
		setcatid(name)
	}


	return (
		<View style={StylesGloble.container}>
			<FlatList
				style={{ marginBottom: 30 }}
				data={[{ name: 'abcd' }]}
				showsVerticalScrollIndicator={false}
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
									<Text style={StylesGloble.fon24700FFFFFF}>Let’s find your</Text>
									<Text style={StylesGloble.fon24700FFFFFF}>best Services</Text>
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
									placeholder="Search anything...."
									placeholderTextColor={'#6D6D6D'}
								/>
							</View>
							<View style={{ marginTop: 20 }}>
								<Text style={StylesGloble.font20700000000}>Category</Text>
							</View>
							<FlatList
								data={category}
								horizontal={true}
								keyExtractor={(item, index) => index}
								showsHorizontalScrollIndicator={false}
								renderItem={({ item }) => (
									<TouchableOpacity style={{ marginHorizontal: 5,marginTop:15 }} onPress={()=>selectcategoryfunc(item.name)}>
										<View>
											{
												item.name == 'Immegration' ? (
													<Homeimmienable/>
												) : item.name == 'Tax' ? (
													<Hometaxenable/>
												) : item.name == 'Loan' ? (
													<HomeLoanenable/>
												) : item.name == 'Trips' ? (
													<Hometripenable/>
												) : item.name == 'Passport' ? (
													<Homepassenable/>
												) : null
											}
											
										</View>
										<View style={{marginTop:5}}>
											<Text style={{textAlign:"center",fontSize:12,fontWeight:"500",color:"#000000"}}>
												{item.name}
											</Text>
										</View>

									</TouchableOpacity>
								)}
							/>
							<View style={{ marginTop: 20 }}>
								<Text style={StylesGloble.font20700000000}>Services</Text>
							</View>
							{
								Homestate?.length > 0 ? (
									<FlatList
										data={Homestate}
										keyExtractor={(item, index) => index}
										showsVerticalScrollIndicator={false}
										renderItem={({ item }) => (
											<TouchableOpacity
												onPress={() => navigation.navigate('ServiceDetails', { service_id: item.id })}>
												<View
													style={{
														borderWidth: 1,
														borderColor: '#D1D1D1',
														backgroundColor: '#FFFFFF',
														borderRadius: 10,
														padding: 15,
														marginTop: 20,
													}}>
													<View
														style={{
															flexDirection: 'row',
															alignItems: 'center',
														}}>
														<Image
															style={{ height: 45, width: 45, borderColor: '#9846D7', borderWidth: 1, borderRadius: 30 }}
															source={Imagepath.UserPermit}

														/>
														<View style={{ marginLeft: 10 }}>
															<Text style={StylesGloble.font16600black}>
																{item.service_name}
															</Text>
															<Text style={styles.textper}>{item.service_sub_name}</Text>
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
														item.service_docs ? (
															<FlatList
																keyExtractor={(item, index) => index}
																style={{
																	width: "100%", marginBottom: 0,
																}}
																showsVerticalScrollIndicator={false}
																data={item.service_docs}
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
														{item.service_description}
													</Text>

													<View
														style={{
															flexDirection: 'row',
															alignItems: 'center',
															marginTop: 10,
														}}>
														<Text
															style={{
																fontSize: 16,
																fontWeight: '700',
																color: '#5D5D5D',
															}}>
															Price -
														</Text>
														<Text
															style={{
																fontSize: 16,
																fontWeight: '700',
																color: '#9846D7',
															}}> ${item.price}
														</Text>
													</View>
												</View>
											</TouchableOpacity>
										)}
									/>
								) : (
									<View style={{ justifyContent: "center", marginTop: "60%" }}>
										<Text style={{ ...StylesGloble.font20700000000, fontSize: 15, fontWeight: "500", color: "#000000", fontStyle: "italic", textAlign: 'center' }}>No Data Found!!</Text>
									</View>
								)
							}


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
