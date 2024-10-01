
import { SET_LANGUAGE_DATA } from "./SelectLanguageActionsTypes";
const initialState = {
    data: null
};

export default SelectlanguageReducer = (state = initialState, action) => {
    
     switch (action.type) {
          case SET_LANGUAGE_DATA:
               return {
                    ...state,
                    data: action.payload,
               };
          default:
          return state;
     }
};
