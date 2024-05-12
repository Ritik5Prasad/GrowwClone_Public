import { combineReducers } from "redux";
import userReducer from "./reducers/userSlice";
import themeReducer from "./reducers/themeSlice";

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
});

export default rootReducer;
