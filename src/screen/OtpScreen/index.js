import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Header from '../../helper/Header';
import OTPTextView from 'react-native-otp-textinput';
import Button from '../../helper/Button';
import Toast from 'react-native-simple-toast';
import Disablebutton from '../../helper/Disablebutton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingPage from '../../helper/LoadingPage';
import ApiserviceService from '../../services/Apiservice.service';
import { setProfileData, setselectlanguage } from '../../redux/index';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { useSafeArea } from 'react-native-safe-area-context';

const OtpScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const insets = useSafeArea();

  const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

  useEffect(() => {
    dispatch(setselectlanguage())
    i18n.changeLanguage(SelectlanguageReducer);
  }, [])
  const mobilenumber = route?.params?.mobilenumber;

  const otpInput = useRef(null);
  const [keyboardheight, setkeyboardheight] = useState('65%');
  const [otp, setotp] = useState(route?.params?.otp);

  const [inputval, setinputval] = useState('');
  const [btndisable, setbtndisable] = useState(false);
  const [loading, setloading] = useState(false);

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

  const checkvalidation = () => {
    console.log('input--------->', inputval.length);
    if (inputval.length < 3) {
      setbtndisable(false);
    } else {
      setbtndisable(true);
    }
  };
  const otpsubmit = () => {
    if (inputval.length < 3) {
      calltoastmessage('Please enter correct otp');
    } else {
      let body = {
        phone: mobilenumber,
        otp: inputval,
        lang: SelectlanguageReducer
      };
      setloading(true);
      ApiserviceService.Postapi('auth/verify-otp', JSON.stringify(body))
        .then(response => {
          setloading(false);
          AsyncStorage.setItem('UserToken', response.data.data.accessToken);
          if (response.data.data.is_user == true) {
            navigation.navigate('Main');
            AsyncStorage.setItem('isLogin', '1');
            calltoastmessage(response.data.data.message);
            AsyncStorage.setItem('UserToken', response.data.data.accessToken);
          } else {
            navigation.navigate('SignupScreen', { phonenumber: mobilenumber });
          }

        })
        .catch(e => {
          setloading(false);
          if (e.message == 'Request failed with status code 400') {
            if (otp !== inputval) {
              calltoastmessage('Please enter a valied otp.');
            }
          }

        });
    }
  };
  const resendotp = () => {
    let body = {
      phone: mobilenumber,
    };
    setloading(true);
    ApiserviceService.Postapi('auth/login', JSON.stringify(body))
      .then(response => {
        setloading(false);
        setotp(response.data.data.otp);
        calltoastmessage(response.data.message);
      })
      .catch(e => {
        console.log('e-----------', e);
        setloading(false);
      });
  };


  const calltoastmessage = (data) => {
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

      <View style={StylesGloble.whitescreen}>
        <Header />

        <View style={StylesGloble.marginscreen}>
          <View>
            <Text style={StylesGloble.font248009846D7}>Verification Code</Text>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              <Text
                style={{
                  ...StylesGloble.font14500g6D6D6D,
                  lineHeight: 20,
                  width: 250,
                  textAlign: 'center',
                }}>
                Enter the 4-digit code sent to you at {mobilenumber} otp is {otp}
              </Text>
            </View>
          </View>

          <OTPTextView
            ref={e => (otpInput.current = e)}
            inputCount={4}
            handleTextChange={text => {
              otpInput.current = text;
              setinputval(text);
              checkvalidation();
            }}
            containerStyle={{ padding: 25, marginTop: 20 }}
            textInputStyle={{
              borderBottomWidth: 1,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#5D5D5D',
              color: '#5D5D5D',
            }}
            autoFocus={true}
            tintColor="#5D5D5D"
            offTintColor="#B0B0B0"
            keyboardType="numeric"
          />

          <View style={{ marginTop: 0 }}>
            {btndisable ? (
              <Button label={'Continue'} onPress={() => otpsubmit()} />
            ) : (
              <Disablebutton label={'Continue'} />
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Text style={StylesGloble.font14400grey5D5D5D}>
              Didn’t received the code?
            </Text>
            <TouchableOpacity onPress={() => resendotp()}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: '#9846D7',
                  marginLeft: 5,
                }}>
                Resend OTP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>

  );
};

export default OtpScreen;
