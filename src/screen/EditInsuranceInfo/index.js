import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity, PermissionsAndroid, FlatList
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
import DeviceInfo from "react-native-device-info";
import { setInsuranceinfolistData, setselectlanguage } from '../../redux/index';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { useSafeArea } from 'react-native-safe-area-context';

const EditInsuranceInfo = ({ navigation, route }) => {
    const insets = useSafeArea();

    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const insuranceid = route?.params?.insuranceid
    const provider = route?.params?.provider
    const emergency_contact = route?.params?.emergency_contact
    const policy_number = route?.params?.policy_number
    const coverage = route?.params?.coverage
    const androidVersion = DeviceInfo.getSystemVersion()
    const [loading, setloading] = useState(false);
    const [error, setError] = useState({ isValid: false });
    const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

    useEffect(() => {
        dispatch(setselectlanguage())
        i18n.changeLanguage(SelectlanguageReducer);
    }, [])

    const [input, setinput] = useState({
        Provider: provider ? provider : '',
        PolicyNumber: policy_number ? policy_number : '',
        Coverage: coverage ? coverage : '',
        EmergencyContactNumber: emergency_contact ? emergency_contact : '',
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
        let body = {
            provider: input.Provider,
            policy_number: input.PolicyNumber,
            coverage: input.Coverage,
            emergency_contact: input.EmergencyContactNumber,
            lang: SelectlanguageReducer

        };
        setloading(true);
        ApiDataService.putapi(`travel/insurance/${insuranceid}`, JSON.stringify(body))
            .then(response => {
                setloading(false);
                if (response.status == 200) {
                    console.log('edittravel-__________', response.data);
                    calltoastmessage(response.data.message);
                    dispatch(setInsuranceinfolistData(SelectlanguageReducer));
                    navigation.navigate('GetInsuranceInfo')
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
export default EditInsuranceInfo;
