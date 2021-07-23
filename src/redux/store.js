import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import mainReducer from './main-reducer';
import authReducer from './auth-reducer';
import appReducer from './app-reducer';

const rootReducer = combineReducers({
   main: mainReducer,
   auth: authReducer,
   form: formReducer,
   app: appReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;