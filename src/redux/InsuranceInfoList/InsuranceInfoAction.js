import { SET_INSURANCEINFOLIST_DATA } from './InsuranceInfoActionsTypes';
import ApiDataService from '../../services/Apiservice.service'
export const setInsuranceinfolistData = (lang) => async (dispatch) => {
    try {
        dispatch({ type: SET_INSURANCEINFOLIST_DATA });
        let url = `travel/insurance?lang=${lang}`;
        ApiDataService.GetTokenapi(url).then(response => {
            let data = response.data.data.insuranceInfo;
            dispatch({ type: SET_INSURANCEINFOLIST_DATA, payload: data });
        });
    } catch (error) {
        console.log('response---error-------',error);

        let datayt = null
        dispatch({ type: SET_INSURANCEINFOLIST_DATA, payload: datayt });
    }
};


