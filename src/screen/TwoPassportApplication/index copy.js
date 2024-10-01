import React, { useState } from 'react';
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

const sexdataa = [
	{
		id: 1,
		name: 'Male',
	},
	{
		id: 2,
		name: 'Female',
	},
];

const Eyedata = [
	{
		id: 1,
		name: 'Clear',
	},
	{
		id: 2,
		name: 'Blacks',
	},
	{
		id: 3,
		name: 'Brown',
	},
];

const services = ['White', 'Black', 'Mixed race', 'Albino', 'Yellow'];

const skinn = [
	{
		id: 1,
		name: 'White',
	},
	{
		id: 2,
		name: 'Black',
	},
	{
		id: 3,
		name: 'Mixed race',
	},
	{
		id: 4,
		name: 'Albino',
	},
	{
		id: 5,
		name: 'Yellow',
	},
];
const Haircolor = [
	{
		id: 1,
		name: 'Hoary',
	},
	{
		id: 2,
		name: 'Chestnut',
	},
	{
		id: 3,
		name: 'Black',
	},
	{
		id: 4,
		name: 'Red',
	},
	{
		id: 5,
		name: 'Blond',
	},
	{
		id: 6,
		name: 'Others',
	},
];
const leaving = [
	{
		id: 1,
		name: 'Official Matter',
	},
	{
		id: 2,
		name: 'Permission Residence in the Outdoor (PRE)',
	},
	{
		id: 3,
		name: 'Foreign Travel  Permit (PVE)',
	},
	{
		id: 4,
		name: 'Travel access Temporary (PVT)',
	},
	{
		id: 5,
		name: 'Exit Permit Undefined (PSI)',
	},
	{
		id: 6,
		name: 'Residence Permit Abroad Special (PREE)',
	},
	{
		id: 7,
		name: 'Resident in the Abroad',
	},
	{
		id: 8,
		name: 'Resident in the Special Exterior',
	},
	{
		id: 9,
		name: 'Illegal departure',
	},
];


