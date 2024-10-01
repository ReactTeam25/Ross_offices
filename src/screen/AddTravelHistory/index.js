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
import { setTravelhistoryData, setselectlanguage } from '../../redux/index';
import { useSelector, useDispatch } from 'react-redux';
import useFormValidation from '../../services/Validation';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { useSafeArea } from 'react-native-safe-area-context';

const AddTravelHistory = ({ navigation }) => {
    const insets = useSafeArea();

    const dispatch = useDispatch();

    const { t, i18n } = useTranslation();
    const { ValidateaddTravelform } = useFormValidation();

    const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

    useEffect(() => {
        dispatch(setselectlanguage())
        i18n.changeLanguage(SelectlanguageReducer);
    }, [])
    const androidVersion = DeviceInfo.getSystemVersion()
    const [loading, setloading] = useState(false);
    const [showprefferd, setshowprefferd] = useState(false);
    const [preferreddate, setpreferreddate] = useState(new Date());
    const [error, setError] = useState({ isValid: false });

    const [input, setinput] = useState({
        City: '',
        date: '',
        Country: '',
        Purpose: '',
    })
    const handleDOBchange = (event, selectedDate) => {
        setshowprefferd(false);
        if (selectedDate) {
            setpreferreddate(selectedDate);
            onInpChanged('date', moment(selectedDate).format('YYYY-MM-DD'))
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
        const errorMessage = ValidateaddTravelform(input);
        if (errorMessage.isValid == false) {
            setError(errorMessage);
        } else {
            let body = {
                city: input.City,
                country: input.Country,
                travel_date: input.date,
                purpose: input.Purpose,
                lang: SelectlanguageReducer

            };
            console.log('sign up-----', body);
            setloading(true);
            ApiDataService.PostTokenapi('travel/history', JSON.stringify(body))
                .then(response => {
                    console.log('response------travel/history----->', response);
                    setloading(false);
                    if (response.status == 201) {
                        calltoastmessage(response.data.message);
                        dispatch(setTravelhistoryData());
                        navigation.navigate('GetTravelHistory')
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
                <Header name={t('Travel History')} />

                <ScrollView style={{ marginBottom: '10%' }}>
                    <View style={StylesGloble.marginscreen}>
                        <View>
                            <TextField
                                name={t('City')}
                                star={'*'}
                                Placeholder={t("Enter City")}
                                value={input.City}
                                type="text"
                                sectext="false"
                                errorText={error.errors?.City}
                                onChangeText={text => {
                                    onInpChanged('City', text)
                                }}
                            />
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <TextField
                                name={t('Country')}
                                star={'*'}
                                Placeholder={t("Enter Country")}
                                value={input.Country}
                                type="text"
                                sectext="false"
                                errorText={error.errors?.Country}
                                onChangeText={text => {
                                    onInpChanged('Country', text)
                                }}
                            />
                        </View>

                        <View style={{ marginTop: 15 }}>
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#242A37' }}>
                                {t('Date')} <Text style={{ color: "#FF6A6A" }}>*</Text>
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                borderColor: input.date != '' ? '#9846D7' : '#B0B0B0',
                                height: 48,
                                borderRadius: 8,
                                marginTop: 10,
                            }}
                            onPress={() => {
                                setshowprefferd(true);
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    padding: 12,
                                }}>
                                {input.date ? (
                                    <Text
                                        style={{ fontSize: 16, fontWeight: '400', color: '#000000' }}>
                                        {input.date}
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

                        {showprefferd && (
                            <View>
                                <DateTimePicker
                                    date={preferreddate}
                                    value={preferreddate}
                                    mode="date"
                                    onChange={handleDOBchange}
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
                                        marginBottom: 0
                                    }}>{error.errors?.date}</Text>
                                </View>
                            ) : null
                        }
                        <View style={{ marginTop: 15 }}>
                            <TextField
                                star={'*'}
                                name={t('Purpose')}
                                Placeholder={t("Enter Purpose")}
                                value={input.Purpose}
                                type="text"
                                sectext="false"
                                errorText={error.errors?.Purpose}
                                onChangeText={text => {
                                    onInpChanged('Purpose', text)
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
export default AddTravelHistory;
