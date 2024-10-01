
import { SET_PROFILE_DATA } from "./ProfileActionsTypes";
const initialState = {
    data: null
};

export default ProfileReducer = (state = initialState, action) => {
    
     switch (action.type) {
          case SET_PROFILE_DATA:
               return {
                    ...state,
                    data: action.payload,
               };
          default:
          return state;
     }
};
