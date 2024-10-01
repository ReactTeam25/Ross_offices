
import { SET_TRAVEL_DATA } from "./TravelDocActionsTypes";
const initialState = {
    data: null
};

export default TraveldocReducer = (state = initialState, action) => {
    
     switch (action.type) {
          case SET_TRAVEL_DATA:
               return {
                    ...state,
                    data: action.payload,
               };
          default:
          return state;
     }
};
