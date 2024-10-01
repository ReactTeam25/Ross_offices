import React, { useEffect, useState } from 'react';
import {
    ImageBackground,
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    FlatList,
} from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Imagepath from '../../constant/Imagepath';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ApiDataService from '../../services/Apiservice.service';
import Servicescard from '../../components/Servicescard';
import BlankScreen from '../../helper/BlankScreen';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { useDispatch, useSelector } from 'react-redux';
import { setselectlanguage } from '../../redux/index';

const Tax = ({ navigation, Homestate }) => {
    const [showskeleton, setshowskeleton] = useState(1)
    const dispatch = useDispatch();
	const { t, i18n } = useTranslation();
	const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);

	useEffect(() => {
		dispatch(setselectlanguage())
		i18n.changeLanguage(SelectlanguageReducer);
	}, [])

    useEffect(() => {
        setTimeout(() => {
            setshowskeleton(2)
        }, 2000)
    }, []);


    return (
        <View style={StylesGloble.container}>

            {
                showskeleton == 1 ? (
                    <View style={{ width: "100%", height: '80%', position: "relative", }}>
                        <SkeletonPlaceholder borderRadius={4} >
                            <SkeletonPlaceholder.Item style={{ marginTop: 30, marginLeft: 0, width: '90%', height: 320, marginTop: 20, flexDirection: "row" }}>
                                <SkeletonPlaceholder.Item width={'100%'} height={300} borderRadius={12} alignSelf='flex-end' />
                            </SkeletonPlaceholder.Item>
                            <SkeletonPlaceholder.Item style={{ marginTop: 30, marginLeft: 0, width: '90%', height: 320, marginTop: 20, flexDirection: "row" }}>
                                <SkeletonPlaceholder.Item width={'100%'} height={300} borderRadius={12} alignSelf='flex-end' />
                            </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder>
                    </View>
                ) : (
                    <View >
                        {
                            Homestate?.length > 0 ? (
                                <>
                                    <View style={{ marginTop: 20 }}>
                                        <Text style={StylesGloble.font20700000000}>{t('Tax Services')}</Text>
                                    </View>

                                    <FlatList
                                        data={Homestate}
                                        keyExtractor={(item, index) => index}
                                        showsVerticalScrollIndicator={false}
                                        renderItem={({ item }) => (
                                            <Servicescard navigation={navigation} type={2} data={item} />
                                        )}
                                    />
                                </>

                            ) : (
                                <View style={{ justifyContent: "center", marginTop: "10%", alignSelf: "center" }}>
                                    <BlankScreen />
                                </View>
                            )
                        }
                    </View>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    textper: {
        fontSize: 12,
        fontWeight: '400',
        color: '#000000',
    },
    namestyl: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6D6D6D',
    },
    textheadig: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6D6D6D',
        lineHeight: 19,
    },
});

export default Tax;
