import React, { useState, useEffect } from 'react';
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
import { setselectlanguage } from '../../redux/index';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';

const FivePassportApplication = ({ navigation, route }) => {
const insets = useSafeArea();

    const { Validateformfive } = useFormValidation();
    const { t, i18n } = useTranslation();
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
        workname: "",
        profession: "",
        occupation: "",
        address: "",
        postalcode: "",
        country: "",
        phone: "",
        fax: "",
        email: "",
        educationlevel: "",

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
        const errorMessage = Validateformfive(input);
        if (errorMessage.isValid == false) {
            setError(errorMessage);
        } else {
            setloading(true);
            let body = {
                step: 5,
                bookingId: booking_id,
                name_of_work_or_study_center: input.workname,
                occupation: input.occupation,
                profession: input.profession,
                cw_address: input.address,
                cw_postal_code: input.postalcode,
                cw_province_state_region: input.province,
                cw_country: input.country,
                cw_phone: input.phone,
                cw_fax: input.fax,
                cw_email: input.email,
                education_level: input.educationlevel,
                lang:SelectlanguageReducer
            }
            console.log('body----------', body);

            ApiDataService.PostHeaderapi('passport/booking', body)
                .then(response => {
                    setloading(false);
                    console.log('response------formData----->', response);
                    if (response.status == 200) {
                        navigation.navigate('SixPassportApplication', { booking_id: booking_id })
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
                        <Text style={StylesGloble.font20700000000}>{t('Current Work or Study Data')}</Text>

                    </View>
                    <View style={{ marginTop: 15 }}>
                        <TextField
                            name={t('Name of Work/Study Center')}
							star={'*'}

                            Placeholder={t("Enter Name of Work/Study Center")}
                            value={input.workname}
                            type="text"
                            sectext="false"
                            errorText={error.errors?.workname}
                            onChangeText={text => {
                                onInpChanged('workname', text)
                            }}
                        />
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <TextField
                            name={t('Profession')}
							star={'*'}

                            Placeholder={t("Enter Profession")}
                            value={input.profession}
                            type="text"
                            sectext="false"
                            errorText={error.errors?.profession}
                            onChangeText={text => {
                                onInpChanged('profession', text)
                            }}
                        />
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <TextField
                            name={t('Occupation')}
							star={'*'}

                            Placeholder={t("Enter Occupation")}
                            value={input.occupation}
                            type="text"
                            sectext="false"
                            errorText={error.errors?.occupation}
                            onChangeText={text => {
                                onInpChanged('occupation', text)
                            }}
                        />

                    </View>


                    <View style={{ marginTop: 15 }}>
                        <TextField
                            name={t('Address (Street, Ave, Nr., Apartment, streets)')}
							star={'*'}

                            Placeholder={t("Enter Address")}
                            value={input.address}
                            type="text"
                            sectext="false"
                            errorText={error.errors?.address}
                            onChangeText={text => {
                                onInpChanged('address', text)
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <TextField
                            name={t('Postal Code')}
							star={'*'}

                            Placeholder={t("Enter Postal Code")}
                            value={input.postalcode}
                            type="phone"
                            sectext="false"
                            errorText={error.errors?.postalcode}
                            onChangeText={text => {
                                onInpChanged('postalcode', text)
                            }}
                            maxLength={6}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <TextField
                            name={t('Province – State – Region')}
							star={'*'}

                            Placeholder={t("Enter Province – State – Region")}
                            value={input.province}
                            type="text"
                            sectext="false"
                            errorText={error.errors?.province}
                            onChangeText={text => {
                                onInpChanged('province', text)
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <TextField
                            name={t('Country')}
							star={'*'}

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
                            name={t('Phone')}
							star={'*'}

                            Placeholder={t("Enter Phone")}
                            value={input.phone}
                            type="phone"
                            sectext="false"
                            errorText={error.errors?.phone}
                            onChangeText={text => {
                                onInpChanged('phone', text)
                            }}
                            maxLength={10}
                        />
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <TextField
                            name={t('Fax')}
							star={'*'}

                            Placeholder={t("Enter Fax")}
                            value={input.fax}
                            type="text"
                            sectext="false"
                            errorText={error.errors?.fax}
                            onChangeText={text => {
                                onInpChanged('fax', text)
                            }}
                        />
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <TextField
                            name={t('E-mail')}
							star={'*'}

                            Placeholder={t("Enter E-mail")}
                            value={input.email}
                            type="email"
                            sectext="false"
                            errorText={error.errors?.email}
                            onChangeText={text => {
                                onInpChanged('email', text)
                            }}
                        />
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <TextField
                            name={t('Education level')}
							star={'*'}
                            Placeholder={t("Enter Education level")}
                            value={input.educationlevel}
                            type="text"
                            sectext="false"
                            errorText={error.errors?.educationlevel}
                            onChangeText={text => {
                                onInpChanged('educationlevel', text)
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
export default FivePassportApplication
