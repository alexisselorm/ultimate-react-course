import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import thunk from 'redux-thunk'
import customerReducer from "./features/customers/customerSlice";





const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer,applyMiddleware(thunk) );

export default store; 



  