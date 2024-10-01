import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Header from '../../helper/Header';
import Button from '../../helper/Button';
import ApiDataService from '../../services/Apiservice.service';
import LoadingPage from '../../helper/LoadingPage';
import Toast from 'react-native-simple-toast';
import { setVaccinelistData,setselectlanguage } from '../../redux/index';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { useSafeArea } from 'react-native-safe-area-context';

const AttPassportApplication = ({ navigation, route }) => {
    const insets = useSafeArea();

	const booking_id = route?.params?.booking_id
	const [loading, setloading] = useState(false);
	const dispatch = useDispatch();

    const { t, i18n } = useTranslation();

    const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);
    
    useEffect(()=>{
        dispatch(setselectlanguage())
        i18n.changeLanguage(SelectlanguageReducer);
    },[SelectlanguageReducer])

	
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
				<View style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: 999999, }}>
					<LoadingPage />
				</View>
			)}
			<Header name={t('Passport Application')} />

			<View style={StylesGloble.marginscreen}>
				<View>
					<Text style={{ ...StylesGloble.font20700000000, lineHeight: 27 }}>
						{t('Instructions for filling out the form')}
					</Text>
				</View>

				<View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
					<View
						style={{
							backgroundColor: '#6D6D6D',
							height: 5,
							width: 5,
							borderRadius: 5,
						}}
					/>

					<Text
						style={{
							...StylesGloble.font14500g6D6D6D,
							left: 10,
							lineHeight: 19,
						}}>
						{t('Filling will be done in print or by type')}
					</Text>
				</View>

				<View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
					<View
						style={{
							backgroundColor: '#6D6D6D',
							height: 5,
							width: 5,
							borderRadius: 5,
							bottom: 18,
						}}
					/>

					<Text
						style={{
							...StylesGloble.font14500g6D6D6D,
							left: 10,
							lineHeight: 19,
						}}>
						{t('The signature should be made with a thick point and black ink, trying to keep it in the center of the rectangle.')}
					</Text>
				</View>

				<View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
					<View
						style={{
							backgroundColor: '#6D6D6D',
							height: 5,
							width: 5,
							borderRadius: 5,
							bottom: 18,
						}}
					/>

					<Text
						style={{
							...StylesGloble.font14500g6D6D6D,
							left: 10,
							lineHeight: 19,
						}}>
						{t('For the preparation request, 2 photos will be submitted, measuring 4½ x 4½ cm, one of them must be pasted on the form.')}
					</Text>
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
					<View
						style={{
							backgroundColor: '#6D6D6D',
							height: 5,
							width: 5,
							borderRadius: 5,
							bottom: 28,
						}}
					/>

					<Text
						style={{
							...StylesGloble.font14500g6D6D6D,
							left: 10,
							lineHeight: 19,
						}}>
						{t('The photo must be in color, from the front, with uncovered hair and without dark glasses, wear appropriate clothing that contrasts with the background.')}
					</Text>
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
					<View
						style={{
							backgroundColor: '#6D6D6D',
							height: 5,
							width: 5,
							borderRadius: 5,
							bottom: 28,
						}}
					/>

					<Text
						style={{
							...StylesGloble.font14500g6D6D6D,
							left: 10,
							lineHeight: 19,
						}}>
						{t("The applicant's general information must coincide with those stated in the previous Passport or document that identifies him or her; never use the married name.")}
					</Text>
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
					<View
						style={{
							backgroundColor: '#6D6D6D',
							height: 5,
							width: 5,
							borderRadius: 5,
							bottom: 10,
						}}
					/>

					<Text
						style={{
							...StylesGloble.font14500g6D6D6D,
							left: 10,
							lineHeight: 19,
						}}>
						{t('It will not be valid to submit amendments, deletions or deletions.')}
					</Text>
				</View>
				<View style={{ marginTop: '10%' }}>
					<Button label={t('Submit')} onPress={() => navigation.navigate('BottomTab')}/>
				</View>
			</View>
		</View>
		</View>
		
	);
};

export default AttPassportApplication;
