import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Modal,
} from 'react-native';
import {StylesGloble} from './GlobleCss';
import Tick from '../assest/svg/Tick.svg';
import Tickadd from '../assest/svg/Tickadd.svg';

const Service = [
  {
    id: 1,
    name: 'Passport for first time',
  },
  {
    id: 4,
    name: 'Renewal of Passport',
  },
  {
    id: 5,
    name: 'Qualification Input',
  },
  {
    id: 6,
    name: 'Extensions',
  },
  {
    id: 7,
    name: 'DVT',
  },
  {
    id: 8,
    name: 'CCV',
  },
  {
    id: 9,
    name: 'HE-1',
  },
  {
    id: 10,
    name: 'HE-3',
  },
  {
    id: 7,
    name: 'HE-4',
  },
  {
    id: 11,
    name: 'HE-11',
  },
];

const Skincolorpopup= props => {
  const [choosebox, setChooseBox] = useState(0);
  const [choose, setChoose] = useState(0);
  return (
    <View style={StylesGloble.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={()=>setChoose(false)}>
        <View style={StylesGloble.marginscreen}>
          <View style={styles.viewstyle}>
            <FlatList
              data={Service}
              renderItem={({item}) => (
                <>
                  <View>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 10,
                        marginBottom: 15,
                        top: 15,
                      }}
                      onPress={() => setChooseBox(item.name)}>
                      {choosebox == item.name ? <Tick /> : <Tickadd />}
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '500',
                          color: '#292929',
                          paddingLeft: 10,
                        }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  viewstyle: {
    borderWidth: 1,
    borderColor: '#D1D1D1',
    backgroundColor: '#FFFFFF',
    height: '74%',
    borderRadius: 8,
    width: '80%',
    alignSelf: 'center',
    top: 10,
    justifyContent:'center',
    alignContent:'center'
  },
});
export default Skincolorpopup
