import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Imagepath from '../../constant/Imagepath';
import { useSafeArea } from 'react-native-safe-area-context';

const Splashscreen = ({navigation}) => {
const insets = useSafeArea();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Slidestart');
    }, 3000);
  }, []);
  return (
    <View
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                flex: 1
            }}
        >
<View style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <View style={styles.container}>
        <Image style={{height: 95, width: 95}} source={Imagepath.Roseicon} />
      </View>
    </View>
        </View>
    
  );
};
export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default Splashscreen;
