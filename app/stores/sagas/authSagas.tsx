import { SIGNIN, SIGNOUT, UPDATE_PROFILE } from '@stores/actions/type';

import { takeEvery, put } from 'redux-saga/effects';

import { getProfile } from '@shared/services/UserService';

function* signInHandler() {
    try {
        const response = yield getProfile();
        const profile = {
            ...response.data,
            dob: new Date(response.data.dob).getFullYear().toString(),
            images: response.data.images.map((img: any) => ({
                id: img.id,
                uri: img.url
            }))
        };
        yield put({ type: UPDATE_PROFILE, data: profile });
    } catch (err) {
        throw err;
    }
}

function* signOutHandler() {
    yield put({ type: UPDATE_PROFILE, data: {} });
}

export function* watchSignIn() {
    yield takeEvery(SIGNIN, signInHandler);
}

export function* watchSignOut() {
    yield takeEvery(SIGNOUT, signOutHandler);
}