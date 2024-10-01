import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Header from '../../helper/Header';
import TextField from '../../helper/TextField';
import Button from '../../helper/Button';
import ApiDataService from '../../services/Apiservice.service';
import LoadingPage from '../../helper/LoadingPage';
import Toast from 'react-native-simple-toast';
import useFormValidation from '../../services/Validation';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { setProfileData, setselectlanguage } from '../../redux/index';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';

const SixPassportApplication = ({ navigation, route }) => {
    const { Validateformsix } = useFormValidation();
	const { t, i18n } = useTranslation();
const insets = useSafeArea();

    const dispatch = useDispatch();
    const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

    useEffect(() => {
        dispatch(setselectlanguage())
        i18n.changeLanguage(SelectlanguageReducer);
    }, [])

	const booking_id = route?.params?.booking_id
	const [error, setError] = useState({ isValid: false });
	const [loading, setloading] = useState(false);
	const [input, setInput] = useState({
		name_num: "",
		name_add: "",
		add_one: "",
		from_one: "",
		until_one: "",
		add_two: "",
		from_two: "",
		until_two: "",
		maidensurname: "",
		othername: "",
		residencenum: "",
		foreignnum: "",
	});
	const onInpChanged = (name, event) => {
		setError(p => {
			const obj = { ...p }
			obj?.errors && delete obj?.errors[name]
			return obj
		})
		setInput((prevInputs) => ({ ...prevInputs, [name]: event }));
	};
	const bookingsubmit = () => {
		const errorMessage = Validateformsix(input);
		if (errorMessage.isValid == false) {
			setError(errorMessage);
		} else {
			setloading(true);
			let body = {
				step: 6,
				bookingId: booking_id,
				name_surname_in_cuba: input.name_num,
				reference_address: input.name_add,
				address_one: input.add_one,
				from_one: input.from_one,
				until_one: input.until_one,
				address_two: input.add_two,
				from_two: input.from_two,
				until_two: input.until_two,
				maiden_surnames: input.maidensurname,
				other_names: input.othername,
				residence_number: input.residencenum,
				foreign_passport: input.foreignnum,
				lang:SelectlanguageReducer
			}
			console.log('body----------', body);

			ApiDataService.PostHeaderapi('passport/booking', body)
				.then(response => {
					setloading(false);
					console.log('response------formData----->', response);
					if (response.status == 200) {
						navigation.navigate('SevenPassportApplication', { booking_id: booking_id })
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
				<Header name={'Passport Application'} />
				<View style={{ ...StylesGloble.marginscreen }}>
					<View>
						<Text style={StylesGloble.font20700000000}>{t('Name and surname of the reference in Cuba')}</Text>
						<Text style={{ ...StylesGloble.font14500g6D6D6D, lineHeight: 19.12, top: 5 }}>{t('(person who can be contacted to verify your general information, add  telephone number if possible)')}</Text>
					</View>
					<View style={{ marginTop: 0 }}>
						<TextField
							Placeholder={t("Enter number")}
							value={input.name_num}
							type="phone"
							sectext="false"
							errorText={error.errors?.name_num}
							onChangeText={text => {
								onInpChanged('name_num', text)
							}}
							maxLength={10}
						/>
					</View>

					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('Reference Address (include the province)')}
							Placeholder={t("GLENGALA, Victoria(VIC), 3020")}
							value={input.name_add}
							type="text"
							sectext="false"
							star={'*'}

							errorText={error.errors?.name_add}
							onChangeText={text => {
								onInpChanged('name_add', text)
							}}
						/>
					</View>


					<View style={{ marginTop: 24 }}>
						<Text style={StylesGloble.font20700000000}>{t('Place of Residence in Cuba (last two addresses)')}</Text>

					</View>

					<View style={{ marginTop: 20 }}>
						<TextField
							name={t('Address 1')}
							star={'*'}

							Placeholder={t("GLENGALA, Victoria(VIC), 3020")}
							value={input.add_one}
							type="text"
							sectext="false"
							errorText={error.errors?.add_one}
							onChangeText={text => {
								onInpChanged('add_one', text)
							}}
						/>
					</View>


					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('From')}
							star={'*'}
							Placeholder={t("Valencia")}
							value={input.from_one}
							type="text"
							sectext="false"
							errorText={error.errors?.from_one}
							onChangeText={text => {
								onInpChanged('from_one', text)
							}}
						/>
					</View>
					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('Until')}
							star={'*'}

							Placeholder={t("Valencia")}
							value={input.until_one}
							type="text"
							sectext="false"
							errorText={error.errors?.until_one}
							onChangeText={text => {
								onInpChanged('until_one', text)
							}}
						/>
					</View>
					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('Address 2')}
							star={'*'}

							Placeholder={t("GLENGALA, Victoria(VIC), 3020")}
							value={input.add_two}
							type="text"
							sectext="false"
							errorText={error.errors?.add_two}
							onChangeText={text => {
								onInpChanged('add_two', text)
							}}
						/>

					</View>
					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('From')}
							star={'*'}

							Placeholder={t("Valencia")}
							value={input.from_two}
							type="text"
							sectext="false"
							errorText={error.errors?.from_two}
							onChangeText={text => {
								onInpChanged('from_two', text)
							}}
						/>
					</View>


					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('Until')}
							star={'*'}

							Placeholder={t("Valencia")}
							value={input.until_two}
							type="text"
							sectext="false"
							errorText={error.errors?.until_two}
							onChangeText={text => {
								onInpChanged('until_two', text)
							}}
						/>
					</View>

					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('Maiden surnames')}
							star={'*'}

							Placeholder={t("Doe")}
							value={input.maidensurname}
							type="text"
							sectext="false"
							errorText={error.errors?.maidensurname}
							onChangeText={text => {
								onInpChanged('maidensurname', text)
							}}
						/>
					</View>

					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('Other names')}
							star={'*'}

							Placeholder={t("Adden")}
							value={input.othername}
							type="text"
							sectext="false"
							errorText={error.errors?.othername}
							onChangeText={text => {
								onInpChanged('othername', text)
							}}
						/>
					</View>

					<View style={{ marginTop: 15 }}>
						<TextField
							name={t('Residence number')}
							star={'*'}

							Placeholder={t("123456")}
							value={input.residencenum}
							type="text"
							sectext="false"
							errorText={error.errors?.residencenum}
							onChangeText={text => {
								onInpChanged('residencenum', text)
							}}
						/>
					</View>

					<View style={{ marginTop: 15 }}>
					<TextField
							name={t('Foreign passport')}
							star={'*'}

							Placeholder={t("P0000000")}
							value={input.foreignnum}
							type="text"
							sectext="false"
							errorText={error.errors?.foreignnum}
							onChangeText={text => {
								onInpChanged('foreignnum', text)
							}}
						/>
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
export default SixPassportApplication
