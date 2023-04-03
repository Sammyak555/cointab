import {
    legacy_createStore as createStore,
    applyMiddleware,
    combineReducers,
  } from "redux";

import thunk from 'redux-thunk';
import {reducer as authReducer} from './Auth/reducer'

const rootReducer = combineReducers({
    auth : authReducer,
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  (applyMiddleware(thunk))
);
