import { rentalReducer, selectedRentalReducer } from "./rental-reducers";
import { authReducer } from "./auth-reducer";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import { reducer as formReducer } from "redux-form";

export const init = () => {
  const reducer = combineReducers({
    rentals: rentalReducer,
    rental: selectedRentalReducer,
    form: formReducer,
    auth: authReducer
  });

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;

  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

  return store;
};
