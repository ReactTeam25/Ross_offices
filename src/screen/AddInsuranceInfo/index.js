import React, { useEffect, useState } from 'react';
import {
    View,
    ScrollView,
} from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Header from '../../helper/Header';
import TextField from '../../helper/TextField';
import Button from '../../helper/Button';
import ApiDataService from '../../services/Apiservice.service'
import LoadingPage from '../../helper/LoadingPage';
import Toast from 'react-native-simple-toast';
import DeviceInfo from "react-native-device-info";
import useFormValidation from '../../services/Validation';
import { setInsuranceinfolistData, setselectlanguage } from '../../redux/index';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { useSafeArea } from 'react-native-safe-area-context';

const AddInsuranceInfo = ({ navigation }) => {
    const insets = useSafeArea();

    const { t, i18n } = useTranslation();
    const { Validateaddinsuranceform } = useFormValidation();

    const dispatch = useDispatch();
    const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

    useEffect(() => {
        dispatch(setselectlanguage())
        i18n.changeLanguage(SelectlanguageReducer);
    }, [])
    const androidVersion = DeviceInfo.getSystemVersion()
    const [loading, setloading] = useState(false);
    const [error, setError] = useState({ isValid: false });

    const [input, setinput] = useState({
        Provider: '',
        PolicyNumber: '',
        Coverage: '',
        EmergencyContactNumber: '',
    })

    const onInpChanged = (name, event) => {
        setError(p => {
            const obj = { ...p }
            obj?.errors && delete obj?.errors[name]
            return obj
        })
        setinput((prevInputs) => ({ ...prevInputs, [name]: event }));
    };

    const bookingsubmit = () => {
        const errorMessage = Validateaddinsuranceform(input);
        if (errorMessage.isValid == false) {
            setError(errorMessage);
        } else {
            let body = {
                provider: input.Provider,
                policy_number: input.PolicyNumber,
                coverage: input.Coverage,
                emergency_contact: input.EmergencyContactNumber,
                lang: SelectlanguageReducer
            };
            console.log('sign up-----', body);
            setloading(true);
            ApiDataService.PostTokenapi('travel/insurance', JSON.stringify(body))
                .then(response => {
                    console.log('response------travel/history----->', response);
                    setloading(false);
                    if (response.status == 201) {
                        calltoastmessage(response.data.message);
                        dispatch(setInsuranceinfolistData());
                        navigation.navigate('GetInsuranceInfo')
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
                <Header name={t('Insurance Information')} />

                <ScrollView style={{ marginBottom: '10%' }}>
                    <View style={StylesGloble.marginscreen}>
                        <View>
                            <TextField
                                name={t('Provider')}
                                star={'*'}
                                Placeholder={t("Enter Provider")}
                                value={input.Provider}
                                type="text"
                                sectext="false"
                                errorText={error.errors?.Provider}
                                onChangeText={text => {
                                    onInpChanged('Provider', text)
                                }}
                            />
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <TextField
                                name={t('Policy Number')}
                                star={'*'}
                                Placeholder={t("Enter Policy Number")}
                                value={input.PolicyNumber}
                                type="number"
                                sectext="false"
                                errorText={error.errors?.PolicyNumber}
                                onChangeText={text => {
                                    onInpChanged('PolicyNumber', text)
                                }}
                            />
                        </View>

                        <View style={{ marginTop: 15 }}>
                            <TextField
                                name={t('Coverage')}
                                star={'*'}
                                Placeholder={t("Enter Coverage")}
                                value={input.Coverage}
                                type="text"
                                sectext="false"
                                errorText={error.errors?.Coverage}
                                onChangeText={text => {
                                    onInpChanged('Coverage', text)
                                }}
                            />
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <TextField
                                name={t('Emergency Contact Number')}
                                star={'*'}
                                Placeholder={t("Enter Emergency Contact Number")}
                                value={input.EmergencyContactNumber}
                                type="phone"
                                sectext="false"
                                errorText={error.errors?.EmergencyContactNumber}
                                onChangeText={text => {
                                    onInpChanged('EmergencyContactNumber', text)
                                }}
                            />
                        </View>
                        <View style={{ marginTop: 50 }}>
                            <Button label={t('Submit Request')} onPress={() => bookingsubmit()} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>

    );
};
export default AddInsuranceInfo;
