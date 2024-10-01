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
import Radiobutton from '../../assest/svg/Radiobutton.svg';
import Docment from '../../assest/svg/Docment.svg'
import Deletedoc from '../../assest/svg/Deletedoc.svg'
import Addcircle from '../../assest/svg/Addcircle.svg';
import useFormValidation from '../../services/Validation';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { useDispatch, useSelector } from 'react-redux';
import { setselectlanguage } from '../../redux/index';
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
const gender = [
    {
        id: 1,
        name: "Male",
        namees: "Masculino"
    },
    {
        id: 2,
        name: "Female",
        namees: "Femenina"
    }
]

const meritalstatus = [
    {
        id: 1,
        name: "Single",
        namees: "Soltero"
    },
    {
        id: 2,
        name: "Married",
        namees: "Casado"

    },
    {
        id: 3,
        name: "Divorced",
        namees: "Divorciado"

    },
    {
        id: 4,
        name: "Widowed",
        namees: "Viudo"

    }
]
const add = [
    {
        id: 1,
        name: "Yes",
        namees: "Sí"

    },
    {
        id: 2,
        name: "No",
        namees: "No"

    },
]

const Immigrationform = ({ navigation, route }) => {
const insets = useSafeArea();

    const androidVersion = DeviceInfo.getSystemVersion()
    const service_id = route?.params?.service_id
    const { Validateimmigrationform } = useFormValidation();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

    useEffect(() => {
        dispatch(setselectlanguage())
        i18n.changeLanguage(SelectlanguageReducer);
    }, [])

    const [showcolor, setshowcolor] = useState(0);
    const [loading, setloading] = useState(false);
    const [btndisable, setbtndisable] = useState(false);
    const [selectmodename, setselectmodename] = useState('')
    const [selectgendername, setselectgendername] = useState('')
    const [selectmerriedname, setselectmerriedname] = useState('')
    const [selectaddname, setselectaddname] = useState('')

    const [showDOB, setshowDOB] = useState(false);
    const [dob, setDOB] = useState(new Date());
    const [error, setError] = useState({ isValid: false });
    const [input, setinput] = useState({
        mode: '',
        firstName: '',
        middleName: '',
        lastname: '',
        dateOfBirth: '',
        birthcity: '',
        country: '',
        nationality: '',
        alienRegistrationNumber: '',
        socialSecurityNumber: '',
        gender: '',
        maritalStatus: '',
        mailingAddress: '',
        streetandNumber: '',
        apartmentorUnit: '',
        state: '',
        zipCode: '',
        city: '',
        addreesslect: '',
        currntmailingAddress: '',
        currntstreetandNumber: '',
        currntapartmentorUnit: '',
        currntstate: '',
        currntzipCode: '',
        currntcity: '',
    })

    const selectmodefunc = (name) => {
        setselectmodename(name)
        onInpChanged('mode', name)

    }
    const selectgendernamefunc = (name) => {
        setselectgendername(name)
        onInpChanged('gender', name)
    }

    const selectmerriedfunc = (name) => {
        setselectmerriedname(name)
        onInpChanged('maritalStatus', name)

    }
    const selectaddfunc = (name) => {
        setselectaddname(name)
        onInpChanged('addreesslect', name)

    }
    const [uploaddocarray, setuploaddocarray] = useState([])


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
    const remove_doc = (id, name) => {
        if (uploaddocarray != null && uploaddocarray.length > 0) {
            const newImageArray = uploaddocarray.filter(item => item.uri !== id);
            setuploaddocarray(newImageArray);
        }
    }

    const handleDOBchange = (event, selectedDate) => {
        setshowDOB(false);
        if (selectedDate) {
            setDOB(selectedDate);
            onInpChanged('dateOfBirth', moment(selectedDate).format('YYYY-MM-DD'))
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
        const errorMessage = Validateimmigrationform(input);
        if (errorMessage.isValid == false) {
            setError(errorMessage);
        } else {
            let formData = new FormData();
            formData.append('serviceId',service_id);
            formData.append('first_name',input.firstName);
            formData.append('booking_type',"IMMIGRATION");
            formData.append('last_name',input.lastname);
            formData.append('middle_name',input.middleName);
            formData.append('date_of_birth',input.dateOfBirth);
            formData.append('mode',input.mode === 'Online' ? 'ONLINE' : 'OFFLINE');
            formData.append('birth_city',input.birthcity);
            formData.append('country',input.country);
            formData.append('nationality',input.nationality);
            formData.append('alien_registration',input.alienRegistrationNumber);
            formData.append('sex',input.gender);
            formData.append('marital_status',input.maritalStatus);
            formData.append('permanent_mailing_address',input.mailingAddress);
            formData.append('permanent_street_number',input.streetandNumber);
            formData.append('permanent_apartment',input.apartmentorUnit);
            formData.append('permanent_city',input.city);
            formData.append('permanent_state',input.state);
            formData.append('permanent_zip_code',input.zipCode);
            formData.append('current_mailing_address',input.addreesslect === 'Yes' ? input.mailingAddress : input.currntmailingAddress);
            formData.append('current_street_number',input.addreesslect === 'Yes' ? input.streetandNumber : input.currntstreetandNumber);
            formData.append('current_apartment',input.addreesslect === 'Yes' ? input.apartmentorUnit : input.currntapartmentorUnit);
            formData.append('current_city',input.addreesslect === 'Yes' ? input.city : input.currntcity);
            formData.append('current_state',input.addreesslect === 'Yes' ? input.state : input.currntstate);
            formData.append('current_zip_code',input.addreesslect === 'Yes' ? input.zipCode : input.currntzipCode);

            formData.append('lang',SelectlanguageReducer);
            for (let key in uploaddocarray) {
                formData.append('documents', uploaddocarray[key]);
            }
            console.log('newbody-----', formData);
            setloading(true);
            ApiDataService.PostHeaderapi('booking/immigration',formData)
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
            <Header name={t('Immigration')} />

            <ScrollView style={{ marginBottom: '10%' }}>
                <View style={StylesGloble.marginscreen}>

                    <View style={{ marginTop: 10 }}>
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

                    <View style={{ marginTop: 10 }}>
                        <TextField
                            star={'*'}
                            name={t('First Name')}
                            Placeholder={t("Enter name")}
                            value={input.firstName}
                            type="text"
                            sectext="false"
                            errorText={error.errors?.firstName}
                            onChangeText={text => {
                                onInpChanged('firstName', text)
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <TextField
                            star={'*'}
                            name={t('Middle Name')}
                            Placeholder={t("Enter name")}
                            value={input.middleName}
                            type="text"
                            sectext="false"
                            errorText={error.errors?.middleName}
                            onChangeText={text => {
                                onInpChanged('middleName', text)
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <TextField
                            star={'*'}
                            name={t('Last Name')}
                            Placeholder={t("Enter name")}
                            value={input.lastname}
                            type="text"
                            sectext="false"
                            errorText={error.errors?.lastname}
                            onChangeText={text => {
                                onInpChanged('lastname', text)
                            }}
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
                            borderColor: input.dateOfBirth ? '#9846D7' : '#B0B0B0',
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
                            {input.dateOfBirth ? (
                                <Text
                                    style={{ fontSize: 16, fontWeight: '400', color: '#000000' }}>
                                    {input.dateOfBirth}
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

                    {
                        error.errors?.dateOfBirth ? (
                            <View>
                                <Text style={{
                                    marginTop: 2,
                                    marginLeft: 0,
                                    fontSize: 12,
                                    color: '#B00020',
                                    fontFamily: 'Poppins-Regular',
                                    marginBottom: 10
                                }}>{error.errors?.dateOfBirth}</Text>
                            </View>
                        ) : null
                    }
                    <View style={{ marginTop: 15 }}>
                        <TextField
                            star={'*'}

                            name={t('Place of birth')}
                            Placeholder={t("Enter Place of birth")}
                            value={input.birthcity}
                            type="text"
                            sectext="false"
                            errorText={error.errors?.birthcity}
                            onChangeText={text => {
                                onInpChanged('birthcity', text)
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <TextField
                            star={'*'}

                            name={t('Country')}
                            Placeholder={t("Enter Country")}
                            value={input.country}
                            type="text"
                            sectext="false"
                            errorText={error.errors?.country}
                            onChangeText={text => {
                                onInpChanged('country', text)
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <TextField
                            star={'*'}

                            name={t('Nationality')}
                            Placeholder={t("Enter Nationality")}
                            value={input.nationality}
                            type="text"
                            sectext="false"
                            errorText={error.errors?.nationality}
                            onChangeText={text => {
                                onInpChanged('nationality', text)
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <TextField
                            // star={'*'}
                            name={t('Alien Registration Number')}
                            Placeholder={t("Enter Alien Registration Number")}
                            value={input.alienRegistrationNumber}
                            type="text"
                            sectext="false"
                            errorText={error.errors?.alienRegistrationNumber}
                            onChangeText={text => {
                                onInpChanged('alienRegistrationNumber', text)
                            }}
                        />
                    </View>
                    {/* <View style={{ marginTop: 15 }}>
                        <TextField
                            name={t('Social Security Number (SSN)')}
                            Placeholder={t("Enter Social Security Number (SSN)")}
                            value={input.alienRegistrationNumber}
                            type="text"
                            sectext="false"
                            errorText={error.errors?.alienRegistrationNumber}
                            onChangeText={text => {
                                onInpChanged('alienRegistrationNumber', text)
                            }}
                        />
                    </View> */}
                    <View style={{ marginTop: 15 }}>
                        <View>
                            <Text style={{ fontSize: 14, fontWeight: "500", color: "#242A37" }}>
                                {t('Sex')} <Text style={{ color: "#FF6A6A" }}>*</Text>
                            </Text>
                        </View>
                        <View>
                            <FlatList
                                style={{}}
                                data={gender}
                                numColumns={2}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={{ marginTop: 10, width: '40%' }} onPress={() => selectgendernamefunc(item.name)}>
                                        <View style={{ flexDirection: "row" }}>
                                            <View>
                                                {
                                                    selectgendername == item.name ? (
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
                            error.errors?.gender ? (
                                <View>
                                    <Text style={{
                                        marginTop: 10,
                                        marginLeft: 0,
                                        fontSize: 12,
                                        color: '#B00020',
                                        fontFamily: 'Poppins-Regular',
                                        marginBottom: 0
                                    }}>{error.errors?.gender}</Text>
                                </View>
                            ) : null
                        }

                    </View>
                    <View style={{ marginTop: 15 }}>
                        <View>
                            <Text style={{ fontSize: 14, fontWeight: "500", color: "#242A37" }}>
                                {t('Marital Status')} <Text style={{ color: "#FF6A6A" }}>*</Text>
                            </Text>
                        </View>
                        <View>
                            <FlatList
                                data={meritalstatus}
                                numColumns={3}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={{ marginTop: 10, width: '30%' }} onPress={() => selectmerriedfunc(item.name)}>
                                        <View style={{ flexDirection: "row" }}>
                                            <View>
                                                {
                                                    selectmerriedname == item.name ? (
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
                            error.errors?.maritalStatus ? (
                                <View>
                                    <Text style={{
                                        marginTop: 10,
                                        marginLeft: 0,
                                        fontSize: 12,
                                        color: '#B00020',
                                        fontFamily: 'Poppins-Regular',
                                        marginBottom: 0
                                    }}>{error.errors?.maritalStatus}</Text>
                                </View>
                            ) : null
                        }
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: "500", color: "#242A37" }}>
                            {t('Current Address')}
                        </Text>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <TextField
                            name={t('Mailing Address')}
                            star={'*'}

                            Placeholder={t("Enter Mailing Address")}
                            value={input.currntmailingAddress}
                            type="text"
                            sectext="false"
                            errorText={error.errors?.currntmailingAddress}
                            onChangeText={text => {
                                onInpChanged('currntmailingAddress', text)
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <TextField
                            name={t('Street and Number')}
                            star={'*'}

                            Placeholder={t("Enter Street and Number")}
                            value={input.currntstreetandNumber}
                            type="text"
                            sectext="false"
                            errorText={error.errors?.currntstreetandNumber}
                            onChangeText={text => {
                                onInpChanged('currntstreetandNumber', text)
                            }}
                        />
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <TextField
                            name={t('Apartment or Unit')}
                            star={'*'}

                            Placeholder={t("Enter Apartment or Unit")}
                            value={input.currntapartmentorUnit}
                            type="text"
                            sectext="false"
                            errorText={error.errors?.currntapartmentorUnit}
                            onChangeText={text => {
                                onInpChanged('currntapartmentorUnit', text)
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <TextField
                            name={t('City')}
                            star={'*'}

                            Placeholder={t("Enter City")}
                            value={input.currntcity}
                            type="text"
                            sectext="false"
                            errorText={error.errors?.currntcity}
                            onChangeText={text => {
                                onInpChanged('currntcity', text)
                            }}
                        />
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <TextField
                            name={t('State')}
                            star={'*'}

                            Placeholder={t("Enter State")}
                            value={input.currntstate}
                            type="text"
                            sectext="false"
                            errorText={error.errors?.currntstate}
                            onChangeText={text => {
                                onInpChanged('currntstate', text)
                            }}
                        />
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <TextField
                            name={t('Zip Code')}
                            star={'*'}

                            Placeholder={t("Enter Zip Code")}
                            value={input.currntzipCode}
                            type="number"
                            sectext="false"
                            errorText={error.errors?.currntzipCode}
                            onChangeText={text => {
                                onInpChanged('currntzipCode', text)
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <View>
                            <Text style={{ fontSize: 14, fontWeight: "500", color: "#242A37" }}>
                                {t('Current Address same as the permanent address')} <Text style={{ color: "#FF6A6A" }}>*</Text>
                            </Text>
                        </View>
                        <View>
                            <FlatList
                                data={add}
                                numColumns={2}
                                renderItem={({ item }) => (
                                    <TouchableOpacity style={{ marginTop: 10, width: '30%' }} onPress={() => selectaddfunc(item.name)}>
                                        <View style={{ flexDirection: "row" }}>
                                            <View>
                                                {
                                                    selectaddname == item.name ? (
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
                            error.errors?.addreesslect ? (
                                <View>
                                    <Text style={{
                                        marginTop: 10,
                                        marginLeft: 0,
                                        fontSize: 12,
                                        color: '#B00020',
                                        fontFamily: 'Poppins-Regular',
                                        marginBottom: 10
                                    }}>{error.errors?.addreesslect}</Text>
                                </View>
                            ) : null
                        }
                    </View>
                    {
                        input.addreesslect == 'No' ? (
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontSize: 16, fontWeight: "500", color: "#242A37" }}>
                                    {t('Permanent Address')}
                                </Text>
                                <View style={{ marginTop: 15 }}>
                                    <TextField
                                        name={t('Mailing Address')}
                                        star={'*'}

                                        Placeholder={t("Enter Mailing Address")}
                                        value={input.mailingAddress}
                                        type="text"
                                        sectext="false"
                                        errorText={error.errors?.mailingAddress}
                                        onChangeText={text => {
                                            onInpChanged('mailingAddress', text)
                                        }}
                                    />
                                </View>
                                <View style={{ marginTop: 15 }}>
                                    <TextField
                                        name={t('Street and Number')}
                                        star={'*'}

                                        Placeholder={t("Enter Street and Number")}
                                        value={input.streetandNumber}
                                        type="text"
                                        sectext="false"
                                        errorText={error.errors?.streetandNumber}
                                        onChangeText={text => {
                                            onInpChanged('streetandNumber', text)
                                        }}
                                    />
                                </View>

                                <View style={{ marginTop: 15 }}>
                                    <TextField
                                        name={t('Apartment or Unit')}
                                        star={'*'}

                                        Placeholder={t("Enter Apartment or Unit")}
                                        value={input.apartmentorUnit}
                                        type="text"
                                        sectext="false"
                                        errorText={error.errors?.apartmentorUnit}
                                        onChangeText={text => {
                                            onInpChanged('apartmentorUnit', text)
                                        }}
                                    />
                                </View>
                                <View style={{ marginTop: 15 }}>
                                    <TextField
                                        name={t('City')}
                                        star={'*'}

                                        Placeholder={t("Enter City")}
                                        value={input.city}
                                        type="text"
                                        sectext="false"
                                        errorText={error.errors?.city}
                                        onChangeText={text => {
                                            onInpChanged('city', text)
                                        }}
                                    />
                                </View>

                                <View style={{ marginTop: 15 }}>
                                    <TextField
                                        name={t('State')}
                                        star={'*'}

                                        Placeholder={t("Enter State")}
                                        value={input.state}
                                        type="text"
                                        sectext="false"
                                        errorText={error.errors?.state}
                                        onChangeText={text => {
                                            onInpChanged('state', text)
                                        }}
                                    />
                                </View>

                                <View style={{ marginTop: 15 }}>
                                    <TextField
                                        name={t('Zip Code')}
                                        star={'*'}
                                        Placeholder={t("Enter Zip Code")}
                                        value={input.zipCode}
                                        type="number"
                                        sectext="false"
                                        errorText={error.errors?.zipCode}
                                        onChangeText={text => {
                                            onInpChanged('zipCode', text)
                                        }}
                                    />
                                </View>

                            </View>
                        ) : null
                    }
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
        </View>
        
    );
};
export default Immigrationform;
