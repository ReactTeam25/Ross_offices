import React, { useState,useEffect } from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	TextInput,PermissionsAndroid,Image,Platform
} from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Header from '../../helper/Header';
import TextField from '../../helper/TextField';
import Arrowdown from '../../assest/svg/Arrowdown.svg';
import CalenderPicker from '../../assest/svg/CalenderPicker.svg';
import PaperUpload from '../../assest/svg/PaperUpload.svg';
import Button from '../../helper/Button';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import ApiDataService from '../../services/Apiservice.service';
import LoadingPage from '../../helper/LoadingPage';
import Toast from 'react-native-simple-toast';
import DocumentPicker from 'react-native-document-picker';
import DeviceInfo from "react-native-device-info";
import useFormValidation from '../../services/Validation';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { setProfileData, setselectlanguage } from '../../redux/index';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';

const SevenPassportApplication = ({ navigation, route }) => {
	const androidVersion = DeviceInfo.getSystemVersion()
    const { Validateformseven } = useFormValidation();
	const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
const insets = useSafeArea();

    const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

    useEffect(() => {
        dispatch(setselectlanguage())
        i18n.changeLanguage(SelectlanguageReducer);
    }, [])

	const booking_id = route?.params?.booking_id

	const [showdatepicker, setshowDatePicker] = useState(false);
	const [date, setDate] = useState(new Date());
	const handleDateChange = (event, selectedDate) => {
		if (selectedDate) {
			setshowDatePicker(false);
			setDate(selectedDate);
			onInpChanged('consular_date', moment(selectedDate).format('YYYY-MM-DD'))
		}
	};
	const [showdatepick, setshowDatePick] = useState(false);
	const [dat, setDat] = useState(new Date());
	const handleDate = (event, selectedDate) => {
		if (selectedDate) {
			setshowDatePick(false);
			setDat(selectedDate);
			onInpChanged('ex_date', moment(selectedDate).format('YYYY-MM-DD'))
		}
	};
	const [error, setError] = useState({ isValid: false });
	const [loading, setloading] = useState(false);
	const [input, setInput] = useState({
		pass_num: "",
		ex_date: "",
		place: "",
		birth_took: "",
		birth_invoice: "",
		birth_civil: "",
		consular_num: "",
		consular_date: "",
		consular_tariff: "",
		consular_assessment: "",
		consular_sign: "",
	});
	const onInpChanged = (name, event) => {
		setError(p => {
			const obj = { ...p }
			obj?.errors && delete obj?.errors[name]
			return obj
		})
		setInput((prevInputs) => ({ ...prevInputs, [name]: event }));
	};
	
	const uploadingdoc = async () => {
        try {
            if (Platform.OS == 'ios') {
                adddocnewfunc()
            } else {
                let granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    {
                        title: t('File manager permission'),
                        message: t('Ross Offices needs file manager permission'),
                    },
                );

                if (androidVersion > 12) {
                    granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                        {
                            title: t('File manager permission'),
                            message: t('Ross Offices needs file manager permission'),
                        },
                    );
                }
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    adddocnewfunc()
                } else {
                    console.log('Gallery permission denied');
                }
            }

        } catch (error) {
            console.log('Error picking video from gallery:', error);
        }
    };

    const adddocnewfunc = async () => {
        const Doc = await DocumentPicker.pick({
			type: [DocumentPicker.types.allFiles],
		});
		console.log('audio-----1111---', Doc);
		if (Doc && Doc.length > 0) {
			onInpChanged('consular_sign', Doc[0].uri)
		} else {
		}
    }

	const bookingsubmit = () => {
		const errorMessage = Validateformseven(input);
		if (errorMessage.isValid == false) {
			setError(errorMessage);
		} else {
			setloading(true);
			let body = {
				step: 7,
				bookingId: booking_id,
				expired_passport_number: input.pass_num,
				expedition_date: input.ex_date,
				place: input.place,
				took: input.birth_took,
				invoice: input.birth_invoice,
				civil_registration: input.birth_civil,
				consular_reg_number: input.consular_num,
				of_date: input.consular_date,
				tariff: input.consular_tariff,
				consular_assessment: input.consular_assessment,
				signature_consul_stam: input.consular_sign,
				lang:SelectlanguageReducer
			}
			console.log('body----------', body);

			ApiDataService.PostHeaderapi('passport/booking', body)
				.then(response => {
					setloading(false);
					console.log('response------formData----->', response);
					if (response.status == 200) {
						navigation.navigate('AttPassportApplication', { booking_id: booking_id })
						calltoastmessage(response.data.message);
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
						<Text style={{ ...StylesGloble.font20700000000, lineHeight: 27.32 }}>
							{t('To prepare the Passport, the holder presented and verified with')}
						</Text>
					</View>
					<View style={{ marginTop: 20 }}>
						<Text style={{ color: '#000000', fontSize: 16, fontWeight: '700' }}>
							{t('Expired passport')}
						</Text>
					</View>
					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('Number')}
							star={'*'}

							Placeholder="12345"
							value={input.pass_num}
							type="text"
							sectext="false"
							errorText={error.errors?.pass_num}
							onChangeText={text => {
								onInpChanged('pass_num', text)
							}}
						/>
					</View>

					<View style={{ marginTop: 20 }}>
						<Text style={StylesGloble.fon14500242A37}>{t('Expedition date')} <Text style={{ color: "#FF6A6A" }}>*</Text></Text>
					</View>

					<TouchableOpacity
						style={{
							borderColor: '#5D5D5D',
							borderWidth: 1,
							borderRadius: 8,
							height: 48,
							marginVertical: 10,
						}} onPress={() => setshowDatePick(true)}>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
								padding: 10,
							}}>
							{
								input.ex_date ?

									<Text style={StylesGloble.font165005D5D5D}>{input.ex_date}</Text> :
									<Text style={StylesGloble.font165005D5D5D}>{t('Select')}</Text>
							}
							<CalenderPicker />
						</View>
					</TouchableOpacity>

					{showdatepick && (
						<View>
							<DateTimePicker
								date={dat}
								value={dat}
								mode="date"
								onChange={handleDate}
								minimumDate={new Date()}
								format={'YYYY-MM-DD'}
								displayFormat={'DD-MM-YYYYY'}
							/>
						</View>
					)}
					{
						error.errors?.ex_date ? (
							<View>
								<Text style={{
									marginTop: 0,
									marginLeft: 5,
									fontSize: 12,
									color: '#B00020',
									fontFamily: 'Poppins-Regular',
									marginBottom: 10
								}}>{error.errors?.ex_date}</Text>
							</View>
						) : null
					}
					<View style={{ marginTop: 10 }}>
						<TextField
							name={t('Place')}
							star={'*'}

							Placeholder={t("Valencia")}
							value={input.place}
							type="text"
							sectext="false"
							errorText={error.errors?.place}
							onChangeText={text => {
								onInpChanged('place', text)
							}}
						/>
					</View>
					<View style={{ marginTop: 20 }}>
						<Text style={{ color: '#000000', fontSize: 16, fontWeight: '700' }}>
							{t('Birth Certificate')}
						</Text>
					</View>
					<View style={{ marginTop: 20 }}>
						<TextField
							name={t('Took')}
							star={'*'}

							Placeholder={t("Enter Details")}
							value={input.birth_took}
							type="text"
							sectext="false"
							errorText={error.errors?.birth_took}
							onChangeText={text => {
								onInpChanged('birth_took', text)
							}}
						/>
					</View>

					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('Invoice')}
							star={'*'}

							Placeholder={t("Enter Details")}
							value={input.birth_invoice}
							type="text"
							sectext="false"
							errorText={error.errors?.birth_invoice}
							onChangeText={text => {
								onInpChanged('birth_invoice', text)
							}}
						/>
					</View>

					<View style={{ marginTop: 20 }}>
						<TextField
							name={t('Civil registration')}
							star={'*'}

							Placeholder={t("Enter Details")}
							value={input.birth_civil}
							type="text"
							sectext="false"
							errorText={error.errors?.birth_civil}
							onChangeText={text => {
								onInpChanged('birth_civil', text)
							}}
						/>
					</View>

					<View style={{ marginTop: 20 }}>
						<Text style={{ color: '#000000', fontSize: 16, fontWeight: '700' }}>
							{t('Consular Registration')}
						</Text>
					</View>

					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('Number')}
							star={'*'}

							Placeholder={t("12345")}
							value={input.consular_num}
							type="phone"
							sectext="false"
							errorText={error.errors?.consular_num}
							onChangeText={text => {
								onInpChanged('consular_num', text)
							}}
						/>
					</View>

					<View style={{ marginTop: 20 }}>
						<Text style={StylesGloble.fon14500242A37}>{t('Of date')} <Text style={{ color: "#FF6A6A" }}>*</Text></Text>
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
								input.consular_date ?

									<Text style={StylesGloble.font165005D5D5D}>{input.consular_date}</Text> :
									<Text style={StylesGloble.font165005D5D5D}>{t('Select')}</Text>
							}

							<CalenderPicker />
						</View>
					</TouchableOpacity>
					{showdatepicker && (
						<View>
							<DateTimePicker
								date={date}
								value={date}
								mode="date"
								onChange={handleDateChange}
								minimumDate={new Date()}
								format={'YYYY-MM-DD'}
								displayFormat={'DD-MM-YYYYY'}
							/>
						</View>
					)}
					{
						error.errors?.consular_date ? (
							<View>
								<Text style={{
									marginTop: 0,
									marginLeft: 5,
									fontSize: 12,
									color: '#B00020',
									fontFamily: 'Poppins-Regular',
									marginBottom: 10
								}}>{error.errors?.consular_date}</Text>
							</View>
						) : null
					}

					<View style={{ marginTop: 10 }}>
					<TextField
							name={t('Tariff')}
							star={'*'}

							Placeholder={t("Enter Tariff amount")}
							value={input.consular_tariff}
							type="phone"
							sectext="false"
							errorText={error.errors?.consular_tariff}
							onChangeText={text => {
								onInpChanged('consular_tariff', text)
							}}
						/>
					</View>

					<View style={{ marginTop: 20 }}>
						<Text style={StylesGloble.fon14500242A37}>{t('Consular Assessment')} <Text style={{ color: "#FF6A6A" }}>*</Text></Text>
					</View>
					<View
						style={{
							borderColor: '#5D5D5D',
							borderRadius: 8,
							borderWidth: 1,
							height: 200,
							marginTop: 10,
							padding: 0,
						}}>
							{/* <TextField
							name={'Tariff'}
							Placeholder="Enter Details"
							value={input.consular_tariff}
							type="phone"
							sectext="false"
							errorText={error.errors?.consular_tariff}
							onChangeText={text => {
								onInpChanged('consular_tariff', text)
							}}
						/> */}
						<TextInput
							style={{ padding: 10,color:"#000000"  }}
							placeholder={t("Enter Details")}
							value={input.consular_assessment}
							placeholderTextColor={'#5D5D5D'}
							onChangeText={text => {
								onInpChanged('consular_assessment', text)
							}}
							multiline={true}
						/>
					</View>
					{
							error.errors?.consular_assessment ? (
								<View>
									<Text style={{
										marginTop: 4,
										marginLeft: 5,
										fontSize: 12,
										color: '#B00020',
										fontFamily: 'Poppins-Regular',
									}}>{error.errors?.consular_assessment}</Text>
								</View>
							) : null
						}

					<View style={{ marginTop: 10 }}>
						<Text style={{ ...StylesGloble.fon14500242A37 }}>
							{t('Signature of the Consul and Stam')} <Text style={{ color: "#FF6A6A" }}>*</Text>
						</Text>
						<TouchableOpacity
							style={{
								borderWidth: 1,
								borderColor: '#5D5D5D',
								height: 148,
								borderRadius: 8,
								marginTop: 10,
								borderStyle: 'dashed',
							}} onPress={()=>uploadingdoc()}>
							{
								input.consular_sign ? (
									<View>
										<Image source={{ uri: input.consular_sign }} style={{ height: "100%", width: "100%", borderRadius: 8 }} />
									</View>
								) : (
									<View>
										<View style={{ alignSelf: 'center', marginTop: 15 }}>
											<PaperUpload />
										</View>

										<View
											style={{
												flexDirection: 'row',
												alignItems: 'center',
												justifyContent: 'center',
												marginTop: 15,
											}}>
											<Text
												style={{ fontSize: 16, fontWeight: '600', color: '#9846D7' }}>
												{t('Choose')}
											</Text>
											<Text
												style={{
													fontSize: 16,
													fontWeight: '600',
													color: '#6D6D6D',
													left: 5,
												}}>
												{t('file to upload')}
											</Text>
										</View>
										<Text
											style={{
												fontSize: 14,
												fontWeight: '400',
												color: '#6D6D6D',
												textAlign: 'center',
												marginTop: 6,
											}}>
											{t('Please select your document type & upload an image of your document below:')}
										</Text>
									</View>
								)}


						</TouchableOpacity>
						{
							error.errors?.consular_sign ? (
								<View>
									<Text style={{
										marginTop: 4,
										marginLeft: 5,
										fontSize: 12,
										color: '#B00020',
										fontFamily: 'Poppins-Regular',
									}}>{error.errors?.consular_sign}</Text>
								</View>
							) : null
						}

					</View>

					<View style={{ marginTop: '10%' }}>
						<Button label={t('Next')} onPress={() => bookingsubmit()} />
					</View>
				</View>
			</ScrollView>
		</View>
		</View>
		
	);
};
export default SevenPassportApplication;
