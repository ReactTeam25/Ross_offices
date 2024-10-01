import React,{useEffect,useState} from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Blankdata from '../assest/svg/Blankdata.svg'
import { setselectlanguage } from '../redux/index';
import { useTranslation } from 'react-i18next';
import '../language/i18';
import { useDispatch, useSelector } from 'react-redux';


const BlankScreen = (props) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const SelectlanguageReducer = useSelector(state => state.SelectlanguageReducer.data);
  
  useEffect(()=>{
      dispatch(setselectlanguage())
      i18n.changeLanguage(SelectlanguageReducer);
  },[SelectlanguageReducer])

  return (
    <View onPress={props.onPress}>
      <Blankdata />
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#000000", textAlign: "center" }}>
          {t('Uh-ho')}
        </Text>
        <Text style={{ fontSize: 14, fontWeight: "400", color: "#6D6D6D", textAlign: "center" }}>
          {t('There is no Data')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  linear: {
    height: 49,
    borderRadius: 8,
    padding: 12
  },
  textstyle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center'
  },
});

export default BlankScreen;
