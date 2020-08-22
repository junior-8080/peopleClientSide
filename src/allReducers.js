import {combineReducers} from 'redux'
import isLoggedReducer from './reducers/isLoggedReducer';
import saveProfileReducer from './reducers/saveProfileReducer'

const allReducers = combineReducers({
    isLogged : isLoggedReducer,
    saveProfile:saveProfileReducer
});

export default allReducers