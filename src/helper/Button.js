import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Button = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <LinearGradient colors={['#9846D7', '#C490F0']} style={styles.linear} >
        <Text style={styles.textstyle}>{props.label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linear: {
    height: 49,
    borderRadius:8,
    padding:12
  },
  textstyle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign:'center'
  },
});

export default Button;
