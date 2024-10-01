import React, {useState} from 'react';
import {Modal, StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import {StylesGloble} from './GlobleCss';
import Tick from '../assest/svg/Tick.svg';
import Tickadd from '../assest/svg/Tickadd.svg';


const Service = [
  {
    id:1,
    name:'Passport for first time'
  },
  {
    id:2,
    name:'Passport for first time'
  },
  {
    id:3,
    name:'Passport for first time'
  },
  {
    id:4,
    name:'Passport for first time'
  },
  {
    id:5,
    name:'Passport for first time'
  },
  {
    id:6,
    name:'Passport for first time'
  },
  {
    id:7,
    name:'Passport for first time'
  },
  {
    id:1,
    name:'Passport for first time'
  },
  {
    id:8,
    name:'Passport for first time'
  },
  {
    id:9,
    name:'Passport for first time'
  },
]

const SelectPicker = (props) => {
  const [choosebox, setChooseBox] = useState(0);
  const [modVisible, setModVisible] = useState(false);
  const selectchoosefun =(name)=>{
  setChooseBox(name)
  }
  return (
    <View style={StylesGloble.container}>
      <View style={StylesGloble.marginscreen}>
      
        <Modal animationType="slide" transparent={true} visible={true} onRequestClose={()=>setModVisible(false)}>
          <View style={styles.viewstyle}>
          <View style={{marginLeft:15, marginRight : 15}}>
          <View style={{flexDirection :'row' , alignItems :'center' , marginTop : 15}}>
            <TouchableOpacity onPress={()=> setChooseBox(!choosebox)}>
            {choosebox ?   <Tick /> : <Tickadd />}
            </TouchableOpacity>
            <Text style={{...StylesGloble.fon14500242A37,color:'#292929',left : 15}}>Passport for first time</Text>
          </View>
          <View style={{flexDirection :'row' , alignItems :'center' , marginTop : 15}}>
            <TouchableOpacity onPress={()=> setChooseBox(!choosebox)}>
            {choosebox ?   <Tick /> : <Tickadd />}
            </TouchableOpacity>
            <Text style={{...StylesGloble.fon14500242A37,color:'#292929',left : 15}}>Renewal of Passport</Text>
          </View>
          <View style={{flexDirection :'row' , alignItems :'center' , marginTop : 15}}>
            <TouchableOpacity onPress={()=> setChooseBox(!choosebox)}>
            {choosebox ?   <Tick /> : <Tickadd />}
            </TouchableOpacity>
            <Text style={{...StylesGloble.fon14500242A37,color:'#292929',left : 15}}>Qualification Input</Text>
          </View>
          <View style={{flexDirection :'row' , alignItems :'center' , marginTop : 15}}>
            <TouchableOpacity onPress={()=> setChooseBox(!choosebox)}>
            {choosebox ?   <Tick /> : <Tickadd />}
            </TouchableOpacity>
            <Text style={{...StylesGloble.fon14500242A37,color:'#292929',left : 15}}>Extensions</Text>
          </View>
          <View style={{flexDirection :'row' , alignItems :'center' , marginTop : 15}}>
            <TouchableOpacity onPress={()=> setChooseBox(!choosebox)}>
            {choosebox ?   <Tick /> : <Tickadd />}
            </TouchableOpacity>
            <Text style={{...StylesGloble.fon14500242A37,color:'#292929',left : 15}}>DVT</Text>
          </View>
          <View style={{flexDirection :'row' , alignItems :'center' , marginTop : 15}}>
            <TouchableOpacity onPress={()=> setChooseBox(!choosebox)}>
              {choosebox ? <Tick /> : <Tickadd />}
            </TouchableOpacity>
            <Text style={{...StylesGloble.fon14500242A37,color:'#292929',left : 15}}>CCV</Text>
          </View>
          <View style={{flexDirection :'row' , alignItems :'center' , marginTop : 15}}>
            <TouchableOpacity onPress={()=> setChooseBox(!choosebox)}>
              {choosebox ?   <Tick /> : <Tickadd /> }
            </TouchableOpacity>
            <Text style={{...StylesGloble.fon14500242A37,color:'#292929',left : 15}}>HE-1</Text>
          </View>
          <View style={{flexDirection :'row' , alignItems :'center' , marginTop : 15}}>
            <TouchableOpacity onPress={()=> setChooseBox(!choosebox)}>
              {choosebox?  <Tick /> :  <Tickadd />}
            </TouchableOpacity>
            <Text style={{...StylesGloble.fon14500242A37,color:'#292929',left : 15}}>HE-3</Text>
          </View>
          <View style={{flexDirection :'row' , alignItems :'center' , marginTop : 15}}>
            <TouchableOpacity onPress={()=> setChooseBox(!choosebox)}>
              {choosebox ?  <Tick /> :  <Tickadd />}
            </TouchableOpacity>
            <Text style={{...StylesGloble.fon14500242A37,color:'#292929',left : 15}}>HE-4</Text>
          </View>
          <View style={{flexDirection :'row' , alignItems :'center' , marginTop : 15}}>
            <TouchableOpacity onPress={()=> setChooseBox(!choosebox)}>
              {choosebox ?   <Tick /> : <Tickadd />}
            </TouchableOpacity>
            <Text style={{...StylesGloble.fon14500242A37,color:'#292929',left : 15}}>HE-11</Text>
          </View>
          
          </View>
          </View>
        </Modal>  




{/* 
        <Modal animationType="slide" transparent={true} visible={true} >
          <View>
          
          <View style={styles.viewstyle}>
        <FlatList 
        data={Service}
        keyExtractor={(item,index)=>{index}}
        showsVerticalScrollIndicator={false}
        renderItem={({item})=>{
          <>
        
          <View style={{marginLeft:15, marginRight : 15}}>
          <View style={{flexDirection :'row' , alignItems :'center' , marginTop : 15}}>

        

          <View>
            <Text style={{color:'black'}}>{item.name}</Text>
            <TouchableOpacity onPress={()=>selectchoosefun(item.name)}>
            {choosebox == item.name ? <Tick /> : <Tickadd /> }
            </TouchableOpacity>
          </View>
          </View>
          </View>
        
   
    
      

          
          </>
        }}

        />
        </View>
        </View>
        </Modal>

      </View>

    </View>
  );
};
; */}

</View>
          </View>
  )}
const styles = StyleSheet.create({
  viewstyle: {
    borderWidth: 1,
    borderColor: '#D1D1D1',
    backgroundColor: '#FFFFFF',
    height:390,
    borderRadius: 8,
    width: '80%',
    alignSelf: 'center',
    top: 10,
  },
   
})  


export default SelectPicker;
