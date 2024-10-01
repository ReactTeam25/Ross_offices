import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Imagepath from '../../constant/Imagepath';
import ApiDataService from '../../services/Apiservice.service'
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { setProfileData, setselectlanguage } from '../../redux/index';
import { useSelector, useDispatch } from 'react-redux';
import BlankScreen from '../../helper/BlankScreen';
import { useSafeArea } from 'react-native-safe-area-context';

const Notification = ({navigation}) => {
	const { t, i18n } = useTranslation();
	const dispatch = useDispatch();
const insets = useSafeArea();

	const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

	useEffect(() => {
		dispatch(setselectlanguage())
		i18n.changeLanguage(SelectlanguageReducer);
	}, [])

	const [BookingReducer, setBookingReducer] = useState([])
	const getbookings = () => {
		let url = `notify/list?lang=${SelectlanguageReducer}`
		console.log('url----------', url);
		ApiDataService.GetTokenapi(url)
			.then(response => {
				console.log('booking---pnotify-----', response.data.notifications);
				if (response.status == 200) {
					setBookingReducer(response.data.notifications)
				}
			})
			.catch(e => {
				console.log('e--------', e);
			});
	};

	useEffect(() => {
		getbookings()
	}, []);

	const navigationfunc=(item)=>{
		if(item?.notification_type == 'BOOKING_STATUS_UPDATE'){
			navigation.navigate('BottomTab',{screen : 'Booking'})
		}
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
			<View style={{ backgroundColor: 'white', height: '100%', width: '100%' }}>
				<View style={StylesGloble.marginscreen}>
					<View style={{ marginTop: 20 }}>
						<Text style={StylesGloble.font20700000000}>{t('Notification')}</Text>
					</View>
					{
						BookingReducer?.length > 0 ? (
							<FlatList
								data={BookingReducer.reverse()}
								style={{marginBottom:"20%"}}
								keyExtractor={(item, index) => index}
								showsVerticalScrollIndicator={false}
								renderItem={({ item }) => (
									<View>
										<TouchableOpacity
											style={{
												flexDirection: 'row',
												alignItems: 'center',
												marginTop: 20,
											}} onPress={()=>navigationfunc(item)}>

											<View style={{ width: '75%' }}>
												<View
													style={{
														flexDirection: 'row',
														alignItems: 'center',
														justifyContent: 'space-between',
													}}>
													<Text style={StylesGloble.fon14700b000000}>
														{item.notify_title}
													</Text>

												</View>
												<Text style={StylesGloble.font12400Grey5D5D5D}>
													{item.notify_body}
												</Text>
											</View>
											<View style={{ alignSelf: "center", width: "25%" }}>
												<Text style={{ ...StylesGloble.font10500grey, textAlign: "right" }}>
													{moment(item.createdAt).format('LL')}
												</Text>
											</View>
										</TouchableOpacity>
										<View
											style={{
												borderBottomWidth: 1,
												borderBottomColor: '#EFEFEF',
												paddingTop: 20,
											}}
										/>
									</View>
								)}
							/>
						) : (
							<View style={{ justifyContent: "center", marginTop: "20%", alignSelf: "center" }}>
								<BlankScreen />
							</View>

						)
					}


				</View>
			</View>
		</View>
		</View>
		
	);
};
export default Notification;







