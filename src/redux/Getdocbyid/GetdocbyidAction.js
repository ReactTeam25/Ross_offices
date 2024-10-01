import { SET_GETDOC_DATA } from './GetdocbyidActionsTypes';
import ApiDataService from '../../services/Apiservice.service'
export const setGetdoc = (type,lang) => async (dispatch) => {
    try {
        dispatch({ type: SET_GETDOC_DATA });
        let url = `booking/docs/${type}`;
        console.log('response---booking---url----',url);

        ApiDataService.GetTokenapi(url).then(response => {
            console.log('response---booking---doc----',response.data.data);
            let data = response.data.data ;
            dispatch({ type: SET_GETDOC_DATA, payload: data });
        }).catch(e=>{
            console.log('e--booking---doc------',e);
            
        });
    } catch (error) {
        console.log('response---booking---doc-------',error);

        let datayt = null
        dispatch({ type: SET_GETDOC_DATA, payload: datayt });
    }
};


