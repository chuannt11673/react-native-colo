import { combineReducers, createStore } from 'redux';
import profileReducer from './reducers/ProfileReducer';
import imageGalleryReducer from './reducers/ImageGalleryReducer';

const reducer = combineReducers({
    profileReducer: profileReducer,
    imageGalleryReducer: imageGalleryReducer
});

const configuredStore = () => createStore(reducer);

export default configuredStore;
