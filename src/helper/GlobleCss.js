import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const StylesGloble = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ffffff"
    },

    whitescreen:{
        backgroundColor:'white',
        height:"100%",
        width:"100%",
    },
    marginscreen:{
    marginLeft:20,
    marginRight:20,
    },

    font248009846D7:{
        fontSize:24,
        fontWeight:'800',
        color:'#9846D7',
        textAlign:'center'
    },
    font14500g6D6D6D:{
        fontSize:14,fontWeight:'500',color:'#6D6D6D'
    },
    fon24700FFFFFF:{
        fontSize:24,
        fontWeight:'700',
        color:'#FFFFFF',
    },
    font20700000000:{
        fontSize:20,
        fontWeight:'700',
        color:'#000000',
    },
    font16600black:{
        fontSize:16,
        fontWeight:'600',
        color:'#000000',
    },
    font165005D5D5D:{
        fontSize:16,
        fontWeight:'500',
        color:'#5D5D5D',
    },
    fon14700b000000:{
        fontSize:14,
        fontWeight:'700',
        color:'#000000',
    },
    font12400Grey5D5D5D:{
        fontSize:12,fontWeight:'400',color:'#5D5D5D',
    },
    font10500grey:{
        fontSize:10,
        fontWeight:'400',
        color:'#B0B0B0',
    },
    font14400grey5D5D5D:{
        fontSize:14,
        fontWeight:'400',
        color:'#5D5D5D',
        // textAlign:'justify',
    },
    font12500Black000000:{
        fontSize:12,fontWeight:'500',color:'#000000',
    },
    font16500b000000:{
        fontSize:16,
        fontWeight:'500',
        color:'#000000',
    },
    error:{
        backgroundColor:'red'
        ,borderWidth:1
    },
    fon14500242A37:{
        fontSize :14, fontWeight : '500' , color : '#242A37'
    },
    
    


})