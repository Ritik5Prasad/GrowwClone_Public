import { combineReducers } from "redux";
import userReducer from "./reducers/userSlice";
import themeReducer from "./reducers/themeSlice";
import stockReducer from "./reducers/stockSlice";

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  stock: stockReducer,
});

export default rootReducer;
