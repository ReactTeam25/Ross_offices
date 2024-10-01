
import { SET_INSURANCEINFOLIST_DATA } from "./InsuranceInfoActionsTypes";
const initialState = {
    data: null
};

export default InsuranceInfolistReducer = (state = initialState, action) => {
    
     switch (action.type) {
          case SET_INSURANCEINFOLIST_DATA:
               return {
                    ...state,
                    data: action.payload,
               };
          default:
          return state;
     }
};
