import http from "./http-common";
import {  API_URL    } from './Apiurl';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

class ApiDataService {

    Getapi(url) {
        let newurl = API_URL+url;
        
        return http.get(newurl);
    }
    async DeleteTokenapi(url) {
        let newurl = API_URL + url;
        const Token = await AsyncStorage.getItem('UserToken');
        console.log('token------------', Token);
        let config = {
            headers: {
                'Authorization': Token,
                'Access-Control-Allow-Origin': '*'
            }
        };
        console.log('token------------', config);

        return http.delete(newurl,config);
    }
    async GetTokenapi(url) {
        let newurl = API_URL+url;
        console.log('newurl----',newurl);

        const Token = await AsyncStorage.getItem('UserToken');
        console.log('token-----------ffff-------',Token);
        let config = {
            headers: 
            {
                'Authorization': Token,
                'Access-Control-Allow-Origin': '*'
            }
        };
        return http.get(newurl,config);
    }
    Deleteapi(url) {
        let newurl = API_URL+url;
        
        return http.delete(newurl);
    }

    Postapi(url,data) {
        let newurl = API_URL+url;
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        };
        return http.post(newurl, data,config);
    }
    async putapi(url,data) {
        let newurl = API_URL+url;
        const Token = await AsyncStorage.getItem('UserToken');
        let config = {
            headers: {
                'Authorization': Token,
                'Access-Control-Allow-Origin': '*'
            }
        };
        return http.put(newurl, data,config);
    }
    async putimageapi(url,data) {
        let newurl = API_URL+url;
        const Token = await AsyncStorage.getItem('UserToken');
        let config = {
            headers: {
                'Authorization':`${Token}`,
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
            }
        };
        return http.put(newurl, data,config);
    }
    async PostHeaderapi(url,data) {
        let newurl = API_URL+url;
        const Token = await AsyncStorage.getItem('UserToken');
        let config = {
            headers: {
                'Authorization': `${Token}`,
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*'
            }
        };
        console.log('config---------',config);
        return http.post(newurl, data,config);
    }
    async PostTokenapi(url,data) {
        let newurl = API_URL+url;
        const Token = await AsyncStorage.getItem('UserToken');
        let config = {
            headers: {
                'Authorization': `${Token}`,
                'Access-Control-Allow-Origin': '*'
            }
        };
        console.log('config---------',config);
        return http.post(newurl, data,config);
    }

   async Uploadtokenapi(url,data) {
        let newurl = API_URL+url;
        console.log(newurl);
        const Token = await AsyncStorage.getItem('UserToken');
        let postData = data;
        console.log(postData);
        let config = {
            headers: {
                'Authorization': Token,
                'Access-Control-Allow-Origin': '*'
            }
        };
        console.log('config---------',config);

      
        return  axios.post(newurl,postData, config);
    }
    async Uploadapi(url,data) {
        let newurl = API_URL+url;
        let postData = data;
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*'
            }
        };
        return  axios.post(newurl,postData, config);
    }

    checkpaipost(url,data){
        let newurl = url;
        console.log(newurl);
        let postData = data;
        console.log(postData);
        let config = {
            headers: {
                'x-api-key': 'c76a886745d31b3fc29dee2e51df0075',
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*'
            }
        };
      
        return  axios.post(newurl,postData, config);
    }
  
}

export default new ApiDataService();