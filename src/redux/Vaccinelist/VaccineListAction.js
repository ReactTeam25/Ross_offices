import { SET_VACCINELIST_DATA } from './VaccineListActionsTypes';
import ApiDataService from '../../services/Apiservice.service'
export const setVaccinelistData = (lang) => async (dispatch) => {
    try {
        dispatch({ type: SET_VACCINELIST_DATA });
        let url = `travel/vaccination-record?lang=${lang}`;
        ApiDataService.GetTokenapi(url).then(response => {
            console.log('response_______',response.data);
            
            let data = response.data.data;
            dispatch({ type: SET_VACCINELIST_DATA, payload: data });
        });
    } catch (error) {
        console.log('response---error-------',error);

        let datayt = null
        dispatch({ type: SET_VACCINELIST_DATA, payload: datayt });
    }
};


