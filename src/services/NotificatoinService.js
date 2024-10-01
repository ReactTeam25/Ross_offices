import React, { useState,useEffect } from 'react';
import PushNotification from "react-native-push-notification";

const NotificatoinService = () => {

    useEffect(() => {
        PushNotification.configure({
            onNotification: function (notification) {
                console.log("NOTIFICATION1------------services.ks---:", notification);

               
            },
            onAction: function (notification) {
                console.log("ACTION:", notification.action);
                //console.log("NOTIFICATION:", notification);
            },
        });
    }, [])
    return null
}

export default NotificatoinService;