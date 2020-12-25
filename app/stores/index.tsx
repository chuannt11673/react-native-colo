import { combineReducers, createStore } from 'redux';
import profileReducer from './reducers/ProfileReducer';
import imageGalleryReducer from './reducers/ImageGalleryReducer';
import authReducer from './reducers/AuthReducer';

const reducer = combineReducers({
    profileReducer: profileReducer,
    imageGalleryReducer: imageGalleryReducer,
    authReducer: authReducer
});

const configuredStore = () => createStore(reducer);

export default configuredStore;
