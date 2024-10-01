import React, {useState} from 'react';
import {Text} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { AppIntroScreen,OnboardScreen,Otp,LoginWithPassword,ForgorPassword,ResetPassword,SignUpScreen } from '../screen/index';
import Login from '../screen/Login';
import OtpScreen from '../screen/OtpScreen';
import SignupScreen from '../screen/SignupScreen';
import Main from './Main';
import SelectLanguage from '../screen/SelectLanguage'
const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="SelectLanguage" component={SelectLanguage} />

      <Stack.Screen name="Main" component={Main} />
    
    </Stack.Navigator>
  );
};

export default Auth;
