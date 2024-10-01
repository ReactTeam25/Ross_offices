import React, { useCallback, useState } from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Imagepath from '../../constant/Imagepath';
import AppIntroSlider from 'react-native-app-intro-slider';
import LinearGradient from 'react-native-linear-gradient';
import { Styles } from './styles';
import Arrowwhite from '../../assest/svg/Arrowwhite.svg';
import Arrowgrey from '../../assest/svg/Arrowgrey.svg';
import { StylesGloble } from '../../helper/GlobleCss';
import Skip from '../../assest/svg/Skip.svg';
import Done from '../../assest/svg/Done.svg';
import { useSafeArea } from 'react-native-safe-area-context';

const slides = [
  {
    key: 1,
    title: 'Find Help',
    title1: ' Nearby',
    text: 'Locate nearby assistance quickly and easily with our service, connecting you to local help when you need it most.',
    image: Imagepath.splashone,
  },
  {
    key: 2,
    title: 'Get Help',
    title1: ' Fast',
    text: 'Quickly access assistance with our service, connecting you to nearby help when you need it.',
    image: Imagepath.Roseicontwo,
  },
  {
    key: 3,
    title: 'Request Services',
    title1: ' Effortlessly',
    text: 'Request services easily and quickly with our streamlined platform, simplifying your needs with just a few taps.',
    image: Imagepath.splashthree,
  },
];

const Slidestart = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const insets = useSafeArea();

  const renderNextButton = useCallback(() => {
    return (
      <View>
        <Done height={50} width={50} />
      </View>
    );
  }, []);

  const renderDoneButton = useCallback(() => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Auth')}>
        <Done height={50} width={50} />
      </TouchableOpacity>
    );
  }, [navigation]);

  const renderSkipButton = useCallback(() => {
    return (
      <View>
        <Skip height={50} width={50} />
      </View>
    );
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{}}>


          <View style={{ flex: 1, alignSelf: 'center' }}>
            <ImageBackground
              source={item.image}
              style={{ height: 300, width: 300 }}>
              <TouchableOpacity
                style={{ alignSelf: 'flex-end', marginTop: 20, marginRight: 0 }}
                onPress={() => navigation.navigate('Auth')}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#9846D7' }}>
                  Skip
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>

          <View
            style={{
              backgroundColor: '#ffffff',
              height: 364,
              width: '105%',
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              paddingLeft: 60, paddingRight: 60

            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: '700',
                  color: '#9846D7',
                  textAlign: 'center',
                }}>
                {item.title}
                <Text
                  style={{
                    fontSize: 28, fontWeight: '700', color: '#000000',
                  }}>
                  {item.title1}
                </Text>
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#6D6D6D',
                  textAlign: 'center',
                  lineHeight: 20,
                  top: 8,
                }}>
                {item.text}
              </Text>
              {/* <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#6D6D6D',
                  textAlign: 'center',
                  lineHeight: 20,
                  top: 8,
                }}>
                {item.text1}
               
              </Text> */}
              {/* <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#6D6D6D',
                  textAlign: 'center',
                  lineHeight: 20,
                  top: 8,
                }}>
                {item.text2}
              </Text> */}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const handleSlideChange = useCallback(index => {
    setCurrentIndex(index);
  }, []);

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        flex: 1
      }}
    >
      <View style={{ flex: 1 }}>
        <AppIntroSlider
          data={slides}
          renderItem={renderItem}
          renderNextButton={renderNextButton}
          renderDoneButton={renderDoneButton}
          // renderSkipButton={renderSkipButton}
          onSlideChange={handleSlideChange}
          showPrevButton={true}
          renderPrevButton={renderSkipButton}
          // showSkipButton={true}

          activeDotStyle={{
            height: 10,
            backgroundColor: '#9846D7',
            height: 8,
            width: 48,
            marginBottom: '175%',
          }}
          dotStyle={{ backgroundColor: '#9846D720', marginBottom: '175%' }}
        />
      </View>
    </View>

  );
};

export default Slidestart;










