import Axios from '@shared/Axios';
import TokenResponse from '@shared/interfaces/TokenResponse';

import { AuthRequestConfig, makeRedirectUri, Prompt, useAuthRequest } from 'expo-auth-session';

const clientId = 'dev';
const scopes = ['openid', 'profile', 'WebAppAPI'];
const responseType = 'id_token token';
const redirectUri = makeRedirectUri({
    native: 'colo.app://redirect',
    preferLocalhost: true
});
const discovery = {
    authorizationEndpoint: 'https://colo-auth.azurewebsites.net/connect/authorize'
};
const googleConfig: AuthRequestConfig = {
    clientId,
    scopes,
    responseType,
    redirectUri,
    prompt: Prompt.Login,
    extraParams: {
        nonce: 'abz' // implicit flow need nonce
    }
};
const facebookConfig: AuthRequestConfig = {
    clientId,
    scopes,
    responseType,
    redirectUri,
    prompt: Prompt.Login,
    extraParams: {
        provider: 'Facebook',
        nonce: 'abz'
    }
};

export function SignIn(username: string, password: string) : Promise<TokenResponse> {
    const form = new FormData();
    form.append('client_id', 'native');
    form.append('grant_type', 'password');
    form.append('scope', 'openid profile WebAppAPI');
    form.append('username', username);
    form.append('password', password);
    return Axios.post('/connect/token', form, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export function GoogleSignInHook() {
    const [request, response, promptAsync] = useAuthRequest(googleConfig, discovery);
    return {
        request,
        response,
        promptAsync
    };
};

export function FacebookSignInHook() {
    const [request, response, promptAsync] = useAuthRequest(facebookConfig, discovery);
    return {
        request,
        response,
        promptAsync
    };
};
