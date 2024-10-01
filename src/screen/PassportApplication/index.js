import React, { useState ,useEffect} from 'react';
import { ImageBackground, View, Text, TouchableOpacity, ScrollView, StyleSheet, FlatList, PermissionsAndroid, Image,Platform } from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Header from '../../helper/Header';
import Imagepath from '../../constant/Imagepath';
import UploadA from '../../assest/svg/UploadA.svg';
import Arrowdown from '../../assest/svg/Arrowdown.svg';
import CalenderPicker from '../../assest/svg/CalenderPicker.svg';
import TextField from '../../helper/TextField';
import PaperUpload from '../../assest/svg/PaperUpload.svg';
import Button from '../../helper/Button';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Uploadimage from '../../helper/Uploadimage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import Checkboxinactive from '../../assest/svg/Checkboxinactive.svg';
import Checkboxactive from '../../assest/svg/Checkboxactive.svg'
import ApiDataService from '../../services/Apiservice.service';
import LoadingPage from '../../helper/LoadingPage';
import Disablebutton from '../../helper/Disablebutton';
import Toast from 'react-native-simple-toast';
import DocumentPicker from 'react-native-document-picker';
import DeviceInfo from "react-native-device-info";
import Radiotruebtn from '../../assest/svg/Radiotruebtn.svg';
import Radiobutton from '../../assest/svg/Radiobutton.svg';
import useFormValidation from '../../services/Validation';
import { setselectlanguage } from '../../redux/index';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';

const modeofservice = [
    {
        id: 1,
        name: "Online",
		namees:"En línea"
    },
    {
        id: 2,
        name: "Offline",
		namees:"Desconectado"
    }
]

const leaving = [
	{
		id: 1,
		name: 'Passport for first time',
		namees: 'Pasaporte por primera vez'
	},
	{
		id: 2,
		name: 'Renewal of Passport',
		namees: 'Renovación de Pasaporte'
	},
];

