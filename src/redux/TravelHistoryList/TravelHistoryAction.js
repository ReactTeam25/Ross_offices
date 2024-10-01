import { SET_TRAVELHISTRY_DATA } from './TravelHistoryActionsTypes';
import ApiDataService from '../../services/Apiservice.service'
export const setTravelhistoryData = (lang) => async (dispatch) => {
    try {
        dispatch({ type: SET_TRAVELHISTRY_DATA });
        let url = `travel/history?lang=${lang}`;
        ApiDataService.GetTokenapi(url).then(response => {
            console.log('response___Travel___',response.data);
            let data = response.data.data.travelRecords;
            dispatch({ type: SET_TRAVELHISTRY_DATA, payload: data });
        });
    } catch (error) {
        console.log('response---error-------',error);

        let datayt = null
        dispatch({ type: SET_TRAVELHISTRY_DATA, payload: datayt });
    }
};


