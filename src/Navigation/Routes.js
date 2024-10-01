import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import Auth from './Auth';
import Onboarding from './Onboarding';
import Main from './Main';
import ApiDataService from '../services/Apiservice.service'
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const Routes = () => {

  const [islogin, setislogin] = useState('');

  useEffect(() => {
    setTimeout(() => {
      uselogin()
      SplashScreen.hide();

    }, 500);
  }, []);

  const callblockapi = () => {
    ApiDataService.GetTokenapi('user/info').then(response => {
      if (response.status == 200) {
        if (response.data.status == 1) {
          setislogin('0');
        } else {
          setislogin('1');
        }
      } else {
        setislogin('0');
      }
    }).catch(e => {
      setislogin('0');
      console.log('e--check-user-status------------', e);
    });
  }
  const uselogin = () => {
    AsyncStorage.getItem('isLogin', (err, ln) => {
      if (ln == '1') {
        callblockapi()
      } else {
        setislogin('0');
      }
    });
  };

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics} >
      <NavigationContainer>
        {islogin == '1' ? (
          <Main />
        ) : islogin == '0' ? (
          <Onboarding />
        ) : (
          <View></View>
        )}
      </NavigationContainer>

    </SafeAreaProvider>

  );
};
export default Routes;
