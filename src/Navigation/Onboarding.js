import React from 'react';
import {} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Slidestart from '../screen/Slidestart';
import Auth from './Auth';
import Splashscreen from '../screen/Splashscreen';

const Stack = createNativeStackNavigator();

const Onboarding = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splashscreen" component={Splashscreen} />
      <Stack.Screen name="Slidestart" component={Slidestart} />
      <Stack.Screen name="Auth" component={Auth} />
    </Stack.Navigator>
  );
};
export default Onboarding;
