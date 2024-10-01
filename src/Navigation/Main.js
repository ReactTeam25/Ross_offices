import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Auth from './Auth';
import BottomTab from './BottomTab';
import Home from '../screen/Home';
import PersonalDetails from '../screen/PersonalDetails';
import PrivacyPolicy from '../screen/PrivacyPolicy';
import HelpandSupport from '../screen/HelpandSupport';
import Residencyapplications from '../screen/Residencyapplications';
import TravelBooking from '../screen/TravelBooking';
import OnlineService from '../screen/OnlineService';
import ChatScreen from '../screen/ChatScreen';
import PassportApplication from '../screen/PassportApplication';
import TwoPassportApplication from '../screen/TwoPassportApplication';
import ThreePassportApplication from '../screen/ThreePassportApplication';
import FourPassportApplication from '../screen/FourPassportApplication';
import FivePassportApplication from '../screen/FivePassportApplication';
import SixPassportApplication from '../screen/SixPassportApplication';
import SevenPassportApplication from '../screen/SevenPassportApplication';
import AttPassportApplication from '../screen/AttPassportApplication';
import Successfull from '../screen/Successfull';
import SelectLanguage from '../screen/SelectLanguage'
import TravelHealthInfo from '../screen/TravelHealthInfo'
import Immigrationform from '../screen/Immigrationform'
import TaxForm from '../screen/TaxForm'
import LoanFrom from '../screen/LoanFrom'
import TravelDocument from '../screen/TravelDocument'
import GetVaccinationRecords from '../screen/GetVaccinationRecords'
import GetTravelHistory from '../screen/GetTravelHistory'
import GetInsuranceInfo from '../screen/GetInsuranceInfo'
import AddVaccineRecord from '../screen/AddVaccineRecord'
import AddTravelHistory from '../screen/AddTravelHistory'
import AddInsuranceInfo from '../screen/AddInsuranceInfo'
import EditVaccineRecord from '../screen/EditVaccineRecord'
import EditTravelHistory from '../screen/EditTravelHistory'
import EditInsuranceInfo from '../screen/EditInsuranceInfo'
import BookingchatScreen from '../screen/BookingchatScreen'
import Paymentscreen from '../screen/Paymentscreen'

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Successfull" component={Successfull} />
        <Stack.Screen name="AttPassportApplication" component={AttPassportApplication} />
        <Stack.Screen name="SelectLanguage" component={SelectLanguage} />
        <Stack.Screen name="TravelHealthInfo" component={TravelHealthInfo} />
        <Stack.Screen name="Immigrationform" component={Immigrationform} />
        <Stack.Screen name="TaxForm" component={TaxForm} />
        <Stack.Screen name="LoanFrom" component={LoanFrom} />
        <Stack.Screen name="TravelDocument" component={TravelDocument} />
        <Stack.Screen name="GetVaccinationRecords" component={GetVaccinationRecords} />
        <Stack.Screen name="AddTravelHistory" component={AddTravelHistory} />
        <Stack.Screen name="BookingchatScreen" component={BookingchatScreen} />
        <Stack.Screen name="Paymentscreen" component={Paymentscreen} />



        <Stack.Screen name="GetTravelHistory" component={GetTravelHistory} />
        <Stack.Screen name="GetInsuranceInfo" component={GetInsuranceInfo} />
        <Stack.Screen name="AddVaccineRecord" component={AddVaccineRecord} />
        <Stack.Screen name="AddInsuranceInfo" component={AddInsuranceInfo} />
        <Stack.Screen name="EditVaccineRecord" component={EditVaccineRecord} />
        <Stack.Screen name="EditTravelHistory" component={EditTravelHistory} />
        <Stack.Screen name="EditInsuranceInfo" component={EditInsuranceInfo} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="HelpandSupport" component={HelpandSupport} />
        <Stack.Screen name="TravelBooking" component={TravelBooking} />
        <Stack.Screen name="OnlineService" component={OnlineService} />
        <Stack.Screen name="Residencyapplications" component={Residencyapplications} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="PassportApplication" component={PassportApplication} />
        <Stack.Screen name="TwoPassportApplication" component={TwoPassportApplication} />
        <Stack.Screen name="ThreePassportApplication" component={ThreePassportApplication} />
        <Stack.Screen name="FourPassportApplication" component={FourPassportApplication} />
        <Stack.Screen name="FivePassportApplication" component={FivePassportApplication} />
        <Stack.Screen name="SixPassportApplication" component={SixPassportApplication} />
        <Stack.Screen name="SevenPassportApplication" component={SevenPassportApplication} />
        
        <Stack.Screen name="Auth" component={Auth} />
    </Stack.Navigator>
  );
};

export default Main;
