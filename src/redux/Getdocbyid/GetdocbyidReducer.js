
import { SET_GETDOC_DATA } from "./GetdocbyidActionsTypes";
const initialState = {
    data: null
};

export default GetdocReducer = (state = initialState, action) => {
    
     switch (action.type) {
          case SET_GETDOC_DATA:
               return {
                    ...state,
                    data: action.payload,
               };
          default:
          return state;
     }
};
