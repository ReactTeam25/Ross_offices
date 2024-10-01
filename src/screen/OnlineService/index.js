import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	ScrollView,
	TextInput,
	TouchableOpacity, PermissionsAndroid, FlatList, Dimensions,Platform
} from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Header from '../../helper/Header';
import TextField from '../../helper/TextField';
import Button from '../../helper/Button';
import PaperUpload from '../../assest/svg/PaperUpload.svg';
import Addcircle from '../../assest/svg/Addcircle.svg';
import CalenderPicker from '../../assest/svg/CalenderPicker.svg';
import Clockgrey from '../../assest/svg/Clockgrey.svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import ApiDataService from '../../services/Apiservice.service'
import Disablebutton from '../../helper/Disablebutton';
import LoadingPage from '../../helper/LoadingPage';
import Toast from 'react-native-simple-toast';
import DocumentPicker from 'react-native-document-picker';
import DeviceInfo from "react-native-device-info";
import Docment from '../../assest/svg/Docment.svg'
import Deletedoc from '../../assest/svg/Deletedoc.svg'
import Radiotruebtn from '../../assest/svg/Radiotruebtn.svg';
import Radiobutton from '../../assest/svg/Radiobutton.svg';
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


const OnlineService = ({ navigation }) => {
	const androidVersion = DeviceInfo.getSystemVersion()
	const insets = useSafeArea();

	const [timecolor, settimecolor] = useState(0);
	const [datecolorchange, setdatecolorchange] = useState(0);
	const [description, setdescription] = useState(0);
	const [showcolor, setshowcolor] = useState(0);
	const [loading, setloading] = useState(false);
	const [btndisable, setbtndisable] = useState(false);
	const [selectmodename, setselectmodename] = useState('')
	const { t, i18n } = useTranslation();
	const dispatch = useDispatch();
	const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

	useEffect(() => {
		dispatch(setselectlanguage())
		i18n.changeLanguage(SelectlanguageReducer);
	}, [])

	const [inputtittle, setInputtittle] = useState({
		value: null,
		message: '',
		isValid: false,
	});
	const [inputemail, setInputemail] = useState({
		value: null,
		message: '',
		isValid: false,
	});
	const [inputfname, setInputfname] = useState({
		value: null,
		message: '',
		isValid: false,
	});
	const [inputnumber, setInputnumber] = useState({
		value: null,
		message: '',
		isValid: false,
	});
	const [inputlastname, setInputlastname] = useState({
		value: null,
		message: '',
		isValid: false,
	});
	const [uploaddocarray, setuploaddocarray] = useState([])

	const remove_doc = (id, name) => {
		if (uploaddocarray != null && uploaddocarray.length > 0) {
			const newImageArray = uploaddocarray.filter(item => item.uri !== id);
			setuploaddocarray(newImageArray);
		}
	}
	const selectmodefunc = (name) => {
		setselectmodename(name)
	}
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
	const [showDOB, setshowDOB] = useState(false);
	const [dob, setDOB] = useState(new Date());
	const [selectdob, setselectdob] = useState('');

	const handleDOBchange = (event, selectedDate) => {
		setshowDOB(false);
		if (selectedDate) {
			setDOB(selectedDate);
			setselectdob(moment(selectedDate).format('YYYY-MM-DD'));
			checkvalidation()
		}

	};

	const [showTimePicker, setshowTimePicker] = useState(false);
	const [time, setTime] = useState(new Date());
	const [timer, settimer] = useState('');

	const handleTimeChange = (event, selectedDate) => {
		setshowTimePicker(false);
		if (selectedDate) {
			setTime(selectedDate);
			settimer(moment(selectedDate).format('hh:mm a'));
			checkvalidation()
		}


	};
	const [date, setDate] = useState(new Date());
	const [showPicker, setShowPicker] = useState(false);
	const [datee, setDatee] = useState('');
	const [inputdisc, setInputdisc] = useState({
		value: null,
		message: '',
		isValid: false,
	});
	const handleDateChange = (event, selectedDate) => {
		setShowPicker(false);
		if (selectedDate) {
			setDatee(moment(selectedDate).format('YYYY-MM-DD'));
			setDate(selectedDate);
			checkvalidation()
		}
	};

	const validatetittle = _in => {
		try {
			setInputtittle(prev => ({ ...prev, value: _in }));
			if (!_in) {
				setInputtittle(prev => ({
					...prev, isValid: true, message: t('Please enter tittle'),
				}));
				setbtndisable(false);

			} else if (_in.length === 0) {
				setInputtittle(prev => ({
					...prev, isValid: true, message: t('Please enter tittle'),
				}));
				setbtndisable(false);

			} else {
				setInputtittle(prev => ({ ...prev, isValid: false, message: '' }));
			}
		} catch (error) { }
		checkvalidation()
	};
	const validatedisc = _in => {
		try {
			setInputdisc(prev => ({ ...prev, value: _in }));
			if (!_in) {
				setInputdisc(prev => ({
					...prev,
					isValid: true,
					message: t('Please enter discription'),
				}));
				setbtndisable(false);
			} else if (_in.length === 0) {
				setInputdisc(prev => ({
					...prev,
					isValid: true,
					message: t('Please enter discription'),
				}));
				setbtndisable(false);
			} else {
				setInputdisc(prev => ({ ...prev, isValid: false, message: '' }));
			}
		} catch (error) { }
		checkvalidation();
	};

	const validatelastname = _in => {
		try {
			setInputlastname(prev => ({ ...prev, value: _in }));
			if (!_in) {
				setInputlastname(prev => ({
					...prev, isValid: true, message: t('Please enter name'),
				}));
				setbtndisable(false);

			} else if (_in.length === 0) {
				setInputlastname(prev => ({
					...prev, isValid: true, message: t('Please enter name'),
				}));
				setbtndisable(false);

			} else {
				setInputlastname(prev => ({ ...prev, isValid: false, message: '' }));
			}
		} catch (error) { }
		checkvalidation()
	};

	const emailReg =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const isValidEmail = email => {
		return emailReg.test(String(email).toLowerCase());
	};
	const validateemail = _in => {
		try {
			setInputemail(prev => ({ ...prev, value: _in }));
			if (!_in) {
				setInputemail(prev => ({ ...prev, isValid: true, message: t('Please enter email') }));
				setbtndisable(false);

			} else if (!isValidEmail(_in)) {
				setInputemail(prev => ({ ...prev, isValid: true, message: t('Please enter a valid Email') }));
				setbtndisable(false);

			} else if (_in.length === 0) {
				setInputemail(prev => ({ ...prev, isValid: true, message: t('Please enter email') }));
				setbtndisable(false);

			} else {
				setInputemail(prev => ({ ...prev, isValid: false, message: '' }));
			}
		} catch (error) { }
		checkvalidation()
	};

	const validatefname = _in => {
		try {
			setInputfname(prev => ({ ...prev, value: _in }));
			if (!_in) {
				setInputfname(prev => ({ ...prev, isValid: true, message: t('Please enter name'), }));
				setbtndisable(false);

			} else if (_in.length === 0) {
				setInputfname(prev => ({ ...prev, isValid: true, message: t('Please enter name'), }));
				setbtndisable(false);

			} else {
				setInputfname(prev => ({ ...prev, isValid: false, message: '' }));
			}
		} catch (error) { }
		checkvalidation()
	};
	const isValidPhoneNumber = phone => {
		return /^\d{10}$/.test(phone);
	};
	const validatenumber = _in => {
		try {
			setInputnumber(prev => ({ ...prev, value: _in }));
			if (!_in) {
				setInputnumber(prev => ({ ...prev, isValid: true, message: t('Please enter number'), }));
				setbtndisable(false);

			} else if (!isValidPhoneNumber(_in)) {
				setInputnumber(prev => ({ ...prev, isValid: true, message: t('Please enter correct phone number'), }));
				setbtndisable(false);

			} else if (_in.length === 0) {
				setInputnumber(prev => ({ ...prev, isValid: true, message: t('Please enter number'), }));
				setbtndisable(false);

			} else {
				setInputnumber(prev => ({ ...prev, isValid: false, message: '' }));
			}
		} catch (error) { }
		checkvalidation()
	};

	const checkvalidation = () => {
		if (inputtittle.value != null && inputfname.value != null && inputlastname.value != null && inputnumber.value != null && inputemail.value != null && timer != '' && datee != '' && selectdob != '' && inputdisc.value != null) {
			setbtndisable(true);
		} else {
			setbtndisable(false);
		}
	};

	const bookingsubmit = () => {
		setloading(true);
		let formData = new FormData();
		formData.append('title', inputtittle.value);
		formData.append('first_name', inputfname.value);
		formData.append('last_name', inputlastname.value);
		formData.append('email', inputemail.value);
		formData.append('phone', inputnumber.value);
		formData.append('mode',selectmodename == 'Online' ? 'ONLINE' : 'OFFLINE');
		formData.append('date_of_birth',selectdob);
		formData.append('date',datee);
		formData.append('time',timer);
		formData.append('description',inputdisc.value);
		// formData.append('documents',uploaddocarray);
		formData.append('booking_type','OTHER');
		formData.append('lang',SelectlanguageReducer);

		for (let key in uploaddocarray) {
            formData.append('documents', uploaddocarray[key]);
        }

		console.log('formData-----', formData);
		ApiDataService.PostHeaderapi('booking', formData)
			.then(response => {
				setloading(false);
				console.log('response------formData----->', response);
				if (response.status == 201) {
					navigation.navigate('Successfull')
					calltoastmessage(response.data.message);
				}
			})
			.catch(e => {
				setloading(false);
				console.log('error------>', e);
			});
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
			<Header name={t('Custom Service')} />

			<ScrollView style={{ marginBottom: '10%' }}>
				<View style={StylesGloble.marginscreen}>
					<View>
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
					</View>
					<View style={{ marginTop: 5 }}>
						<TextField
							name={t('Title')}
							Placeholder={t("Enter title")}
							value={inputtittle.value}
							type="text"
							star={'*'}

							sectext="false"
							errorText={inputtittle.message}
							onChangeText={text => {
								validatetittle(text);
							}}
						/>
					</View>

					<View style={{ marginTop: 15 }}>
						<TextField
							star={'*'}

							name={t('First Name')}
							Placeholder={t("Enter name")}
							value={inputfname.value}
							type="text"
							sectext="false"
							errorText={inputfname.message}
							onChangeText={text => {
								validatefname(text);
							}}
						/>
					</View>

					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('Last Name')}
							star={'*'}

							Placeholder={t("Enter name")}
							value={inputlastname.value}
							type="text"
							sectext="false"
							errorText={inputlastname.message}
							onChangeText={text => {
								validatelastname(text);
							}}
						/>
					</View>

					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('Email Address')}
							star={'*'}

							Placeholder={t("Enter email")}
							value={inputemail.value}
							type="text"
							sectext="false"
							errorText={inputemail.message}
							onChangeText={text => {
								validateemail(text);
							}}
						/>
					</View>
					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('Phone Number')}
							star={'*'}
							Placeholder={t("Enter number")}
							value={inputnumber.value}
							type="number"
							sectext="false"
							errorText={inputnumber.message}
							onChangeText={text => {
								validatenumber(text);
							}}
							maxLength={10}
						/>
					</View>

					<View style={{ marginTop: 15 }}>
						<Text style={{ fontSize: 14, fontWeight: '500', color: '#242A37' }}>
							{t('Date of Birth')} <Text style={{ color: "#FF6A6A" }}>*</Text>
						</Text>
					</View>

					<TouchableOpacity
						style={{
							borderWidth: 1,
							borderColor: showcolor == 1 ? '#9846D7' : '#B0B0B0',
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
							{selectdob ? (
								<Text
									style={{ fontSize: 16, fontWeight: '400', color: '#5D5D5D' }}>
									{selectdob}
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
								maximumDate={new Date()}
								format={'YYYY-MM-DD'}
								displayFormat={'DD-MM-YYYYY'}
							/>
						</View>
					)}

					<View style={{ marginTop: 15 }}>
						<Text style={{ fontSize: 14, fontWeight: '500', color: '#242A37' }}>
							{t('Time')} <Text style={{ color: "#FF6A6A" }}>*</Text>
						</Text>
					</View>

					<TouchableOpacity
						style={{
							borderWidth: 1,
							borderColor: timer ? '#9846D7' : '#B0B0B0',
							height: 48,
							borderRadius: 8,
							marginTop: 10,
						}}
						onPress={() => {
							settimecolor(1);
							setshowTimePicker(true);
						}}>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								padding: 12,
							}}>
							{timer ? (
								<Text
									style={{ fontSize: 16, fontWeight: '400', color: '#5D5D5D' }}>
									{timer}
								</Text>
							) : (
								<Text
									style={{ fontSize: 16, fontWeight: '400', color: '#B0B0B0' }}>
									{t('Select')}
								</Text>
							)}

							<View>
								<Clockgrey />
							</View>
						</View>
					</TouchableOpacity>

					{showTimePicker && (
						<View>
							<DateTimePicker
								time={time}
								value={time}
								mode='time'
								onChange={handleTimeChange}
								maximumDate={new Date()}
								format={"YYYY-MM-DD"}
								displayFormat={"DD-MM-YYYY"}
							/>
						</View>
					)}

					<View style={{ marginTop: 15 }}>
						<Text style={{ fontSize: 14, fontWeight: '500', color: '#242A37' }}>
							{t('Date')} <Text style={{ color: "#FF6A6A" }}>*</Text>
						</Text>
					</View>

					<TouchableOpacity
						style={{
							borderWidth: 1,
							borderColor: datecolorchange == 1 ? '#9846D7' : '#B0B0B0',
							height: 48,
							borderRadius: 8,
							marginTop: 10,
						}}
						onPress={() => {
							setdatecolorchange(1);
							setShowPicker(true);
						}}>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								padding: 12,
							}}>
							{datee ? (
								<Text
									style={{ fontSize: 16, fontWeight: '400', color: '#5D5D5D' }}>
									{datee}
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
					{showPicker && (
						<View>
							<DateTimePicker
								date={date}
								value={date}
								mode="date"
								onChange={handleDateChange}
								minimumDate={new Date()}
								format={'YYYY-MM-DD'}
								displayFormat={'DD-MM-YYYY'}
							/>
						</View>
					)}

					<View style={{ marginTop: 15 }}>
						<Text style={{ fontSize: 14, fontWeight: '500', color: '#242A37' }}>
							{t('Description')} <Text style={{ color: "#FF6A6A" }}>*</Text>
						</Text>
					</View>
					<TouchableOpacity
						style={{
							borderWidth: 1,
							borderColor: inputdisc.value != null ? '#9846D7' : '#B0B0B0',
							height: 150,
							borderRadius: 8,
							marginTop: 10,
						}}>
						<TextInput
							style={{ marginLeft: 8, marginRight: 8,color:"#000000" }}
							placeholder={t("Enter here...")}
							multiline={true}
							value={inputdisc.value}
							type="text"
							sectext="false"
							errorText={inputdisc.message}
							onChangeText={text => {
								validatedisc(text);
							}}
						/>

					</TouchableOpacity>


					<View style={{ marginTop: 15 }}>
						<Text style={{ fontSize: 14, fontWeight: '500', color: '#242A37' }}>
							{t('Upload Document')}
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
										<View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, paddingRight: 10, width: width - 40 }}>
											<View style={{ flexDirection: "row",width:"60%" }}>
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
						{
							btndisable ? (
								<Button label={t('Submit Request')} onPress={() => bookingsubmit()} />
							) : (
								<Disablebutton label={t('Submit Request')} />
							)
						}



					</View>
				</View>
			</ScrollView>
		</View>

		</View>
		
	);
};
export default OnlineService;
