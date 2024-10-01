import { SET_HOME_DATA } from './HomeActionsTypes';
import ApiDataService from '../../services/Apiservice.service'
export const setHomeData = (type,text,lang) => async (dispatch) => {
    
    
    try {
        dispatch({ type: SET_HOME_DATA });
        const cattype = type == 'Immigration' ? 'IMMIGRATION' : type == 'Tax' ? "TAX" : type == 'Loan' ? 'LOAN' : type == 'Trips' ? 'TRAVEL_BOOKING' : 'PASSPORT'
        let url = `service/user?category=${cattype}&searchTerm=${text}&lang=${lang}`;
        console.log('text____',url);
        
        ApiDataService.GetTokenapi(url).then(response => {
            console.log('response---getHome-------',response.data);
            let data = response.data.data.services ;
            dispatch({ type: SET_HOME_DATA, payload: data });
        }).catch(e=>{
        console.log('response---e----11111---',e);

        });
    } catch (error) {
        console.log('response---error-------',error);

        let datayt = null
        dispatch({ type: SET_HOME_DATA, payload: datayt });
    }
};


