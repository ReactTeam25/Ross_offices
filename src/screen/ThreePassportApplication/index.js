import React, { useState,useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Header from '../../helper/Header';
import TextField from '../../helper/TextField';
import Arrowdown from '../../assest/svg/Arrowdown.svg';
import CalenderPicker from '../../assest/svg/CalenderPicker.svg';
import Button from '../../helper/Button';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import ApiDataService from '../../services/Apiservice.service';
import LoadingPage from '../../helper/LoadingPage';
import Disablebutton from '../../helper/Disablebutton';
import Toast from 'react-native-simple-toast';
import useFormValidation from '../../services/Validation';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { setProfileData, setselectlanguage } from '../../redux/index';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';

const ThreePassportApplication = ({ navigation, route }) => {
    const { Validateformthree } = useFormValidation();
	const insets = useSafeArea();

	const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

    useEffect(() => {
        dispatch(setselectlanguage())
        i18n.changeLanguage(SelectlanguageReducer);
    }, [])

	const booking_id = route?.params?.booking_id
	const [error, setError] = useState({ isValid: false });
	const [input, setinput] = useState({
		country: "",
		province: "",
		city: "",
		dob:"",
	})
	console.log('selectedDate---------',input.dob);
	const [showdatepicker, setshowDatePicker] = useState(false);
	const [date, setDate] = useState(new Date());
	const [loading, setloading] = useState(false);
	
	const handleDateChange = (event, selectedDate) => {
		
		if (selectedDate) {
			setshowDatePicker(false);
			setDate(selectedDate)
			onInpChanged('dob',moment(selectedDate).format('YYYY-MM-DD'))
		}
	}
	const onInpChanged = (name, event) => {
		setError(p => {
			const obj = { ...p }
			obj?.errors && delete obj?.errors[name]
			return obj
		})
		setinput((prevInputs) => ({ ...prevInputs, [name]: event }));
	};

	const bookingsubmit = () => {
		const errorMessage = Validateformthree(input);
		if (errorMessage.isValid == false) {
			setError(errorMessage);
		} else {
		setloading(true);
		let body = {
			step: 3,
			bookingId: booking_id,
			country: input.country,
			province: input.province,
			municipality_city: input.city,
			date_of_birth: input.dob,
			lang:SelectlanguageReducer
		}
		console.log('body----------', body);

		ApiDataService.PostHeaderapi('passport/booking', body)
			.then(response => {
				setloading(false);
				console.log('response------formData----->', response);
				if (response.status == 200) {
					navigation.navigate('FourPassportApplication', { booking_id: booking_id })
					// calltoastmessage(response.data.message);
				}
			})
			.catch(e => {
				setloading(false);
				console.log('error------>', e);
			});
		}
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
			<ScrollView style={{ marginBottom: '10%' }}>
				<Header name={t('Passport Application')} />
				<View style={{ ...StylesGloble.marginscreen }}>
					<View>
						<Text style={StylesGloble.font20700000000}>{t('Place of birth')}</Text>
					</View>
					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('Country')}
							star={'*'}
							Placeholder={t("Country")}
							value={input.country}
							type="text"
							sectext="false"
							errorText={error.errors?.country}
							onChangeText={text => {
								onInpChanged('country', text)
							}}
						/>
					</View>

					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('Province')}
							star={'*'}

							Placeholder={t('Province')}
							value={input.province}
							type="text"
							sectext="false"
							errorText={error.errors?.province}
							onChangeText={text => {
								onInpChanged('province', text)
							}}
						/>
					</View>
					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('Municipality/City')}
							star={'*'}

							Placeholder={t('Municipality/City')}
							value={input.city}
							type="text"
							sectext="false"
							errorText={error.errors?.city}
							onChangeText={text => {
								onInpChanged('city', text)
							}}
						/>
					</View>

					<View style={{ marginTop: 15 }}>
						<Text style={StylesGloble.fon14500242A37}>{t('Date of Birth')} <Text style={{ color: "#FF6A6A" }}>*</Text></Text>
					</View>

					<TouchableOpacity
						style={{
							borderColor: '#5D5D5D',
							borderWidth: 1,
							borderRadius: 8,
							height: 48,
							marginVertical: 10,
						}} onPress={() => setshowDatePicker(true)}>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
								padding: 10,
							}}>
							{
								input.dob ? <Text style={StylesGloble.font165005D5D5D}>{input.dob}</Text> :
									<Text style={StylesGloble.font165005D5D5D}>{t('Select')}</Text>
							}
							<CalenderPicker />
						</View>
					</TouchableOpacity>
					{
							error.errors?.dob ? (
								<View>
									<Text style={{
										marginTop: 0,
										marginLeft: 5,
										fontSize: 12,
										color: '#B00020',
										fontFamily: 'Poppins-Regular',
									}}>{error.errors?.dob}</Text>
								</View>
							) : null
						}
					{
						showdatepicker &&
						<View>
							<DateTimePicker
								date={date}
								value={date}
								mode='date'
								onChange={handleDateChange}
								dateFormat={'YYYY-MM-DD'}
								display={'DD-MM-YYYY'}
							/>
						</View>
					}
					<View style={{ marginTop: '6%' }}>

						<Button
							label={t('Next')}
							onPress={() => bookingsubmit()}
						/>

					</View>
				</View>
			</ScrollView>
		</View>
		</View>
		
	);
};
export default ThreePassportApplication;
