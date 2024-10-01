import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Modal, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import NotificationClose from '../assest/svg/NotificationClose.svg';

const NotificationModal = (props, { onPress }) => {
    console.log('props______________',props);
    
    const gotootherpage = async () => {
        props.navigation.navigate('BottomTab');
        props.notificationclosefunc()
    }
    return (
        <View>
            <Modal
                animationType="none"
                transparent={true}
                visible={true}>
                <View style={styles.centeredView}>
                    <TouchableOpacity style={styles.modalView} onPress={() => gotootherpage()}>
                        <View style={{alignSelf:"center"}}>
                            <NotificationClose/>
                        </View>
                        <View style={{ marginLeft: 15,alignSelf:"center" }}>
                            <Text style={styles.modalText}>{props?.data?.title}</Text>
                            <Text style={styles.modalText2}>{props?.data?.body}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};
export default NotificationModal;
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: '90%', padding: 10,
        flexDirection: "row"
    },
    button: {
        borderRadius: 15,
        padding: 5,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        color: "#000000",
        fontSize: 17,
        fontWeight: "600"
    },
    modalText2: {
        color: "#000000",
        fontSize: 13,
    },
});