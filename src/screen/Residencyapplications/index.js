import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, PermissionsAndroid } from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Header from '../../helper/Header';
import Yourdetail from './Yourdetail';
import AdminUpdate from './AdminUpdate';
import ApiDataService from '../../services/Apiservice.service'
import LoadingPage from '../../helper/LoadingPage';
import DeviceInfo from "react-native-device-info";
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { setProfileData, setselectlanguage } from '../../redux/index';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';

const Residencyapplications = ({ navigation, route }) => {
	const { t, i18n } = useTranslation();
	const dispatch = useDispatch();
	const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);
	const insets = useSafeArea();

	useEffect(() => {
		dispatch(setselectlanguage())
		i18n.changeLanguage(SelectlanguageReducer);
	}, [])
	const type = route?.params?.type

	const [activetab, setactivetab] = useState(1);
	const [loading, setloading] = useState(false);

	const booking_id = route?.params?.booking_id

	const [bookingdetail, setbookingdetail] = useState('')

	const getbookingdetail = () => {
		let url = `booking/${booking_id}?lang=${SelectlanguageReducer}`
		ApiDataService.GetTokenapi(url).then(response => {
			console.log('response--booking/-', response);
			if (response.status == 200) {
				setbookingdetail(response.data.data)
			}
		}).catch(e => {
			console.log('eeeee----booking------', e);
		})
	}

	useEffect(() => {
		getbookingdetail()
	}, [booking_id]);

	const submitfunc = (docid) => {
		let url = `booking/document?booking_id=${booking_id}&document_id=${docid}?lang=${SelectlanguageReducer}`
		console.log('url----------', url);
		setloading(true);
		ApiDataService.DeleteTokenapi(url)
			.then(response => {
				console.log('booking--------rrrrr-----', response);
				setloading(false);
				if (response.status == 200) {
					getbookingdetail()
					calltoastmessage(response.data.message);
				}
			})
			.catch(e => {
				setloading(false);
				console.log('e--------', e);
			});
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
				<View
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						height: '100%',
						width: '100%',
						zIndex: 999999,
					}}>
					<LoadingPage />
				</View>
			)}
			<View style={{ backgroundColor: '#FFFFFF', height: '100%', width: '100%' }}>
				<Header name={t('Booking Detail')} />
				<View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
					<TouchableOpacity
						onPress={() => setactivetab(1)}
						style={{
							borderBottomWidth: 3,

							borderBottomColor: activetab == 1 ? '#9846D7' : '#ffffff',
							width: '43%',
							paddingBottom: 15,
						}}>
						<Text
							style={{
								...StylesGloble.fon14700b000000,
								fontWeight: '600',
								color: activetab == 1 ? '#000000' : '#5D5D5D',
								textAlign: 'center',
							}}>
							{t('Your Details')}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => setactivetab(2)}
						style={{
							borderBottomWidth: 3,
							borderBottomColor: activetab == 2 ? '#9846D7' : '#ffffff',
							width: '43%',
							paddingBottom: 15,
						}}>
						<Text
							style={{
								...StylesGloble.fon14700b000000,
								fontWeight: '600',
								color: activetab == 2 ? '#000000' : '#5D5D5D',
								textAlign: 'center',
							}}>
							{t('Admin Update')}
						</Text>
					</TouchableOpacity>
				</View>
				{activetab == 1 ? (
					<Yourdetail bookingdetail={bookingdetail} navigation={navigation} submitfunc={submitfunc} type={type} booking_id={booking_id} />
				) : activetab == 2 ? (
					<AdminUpdate bookingdetail={bookingdetail} navigation={navigation} type={type} booking_id={booking_id} />
				) : null}
			</View>
		</View>
		</View>
		
	);
};

export default Residencyapplications;
