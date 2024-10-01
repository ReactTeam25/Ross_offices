import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Modal,
	FlatList,
	StyleSheet,
} from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Header from '../../helper/Header';
import TextField from '../../helper/TextField';
import Arrowdown from '../../assest/svg/Arrowdown.svg';
import CalenderPicker from '../../assest/svg/CalenderPicker.svg';
import Button from '../../helper/Button';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import ApiDataService from '../../services/Apiservice.service';
import LoadingPage from '../../helper/LoadingPage';
import Disablebutton from '../../helper/Disablebutton';
import Toast from 'react-native-simple-toast';
import Tick from '../../assest/svg/Tick.svg';
import Tickadd from '../../assest/svg/Tickadd.svg';
import Checkboxinactive from '../../assest/svg/Checkboxinactive.svg';
import Checkboxactive from '../../assest/svg/Checkboxactive.svg'
import useFormValidation from '../../services/Validation';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { setProfileData, setselectlanguage } from '../../redux/index';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';

const sexdataa = [
	{
		id: 1,
		name: 'Male',
		namees: "Masculino"
	},
	{
		id: 2,
		name: 'Female',
		namees: "Femenina"
	},
];

const Eyedata = [
	{
		id: 1,
		name: 'Clear',
		namees: "Claro"
	},
	{
		id: 2,
		name: 'Blacks',
		namees: "Negros"

	},
	{
		id: 3,
		name: 'Brown',
		namees: "Marrón"

	},
];

const skinn = [
	{
		id: 1,
		name: 'White',
		namees: "Blanco"

	},
	{
		id: 2,
		name: 'Black',
		namees: "Negros"

	},
	{
		id: 3,
		name: 'Mixed race',
		namees: "raza mixta"

	},
	{
		id: 4,
		name: 'Albino',
		namees: "Albino"

	},
	{
		id: 5,
		name: 'Yellow',
		namees: "Amarillo"

	},
];
const Haircolor = [
	{
		id: 1,
		name: 'Hoary',
		namees: "Canoso"

	},
	{
		id: 2,
		name: 'Chestnut',
		namees: "castaña"

	},
	{
		id: 3,
		name: 'Black',
		namees: "Negros"

	},
	{
		id: 4,
		name: 'Red',
		namees: "Rojo"

	},
	{
		id: 5,
		name: 'Blond',
		namees: "Rubio"

	},
	{
		id: 6,
		name: 'Others',
		namees: "Otros"

	},
];
const leaving = [
	{
		id: 1,
		name: 'Official Matter',
		namees: "Asunto Oficial"

	},
	{
		id: 2,
		name: 'Permission Residence in the Outdoor (PRE)',
		namees: "Permiso de Residencia al Aire Libre (PRE)"

	},
	{
		id: 3,
		name: 'Foreign Travel  Permit (PVE)',
		namees: "Permiso de viaje al extranjero (PVE)"

	},
	{
		id: 4,
		name: 'Travel access Temporary (PVT)',
		namees: "Acceso de viaje Temporal (PVT)"

	},
	{
		id: 5,
		name: 'Exit Permit Undefined (PSI)',
		namees: "Permiso de salida indefinido (PSI)"
	},
	{
		id: 6,
		name: 'Residence Permit Abroad Special (PREE)',
		namees: "Permiso de Residencia en el Extranjero Especial (PREE)"

	},
	{
		id: 7,
		name: 'Resident in the Abroad',
		namees: "Residente en el Extranjero"

	},
	{
		id: 8,
		name: 'Resident in the Special Exterior',
		namees: "Residente en el Exterior Especial"

	},
	{
		id: 9,
		name: 'Illegal departure',
		namees: "salida ilegal"

	},
];

