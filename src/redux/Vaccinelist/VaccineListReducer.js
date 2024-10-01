
import { SET_VACCINELIST_DATA } from "./VaccineListActionsTypes";
const initialState = {
    data: null
};

export default VaccinelistReducer = (state = initialState, action) => {
    
     switch (action.type) {
          case SET_VACCINELIST_DATA:
               return {
                    ...state,
                    data: action.payload,
               };
          default:
          return state;
     }
};
