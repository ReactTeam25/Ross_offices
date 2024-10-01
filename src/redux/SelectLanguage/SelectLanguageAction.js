
import { SET_LANGUAGE_DATA } from './SelectLanguageActionsTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const setselectlanguage = () => async (dispatch) => {
     try {
          AsyncStorage.getItem('language', (err, credentials) => {
               let Data =  credentials ? credentials : 'en';
               dispatch({ type:SET_LANGUAGE_DATA, payload: Data });
          })
     } catch (error) {
          let datayt = null
          dispatch({ type:SET_LANGUAGE_DATA, payload: datayt });
     }
};


