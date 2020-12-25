import { all } from 'redux-saga/effects';

import { watchSignIn, watchSignOut } from './authSagas';

export default function* rootSagas() {
    yield all([
        watchSignIn(),
        watchSignOut()
    ]);
}