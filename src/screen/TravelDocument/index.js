import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity, PermissionsAndroid, FlatList,Platform
} from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Header from '../../helper/Header';
import moment from 'moment';
import ApiDataService from '../../services/Apiservice.service'
import Disablebutton from '../../helper/Disablebutton';
import LoadingPage from '../../helper/LoadingPage';
import Toast from 'react-native-simple-toast';
import DocumentPicker from 'react-native-document-picker';
import DeviceInfo from "react-native-device-info";
import Docment from '../../assest/svg/Docment.svg'
import Docdownload from '../../assest/svg/Docdownload.svg'
import { useDispatch, useSelector } from 'react-redux';
import { setTraveldoc, setselectlanguage } from '../../redux/index';
import Button from '../../helper/Button';
import Deletedoc from '../../assest/svg/Deletedoc.svg'
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import BlankScreen from '../../helper/BlankScreen';
import { useSafeArea } from 'react-native-safe-area-context';

const TravelDocument = ({ navigation }) => {
    const { t, i18n } = useTranslation();
const insets = useSafeArea();

    const dispatch = useDispatch();
    const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

    useEffect(() => {
        dispatch(setselectlanguage())
        i18n.changeLanguage(SelectlanguageReducer);
    }, [])
    const TraveldocReducer = useSelector(state => state.TraveldocReducer.data);


    const androidVersion = DeviceInfo.getSystemVersion()
    const [loading, setloading] = useState(false);
    useEffect(() => {
        dispatch(setTraveldoc(SelectlanguageReducer))
    }, []);
    
    const uploadingdoc = async () => {
        try {
            if (Platform.OS == 'ios') {
                adddocnewfunc()
            } else {
                let granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    {
                        title: t('File manager permission'),
                        message: t('Ross Offices needs file manager permission'),
                    },
                );

                if (androidVersion > 12) {
                    granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                        {
                            title: t('File manager permission'),
                            message: t('Ross Offices needs file manager permission'),
                        },
                    );
                }
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    adddocnewfunc()
                } else {
                    console.log('Gallery permission denied');
                }
            }

        } catch (error) {
            console.log('Error picking video from gallery:', error);
        }
    };

    const adddocnewfunc = async () => {
        const Doc = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
        });
        console.log('audio-----1111---', Doc);
        if (Doc && Doc.length > 0) {
            const document = {
                name: Doc[0].name, type: Doc[0].type, uri: Doc[0].uri
            }
            console.log('document_________________', document);

            uploaddocfunc(document)
        } else {
        }
    }

    const uploaddocfunc = (doc) => {
        setloading(true)
        let formData = new FormData();
		formData.append('travel_doc',doc);

        console.log('response------body----->', formData);
        let url = `booking/travel/docs`
        console.log('url-----', url);
        ApiDataService.PostHeaderapi(url, formData)
            .then(response => {
                setloading(false)
                console.log('response------upload----->', response);
                if (response.status == 200) {
                    dispatch(setTraveldoc())
                    calltoastmessage(response.data.message);
                }
            })
            .catch(e => {
                setloading(false)

                console.log('error------>', e);
            });
    }

    const deletedoc = (docid) => {
        setloading(true)
        let url = `booking/travel/docs/${docid}`
        console.log('url-----', url);
        ApiDataService.DeleteTokenapi(url)
            .then(response => {
                setloading(false)
                console.log('response------upload----->', response);
                if (response.status == 201) {
                    dispatch(setTraveldoc())
                    calltoastmessage(response.data.message);
                }
            })
            .catch(e => {
                setloading(false)
                console.log('error------>', e);
            });
    }
    const calltoastmessage = data => {
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
<View style={StylesGloble.container}>
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
            <Header name={'Travel Document'} />

            <ScrollView style={{ marginBottom: '10%' }}>
                <View style={StylesGloble.marginscreen}>

                    <View style={{ marginTop: 0 }}>
                        <Text style={{ fontSize: 18, fontWeight: '700', color: '#242A37' }}>
                            {t('All Documents')}
                        </Text>
                    </View>
                    {
                        TraveldocReducer?.length > 0 ? (
                            <View style={{ marginTop: 10 }}>
                                <FlatList
                                    style={{ marginBottom: '6%' }}
                                    data={TraveldocReducer}
                                    renderItem={({ item }) => (
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <View>
                                                    <Docment />
                                                </View>
                                                <Text
                                                    style={{ fontSize: 12, fontWeight: '600', color: '#000000', alignSelf: "center", marginLeft: 10,width:'60%' }}>
                                                    {item.travel_doc}
                                                </Text>
                                            </View>
                                            <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => deletedoc(item.id)}>
                                                <Deletedoc />
                                            </TouchableOpacity>

                                        </View>)} />
                            </View>
                        ) : <View style={{ justifyContent: "center", marginTop: "40%", alignSelf: "center" }}>
                            <BlankScreen />
                        </View>
                    }
                </View>
            </ScrollView>
            <View style={{ position: "absolute", bottom: 0, margin: 20, width: "90%" }}>
                <Button label={t('Upload document')} onPress={() => uploadingdoc()} />

            </View>
        </View>
        </View>
        
    );
};
export default TravelDocument;
