import { combineReducers, createStore } from 'redux';

// reducers
import profileReducer from './reducers/ProfileReducer';
import imageGalleryReducer from './reducers/ImageGalleryReducer';
import authReducer from './reducers/AuthReducer';
import statusBarReducer from './reducers/StatusBarReducer';

const reducer = combineReducers({
    profileReducer: profileReducer,
    imageGalleryReducer: imageGalleryReducer,
    authReducer: authReducer,
    statusBarReducer: statusBarReducer
});

const configuredStore = () => createStore(reducer);

export default configuredStore;
