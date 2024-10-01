
import { SET_BOOKING_DATA } from "./MyBookinglistActionsTypes";
const initialState = {
    data: null
};

export default BookingReducer = (state = initialState, action) => {
    
     switch (action.type) {
          case SET_BOOKING_DATA:
               return {
                    ...state,
                    data: action.payload,
               };
          default:
          return state;
     }
};
