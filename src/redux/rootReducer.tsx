import { combineReducers } from "redux";
import userReducer from "./reducers/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
