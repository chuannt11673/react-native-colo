import { combineReducers, createStore } from 'redux';
import profileReducer from './reducers/ProfileReducer';

const reducer = combineReducers({
    profileReducer: profileReducer
});

const configuredStore = () => createStore(reducer);

export default configuredStore;
