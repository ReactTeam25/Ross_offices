import React, { useState } from "react";
import { View ,Modal,FlatList} from 'react-native'
import {StylesGloble} from './GlobleCss';
import Tick from '../assest/svg/Tick.svg';
import Tickadd from '../assest/svg/Tickadd.svg';


const sexdata = [
    {
      id: 1,
      name: 'Male',
    },
    {
      id: 2,
      name: 'Female',
    },
  ];
  

 const SexModal =()=>{
    const[sex,setSex]=useState(false);
    return(
        <View>
             <Modal
        transparent={true}
        visible={sex}
        onRequestClose={() => setSex(false)}>
          <View style={StylesGloble.marginscreen}>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#D1D1D1',
            backgroundColor: '#FFFFFF',
            height: 80,
            borderRadius: 8,
            width:'100%',
            alignSelf: 'center',
            top:'470%',
            
            
           
          }}>

            <FlatList 

            data={sexdata}
            renderItem={({item})=>

<TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingLeft: 10,
                        marginBottom: 12,
                        top: 10,
                      }}
                      onPress={() => setSex(item.name)}>
                      {sex == item.name ? <Tick /> : <Tickadd />}
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
            }
                    />
          </View>
          </View>
      </Modal>
        </View>

    )
 }
 export default SexModal;