const TwoPassportApplication = ({ navigation, route }) => {
	const { t, i18n } = useTranslation();
	const dispatch = useDispatch();
	const insets = useSafeArea();

	const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

	useEffect(() => {
		dispatch(setselectlanguage())
		i18n.changeLanguage(SelectlanguageReducer);
	}, [])
	const booking_id = route?.params?.booking_id
	const [error, setError] = useState({ isValid: false });
	const { Validateformtwo } = useFormValidation();

	const [input, setinput] = useState({
		surname: "",
		secondsurname: "",
		firstname: "",
		secondname: "",
		fathername: "",
		mothername: "",
		height: "",
		civilstatus: "",
		sexid: "",
		sexname: '',
		eyecolorid: "",
		eyecolorname: "",
		skin: [],
		hair: [],
		immegration: [],
		departuredate: "",
	})
	console.log('input_________', input);

	const [skinmodal, setskinmodal] = useState(false)
	const [hairmodal, sethairmodal] = useState(false)
	const [immegrationmodal, setimmegrationmodal] = useState(false)
	const [loading, setloading] = useState(false);
	const [date, setDate] = useState(new Date());
	const [showdatepicker, setshowdatetpicker] = useState(false);

	const onInpChanged = (name, event) => {
		setError(p => {
			const obj = { ...p }
			obj?.errors && delete obj?.errors[name]
			return obj
		})
		setinput((prevInputs) => ({ ...prevInputs, [name]: event }));
	};


	const changvalueskin = (id) => {
		setError(p => {
			const obj = { ...p }
			obj?.errors && delete obj?.errors['skin']
			return obj
		})
		setinput(p => {
			const currentlactiveskin = p.skin || [];
			const index = currentlactiveskin.indexOf(id);
			const updateactiveskin = index === -1
				? [...currentlactiveskin, id]
				: currentlactiveskin.filter(item => item !== id);
			return { ...p, skin: updateactiveskin };
		});

	}
	const changvaluehair = (id) => {
		setError(p => {
			const obj = { ...p }
			obj?.errors && delete obj?.errors['hair']
			return obj
		})
		setinput(p => {
			const currentlactivehair = p.hair || [];
			const index = currentlactivehair.indexOf(id);
			const updateactivehair = index === -1
				? [...currentlactivehair, id]
				: currentlactivehair.filter(item => item !== id);
			return { ...p, hair: updateactivehair };
		});

	}
	const changvalueimmegration = (id) => {
		setError(p => {
			const obj = { ...p }
			obj?.errors && delete obj?.errors['immegration']
			return obj
		})
		setinput(p => {
			const currentlactiveimm = p.immegration || [];
			const index = currentlactiveimm.indexOf(id);
			const updateactiveimm = index === -1
				? [...currentlactiveimm, id]
				: currentlactiveimm.filter(item => item !== id);
			return { ...p, immegration: updateactiveimm };
		});

	}

	const handledatechange = (event, selectedDate) => {
		if (selectedDate) {
			setshowdatetpicker(false);
			setDate(selectedDate);
			onInpChanged('departuredate', moment(selectedDate).format('YYYY-MM-DD'))
		}
	};
	const bookingsubmit = () => {
		const errorMessage = Validateformtwo(input);
		if (errorMessage.isValid == false) {
			setError(errorMessage);
		} else {
			setloading(true);
			let body = {
				step: 2,
				bookingId: booking_id,
				surname: input.surname,
				second_surname: input.secondsurname,
				first_name: input.firstname,
				second_name: input.secondname,
				son_of_father: input.fathername,
				mother: input.mothername,
				height: input.height,
				civil_status: input.civilstatus,
				sex: input.sexname,
				eye_color: input.eyecolorname,
				skin_color: input.skin.join(),
				hair_color: input.hair.join(),
				immigration_classification: input.immegration.join(),
				departure_date: input.departuredate,
				lang: SelectlanguageReducer
			}
			console.log('body--------222222222--', body);

			ApiDataService.PostHeaderapi('passport/booking', body)
				.then(response => {
					setloading(false);
					console.log('response------formData----->', response);
					if (response.status == 200) {
						navigation.navigate('ThreePassportApplication', { booking_id: booking_id })
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
							<Text style={StylesGloble.font20700000000}>{t('General data')}</Text>
							<Text style={{ ...StylesGloble.font14500g6D6D6D, lineHeight: 19.12 }}>
								{t('(declare the name and surname as it is on your Birth Certificate , if you are a woman, never write your married name)')}
							</Text>
						</View>
						<View style={{ marginTop: 15 }}>
							<TextField
								name={t('Surname')}
								star={'*'}
								Placeholder={t("Surname")}
								value={input.surname}
								type="text"
								sectext="false"
								errorText={error.errors?.surname}
								onChangeText={text => {
									onInpChanged('surname', text)
								}}
							/>
						</View>

						<View style={{ marginTop: 15 }}>
							<TextField
								name={t('Second surname')}
								value={input.secondsurname}
								type="text"
								sectext="false"
								onChangeText={text => {
									onInpChanged('secondsurname', text)
								}}
								Placeholder={t("Second surname")}
							/>
						</View>

						<View style={{ marginTop: 15 }}>
							<TextField
								name={t('First Name')}
								value={input.firstname}
								star={'*'}
								type="text"
								sectext="false"
								Placeholder={t("First Name")}
								errorText={error.errors?.firstname}
								onChangeText={text => {
									onInpChanged('firstname', text)
								}}

							/>
						</View>
						<View style={{ marginTop: 15 }}>
							<TextField
								name={t('Second name')}
								Placeholder={t("Second name")}
								value={input.secondname}
								type="text"
								sectext="false"
								onChangeText={text => {
									onInpChanged('secondname', text)
								}}
							/>
						</View>
						<View style={{ marginTop: 15 }}>
							<TextField name={t('Son of: Father')}
								value={input.fathername}
								star={'*'}
								type="text"
								sectext="false"
								errorText={error.errors?.fathername}
								onChangeText={text => {
									onInpChanged('fathername', text)
								}}
								Placeholder={t("Father name")} />
						</View>
						<View style={{ marginTop: 15 }}>
							<TextField
								name={t('Mother')}
								star={'*'}
								Placeholder={t("Mother name")}
								value={input.mothername}
								type="text"
								sectext="false"
								errorText={error.errors?.mothername}
								onChangeText={text => {
									onInpChanged('mothername', text)
								}}

							/>
						</View>
						<View style={{ marginTop: 15 }}>
							<TextField name={t('Height(cm)')}
								star={'*'}
								Placeholder={t("Enter height")}
								value={input.height}
								type="phone"
								sectext="false"
								errorText={error.errors?.height}
								onChangeText={text => {
									onInpChanged('height', text)
								}}
							/>
						</View>
						<View style={{ marginTop: 15 }}>
							<TextField name={t('Civil status')}
								star={'*'}
								Placeholder={t("Enter Civil status")}
								value={input.civilstatus}
								type="text"
								sectext="false"
								errorText={error.errors?.civilstatus}
								onChangeText={text => {
									onInpChanged('civilstatus', text)
								}}
							/>
						</View>

						<View style={{ marginTop: 15 }}>
							<Text style={StylesGloble.fon14500242A37}>{t('Sex')} <Text style={{ color: "#FF6A6A" }}>*</Text></Text>
						</View>

						<View>
							<Dropdown
								style={{ borderWidth: 1, borderColor: "#5D5D5D", borderRadius: 8, padding: 7, marginTop: 5 }}
								placeholderStyle={{ fontSize: 16, color: "#5D5D5D", fontWeight: "500" }}
								selectedTextStyle={{ color: '#000000', marginLeft: 10 }}
								data={sexdataa}
								maxHeight={300}
								labelField={
									SelectlanguageReducer == 'es' ? 'namees' : 'name'
								}
								valueField={
									SelectlanguageReducer == 'es' ? 'namees' : 'name'
								}
								placeholder={t("Select")}
								placeholderTextColor='#5D5D5D'
								value={input.sexname}
								onChange={item => {
									onInpChanged('sexname', item.name)
								}}
								renderRightIcon={() => (
									<Arrowdown />
								)}
								renderItem={(item, index, selected, onSelectItem) => (
									<>
										<View style={{ padding: 10, flexDirection: "row", backgroundColor: "#ffffff", }} >

											<Text style={{ color: "#6D6D6D", marginLeft: 10 }}>
												{
													SelectlanguageReducer == 'es' ? item.namees : item.name
												}
											</Text>
										</View>

									</>
								)}
							/>
							{
								error.errors?.sex ? (
									<View>
										<Text style={{
											marginTop: 4,
											marginLeft: 5,
											fontSize: 12,
											color: '#B00020',
											fontFamily: 'Poppins-Regular',
										}}>{error.errors?.sex}</Text>
									</View>
								) : null
							}
						</View>
						<View style={{ marginTop: 15 }}>
							<Text style={StylesGloble.fon14500242A37}>{t('Eye Color')} <Text style={{ color: "#FF6A6A" }}>*</Text></Text>
						</View>

						<View>
							<Dropdown
								style={{ borderWidth: 1, borderColor: "#5D5D5D", borderRadius: 8, padding: 7, marginTop: 10 }}
								placeholderStyle={{ fontSize: 16, color: "#5D5D5D", fontWeight: "500" }}
								selectedTextStyle={{ color: '#000000', marginLeft: 10 }}
								data={Eyedata}
								maxHeight={300}
								labelField={
									SelectlanguageReducer == 'es' ? 'namees' : 'name'
								}
								valueField={
									SelectlanguageReducer == 'es' ? 'namees' : 'name'
								}
								placeholder={t("Select")}
								placeholderTextColor='#5D5D5D'
								value={input.eyecolorname}
								onChange={item => {
									onInpChanged('eyecolorname', item.name)
								}}
								renderRightIcon={() => (
									<Arrowdown />
								)}
								renderItem={(item, index, selected, onSelectItem) => (
									<>
										<View style={{ padding: 10, flexDirection: "row", backgroundColor: "#ffffff", }} >

											<Text style={{ color: "#6D6D6D", marginLeft: 10 }}>
												{
													SelectlanguageReducer == 'es' ? item.namees : item.name
												}
											</Text>
										</View>

									</>
								)}
							/>
							{
								error.errors?.eyecolor ? (
									<View>
										<Text style={{
											marginTop: 4,
											marginLeft: 5,
											fontSize: 12,
											color: '#B00020',
											fontFamily: 'Poppins-Regular',
										}}>{error.errors?.eyecolor}</Text>
									</View>
								) : null
							}
						</View>

						<View style={{ marginTop: 15 }}>
							<Text style={StylesGloble.fon14500242A37}>{t('Skin color')} <Text style={{ color: "#FF6A6A" }}>*</Text></Text>
						</View>
						<TouchableOpacity style={{ borderColor: '#5D5D5D', borderWidth: 1, borderRadius: 8, height: 48, marginVertical: 10, }} onPress={() => setskinmodal(!skinmodal)}>
							<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, }}>
								<Text style={StylesGloble.font165005D5D5D}>{t('Select')}</Text>
								<Arrowdown />
							</View>
						</TouchableOpacity>
						{
							error.errors?.skin &&
							<View>
								<Text style={{
									marginLeft: 5,
									fontSize: 12,
									color: '#B00020',
									fontFamily: 'Poppins-Regular',
									marginBottom: 5

								}}>{error.errors?.skin}</Text>
							</View>

						}
						{
							skinmodal ? (
								<View style={{ borderColor: "#5D5D5D", borderWidth: 1, marginTop: 5, borderRadius: 15, padding: 10 }}>
									<FlatList
										contentContainerStyle={{
											marginTop: 0
										}}
										data={skinn}
										showsVerticalScrollIndicator={false}
										renderItem={({ item }) => <>
											{(input.skin.includes(item.name)) ? (
												<TouchableOpacity style={{ padding: 5, flexDirection: "row", justifyContent: "space-between" }} onPress={() => changvalueskin(item.name)}>
													<Text style={{ fontSize: 15, fontWeight: '400', color: "#6D6D6D", }}>
														{
															SelectlanguageReducer == 'es' ? item.namees : item.name
														}
													</Text>
													<Checkboxactive />
												</TouchableOpacity>
											) : (
												<TouchableOpacity style={{ padding: 5, flexDirection: "row", justifyContent: "space-between" }} onPress={() => changvalueskin(item.name)}>
													<Text style={{ fontSize: 15, fontWeight: '400', color: "#6D6D6D", }}>
														{
															SelectlanguageReducer == 'es' ? item.namees : item.name
														}
													</Text>
													<Checkboxinactive />
												</TouchableOpacity>
											)}

										</>} />
								</View>
							) : null
						}
						<View style={{ marginTop: 5 }}>
							<Text style={StylesGloble.fon14500242A37}>{t('Hair color')} <Text style={{ color: "#FF6A6A" }}>*</Text></Text>
						</View>
						<TouchableOpacity style={{ borderColor: '#5D5D5D', borderWidth: 1, borderRadius: 8, height: 48, marginVertical: 10, }} onPress={() => sethairmodal(!hairmodal)}>
							<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, }}>
								<Text style={StylesGloble.font165005D5D5D}>{t('Select')}</Text>
								<Arrowdown />
							</View>
						</TouchableOpacity>
						{
							error.errors?.hair &&
							<View>
								<Text style={{
									marginLeft: 5,
									fontSize: 12,
									color: '#B00020',
									fontFamily: 'Poppins-Regular',
									marginBottom: 5

								}}>{error.errors?.hair}</Text>
							</View>

						}
						{
							hairmodal ? (
								<View style={{ borderColor: "#5D5D5D", borderWidth: 1, marginTop: 5, borderRadius: 15, padding: 10 }}>
									<FlatList
										contentContainerStyle={{
											marginTop: 0
										}}
										data={Haircolor}
										showsVerticalScrollIndicator={false}
										renderItem={({ item }) => <>
											{(input.hair.includes(item.name)) ? (
												<TouchableOpacity style={{ padding: 5, flexDirection: "row", justifyContent: "space-between" }} onPress={() => changvaluehair(item.name)}>
													<Text style={{ fontSize: 15, fontWeight: '400', color: "#6D6D6D", }}>
														{
															SelectlanguageReducer == 'es' ? item.namees : item.name
														}
													</Text>
													<Checkboxactive />
												</TouchableOpacity>
											) : (
												<TouchableOpacity style={{ padding: 5, flexDirection: "row", justifyContent: "space-between" }} onPress={() => changvaluehair(item.name)}>
													<Text style={{ fontSize: 15, fontWeight: '400', color: "#6D6D6D", }}>
														{
															SelectlanguageReducer == 'es' ? item.namees : item.name
														}
													</Text>
													<Checkboxinactive />
												</TouchableOpacity>
											)}

										</>} />
								</View>
							) : null
						}
						<View style={{ marginTop: 5 }}>
							<Text style={StylesGloble.fon14500242A37}>
								{t('Immigration Classification when leaving Cuba')} <Text style={{ color: "#FF6A6A" }}>*</Text>
							</Text>
						</View>

						<TouchableOpacity style={{ borderColor: '#5D5D5D', borderWidth: 1, borderRadius: 8, height: 48, marginVertical: 10, }} onPress={() => setimmegrationmodal(!immegrationmodal)}>
							<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, }}>
								<Text style={StylesGloble.font165005D5D5D}>{t('Select')}</Text>
								<Arrowdown />
							</View>
						</TouchableOpacity>
						{
							error.errors?.immegration &&
							<View>
								<Text style={{
									marginLeft: 5,
									fontSize: 12,
									color: '#B00020',
									fontFamily: 'Poppins-Regular',
									marginBottom: 5

								}}>{error.errors?.immegration}</Text>
							</View>

						}
						{
							immegrationmodal ? (
								<View style={{ borderColor: "#5D5D5D", borderWidth: 1, marginTop: 5, borderRadius: 15, padding: 10 }}>
									<FlatList
										contentContainerStyle={{
											marginTop: 0
										}}
										data={leaving}
										showsVerticalScrollIndicator={false}
										renderItem={({ item }) => <>
											{(input.immegration.includes(item.name)) ? (
												<TouchableOpacity style={{ padding: 5, flexDirection: "row", justifyContent: "space-between" }} onPress={() => changvalueimmegration(item.name)}>
													<Text style={{ fontSize: 15, fontWeight: '400', color: "#6D6D6D", }}>
														{
															SelectlanguageReducer == 'es' ? item.namees : item.name
														}
													</Text>
													<Checkboxactive />
												</TouchableOpacity>
											) : (
												<TouchableOpacity style={{ padding: 5, flexDirection: "row", justifyContent: "space-between" }} onPress={() => changvalueimmegration(item.name)}>
													<Text style={{ fontSize: 15, fontWeight: '400', color: "#6D6D6D", }}>
														{
															SelectlanguageReducer == 'es' ? item.namees : item.name
														}
													</Text>
													<Checkboxinactive />
												</TouchableOpacity>
											)}

										</>} />
								</View>
							) : null
						}

						<View style={{ marginTop: 5 }}>
							<Text style={StylesGloble.fon14500242A37}>{t('Departure date')} <Text style={{ color: "#FF6A6A" }}>*</Text></Text>
						</View>

						<TouchableOpacity
							style={{
								borderColor: '#5D5D5D',
								borderWidth: 1,
								borderRadius: 8,
								height: 48,
								marginVertical: 10,
							}}
							onPress={() => setshowdatetpicker(true)}>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-between',
									padding: 10,
								}}>
								{input.departuredate ? (
									<Text style={StylesGloble.font165005D5D5D}>{input.departuredate}</Text>
								) : (
									<Text style={StylesGloble.font165005D5D5D}>{t('Select')}</Text>
								)}

								<CalenderPicker />
							</View>
						</TouchableOpacity>
						{
							error.errors?.departuredate &&
							<View>
								<Text style={{
									marginLeft: 5,
									fontSize: 12,
									color: '#B00020',
									fontFamily: 'Poppins-Regular',
									marginBottom: 5

								}}>{error.errors?.departuredate}</Text>
							</View>

						}

						{showdatepicker && (
							<View>
								<DateTimePicker
									date={date}
									mode="date"
									value={date}
									onChange={handledatechange}
									dateFormat={'YYYY-MM-DD'}
									display={'DD-MM-YYYY'}

								/>
							</View>
						)}

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
export default TwoPassportApplication;
