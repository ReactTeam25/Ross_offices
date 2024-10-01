
import { SET_TRAVELHISTRY_DATA } from "./TravelHistoryActionsTypes";
const initialState = {
    data: null
};

export default TravelhistoryReducer = (state = initialState, action) => {
    
     switch (action.type) {
          case SET_TRAVELHISTRY_DATA:
               return {
                    ...state,
                    data: action.payload,
               };
          default:
          return state;
     }
};
