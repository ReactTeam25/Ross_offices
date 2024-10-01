
import React, { useEffect, useRef, useState } from 'react'
import { Text,TextInput,StyleSheet,View,Animated,Easing,Image, TouchableWithoutFeedback} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';



const TextField = (props) => {
    const { label,errorText, value,style,type, onBlur,Placeholder,name,star,maxLength,multiline,numberOfLines,editable, onFocus,...restOfProps} = props
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef(null)
    const focusAnim = useRef(new Animated.Value(0)).current
    let securetext = false;
    let keypadtype='default';
    let multilineobj = true;

    useEffect(() => {
        Animated.timing(focusAnim, {
            toValue: isFocused || !!value ? 1 : 0,
            duration: 150,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
        }).start()
    }, [focusAnim, isFocused, value])

    let color =  '#B9C4CA'
    if (errorText) {
        color = '#B00020'
    }


    if (type=='email') {
        securetext = false;
        keypadtype='email-address';
        multilineobj = false;
    }
    else if (type=='phone') {
        securetext = false;
        keypadtype='phone-pad';
        multilineobj = false;
    }
    else if (type=='number') {
        securetext = false;
        keypadtype='numeric';
        multilineobj = false;
    }
    else if (type=='password') {
        securetext = true;
        keypadtype='default';
        multilineobj = false;
    }
    else{
        securetext = false;
        keypadtype='default';
        multilineobj = true;
    }

    const checkvalue = (text)=>{
        if(text==''){
            return false;
        } else if(text==null){
            return false;
        } else if(text==undefined){
            return false;
        }else{
            return true;
        }
    }
    
   
    
    return (
        <View style={{position:"relative"}}>
            <Text style={styles.label}>{name} <Text style={{color:"#FF6A6A"}}>{star}</Text></Text>
            <TextInput
                style={[checkvalue(value)==true?styles.input2 :styles.input]}
                ref={inputRef}
                multiline={multiline}
                keyboardType={keypadtype}
                placeholder={Placeholder}
                placeholderTextColor="#B0B0B0"
                
            
                type={type}
                {...restOfProps}
                secureTextEntry={securetext}
                value={value}
                onBlur={(event) => {
                    setIsFocused(false)
                    onBlur?.(event)
                }}
                onFocus={(event) => {
                    setIsFocused(true)
                    onFocus?.(event)
                }}
                numberOfLines={numberOfLines}
                maxLength={maxLength}
                editable={editable}
            />
           
            {!!errorText && <Text style={styles.error}>{errorText}</Text>}
        </View>
    )
}
const styles = StyleSheet.create({
    input2:{
        padding:10,
        backgroundColor:"#ffffff",
        borderColor:"#9846D7",
        borderWidth:1,
        borderRadius: 10,
        fontSize: 16,
        color:"#000000",
        fontWeight:"500"
    },
    input: {
        padding:10,
        backgroundColor:"#ffffff",
        borderColor:"#B0B0B0",
        borderWidth:1,
        borderRadius: 10,
        fontSize: 16,
        color:"#000000",
        fontWeight:"500"
    },
    labelContainer: {
        position: 'absolute',
      
        top:-10,
        left:-15

    },
    borderview:{
        borderColor:"#CC0076",
        borderWidth:1,
    },
    label: {
        fontSize: 14,
        fontWeight:'500',
        marginBottom:10,
        color:"#242A37"
    },
    error: {
        marginTop: 4,
        marginLeft: 5,
        fontSize: 12,
        color: '#B00020',
        fontFamily:'Poppins-Regular',
    },
    newlable:{
        zIndex:999,
        position:'absolute',
        top:16,
        left:14
    },
})

export default TextField;
