import React, { useState,useEffect } from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity, PermissionsAndroid, FlatList,Dimensions,Platform
} from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Header from '../../helper/Header';
import TextField from '../../helper/TextField';
import Button from '../../helper/Button';
import CalenderPicker from '../../assest/svg/CalenderPicker.svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import ApiDataService from '../../services/Apiservice.service'
import Disablebutton from '../../helper/Disablebutton';
import LoadingPage from '../../helper/LoadingPage';
import Toast from 'react-native-simple-toast';
import DocumentPicker from 'react-native-document-picker';
import DeviceInfo from "react-native-device-info";
import Radiotruebtn from '../../assest/svg/Radiotruebtn.svg';
import Radiobutton from '../../assest/svg/Radiobutton.svg'
import Addcircle from '../../assest/svg/Addcircle.svg';
import Docment from '../../assest/svg/Docment.svg'
import Deletedoc from '../../assest/svg/Deletedoc.svg'
import useFormValidation from '../../services/Validation';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { setProfileData, setselectlanguage } from '../../redux/index';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const modeofservice = [
    {
        id: 1,
        name: "Online",
        namees: "En línea"
    },
    {
        id: 2,
        name: "Offline",
        namees: "Desconectado"
    }
]

const TravelBooking = ({ navigation, route }) => {
	const service_id = route?.params?.service_id
	const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);
	const insets = useSafeArea();

    useEffect(() => {
        dispatch(setselectlanguage())
        i18n.changeLanguage(SelectlanguageReducer);
    }, [])
    const { Validatetripsform } = useFormValidation();

	const androidVersion = DeviceInfo.getSystemVersion()

	const [showcolor, setshowcolor] = useState(0);
	const [loading, setloading] = useState(false);
	const [selectmodename, setselectmodename] = useState('')

	const [showDOB, setshowDOB] = useState(false);
	const [dob, setDOB] = useState(new Date());
	const [error, setError] = useState({ isValid: false });
	const [input, setinput] = useState({
		mode: '',
		firstName: '',
		lastName: '',
		phonenumber: '',
		email: '',
		totalNumberofAdults: '',
		totalNumberofChildren: '',
		startLocation: '',
		destination: '',
		desiredTripAmount: '',
		traveldate: '',
	})

	const [uploaddocarray, setuploaddocarray] = useState([])


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
            const document = {
                name: Doc[0].name, type: Doc[0].type, uri: Doc[0].uri
            }
            setuploaddocarray([...uploaddocarray, document])
        } else {
        }
    }
    const remove_doc = (id, name) => {
        if (uploaddocarray != null && uploaddocarray.length > 0) {
            const newImageArray = uploaddocarray.filter(item => item.uri !== id);
            setuploaddocarray(newImageArray);
        }
    }

	const selectmodefunc = (name) => {
		setselectmodename(name)
		onInpChanged('mode',name )

	}
	const handleDOBchange = (event, selectedDate) => {
		setshowDOB(false);
		if (selectedDate) {
			setDOB(selectedDate);
			onInpChanged('traveldate', moment(selectedDate).format('YYYY-MM-DD'))
		}

	};
	const onInpChanged = (name, event) => {
		setError(p => {
			const obj = { ...p }
			obj?.errors && delete obj?.errors[name]
			return obj
		})
		setinput((prevInputs) => ({ ...prevInputs, [name]: event }));
	};

	const bookingsubmit = () => {
		const errorMessage = Validatetripsform(input);
		if (errorMessage.isValid == false) {
			setError(errorMessage);
		} else {
			let formData = new FormData();

			let body = {
				serviceId: service_id,
				first_name: input.firstName,
				last_name:input.lastName,
				email: input.email,
				phone: input.phonenumber,
				mode: input.mode == 'Online' ? 'ONLINE' : 'OFFLINE',
				number_of_adult: input.totalNumberofAdults,
				number_of_child: input.totalNumberofChildren,
				start_location: input.startLocation,
				destination: input.destination,
				travel_date: input.traveldate,
				desired_trip_amount: input.desiredTripAmount,
				lang:SelectlanguageReducer,
                booking_type: "TRAVEL_BOOKING",

			};
			for (let key in body) {
                formData.append(key, body[key]);
            }
            for (let key in uploaddocarray) {
                formData.append('documents', uploaddocarray[key]);
            }
			setloading(true);
			ApiDataService.PostHeaderapi('booking/travel', formData)
				.then(response => {
					console.log('response------travel/history----->', response);
					setloading(false);
					if (response.status == 201) {
						calltoastmessage(response.data.message);
						navigation.navigate('Successfull')
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
			<Header name={t('Travel Booking')} />

			<ScrollView style={{ marginBottom: '10%' }}>
				<View style={StylesGloble.marginscreen}>
					<View>
						<Text style={{ fontSize: 16, fontWeight: "700", color: "#000000" }}>
							{t('Passenger Info')}
						</Text>
					</View>
					<View style={{ marginTop: 10 }}>
						<View>
							<Text style={{ fontSize: 14, fontWeight: "500", color: "#242A37" }}>
								{t('Choose')}
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
										marginBottom: 10
									}}>{error.errors?.mode}</Text>
								</View>
							) : null
						}
					</View>
					<View>
						<TextField
							name={t('First Name')}
							Placeholder={t("Enter name")}
							value={input.firstName}
							type="text"
							sectext="false"
							errorText={error.errors?.firstName}
							onChangeText={text => {
								onInpChanged('firstName', text)
							}}
						/>
					</View>
					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('Last Name')}
							Placeholder={t("Enter name")}
							value={input.lastName}
							type="text"
							sectext="false"
							errorText={error.errors?.lastName}
							onChangeText={text => {
								onInpChanged('lastName', text)
							}}
						/>
					</View>
					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('Phone Number')}
							Placeholder={t("Enter Phone Number")}
							value={input.phonenumber}
							type="phone"
							sectext="false"
							errorText={error.errors?.phonenumber}
							onChangeText={text => {
								onInpChanged('phonenumber', text)
							}}
						/>
					</View>
					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('Email Address')}
							Placeholder={t("Enter Email Address")}
							value={input.email}
							type="email"
							sectext="false"
							errorText={error.errors?.email}
							onChangeText={text => {
								onInpChanged('email', text)
							}}
						/>
					</View>
					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('Total Number of Adults')}
							Placeholder={t("Enter Total Number of Adults")}
							value={input.totalNumberofAdults}
							type="number"
							sectext="false"
							errorText={error.errors?.totalNumberofAdults}
							onChangeText={text => {
								onInpChanged('totalNumberofAdults', text)
							}}
						/>
					</View>
					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('Total Number of Children')}
							Placeholder={t("Enter Total Number of Children")}
							value={input.totalNumberofChildren}
							type="number"
							sectext="false"
							errorText={error.errors?.totalNumberofChildren}
							onChangeText={text => {
								onInpChanged('totalNumberofChildren', text)
							}}
						/>
					</View>
					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('Start Location')}
							Placeholder={t("Enter Start Location")}
							value={input.startLocation}
							type="text"
							sectext="false"
							errorText={error.errors?.startLocation}
							onChangeText={text => {
								onInpChanged('startLocation', text)
							}}
						/>
					</View>
					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('Destination')}
							Placeholder={t("Enter Destination")}
							value={input.destination}
							type="text"
							sectext="false"
							errorText={error.errors?.destination}
							onChangeText={text => {
								onInpChanged('destination', text)
							}}
						/>
					</View>
					<View style={{ marginTop: 15 }}>
						<Text style={{ fontSize: 14, fontWeight: '500', color: '#242A37' }}>
							{t('Travel Date')}
						</Text>
					</View>

					<TouchableOpacity
						style={{
							borderWidth: 1,
							borderColor: input.traveldate ? '#9846D7' : '#B0B0B0',
							height: 48,
							borderRadius: 8,
							marginTop: 10,
						}}
						onPress={() => {
							setshowcolor(1);
							setshowDOB(true);
						}}>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								padding: 12,
							}}>
							{input.traveldate ? (
								<Text
									style={{ fontSize: 16, fontWeight: '400', color: '#000000' }}>
									{input.traveldate}
								</Text>
							) : (
								<Text
									style={{ fontSize: 16, fontWeight: '400', color: '#B0B0B0' }}>
									{t('Select')}
								</Text>
							)}

							<View>
								<CalenderPicker />
							</View>
						</View>
					</TouchableOpacity>

					{showDOB && (
						<View>
							<DateTimePicker
								date={dob}
								value={dob}
								mode="date"
								onChange={handleDOBchange}
								minimumDate={new Date()}
								format={'YYYY-MM-DD'}
								displayFormat={'DD-MM-YYYYY'}
							/>
						</View>
					)}
					{
						error.errors?.traveldate ? (
							<View>
								<Text style={{
									marginTop: 5,
									marginLeft: 0,
									fontSize: 12,
									color: '#B00020',
									fontFamily: 'Poppins-Regular',
									marginBottom: 0
								}}>{error.errors?.traveldate}</Text>
							</View>
						) : null
					}
					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('Desired Trip Amount')}
							Placeholder={t("Enter Desired Trip Amount")}
							value={input.desiredTripAmount}
							type="number"
							sectext="false"
							errorText={error.errors?.desiredTripAmount}
							onChangeText={text => {
								onInpChanged('desiredTripAmount', text)
							}}
						/>
					</View>
					<View style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#242A37' }}>
                            {t('Upload Document (Optional)')}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: '#9846D7',
                            padding: 5,
                            width: 129,
                            marginTop: 15,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-evenly',
                            height: 30,
                        }} onPress={() => uploadingdoc()}>
                        <Addcircle />
                        <Text style={{ fontSize: 12, fontWeight: '500', color: '#9846D7' }}>
                            {t('Add Document')}
                        </Text>
                    </TouchableOpacity>
                    {
                        uploaddocarray?.length > 0 ? (
                            <View>
                                <FlatList
                                    style={{ marginBottom: '6%' }}
                                    data={uploaddocarray}
                                    renderItem={({ item }) => (
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10,paddingRight:10,width:width-40 }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <View>
                                                    <Docment />
                                                </View>
                                                <Text
                                                    style={{ fontSize: 12, fontWeight: '600', color: '#000000', alignSelf: "center", marginLeft: 10 }}>
                                                    {item.name}
                                                </Text>
                                            </View>
                                            <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => remove_doc(item.uri)}>
                                                <Deletedoc />
                                            </TouchableOpacity>

                                        </View>)} />
                            </View>
                        ) : null
                    }
					<View style={{ marginTop: 30 }}>
						<Button label={t('Submit Request')} onPress={() => bookingsubmit()} />
					</View>
				</View>
			</ScrollView>
		</View>
		</View>
		
	);
};
export default TravelBooking;
