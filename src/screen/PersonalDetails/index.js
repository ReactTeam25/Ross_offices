import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    ScrollView,
    ImageBackground,
} from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Header from '../../helper/Header';
import Imagepath from '../../constant/Imagepath';
import TextField from '../../helper/TextField';
import Location from '../../assest/svg/Location.svg';
import Button from '../../helper/Button';
import Girlblack from '../../assest/svg/Girlblack.svg';
import UploadArrow from '../../assest/svg/UploadArrow.svg';
import LocationGrey from '../../assest/svg/LocationGrey.svg';
import ApiDataService from '../../services/Apiservice.service';
import { setProfileData,setselectlanguage } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';
import Uploadimage from '../../helper/Uploadimage';
import UploadA from '../../assest/svg/UploadA.svg';
import LoadingPage from '../../helper/LoadingPage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSafeArea } from 'react-native-safe-area-context';

import { useTranslation } from 'react-i18next';
import '../../language/i18';
const PersonalDetails = ({ navigation }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const insets = useSafeArea();

    const Profilestate = useSelector(state => state.ProfileReducer.data);
    const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);
    
    useEffect(()=>{
        dispatch(setselectlanguage())
        i18n.changeLanguage(SelectlanguageReducer);
    },[])

    const profileData = Profilestate;
    const [image, setimage] = useState(profileData?.profile_img);
    const [uploadimage, setuploadimage] = useState(false);
    const [sentimage, setsentimage] = useState('');
    console.log('profileData--------------->', profileData);
    const [fcmtoken,setfcmtoken] = useState(null)

  useEffect(() => {
      AsyncStorage.getItem('fcmtoken', (err, ln) => {
          console.log('fcmtoken---------AsyncStorage------fcmtoken------', ln);
          setfcmtoken(ln)
      })
  }, [])
    const [inputemail, setInputemail] = useState({
        value: profileData?.email,
        message: '',
        isValid: false,
    });

    const [inputname, setInputname] = useState({
        value: profileData?.full_name,
        message: '',
        isValid: false,
    });

    const [inputnumber, setInputnumber] = useState({
        value: profileData?.phone,
        message: '',
        isValid: false,
    });
    const [inputLocation, setInputLocation] = useState({
        value: profileData?.address,
        message: '',
        isValid: false,
    });

    useEffect(() => {
        dispatch(setProfileData(SelectlanguageReducer));

        setInputemail(prev => ({ ...prev, value: profileData?.email }));
        setInputname(prev => ({ ...prev, value: profileData?.full_name }));
        setInputnumber(prev => ({ ...prev, value: profileData?.phone }));
        setInputLocation(prev => ({ ...prev, value: profileData?.address }));
    }, []);

    const emailReg =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = email => {
        return emailReg.test(String(email).toLowerCase());
    };
    const validateemail = _in => {
        try {
            setInputemail(prev => ({ ...prev, value: _in }));
            if (!_in) {
                setInputemail(prev => ({
                    ...prev,
                    isValid: true,
                    message: t('Please enter email'),
                }));
            } else if (!isValidEmail(_in)) {
                setInputemail(prev => ({
                    ...prev,
                    isValid: true,
                    message: t('Please enter a valid Email '),
                }));
            } else if (_in.length === 0) {
                setInputemail(prev => ({
                    ...prev,
                    isValid: true,
                    message: t('Please enter email'),
                }));
            } else {
                setInputemail(prev => ({ ...prev, isValid: false, message: '' }));
            }
        } catch (error) { }
    };

    const validatename = _in => {
        try {
            setInputname(prev => ({ ...prev, value: _in }));
            if (!_in) {
                setInputname(prev => ({
                    ...prev,
                    isValid: true,
                    message: t('Please enter name'),
                }));
            } else if (_in.length === 0) {
                setInputname(prev => ({
                    ...prev,
                    isValid: true,
                    message: t('Please enter name'),
                }));
            } else {
                setInputname(prev => ({ ...prev, isValid: false, message: '' }));
            }
        } catch (error) { }
    };

    const isValidPhoneNumber = phone => {
        return /^\d{10}$/.test(phone);
    };
    const validatenumber = _in => {
        try {
            setInputnumber(prev => ({ ...prev, value: _in }));
            if (!_in) {
                setInputnumber(prev => ({
                    ...prev,
                    isValid: true,
                    message: t('Please enter number'),
                }));
            } else if (!isValidPhoneNumber(_in)) {
                setInputnumber(prev => ({
                    ...prev,
                    isValid: true,
                    message: t('Please enter correct phone number'),
                }));
            } else if (_in.length === 0) {
                setInputnumber(prev => ({
                    ...prev,
                    isValid: true,
                    message: t('Please enter number'),
                }));
            } else {
                setInputnumber(prev => ({ ...prev, isValid: false, message: '' }));
            }
        } catch (error) { }
    };

    const validatelocation = _in => {
        try {
            setInputLocation(prev => ({ ...prev, value: _in }));
            if (!_in) {
                setInputLocation(prev => ({
                    ...prev,
                    isValid: true,
                    message: t('Please enter location'),
                }));
                setbtndisable(false);
            } else if (_in.length === 0) {
                setInputLocation(prev => ({
                    ...prev,
                    isValid: true,
                    message: t('Please enter location'),
                }));
                setbtndisable(false);
            } else {
                setInputLocation(prev => ({ ...prev, isValid: false, message: '' }));
            }
        } catch (error) { }
        // checkvalidation();
    };

    const closeimagepopup = (type, data) => {
        console.log('imasedata------', data);
        setuploadimage(false);
        if (type == 2) {
            setimage(data.path);

            setsentimage(data.path);
            setuploadimage(false);
        }
    };
    const [loading, setloading] = useState(false);

    const submitdata = () => {
        setloading(true)
        let formData = new FormData();

        formData.append('profile_img', {
            name: 'camera-picture.png',
            type: 'image/jpeg',
            uri: image,
        });
        formData.append('full_name', inputname.value);
        formData.append('email', inputemail.value);
        formData.append('phone', inputnumber.value);
        formData.append('address', inputLocation.value);
        formData.append('device_token', fcmtoken);
        formData.append('lang', SelectlanguageReducer);

        console.log('update formdata-->', formData);

        ApiDataService.putimageapi('user', formData)
            .then(response => {
                setloading(false)
                console.log('response----------',response.data);
                dispatch(setProfileData(SelectlanguageReducer));
                calltoastmessage(response.data.message);
                navigation.navigate('Profile');
            })
            .catch(e => {
                setloading(false)

                console.log('e--------', e);
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
<View style={{ ...StylesGloble.container, backgroundColor: '#FFFFFF' }}>
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
            <ScrollView style={{ marginBottom: '10%' }}>
                <Header name={t('Personal Details')} />
                <View style={{ ...StylesGloble.marginscreen }}>
                    <TouchableOpacity
                        style={{ alignSelf: 'center' }}
                        onPress={() => setuploadimage(true)}>
                        <ImageBackground
                            source={{ uri: image }}
                            style={{
                                height: 90,
                                width: 90,
                                backgroundColor: '#eeeeee',
                                borderRadius: 90,
                            }}
                            imageStyle={{ borderRadius: 90 }}>
                            <UploadA
                                style={{ alignSelf: 'center', alignItems: 'center', top: 22 }}
                            />
                        </ImageBackground>
                    </TouchableOpacity>

                    <View style={{ marginTop: 0 }}>
                        <TextField
                            Placeholder={t("Enter name")}
                            name={t('Name')}
                            value={inputname.value}
                            type="text"
                            sectext="false"
                            errorText={inputname.message}
                            onChangeText={text => {
                                validatename(text);
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <TextField
                            Placeholder={t("Enter email address")}
                            name={t('Email Address')}
                            value={inputemail.value}
                            type="text"
                            sectext="false"
                            errorText={inputemail.message}
                            onChangeText={text => validateemail(text)}
                        />
                    </View>

                    <View style={{ marginTop: 15 }}>
                        <TextField
                            Placeholder={t("Enter phone number")}
                            name={t('Phone Number')}
                            value={inputnumber.value}
                            type="number"
                            sectext="false"
                            errorText={inputnumber.message}
                            onChangeText={text => validatenumber(text)}
                            maxLength={10}
                            editable={false}
                        />
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <TextField
                            name={t('Address')}
                            value={inputLocation.value}
                            Placeholder={t("Enter location")}
                            type={'text'}
                            sectext="false"
                            errorText={inputLocation.message}
                            onChangeText={text => {
                                validatelocation(text);
                            }}
                        />
                    </View>

                    <View style={{ marginTop: '25%' }}>
                        <Button label={t('Save')} onPress={() => submitdata()} />
                    </View>
                </View>
            </ScrollView>
            {uploadimage && (
                <Uploadimage
                    closeimagepopup={closeimagepopup}
                    width={wp('100%')}
                    height={400}
                    cropperCircleOverlay={true}
                />
            )}
        </View>
        </View>
        
    );
};

export default PersonalDetails;
