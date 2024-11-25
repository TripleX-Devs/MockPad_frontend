import {legacy_createStore,applyMiddleware, combineReducers} from 'redux';
import {thunk } from 'redux-thunk';
import { authReducer } from './Authentication/reducers';



const rootReducer=combineReducers({
    auth:authReducer,
})

// @ts-ignore
export const store=legacy_createStore(rootReducer,applyMiddleware(thunk));