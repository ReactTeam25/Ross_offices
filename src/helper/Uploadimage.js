import React, { useEffect, useRef, useState } from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    Modal,
    Image,
    PermissionsAndroid,Platform
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import DeviceInfo from 'react-native-device-info';
import Blackcross from '../assest/svg/Blackcross.svg';
import Camra from '../assest/svg/Camra.svg';
import Uplod from '../assest/svg/Uplod.svg';

const Uploadimage = props => {
    const androidVersion = DeviceInfo.getSystemVersion();

    const ImageUploadincamera = async () => {
        if (Platform.OS === 'ios') {
            gotocameraupload();
        } else {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'App needs access to your camera' + 'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (androidVersion > 12) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                    {
                        title: 'Gallery permission',
                        message: 'Lovely needs gallery permission',
                    },
                );
            }
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                gotocameraupload();
            }
            else {
                console.log('Camera permission denied');
            }
        }



    }
    const gotocameraupload = () => {
        ImagePicker.openCamera({
            width: props.width,
            height: props.height,
            cropperCircleOverlay: props.cropperCircleOverlay,
            cropping: true,
        }).then(image => {
            if (image.path) {
                let uri = image.path;
                props.closeimagepopup(2, image);
            }
            else {
                props.closeimagepopup(1, '');
            }
        });
    }
    const gotogalleryfun = () => {
        ImagePicker.openPicker({
            width: props.width,
            height: props.height,
            cropperCircleOverlay: props.cropperCircleOverlay,
            cropping: true
        }).then(image => {
            if (image.path) {
                let uri = image.path;
                props.closeimagepopup(2, image);
            }
            else {
                props.closeimagepopup(1, '');
            }
        });
    }
    const ImageUploadingallery = async () => {
        if (Platform.OS === 'ios') {
            gotogalleryfun();
        } else {
            let granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Gallery permission',
                    message: 'Lovely needs gallery permission',
                },
            );
            if (androidVersion > 12) {
                granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                    {
                        title: 'Gallery permission',
                        message: 'Lovely needs gallery permission',
                    },
                );
            }

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                gotogalleryfun();
            }
            else {
                console.log('Camera permission denied');
            }
        }

    }

    return (
        <View>
            <Modal animationType="slide" transparent={true} visible={true}>
                <View
                    style={{
                        height: '100%',
                        marginTop: 'auto',
                        position: 'relative',
                        backgroundColor: '#0e0e0e61',
                        zIndex: 999999,
                    }}>
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            height: '100%',
                        }}
                        onPress={() => {
                            props.closeimagepopup(1, '');
                        }}>
                        <View></View>
                    </TouchableOpacity>
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            borderTopRadius: 50,
                            height: 200,
                            backgroundColor: '#ffffff',
                            borderTopRightRadius: 15,
                            borderTopLeftRadius: 15,
                        }}>
                        <View
                            style={{
                                marginTop: 20,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                margin: 20,
                            }}>
                            <Text></Text>
                            <Text style={StylesFirst.phottext}>Upload Photo</Text>
                            <TouchableOpacity
                                style={{ alignSelf: 'center' }}
                                onPress={() => {
                                    props.closeimagepopup(1, '');
                                }}>
                                <Blackcross />
                            </TouchableOpacity>
                        </View>

                        <View style={StylesFirst.photoview}>
                            <TouchableOpacity
                                onPress={() => {
                                    ImageUploadingallery();
                                }}
                                style={{}}>
                                <Uplod style={{ alignSelf: 'center' }} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { ImageUploadincamera() }}
                                style={{}}>
                                <Camra style={{ alignSelf: 'center' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
export const StylesFirst = StyleSheet.create({
    footerdv: {
        width: '100%',
        height: 60,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12.35,
        elevation: 19,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomButtons: {
        width: '20%',
        alignItems: 'center',
    },
    footerText: {
        color: '#000000',
        fontWeight: 'bold',
        alignItems: 'center',
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
    },
    photoview: {
        flexDirection: 'row-reverse',
        paddingTop: 10,
        paddingBottom: 20,
        justifyContent: 'space-around',
        // alignSelf:"center"
    },
    photosec: {
        // width:"50%",
        // height:"100%",
        // alignItems:"center"
    },
    photoicon: {
        width: 100,
        height: 120,
    },
    phottext: {
        color: '#000000',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
    },
});

export default Uploadimage;
