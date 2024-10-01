import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    Keyboard,
} from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import TextField from '../../helper/TextField';
import Button from '../../helper/Button';
import LocationGrey from '../../assest/svg/LocationGrey.svg';
import UploadArrow from '../../assest/svg/UploadArrow.svg';
import ApiserviceService from '../../services/Apiservice.service';
import LoadingPage from '../../helper/LoadingPage';
import Toast from 'react-native-simple-toast';
import Uploadimage from '../../helper/Uploadimage';
import Girlupload from '../../assest/svg/Girlupload.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setProfileData, setselectlanguage } from '../../redux/index';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { useSafeArea } from 'react-native-safe-area-context';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Disablebutton from '../../helper/Disablebutton';

const SignupScreen = ({ navigation, route }) => {
	const { t, i18n } = useTranslation();
    const insets = useSafeArea();

    const dispatch = useDispatch();
	const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

	useEffect(() => {
		dispatch(setselectlanguage())
		i18n.changeLanguage(SelectlanguageReducer);
	}, [])
    const phonenumber = route?.params?.phonenumber;
    const [loading, setloading] = useState(false);
    const [image, setimage] = useState('');
    const [keyboardheight, setkeyboardheight] = useState('65%');
    const [uploadimage, setuploadimage] = useState(false);
    const [btndisable, setbtndisable] = useState(false);
    console.log(btndisable)
    const [inputemail, setInputemail] = useState({
        value: null,
        message: '',
        isValid: false,
    });

    const [inputname, setInputname] = useState({
        value: null,
        message: '',
        isValid: false,
    });
    const [inputnumber, setInputnumber] = useState({
        value: phonenumber,
        message: '',
        isValid: false,
    });
    const [inputLocation, setInputLocation] = useState({
        value: null,
        message: '',
        isValid: false,
    });
    console.log('check', inputLocation.value)
    const [images, setimages] = useState('');

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
                    message: 'Please enter email',
                }));
                setbtndisable(false);
            } else if (!isValidEmail(_in)) {
                setInputemail(prev => ({
                    ...prev,
                    isValid: true,
                    message: 'Please enter a valid Email ',
                }));
                setbtndisable(false);
            } else if (_in.length === 0) {
                setInputemail(prev => ({
                    ...prev,
                    isValid: true,
                    message: 'Please enter email',
                }));
                setbtndisable(false);
            } else {
                setInputemail(prev => ({ ...prev, isValid: false, message: '' }));
            }
        } catch (error) { }
        checkvalidation();
    };

    const validatename = _in => {
        try {
            setInputname(prev => ({ ...prev, value: _in }));
            if (!_in) {
                setInputname(prev => ({
                    ...prev,
                    isValid: true,
                    message: 'Please enter name',
                }));
                setbtndisable(false);
            } else if (_in.length === 0) {
                setInputname(prev => ({
                    ...prev,
                    isValid: true,
                    message: 'Please enter name',
                }));
                setbtndisable(false);
            } else {
                setInputname(prev => ({ ...prev, isValid: false, message: '' }));
            }
        } catch (error) { }
        checkvalidation();
    };
    const validatelocation = _in => {
        try {
            setInputLocation(prev => ({ ...prev, value: _in }));
            if (!_in) {
                setInputLocation(prev => ({
                    ...prev,
                    isValid: true,
                    message: 'Please enter location',
                }));
                setbtndisable(false);
            } else if (_in.length === 0) {
                setInputLocation(prev => ({
                    ...prev,
                    isValid: true,
                    message: 'Please enter location',
                }));
                setbtndisable(false);
            } else {
                setInputLocation(prev => ({ ...prev, isValid: false, message: '' }));
            }
        } catch (error) { }
        checkvalidation();
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
                    message: 'Please enter number',
                }));
                setbtndisable(false);
            } else if (!isValidPhoneNumber(_in)) {
                setInputnumber(prev => ({
                    ...prev,
                    isValid: true,
                    message: 'Please enter correct phone number',
                }));
                setbtndisable(false);
            } else if (_in.length === 0) {
                setInputnumber(prev => ({
                    ...prev,
                    isValid: true,
                    message: 'Please enter number',
                }));
                setbtndisable(false);
            } else {
                setInputnumber(prev => ({ ...prev, isValid: false, message: '' }));
            }
        } catch (error) { }
        checkvalidation();
    };
    const checkvalidation = () => {
        if (
            inputname.value != null &&
            inputnumber.value != null &&
            inputemail.value != null &&
            inputLocation.value != null
        ) {
            setbtndisable(true);
        } else {
            setbtndisable(false);
        }
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setkeyboardheight('45%');
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setkeyboardheight('65%');
            },
        );
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const signupsubmit = () => {

        let body = {
            full_name: inputname.value,
            email: inputemail.value,
            phone: phonenumber,
            role: 'USER',
            address: inputLocation.value,
            latitude: '72.4565',
            longitude: '22.6458',
            lang:SelectlanguageReducer
        };
        
        setloading(true);
        ApiserviceService.PostTokenapi('auth/create', JSON.stringify(body))
            .then(response => {
                if (response.status == 200) {
                    setloading(false);
                    console.log('response------auth----->', response);
                    AsyncStorage.setItem('isLogin', '1');

                    navigation.navigate('SelectLanguage');
                    calltoastmessage(response.data.message);
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
<ScrollView>
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
                <View style={StylesGloble.marginscreen}>
                    <View style={{ marginTop: 25 }}>
                        <Text style={StylesGloble.font248009846D7}>Create Account</Text>
                    </View>
                    <View style={{ marginBottom: 25 }}>
                        <Text
                            style={{
                                ...StylesGloble.font14500g6D6D6D,
                                textAlign: 'center',
                                lineHeight: 20,
                                top: 10,
                            }}>
                            Kindly input the required details to complete the registration
                            process.
                        </Text>
                    </View>

                    <View style={{}}>
                        <TextField
                            name={'Name'}
                            value={inputname.value}
                            Placeholder="Enter name"
                            type="text"
                            sectext="false"
                            errorText={inputname.message}
                            onChangeText={text => {
                                validatename(text);
                            }}
                        />
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <TextField
                            name={'Email Address'}
                            value={inputemail.value}
                            Placeholder="Enter number"
                            type="email"
                            sectext="false"
                            errorText={inputemail.message}
                            onChangeText={text => {
                                validateemail(text);
                            }}
                        />
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <TextField
                            name={'Phone Number'}
                            value={phonenumber}
                            Placeholder="Enter number"
                            type={phonenumber}
                            sectext="false"
                            errorText={inputnumber.message}
                            onChangeText={text => {
                                validatenumber(text);
                            }}
                            editable={false}
                            maxLength={10}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <TextField
                            name={'Address'}
                            value={inputLocation.value}
                            Placeholder="Enter location"
                            type={'text'}
                            sectext="false"
                            errorText={inputLocation.message}
                            onChangeText={text => {
                                validatelocation(text);
                            }}
                        />
                    </View>

                    {/* <View style={{marginTop: 20}}>
            <Text style={{fontSize: 14, fontWeight: '500', color: '#242A37'}}>
              Address
            </Text>
          </View>

          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: '#5D5D5D',
              height: 48,
              borderRadius: 8,
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 5,
            }}>
            <TextInput
              // style={{fontSize: 16, fontWeight: '400', color: '#5D5D5D'}}
              placeholder=" XYZ Main Street, City, State"
            />

            <LocationGrey style={{right: 10, top: 10}} />
          </TouchableOpacity> */}

                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <Text style={StylesGloble.font12500Black000000}>
                            By continuing, you agree to our
                        </Text>

                        <Text
                            style={{
                                ...StylesGloble.font12500Black000000,
                                color: '#9846D7',
                                left: 5,
                                textDecorationLine: 'underline',
                            }}>
                            Terms of Service
                        </Text>
                    </View>

                    <View style={{ marginTop: '10%' }}>
                        {btndisable == true ? (
                            <Button label={'Continue'} onPress={() => signupsubmit()} />
                        ) : (
                            <Disablebutton label={'Continue'} />
                        )}
                    </View>
                </View>

                {uploadimage && (
                    <Uploadimage
                        closeimagepopup={closeimagepopup}
                        width={wp('100%')}
                        height={400}
                        cropperCircleOverlay={true}
                    />
                )}
            </View>
        </ScrollView>
        </View>
        
    );
};

export default SignupScreen;
