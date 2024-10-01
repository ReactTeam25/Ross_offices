import { SET_BOOKING_DATA } from './MyBookinglistActionsTypes';
import ApiDataService from '../../services/Apiservice.service'
export const setBookingData = (type,lang) => async (dispatch) => {
    try {
        console.log('type------',type);
        
        dispatch({ type: SET_BOOKING_DATA });
        const cattype = type == 'Immigration' ? 'IMMIGRATION' : type == 'Tax' ? 'TAX' : type == 'Loan' ? 'LOAN' : type == 'Trips' ? 'TRAVEL_BOOKING' : type == 'Other' ? 'OTHER' :'PASSPORT'
        let url = `booking?booking_type=${cattype}&lang=${lang}&page=all`;
        ApiDataService.GetTokenapi(url).then(response => {
            console.log('response_________',response.data);
            
            let data = response.data.data.bookings;
            dispatch({ type: SET_BOOKING_DATA, payload: data });
        });
    } catch (error) {
        console.log('response---error-------',error);

        let datayt = null
        dispatch({ type: SET_BOOKING_DATA, payload: datayt });
    }
};


