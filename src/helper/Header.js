import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Back from '../assest/svg/Back.svg';
import { StylesGloble } from "./GlobleCss";
import { useNavigation } from "@react-navigation/native";



const Header = (props) => {
    const navigation = useNavigation();
    return (


        <View style={{ flexDirection: "row", padding: 20, alignItems: 'center',justifyContent:"space-between" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Back />
            </TouchableOpacity>

            <View style={{ justifyContent: 'center', alignItems: 'center',}}>
                <Text style={{ ...StylesGloble.font20700000000, }}>{props.name}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center',}}>
                <Text style={{ ...StylesGloble.font20700000000, }}>    </Text>
            </View>

        </View>

    )
}


const styles = StyleSheet.create({
    textstyle: {

    }
})
export default Header;







