import React,{useState,useEffect} from 'react';
import {StatusBar} from 'react-native';
import Routes from './src/Navigation/Routes';
import {Provider} from 'react-redux';
import Store from './src/redux/Store';
import {
  initFCM,
  GetFCMToken,
  requestUserPermission,
} from './src/services/notificationTest';
const App = () => {
  useEffect(() => {
    initFCM();
    requestUserPermission();
    GetFCMToken();
  }, []);
  return (
    <Provider store={Store}>
        <StatusBar
          animated={true}
          backgroundColor="#9846D7"
          barStyle="light-content"
        />
        <Routes />
    </Provider>
  )
};
export default App;
