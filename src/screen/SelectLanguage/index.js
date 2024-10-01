import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    ScrollView,
    ImageBackground,
    FlatList
} from 'react-native';
import { StylesGloble } from '../../helper/GlobleCss';
import Header from '../../helper/Header';
import Spainflagsmall from '../../assest/svg/Spainflagsmall.svg'
import Radiobutton from '../../assest/svg/Radiobutton.svg'
import Englishflag from '../../assest/svg/Englishflag.svg'
import Button from '../../helper/Button';
import Radiotruebtn from '../../assest/svg/Radiotruebtn.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Disablebutton from '../../helper/Disablebutton';
import { setselectlanguage } from '../../redux/index';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import '../../language/i18';
import { useSafeArea } from 'react-native-safe-area-context';

const langugae = [
    {
        id: 1,
        name: 'Spanish',
        code: "es"
    },
    {
        id: 2,
        name: "English",
        code: "en"
    }
]

const SelectLanguage = ({ navigation, route }) => {
    const { t, i18n } = useTranslation();
    const insets = useSafeArea();

    const dispatch = useDispatch();
    const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);
    const languageselected = SelectlanguageReducer ? SelectlanguageReducer : ''
    useEffect(() => {
        dispatch(setselectlanguage())
    }, [])
    const type = route?.params?.type;

    const [selectlan, setselectlan] = useState(languageselected)

    const languagefunc = (id) => {
        AsyncStorage.setItem('language', id);
        setselectlan(id)
        dispatch(setselectlanguage())

    }

    const navigationfunc = () => {
        if (type == 2) {
            navigation.navigate('Profile')
        } else {
            navigation.navigate('Main');
        }
    }

    return (
        <View
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                flex: 1
            }}
        >
            <View style={{ ...StylesGloble.container, backgroundColor: '#FFFFFF' }}>

                <Header name={t('Language')} />
                <View style={{ margin: 10 }}>
                    <FlatList
                        style={{ marginBottom: 30 }}
                        data={langugae}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <>
                                <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", margin: 10, borderWidth: 1, borderColor: item.code == selectlan ? "#9846D7" : "#5D5D5D", borderRadius: 8, padding: 15 }} onPress={() => languagefunc(item.code)}>
                                    <View style={{ flexDirection: "row" }}>
                                        <View>
                                            {
                                                item.name == 'Spanish' ? (
                                                    <Spainflagsmall />
                                                ) : (
                                                    <Englishflag />
                                                )
                                            }

                                        </View>
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 16, fontWeight: "500", color: "#5D5D5D" }}>
                                                {item.name}
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        {
                                            item.code == selectlan ? (
                                                <Radiotruebtn />
                                            ) : (
                                                <Radiobutton />
                                            )
                                        }

                                    </View>
                                </TouchableOpacity>
                            </>
                        )}
                    />
                </View>
                <View style={{ position: "absolute", bottom: 10, margin: 20, width: "89%" }}>
                    {
                        selectlan != '' ? (
                            <Button label={t('Save')} onPress={() => navigationfunc()} />
                        ) : (
                            <Disablebutton label={t('Save')} />
                        )
                    }

                </View>
            </View>
        </View>

    );
};

export default SelectLanguage;