const TwoPassportApplication = ({ navigation }) => {
	const [inputid, setInputID] = useState({
		value: null,
		message: '',
		isValid: false,
	});
	const [inputsurname, setInputSurname] = useState({
		value: null,
		message: '',
		isValid: false,
	});
	const [inputsecondsurname, setInputSecondSurname] = useState({
		value: null,
		message: '',
		isValid: false,
	});

	const [inputFirstName, setInputFirstName] = useState({
		value: null,
		message: '',
		isValid: false,
	});

	const [inputSecondName, setInputSecondName] = useState({
		value: null,
		message: '',
		isValid: false,
	});

	const [inputFatherName, setInputSonOfFather] = useState({
		value: null,
		message: '',
		isValid: false,
	});

	const [inputMotherName, setInputMother] = useState({
		value: null,
		message: '',
		isValid: false,
	});

	const [inputheight, setInputheight] = useState({
		value: null,
		message: '',
		isValid: false,
	});
	const [inputcivil, setInputcivil] = useState({
		value: null,
		message: '',
		isValid: false,
	});


	const [sexdata, setsexdata] = useState({
		id: '',
		name: ''
	})
	const [eyecolordata, seteyecolordata] = useState({
		id: '',
		name: ''
	})
	const [skincolordata, setskincolordata] = useState({
		id: '',
		name: ''
	})
	const [haircolordata, sethaircolordata] = useState({
		id: '',
		name: ''
	})
	const [immigrationdata, setimmigrationdata] = useState({
		id: '',
		name: ''
	})
	const [activeKeyArray, setActiveKeyArray] = useState({
		skin: [],
		hair: [],
		immegration: []
	})
	const [skinmodal, setskinmodal] = useState(false)
	const [hairmodal, sethairmodal] = useState(false)
	const [immegrationmodal, setimmegrationmodal] = useState(false)

	const validateheight = _in => {
		try {
			setInputheight(prev => ({ ...prev, value: _in }));
			if (!_in) {
				setInputheight(prev => ({ ...prev, isValid: true, message: 'Please enter height', }));
			} else if (_in.length === 0) {
				setInputheight(prev => ({
					...prev, isValid: true, message: 'Please enter height',
				}));
			} else {
				setInputheight(prev => ({ ...prev, isValid: false, message: '' }));
			}
		} catch (error) { }
	};
	const validateCivilstatus = _in => {
		try {
			setInputcivil(prev => ({ ...prev, value: _in }));
			if (!_in) {
				setInputcivil(prev => ({ ...prev, isValid: true, message: 'Please enter Civil status', }));
			} else if (_in.length === 0) {
				setInputcivil(prev => ({
					...prev, isValid: true, message: 'Please enter Civil status',
				}));
			} else {
				setInputcivil(prev => ({ ...prev, isValid: false, message: '' }));
			}
		} catch (error) { }
	};

	const validatesurname = _in => {
		try {
			setInputSurname(prev => ({ ...prev, value: _in }));
			if (!_in) {
				setInputSurname(prev => ({
					...prev,
					isValid: true,
					message: 'Please enter surname',
				}));
			} else if (_in.length === 0) {
				setInputSurname(prev => ({
					...prev,
					isValid: true,
					message: 'Please enter surname',
				}));
			} else {
				setInputSurname(prev => ({ ...prev, isValid: false, message: '' }));
			}
		} catch (error) { }
	};

	const validateSecondSurname = _in => {
		try {
			setInputSecondSurname(prev => ({ ...prev, value: _in }));
			if (!_in) {
				setInputSecondSurname(prev => ({
					...prev,
					isValid: true,
					message: 'Please enter your second surname',
				}));
			} else if (_in.length === 0) {
				setInputSecondSurname(prev => ({
					...prev,
					isValid: true,
					message: 'Please enter your second surname',
				}));
			} else {
				setInputSecondSurname(prev => ({ ...prev, isValid: false, message: '' }));
			}
		} catch (error) { }
	};

	const validateFirstName = _in => {
		try {
			setInputFirstName(prev => ({ ...prev, value: _in }));
			if (!_in) {
				setInputFirstName(prev => ({
					...prev,
					isValid: true,
					message: 'Please enter your first name',
				}));
			} else if (_in.length === 0) {
				setInputFirstName(prev => ({
					...prev,
					isValid: true,
					message: 'Please enter your first name',
				}));
			} else {
				setInputFirstName(prev => ({ ...prev, isValid: false, message: '' }));
			}
		} catch (error) { }
	};

	const validateSecondName = _in => {
		try {
			setInputSecondName(prev => ({ ...prev, value: _in }));
			if (!_in) {
				setInputSecondName(prev => ({
					...prev,
					isValid: true,
					message: 'Please enter your second name',
				}));
			} else if (_in.length === 0) {
				setInputSecondName(prev => ({
					...prev,
					isValid: true,
					message: 'Please enter your second name',
				}));
			} else {
				setInputSecondName(prev => ({ ...prev, isValid: false, message: '' }));
			}
		} catch (error) { }
	};

	const validateFatherName = _in => {
		try {
			setInputSonOfFather(prev => ({ ...prev, value: _in }));
			if (!_in) {
				setInputSonOfFather(prev => ({
					...prev,
					isValid: true,
					message: 'Please enter your father name',
				}));
			} else if (_in.length === 0) {
				setInputSonOfFather(prev => ({
					...prev,
					isValid: true,
					message: 'Please enter your father name',
				}));
			} else {
				setInputSonOfFather(prev => ({ ...prev, isValid: false, message: '' }));
			}
		} catch (error) { }
	};

	const validateMother = _in => {
		try {
			setInputMother(prev => ({ ...prev, value: _in }));
			if (!_in) {
				setInputMother(prev => ({
					...prev,
					isValid: true,
					message: 'Please enter your mother name',
				}));
			} else if (_in.length === 0) {
				setInputMother(prev => ({
					...prev,
					isValid: true,
					message: 'Please enter your mather name',
				}));
			} else {
				setInputMother(prev => ({ ...prev, isValid: false, message: '' }));
			}
		} catch (error) { }
	};

	const changvalueskin = (id) => {
		setActiveKeyArray(p => {
			const currentlactiveskin = p.skin || [];
			const index = currentlactiveskin.indexOf(id);
			const updateactiveskin = index === -1
				? [...currentlactiveskin, id]
				: currentlactiveskin.filter(item => item !== id);
			return { ...p, skin: updateactiveskin };
		});

	}
	const changvaluehair = (id) => {
		setActiveKeyArray(p => {
			const currentlactivehair = p.hair || [];
			const index = currentlactivehair.indexOf(id);
			const updateactivehair = index === -1
				? [...currentlactivehair, id]
				: currentlactivehair.filter(item => item !== id);
			return { ...p, hair: updateactivehair };
		});

	}
	const changvalueimmegration = (id) => {
		setActiveKeyArray(p => {
			const currentlactiveimm = p.immegration || [];
			const index = currentlactiveimm.indexOf(id);
			const updateactiveimm = index === -1
				? [...currentlactiveimm, id]
				: currentlactiveimm.filter(item => item !== id);
			return { ...p, immegration: updateactiveimm };
		});

	}


	const [skin, setSkin] = useState(false);
	const [eyecolor, setEyecolor] = useState(false);
	const [sexx, setSexx] = useState(false);
	const [date, setDate] = useState(new Date());
	const [showdatepicker, setshowdatetpicker] = useState(false);
	const [datee, setDatee] = useState('');

	const handledatechange = (event, selectedDate) => {
		if (selectedDate) {
			setshowdatetpicker(false);
			setDate(selectedDate);
			setDatee(moment(selectedDate).format('YYYY-MM-DD'));
		}
	};

	return (
		<View style={StylesGloble.container}>
			<ScrollView style={{ marginBottom: '10%' }}>
				<Header name={'Passport Application.'} />
				<View style={{ ...StylesGloble.marginscreen }}>
					<View>
						<Text style={StylesGloble.font20700000000}>General data</Text>
						<Text style={{ ...StylesGloble.font14500g6D6D6D, lineHeight: 19.12 }}>
							(declare the name and surname as it is on your Birth Certificate,
							if you are a woman, never write your married name)
						</Text>
					</View>
					<View style={{ marginTop: 15 }}>
						<TextField
							name={'Surname'}
							Placeholder="Surname"
							value={inputsurname.value}
							type="text"
							sectext="false"
							errorText={inputsurname.message}
							onChangeText={text => validatesurname(text)}
						/>
					</View>

					<View style={{ marginTop: 15 }}>
						<TextField
							name={'Second surname'}
							value={inputsecondsurname.value}
							type="text"
							sectext="false"
							errorText={inputsecondsurname.message}
							onChangeText={text => validateSecondSurname(text)}
							Placeholder="Second surname"
						/>
					</View>

					<View style={{ marginTop: 15 }}>
						<TextField
							name={'First name'}
							value={inputFirstName.value}
							type="text"
							sectext="false"
							Placeholder="First name"
							errorText={inputFirstName.message}
							onChangeText={text => validateFirstName(text)}

						/>
					</View>
					<View style={{ marginTop: 15 }}>
						<TextField
							name={'Second name'}
							Placeholder="Second name"
							value={inputSecondName.value}
							type="text"
							sectext="false"
							errorText={inputSecondName.message}
							onChangeText={text => validateSecondName(text)}
						/>
					</View>
					<View style={{ marginTop: 15 }}>
						<TextField name={'Son of: Father'}
							value={inputFatherName.value}
							type="text"
							sectext="false"
							errorText={inputFatherName.message}
							onChangeText={text => validateFatherName(text)}
							Placeholder="Father name" />
					</View>
					<View style={{ marginTop: 15 }}>
						<TextField name={'Mother'}
							Placeholder="Mother name"
							value={inputMotherName.value}
							type="text"
							sectext="false"
							errorText={inputMotherName.message}
							onChangeText={text => validateMother(text)}

						/>
					</View>
					<View style={{ marginTop: 15 }}>
						<TextField name={'Height(cm)'}
							Placeholder="Enter height"
							value={inputheight.value}
							type="phone"
							sectext="false"
							errorText={inputheight.message}
							onChangeText={text => validateheight(text)}
						/>
					</View>
					<View style={{ marginTop: 15 }}>
						<TextField name={'Civil status'}
							Placeholder="Enter Civil status"
							value={inputcivil.value}
							type="phone"
							sectext="false"
							errorText={inputcivil.message}
							onChangeText={text => validateCivilstatus(text)}
						/>
					</View>

					<View style={{ marginTop: 15 }}>
						<Text style={StylesGloble.fon14500242A37}>Sex</Text>
					</View>

					<View>
						<Dropdown
							style={{ borderWidth: 1, borderColor: "#5D5D5D", borderRadius: 8, padding: 7, marginTop: 5 }}
							placeholderStyle={{ fontSize: 16, color: "#5D5D5D", fontWeight: "500" }}
							selectedTextStyle={{ color: '#000000', marginLeft: 10 }}
							data={sexdataa}
							maxHeight={300}
							labelField="name"
							valueField="name"
							placeholder="Select"
							placeholderTextColor='#5D5D5D'
							value={sexdata.name}
							onChange={item => {
								setsexdata({
									id: item.id,
									name: item.name
								})
							}}
							renderRightIcon={() => (
								<Arrowdown />
							)}
							renderItem={(item, index, selected, onSelectItem) => (
								<>
									<View style={{ padding: 10, flexDirection: "row", backgroundColor: "#ffffff", }} >

										<Text style={{ color: "#6D6D6D", marginLeft: 10 }}>
											{item.name}
										</Text>
									</View>

								</>
							)}
						/>
					</View>
					<View style={{ marginTop: 15 }}>
						<Text style={StylesGloble.fon14500242A37}>Eye Color</Text>
					</View>

					<View>
						<Dropdown
							style={{ borderWidth: 1, borderColor: "#5D5D5D", borderRadius: 8, padding: 7, marginTop: 10 }}
							placeholderStyle={{ fontSize: 16, color: "#5D5D5D", fontWeight: "500" }}
							selectedTextStyle={{ color: '#000000', marginLeft: 10 }}
							data={Eyedata}
							maxHeight={300}
							labelField="name"
							valueField="name"
							placeholder="Select"
							placeholderTextColor='#5D5D5D'
							value={eyecolordata.name}
							onChange={item => {
								seteyecolordata({
									id: item.id,
									name: item.name
								})
							}}
							renderRightIcon={() => (
								<Arrowdown />
							)}
							renderItem={(item, index, selected, onSelectItem) => (
								<>
									<View style={{ padding: 10, flexDirection: "row", backgroundColor: "#ffffff", }} >

										<Text style={{ color: "#6D6D6D", marginLeft: 10 }}>
											{item.name}
										</Text>
									</View>

								</>
							)}
						/>
					</View>

					<View style={{ marginTop: 15 }}>
						<Text style={StylesGloble.fon14500242A37}>Skin color</Text>
					</View>
					<TouchableOpacity style={{borderColor: '#5D5D5D',borderWidth: 1,borderRadius: 8,height: 48,marginVertical: 10,}} onPress={() => setskinmodal(true)}>
						<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',padding: 10,}}>
							<Text style={StylesGloble.font165005D5D5D}>Select</Text>
							<Arrowdown />
						</View>
					</TouchableOpacity>
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
										{(activeKeyArray.skin.includes(item.name)) ? (
											<TouchableOpacity style={{ padding: 5, flexDirection: "row", justifyContent: "space-between" }} onPress={() => changvalueskin(item.name)}>
												<Text style={{ fontSize: 15, fontWeight: '400', color: "#6D6D6D", }}>
													{item.name}
												</Text>
												<Checkboxactive />
											</TouchableOpacity>
										) : (
											<TouchableOpacity style={{ padding: 5, flexDirection: "row", justifyContent: "space-between" }} onPress={() => changvalueskin(item.name)}>
												<Text style={{ fontSize: 15, fontWeight: '400', color: "#6D6D6D", }}>
													{item.name}
												</Text>
												<Checkboxinactive />
											</TouchableOpacity>
										)}

									</>} />
							</View>
						) : null
					}

					<View>
						<Dropdown
							style={{ borderWidth: 1, borderColor: "#5D5D5D", borderRadius: 8, padding: 7, marginTop: 10 }}
							placeholderStyle={{ fontSize: 16, color: "#B0B0B0", }}
							selectedTextStyle={{ color: '#000000', marginLeft: 10 }}
							data={skinn}
							maxHeight={300}
							labelField="name"
							valueField="name"
							placeholder="Select"
							placeholderTextColor='#B0B0B0'
							value={skincolordata.name}
							onChange={item => {
								setskincolordata({
									id: item.id,
									name: item.name
								})
							}}
							renderRightIcon={() => (
								<Arrowdown />
							)}
							renderItem={(item, index, selected, onSelectItem) => (
								<>
									<View style={{ padding: 10, flexDirection: "row", backgroundColor: "#ffffff", }} >

										<Text style={{ color: "#6D6D6D", marginLeft: 10 }}>
											{item.name}
										</Text>
									</View>

								</>
							)}
						/>
					</View>

					<View style={{ marginTop: 15 }}>
						<Text style={StylesGloble.fon14500242A37}>Hair color</Text>
					</View>

					<View>
						<Dropdown
							style={{ borderWidth: 1, borderColor: "#5D5D5D", borderRadius: 8, padding: 7, marginTop: 10 }}
							placeholderStyle={{ fontSize: 16, color: "#B0B0B0", }}
							selectedTextStyle={{ color: '#000000', marginLeft: 10 }}
							data={Haircolor}
							maxHeight={300}
							labelField="name"
							valueField="name"
							placeholder="Select"
							placeholderTextColor='#B0B0B0'
							value={haircolordata.name}
							onChange={item => {
								sethaircolordata({
									id: item.id,
									name: item.name
								})
							}}
							renderRightIcon={() => (
								<Arrowdown />
							)}
							renderItem={(item, index, selected, onSelectItem) => (
								<>
									<View style={{ padding: 10, flexDirection: "row", backgroundColor: "#ffffff", }} >

										<Text style={{ color: "#6D6D6D", marginLeft: 10 }}>
											{item.name}
										</Text>
									</View>

								</>
							)}
						/>
					</View>

					<View style={{ marginTop: 15 }}>
						<Text style={StylesGloble.fon14500242A37}>
							Immigration Classification when leaving Cuba
						</Text>
					</View>

					<View>
						<Dropdown
							style={{ borderWidth: 1, borderColor: "#5D5D5D", borderRadius: 8, padding: 7, marginTop: 10 }}
							placeholderStyle={{ fontSize: 16, color: "#B0B0B0", }}
							selectedTextStyle={{ color: '#000000', marginLeft: 10 }}
							data={leaving}
							maxHeight={300}
							labelField="name"
							valueField="name"
							placeholder="Select"
							placeholderTextColor='#B0B0B0'
							value={immigrationdata.name}
							onChange={item => {
								setimmigrationdata({
									id: item.id,
									name: item.name
								})
							}}
							renderRightIcon={() => (
								<Arrowdown />
							)}
							renderItem={(item, index, selected, onSelectItem) => (
								<>
									<View style={{ padding: 10, flexDirection: "row", backgroundColor: "#ffffff", }} >

										<Text style={{ color: "#6D6D6D", marginLeft: 10 }}>
											{item.name}
										</Text>
									</View>

								</>
							)}
						/>
					</View>

					<View style={{ marginTop: 15 }}>
						<Text style={StylesGloble.fon14500242A37}>Departure date</Text>
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
							{datee ? (
								<Text style={StylesGloble.font165005D5D5D}>{datee}</Text>
							) : (
								<Text style={StylesGloble.font165005D5D5D}>08.03.2024</Text>
							)}

							<CalenderPicker />
						</View>
					</TouchableOpacity>

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
							label={'Next'}
							onPress={() => navigation.navigate('ThreePassportApplication')}
						/>
					</View>
				</View>
			</ScrollView>

			<Modal
				transparent={true}
				visible={sexx}
				onRequestClose={() => setSexx(false)}>
				<View style={StylesGloble.marginscreen}>
					<View
						style={{
							borderWidth: 1,
							borderColor: '#D1D1D1',
							backgroundColor: '#FFFFFF',
							height: 80,
							borderRadius: 8,
							width: '100%',
							alignSelf: 'center',
							top: '470%',
						}}>
						<FlatList
							data={sexdata}
							renderItem={({ item }) => (
								<TouchableOpacity
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										paddingLeft: 10,
										marginBottom: 12,
										top: 10,
									}}
									onPress={() => setSexx(item.name)}>
									{sexx == item.name ? <Tick /> : <Tickadd />}
									<Text
										style={{
											fontSize: 14,
											fontWeight: '500',
											color: '#292929',
											paddingLeft: 10,
										}}>
										{item.name}
									</Text>
								</TouchableOpacity>
							)}
						/>
					</View>
				</View>
			</Modal>

			<Modal
				transparent={true}
				visible={eyecolor}
				onRequestClose={() => setEyecolor(false)}>
				<View style={StylesGloble.marginscreen}>
					<View
						style={{
							borderWidth: 1,
							borderColor: '#D1D1D1',
							backgroundColor: '#FFFFFF',
							height: 80,
							borderRadius: 8,
							width: '100%',
							alignSelf: 'center',
							top: '470%',
						}}>
						<FlatList
							data={Eyedata}
							renderItem={({ item }) => (
								<TouchableOpacity
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										paddingLeft: 10,
										marginBottom: 12,
										top: 10,
									}}
									onPress={() => setEyecolor(item.name)}>
									{eyecolor == item.name ? <Tick /> : <Tickadd />}
									<Text
										style={{
											fontSize: 14,
											fontWeight: '500',
											color: '#292929',
											paddingLeft: 10,
										}}>
										{item.name}
									</Text>
								</TouchableOpacity>
							)}
						/>
					</View>
				</View>
			</Modal>
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
