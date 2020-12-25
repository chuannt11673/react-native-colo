import { SIGNIN, SIGNOUT, UPDATE_PROFILE } from '@stores/actions/type';

import { takeEvery, put } from 'redux-saga/effects';

import { getProfile } from '@shared/services/UserService';

function* signInHandler() {
    try {
        const response = yield getProfile();
        const profile = response.data;
        yield put(
            {
                type: UPDATE_PROFILE,
                data:
                {
                    ...profile,
                    avatar: profile.images.length > 0 ? profile.images[0].url : 'https://images.unsplash.com/photo-1510832198440-a52376950479?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    dob: new Date(response.data.dob).getFullYear().toString(),
                    images: profile.images.map((img: any) => ({
                        id: img.id,
                        uri: img.url
                    }))
                }
            }
        );
    } catch (err) {
        // handle err
        console.log(err?.response);
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