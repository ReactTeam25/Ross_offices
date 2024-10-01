import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet,View, Animated,ImageBackground,Image,ActivityIndicator } from 'react-native';


const LoadingPage= () => {
    return (
        <View style={styles.container}>
           <ActivityIndicator size={'large'} color={'#C490F0'}/>
       </View>
    )}

const styles = StyleSheet.create({
   
    container: {
        backgroundColor: '#eeeeee99',
        height:"100%",
        width:"100%",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagetag:{
        height: '20%',
        width: '20%',
    }
})

export default LoadingPage;