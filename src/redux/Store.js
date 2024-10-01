import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import ProfileReducer from "./Profile/ProfileReducer";
import HomeReducer from "./Home/HomeReducer";
import BookingReducer from './MyBookinglist/MyBookinglistReducer';
import VaccinelistReducer from './Vaccinelist/VaccineListReducer';
import TravelhistoryReducer from './TravelHistoryList/TravelHistoryReducer';
import InsuranceInfolistReducer from './InsuranceInfoList/InsuranceInfoReducer';
import GetdocReducer from './Getdocbyid/GetdocbyidReducer';
import TraveldocReducer from './TravelDoc/TravelDocReducer';
import SelectlanguageReducer from './SelectLanguage/SelectLanguageReducer'

const rootReducer = combineReducers({
    ProfileReducer:ProfileReducer,
    HomeReducer:HomeReducer,
    BookingReducer:BookingReducer,
    VaccinelistReducer:VaccinelistReducer,
    TravelhistoryReducer:TravelhistoryReducer,
    InsuranceInfolistReducer:InsuranceInfolistReducer,
    GetdocReducer:GetdocReducer,
    TraveldocReducer:TraveldocReducer,
    SelectlanguageReducer:SelectlanguageReducer
});

const intialState = {};
const middleware = [thunk];

const Store = createStore(rootReducer,intialState,applyMiddleware(...middleware));

export default Store;