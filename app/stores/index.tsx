import { combineReducers, createStore } from 'redux';

// reducers
import profileReducer from './reducers/ProfileReducer';
import imageGalleryReducer from './reducers/ImageGalleryReducer';
import authReducer from './reducers/AuthReducer';
import statusBarReducer from './reducers/StatusBarReducer';

// redux
import { applyMiddleware } from 'redux';

// sagas
import createSagaMiddleware from 'redux-saga';

const reducer = combineReducers({
    profileReducer: profileReducer,
    imageGalleryReducer: imageGalleryReducer,
    authReducer: authReducer,
    statusBarReducer: statusBarReducer
});

export const sagaMiddleware = createSagaMiddleware();

const configuredStore = () => createStore(reducer, applyMiddleware(sagaMiddleware));
export default configuredStore;
