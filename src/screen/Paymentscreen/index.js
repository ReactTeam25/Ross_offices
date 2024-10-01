import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import { WebView } from 'react-native-webview';
import Back from '../../assest/svg/Back.svg';
import { useSafeArea } from 'react-native-safe-area-context';

import { useFocusEffect } from '@react-navigation/native';
import { setProfileData } from '../../redux/index';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL } from '../../services/Apiurl';

const Paymentscreen = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const insets = useSafeArea();

    const webviewRef = useRef(null);
    console.log('route-----', route.params);
    const bookingId = route?.params?.bookingId
    const price = route?.params?.price
    const [showWebView, setShowWebView] = useState(true);

    useEffect(() => {
        setShowWebView(true)
    }, [bookingId, price])

    const url = `${API_URL}checkout?bookingId=${bookingId}&price=${price}`

    const onCloseWebView = () => {
        setShowWebView(false);
    };

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                setShowWebView(false)
                dispatch(setProfileData())
                navigation.navigate('BottomTab', { screen: 'ProfileScreen' })
                return true;
            };
            BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            );
            return () => {
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    onBackPress
                );
            };
        }, []),
    );

    return (
        <View
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                flex: 1
            }}
        >
<View style={{ ...StylesGloble.container }}>

{
    showWebView &&
    <>
        <WebView
            source={{ uri: url }}
            style={{ flex: 1, height: 50, width: '100%' }}
            onError={(error) => console.log('WebView Error:--------------- ', error)}
        />
        <View style={{ position: 'absolute', marginRight: 10, marginLeft: 10, }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "83%",marginTop:20 }}>
                <TouchableOpacity onPress={() => { onCloseWebView(); navigation.navigate('BottomTab', { screen: 'Home' }); dispatch(setProfileData()) }}>
                    <Back />
                </TouchableOpacity>

                <TouchableOpacity style={{ right: 50, alignSelf: 'center' }} onPress={() => { onCloseWebView(); navigation.navigate('BottomTab', { screen: 'Home' }); dispatch(setProfileData()) }}>
                    <Text style={{ color: "#000000", textDecorationLine: 'underline', fontSize: 15, fontWeight: "600" }}>
                        Go to Home
                    </Text>
                </TouchableOpacity>
            </View>
        </View>

    </>

}
</View >
        </View>
        
    );
};
export default Paymentscreen;