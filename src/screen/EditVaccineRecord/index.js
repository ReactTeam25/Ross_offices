import React, { useState,useEffect } from 'react';
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
import { setVaccinelistData,setselectlanguage } from '../../redux/index';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { useSafeArea } from 'react-native-safe-area-context';

const EditVaccineRecord = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const insets = useSafeArea();

    const recordid = route?.params?.recordid
    const vaccine_name = route?.params?.vaccine_name
    const vaccine_date = route?.params?.vaccine_date
    const expiry_date = route?.params?.expiry_date
    const notes = route?.params?.notes
    const androidVersion = DeviceInfo.getSystemVersion()
    const [loading, setloading] = useState(false);
    const [showprefferd, setshowprefferd] = useState(false);
    const [preferreddate, setpreferreddate] = useState(new Date());
    const [showexpirydate, setshowexpirydate] = useState(false);
    const [expirydate, setexpirydate] = useState(new Date());
    const [error, setError] = useState({ isValid: false });

    const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);
    
    useEffect(()=>{
        dispatch(setselectlanguage())
        i18n.changeLanguage(SelectlanguageReducer);
    },[])

    const [input, setinput] = useState({
        vaccinename: vaccine_name ? vaccine_name : '',
        date: vaccine_date ? vaccine_date : '',
        Expirationdate: expiry_date ? expiry_date : '',
        Notes: notes ? notes : '',
    })
    const handleDOBchange = (event, selectedDate) => {
        setshowprefferd(false);
        if (selectedDate) {
            setpreferreddate(selectedDate);
            onInpChanged('date', moment(selectedDate).format('YYYY-MM-DD'))
        }

    };
    const handleexpirychange = (event, selectedDate) => {
        setshowexpirydate(false);
        if (selectedDate) {
            setexpirydate(selectedDate);
            onInpChanged('Expirationdate', moment(selectedDate).format('YYYY-MM-DD'))

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
        let body = {
            vaccination_name: input.vaccinename,
            vaccination_date: input.date,
            expiration_date: input.Expirationdate,
            notes: input.Notes,
            lang:SelectlanguageReducer
        };
        setloading(true);
        ApiDataService.putapi(`travel/vaccination-record/${recordid}`, JSON.stringify(body))
            .then(response => {
                setloading(false);
                console.log('response_____',response);
                
                if (response.status == 200) {
                    calltoastmessage(response.data.message);
                    dispatch(setVaccinelistData(SelectlanguageReducer));
                    navigation.navigate('GetVaccinationRecords')
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
            <Header name={t('Vaccination Records')} />

            <ScrollView style={{ marginBottom: '10%' }}>
                <View style={StylesGloble.marginscreen}>
                    <View>
                        <TextField
                            name={t('Vaccine name')}
                            star={'*'}

                            Placeholder={t("Enter Vaccine name")}
                            value={input.vaccinename}
                            type="text"
                            sectext="false"
                            errorText={error.errors?.vaccinename}
                            onChangeText={text => {
                                onInpChanged('vaccinename', text)
                            }}
                        />
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#242A37' }}>
                            {t("Date")} <Text style={{ color: "#FF6A6A" }}>*</Text>
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
                                    {t("Select")}
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

                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#242A37' }}>
                            {t('Expiration')} <Text style={{ color: "#FF6A6A" }}>*</Text>
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: input.Expirationdate != '' ? '#9846D7' : '#B0B0B0',
                            height: 48,
                            borderRadius: 8,
                            marginTop: 10,
                        }}
                        onPress={() => {
                            setshowexpirydate(true);
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: 12,
                            }}>
                            {input.Expirationdate ? (
                                <Text
                                    style={{ fontSize: 16, fontWeight: '400', color: '#000000' }}>
                                    {input.Expirationdate}
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

                    {showexpirydate && (
                        <View>
                            <DateTimePicker
                                date={expirydate}
                                value={expirydate}
                                mode="date"
                                onChange={handleexpirychange}
                                minimumDate={new Date()}
                                format={'YYYY-MM-DD'}
                                displayFormat={'DD-MM-YYYYY'}
                            />
                        </View>
                    )}

                    <View style={{ marginTop: 15 }}>
                        <TextField
                            name={t('Notes')}
                            star={'*'}
                            Placeholder={t("Enter Notes")}
                            value={input.Notes}
                            type="text"
                            sectext="false"
                            numberOfLines={3}
                            errorText={error.errors?.Notes}
                            onChangeText={text => {
                                onInpChanged('Notes', text)
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
export default EditVaccineRecord;
