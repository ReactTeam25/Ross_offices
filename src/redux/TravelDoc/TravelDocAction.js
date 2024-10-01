import { SET_TRAVEL_DATA } from './TravelDocActionsTypes';
import ApiDataService from '../../services/Apiservice.service'
export const setTraveldoc = (lang) => async (dispatch) => {
    try {
        dispatch({ type: SET_TRAVEL_DATA });
        let url = `booking/travel/docs`;
        ApiDataService.GetTokenapi(url).then(response => {
            console.log('response---booking-------',response.data);
            let data = response.data.documents;
            dispatch({ type: SET_TRAVEL_DATA, payload: data });
        });
    } catch (error) {
        console.log('response---error-------',error);

        let datayt = null
        dispatch({ type: SET_TRAVEL_DATA, payload: datayt });
    }
};


