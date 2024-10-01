import { SET_PROFILE_DATA } from './ProfileActionsTypes';
import ApiDataService from '../../services/Apiservice.service'
export const setProfileData = (lang) => async (dispatch) => {
    try {
        dispatch({ type: SET_PROFILE_DATA });
        let url = `user/info?lang=${lang}`;
        ApiDataService.GetTokenapi(url).then(response => {
            console.log('pppp',response.data)
            let data = response.data.data.userDetails;
            dispatch({ type: SET_PROFILE_DATA, payload: data });
        });
    } catch (error) {
        let datayt = null
        dispatch({ type: SET_PROFILE_DATA, payload: datayt });
    }
};


