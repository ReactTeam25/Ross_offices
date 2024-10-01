import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity, PermissionsAndroid, FlatList, Dimensions, Platform
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
import Clockgrey from '../../assest/svg/Clockgrey.svg';
import Addcircle from '../../assest/svg/Addcircle.svg';
import Docment from '../../assest/svg/Docment.svg'
import Deletedoc from '../../assest/svg/Deletedoc.svg'
import useFormValidation from '../../services/Validation';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { setProfileData, setselectlanguage } from '../../redux/index';
import { useSelector, useDispatch } from 'react-redux';

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
const LoanFrom = ({ navigation, route }) => {
    const service_id = route?.params?.service_id
    const { Validateloanform } = useFormValidation();

    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

    useEffect(() => {
        dispatch(setselectlanguage())
        i18n.changeLanguage(SelectlanguageReducer);
    }, [])

    const androidVersion = DeviceInfo.getSystemVersion()
    const [loading, setloading] = useState(false);
    const [selectmodename, setselectmodename] = useState('')
    const [showprefferd, setshowprefferd] = useState(false);
    const [preferreddate, setpreferreddate] = useState(new Date());
    const [showTimePicker, setshowTimePicker] = useState(false);
    const [time, setTime] = useState(new Date());
    const [error, setError] = useState({ isValid: false });
    const [uploaddocarray, setuploaddocarray] = useState([])


    const uploadingdoc = async () => {
        try {
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

            } else {
                console.log('Gallery permission denied');
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


    const [input, setinput] = useState({
        mode: '',
        fullName: '',
        emailAddress: '',
        phonenumber: '',
        preferredAppointmentDate: '',
        preferredAppointmentTime: '',
        loanAmount: '',
        loanPurpose: '',
    })
    const handleTimeChange = (event, selectedDate) => {
        setshowTimePicker(false);
        if (selectedDate) {
            setTime(selectedDate);
            onInpChanged('preferredAppointmentTime', moment(selectedDate).format('hh:mm a'))
        }
    };

    const selectmodefunc = (name) => {
        setselectmodename(name)
        onInpChanged('mode', name)

    }

    const handleDOBchange = (event, selectedDate) => {
        setshowprefferd(false);
        if (selectedDate) {
            setpreferreddate(selectedDate);
            onInpChanged('preferredAppointmentDate', moment(selectedDate).format('YYYY-MM-DD'))
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
        const errorMessage = Validateloanform(input);
        if (errorMessage.isValid == false) {
            setError(errorMessage);
        } else {
            let body = {
                serviceId: service_id,
                full_name: input.fullName,
                email: input.emailAddress,
                phone: input.phonenumber,
                mode: input.mode == 'Online' ? 'ONLINE' : 'OFFLINE',
                preferred_appointment_date: input.preferredAppointmentDate,
                preferred_appointment_time: input.preferredAppointmentTime,
                loan_amount: input.loanAmount,
                loan_purpose: input.loanPurpose,
                document: uploaddocarray,
                lang: SelectlanguageReducer

            };
            console.log('sign up-----', body);
            setloading(true);
            ApiDataService.PostTokenapi('booking/loan', JSON.stringify(body))
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
            <Header name={t('Loan')} />

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
                            name={t('Full Name')}
                            star={'*'}
                            Placeholder={t("Enter Full Name")}
                            value={input.fullName}
                            type="text"
                            sectext="false"
                            errorText={error.errors?.fullName}
                            onChangeText={text => {
                                onInpChanged('fullName', text)
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <TextField
                            name={t('Email Address')}
                            star={'*'}
                            Placeholder={t("Enter Email Address")}
                            value={input.emailAddress}
                            type="email"
                            sectext="false"
                            errorText={error.errors?.emailAddress}
                            onChangeText={text => {
                                onInpChanged('emailAddress', text)
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <TextField
                            name={t('Phone Number')}
                            star={'*'}
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
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#242A37' }}>
                            {t('Preferred Appointment Date')} <Text style={{ color: "#FF6A6A" }}>*</Text>
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: input.preferredAppointmentDate != '' ? '#9846D7' : '#B0B0B0',
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
                            {input.preferredAppointmentDate ? (
                                <Text
                                    style={{ fontSize: 16, fontWeight: '400', color: '#000000' }}>
                                    {input.preferredAppointmentDate}
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
                        error.errors?.preferredAppointmentDate ? (
                            <View>
                                <Text style={{
                                    marginTop: 5,
                                    marginLeft: 0,
                                    fontSize: 12,
                                    color: '#B00020',
                                    fontFamily: 'Poppins-Regular',
                                    marginBottom: 0
                                }}>{error.errors?.preferredAppointmentDate}</Text>
                            </View>
                        ) : null
                    }

                    <View style={{ marginTop: 15 }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', color: '#242A37' }}>
                            {t('Preferred Appointment Time')} <Text style={{ color: "#FF6A6A" }}>*</Text>
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: input.preferredAppointmentTime ? '#9846D7' : '#B0B0B0',
                            height: 48,
                            borderRadius: 8,
                            marginTop: 10,
                        }}
                        onPress={() => {
                            setshowTimePicker(true);
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: 12,
                            }}>
                            {input.preferredAppointmentTime ? (
                                <Text
                                    style={{ fontSize: 16, fontWeight: '400', color: '#5D5D5D' }}>
                                    {input.preferredAppointmentTime}
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

                    {
                        error.errors?.preferredAppointmentTime ? (
                            <View>
                                <Text style={{
                                    marginTop: 5,
                                    marginLeft: 0,
                                    fontSize: 12,
                                    color: '#B00020',
                                    fontFamily: 'Poppins-Regular',
                                    marginBottom: 0
                                }}>{error.errors?.preferredAppointmentTime}</Text>
                            </View>
                        ) : null
                    }
                    <View style={{ marginTop: 15 }}>
                        <TextField
                            name={t('Loan Amount')}
                            star={'*'}
                            Placeholder={t("Enter Loan Amount")}
                            value={input.loanAmount}
                            type="number"
                            sectext="false"
                            errorText={error.errors?.loanAmount}
                            onChangeText={text => {
                                onInpChanged('loanAmount', text)
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <TextField
                            name={t('Loan Purpose')}
                            star={'*'}
                            Placeholder={t("Enter Loan Purpose")}
                            value={input.loanPurpose}
                            type="text"
                            sectext="false"
                            errorText={error.errors?.loanPurpose}
                            onChangeText={text => {
                                onInpChanged('loanPurpose', text)
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
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10, paddingRight: 10, width: width - 40 }}>
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
    );
};
export default LoanFrom;