const PassportApplication = ({ navigation }) => {
	const androidVersion = DeviceInfo.getSystemVersion()
    const { Validateformone } = useFormValidation();
const insets = useSafeArea();

	const [showdatepicker, setshowDatePicker] = useState(false);
	const [date, setDate] = useState(new Date());
	const [uploadimage, setuploadimage] = useState(false);
	const [datee, setDatee] = useState('');
	const [image, setimage] = useState('');
	const [error, setError] = useState({ isValid: false });
	const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

    useEffect(() => {
        dispatch(setselectlanguage())
        i18n.changeLanguage(SelectlanguageReducer);
    }, [])


	const [input, setinput] = useState({
		mode:'',
		passportnum: "",
		id: "",
		image: "",
		date: "",
		signimage: "",
		services: '',

	})

	const handleDateChange = (event, selectedDate) => {
		if (selectedDate) {
			setshowDatePicker(false);
			setDatee(moment(selectedDate).format('YYYY-MM-DD'));
			onInpChanged('date', moment(selectedDate).format('YYYY-MM-DD'))
			setDate(selectedDate);
		}
	};

	// const isValidPhoneNumber = phone => {
	// 	return /^\d{10}$/.test(phone);
	// };

	const closeimagepopup = (type, data) => {
		console.log('imasedata------', data);
		setuploadimage(false);
		if (type == 2) {
			onInpChanged('image', data.path)
			setuploadimage(false);
		}
	};
	const [servicerequesthide, setservicerequesthide] = useState(false)

	const [loading, setloading] = useState(false);
    const [selectmodename, setselectmodename] = useState('')

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
			onInpChanged('signimage', Doc[0].uri)
		} else {
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
	const selectmodefunc = (name) => {
        setselectmodename(name)
        onInpChanged('mode', name)

    }
	const changvaluesports = (id) => {
		onInpChanged('services', id)
		setservicerequesthide(false)
		// setError(p => {
		// 	const obj = { ...p }
		// 	obj?.errors && delete obj?.errors['services']
		// 	return obj
		// })
		// setinput(p => {
		// 	const currentlactivelang = p.services || [];
		// 	const index = currentlactivelang.indexOf(id);

		// 	const updateactivelang = index === -1
		// 		? [...currentlactivelang, id]
		// 		: currentlactivelang.filter(item => item !== id);
		// 	return { ...p, services: updateactivelang };
		// });
	}
	const bookingsubmit = () => {
		const errorMessage = Validateformone(input);
		if (errorMessage.isValid == false) {
			setError(errorMessage);
		} else {
			setloading(true);

			let formData = new FormData();
			formData.append('step', 1);
			formData.append('lang', SelectlanguageReducer);
			formData.append('mode', input.mode === 'Online' ? 'ONLINE' : 'OFFLINE');
			
			formData.append('consular_service_request', input.services);
			formData.append('application_date', datee);
			formData.append('sign_applicant', { name: 'camera-picture.png', type: 'image/jpeg', uri: input.signimage, });
			formData.append('passport_pic', {
				name: 'camera-picture.png', type: 'image/jpeg',
				uri: input.image,
			});
			console.log('formData-----', formData);
			ApiDataService.PostHeaderapi('passport/booking', formData)
				.then(response => {
					setloading(false);
					console.log('response------formData----->', response);
					if (response.status == 200) {
						navigation.navigate('TwoPassportApplication', { booking_id: response.data.data.id })
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
<View style={{ ...StylesGloble.container }}>
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
			<ScrollView style={{ marginBottom: '10%' }}>
				<Header name={t('Passport Application')} />
				<View style={{ ...StylesGloble.marginscreen }}>

					<ImageBackground
						source={{ uri: input.image }}
						style={{ height: 90, width: 90, alignSelf: 'center', backgroundColor: '#dddddd', borderRadius: 50 }} imageStyle={{ borderRadius: 50 }}>
						<TouchableOpacity style={{}} onPress={() => setuploadimage(true)}>
							<UploadA
								style={{ alignSelf: 'center', alignItems: 'center', top: 22 }}
							/>
						</TouchableOpacity>

					</ImageBackground>
					{
						error.errors?.image ? (
							<View>
								<Text style={{
									marginTop: 4,
									marginLeft: 5,
									fontSize: 12,
									color: '#B00020',
									fontFamily: 'Poppins-Regular',
									textAlign: "center"
								}}>{error.errors?.image}</Text>
							</View>
						) : null
					}
					<View style={{ marginTop: 10 }}>
						<View>
							<Text style={{ fontSize: 14, fontWeight: "500", color: "#242A37" }}>
								{t('Choose')} <Text style={{ color: "#FF6A6A" }}>*</Text>
							</Text>
						</View>
						<View>
							<FlatList
								style={{ marginBottom: '2%' }}
								data={modeofservice}
								numColumns={2}
								renderItem={({ item }) => (
									<TouchableOpacity style={{ marginTop: 10, width: '40%' }} onPress={() => selectmodefunc(item.name)}>
										<View style={{ flexDirection: "row" }}>
											<View>
												{
													selectmodename == item.name ? (
														<Radiotruebtn />
													) : (
														<Radiobutton />
													)
												}

											</View>
											<Text
												style={{ fontSize: 14, fontWeight: '500', color: '#454545', alignSelf: "center", marginLeft: 5 }}>
													{
														SelectlanguageReducer == 'es' ? item.namees : item.name
													}
											</Text>
										</View>
									</TouchableOpacity>)} />

						</View>
						{
							error.errors?.mode ? (
								<View>
									<Text style={{
										marginTop: 2,
										marginLeft: 0,
										fontSize: 12,
										color: '#B00020',
										fontFamily: 'Poppins-Regular',
										marginBottom: 0
									}}>{error.errors?.mode}</Text>
								</View>
							) : null
						}

					</View>

					<View style={{ marginTop: 10 }}>
						<Text style={StylesGloble.fon14500242A37}>
							{t('Consular Service Request')} <Text style={{ color: "#FF6A6A" }}>*</Text>
						</Text>
					</View>
					<TouchableOpacity
						style={{
							borderColor: '#5D5D5D',
							borderWidth: 1,
							borderRadius: 8,
							height: 48,
							marginVertical: 10,
						}}
						onPress={() => setservicerequesthide(!servicerequesthide)}>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
								padding: 10,
							}}>
							<Text style={StylesGloble.font165005D5D5D}>
								{
									input.services == '' ? (
										t('Select')
									) : (
										input.services
									)
								}

							</Text>
							<Arrowdown />
						</View>
					</TouchableOpacity>
					{
						error.errors?.services &&
						<View>
							<Text style={{
								marginLeft: 5,
								fontSize: 12,
								color: '#B00020',
								fontFamily: 'Poppins-Regular',
								marginBottom: 5
							}}>{error.errors?.services}</Text>
						</View>
					}
					{
						servicerequesthide ? (
							<View style={{ borderColor: "#5D5D5D", borderWidth: 1, marginTop: 5, borderRadius: 15, padding: 10 }}>
								<FlatList
									contentContainerStyle={{
										marginTop: 0
									}}
									data={leaving}
									showsVerticalScrollIndicator={false}
									renderItem={({ item }) => <>
										{/* {(input.services.includes(item.name)) ? (
											<TouchableOpacity style={{ padding: 5, flexDirection: "row", justifyContent: "space-between" }} onPress={() => changvaluesports(item.name)}>
												<Text style={{ fontSize: 15, fontWeight: '400', color: "#6D6D6D", }}>
													{item.name}
												</Text>
												<Checkboxactive />
											</TouchableOpacity>
										) : ( */}
										<TouchableOpacity style={{ padding: 5, flexDirection: "row", justifyContent: "space-between" }} onPress={() => changvaluesports(item.name)}>
											<Text style={{ fontSize: 15, fontWeight: '400', color: "#6D6D6D", }}>
												{
													SelectlanguageReducer == 'es' ? item.namees : item.name
												}
											</Text>
											{
												input.services == item.name ? (
													<Checkboxactive />
												) : (
													<Checkboxinactive />
												)
											}

										</TouchableOpacity>
										{/* )} */}

									</>}
								/>
							</View>
						) : null
					}


					<View style={{ marginTop: 5 }}>
						<Text style={StylesGloble.fon14500242A37}>
							{t('Application Date')} <Text style={{ color: "#FF6A6A" }}>*</Text>
						</Text>
					</View>
					<TouchableOpacity
						style={{
							borderColor: '#5D5D5D',
							borderWidth: 1,
							borderRadius: 8,
							height: 48,
							marginVertical: 10,
						}}
						onPress={() => setshowDatePicker(true)}>
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
								padding: 10,
							}}>
							{input.date ? (
								<Text style={StylesGloble.font165005D5D5D}>{input.date}</Text>
							) : (
								<Text style={StylesGloble.font165005D5D5D}>{t('Select Date')}</Text>
							)}
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
						error.errors?.date ? (
							<View>
								<Text style={{
									marginTop: 2,
									marginLeft: 5,
									fontSize: 12,
									color: '#B00020',
									fontFamily: 'Poppins-Regular',
									marginBottom: 10
								}}>{error.errors?.date}</Text>
							</View>
						) : null
					}
					<View style={{ marginVertical: 10 }}>
						<Text style={StylesGloble.fon14500242A37}>
							{t('Signature of Applicant (in the center of the rectangle)')} <Text style={{ color: "#FF6A6A" }}>*</Text>
						</Text>
					</View>

					<TouchableOpacity style={{ borderWidth: 1, borderColor: '#5D5D5D', height: 148, borderRadius: 8, marginTop: 5, borderStyle: 'dashed', }} onPress={() => uploadingdoc()}>
						{
							input.signimage ? (
								<View>
									<Image source={{ uri: input.signimage }} style={{ height: "100%", width: "100%", borderRadius: 8 }} />
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
										<Text style={{ fontSize: 16, fontWeight: '600', color: '#9846D7' }}>
											{t('Choose')}
										</Text>
										<Text style={{ fontSize: 16, fontWeight: '600', color: '#6D6D6D',marginLeft:4 }}>
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
							)
						}


					</TouchableOpacity>
					{
						error.errors?.signimage ? (
							<View>
								<Text style={{
									marginTop: 4,
									marginLeft: 5,
									fontSize: 12,
									color: '#B00020',
									fontFamily: 'Poppins-Regular',
								}}>{error.errors?.signimage}</Text>
							</View>
						) : null
					}


					<View style={{ marginTop: '8%' }}>
						<Button
							label={t('Next')}
							onPress={() => bookingsubmit()}
						/>
					</View>
				</View>


			</ScrollView>
			{uploadimage && (
				<Uploadimage
					closeimagepopup={closeimagepopup}
					width={wp('100%')}
					height={400}
					cropperCircleOverlay={true}
				/>
			)}
		</View>
		</View>
		
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#fff',
	},
	label: {
		fontSize: 16,
		marginBottom: 10,
	},
	selectedItems: {
		marginTop: 20,
	},
	selectedItem: {
		fontSize: 14,
		marginVertical: 2,
	},
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	inputContainer: {
		marginBottom: 20,
	},
	label: {
		fontSize: 16,
		marginBottom: 10,
	},
	selectButton: {
		borderWidth: 1,
		borderColor: '#5D5D5D',
		borderRadius: 8,
		padding: 10,
		height: 48,
		justifyContent: 'center',
		// bottom:10,
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	modalContent: {
		width: '80%',
		backgroundColor: '#fff',
		padding: 20,
		borderRadius: 10,
		alignItems: 'center',
	},
	modalTitle: {
		fontSize: 20,
		marginBottom: 20,
	},
	option: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},
	optionText: {
		fontSize: 16,
		marginLeft: 10,
	},
	closeButton: {
		marginTop: 20,
		padding: 10,
		backgroundColor: '#2196F3',
		borderRadius: 5,
	},
	closeButtonText: {
		color: '#fff',
		fontSize: 16,
	},
});
export default PassportApplication;
