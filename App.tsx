import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AuthContext from '@shared/context/AuthContext';
import AxiosClient from '@shared/Axios';
import CommonConstants from '@shared/consts/CommonConstants';

import HomeStack from 'navigation/HomeStack';
import AuthStack from 'navigation/AuthStack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as AuthService from '@shared/services/AuthenticationService';

import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const initialLoginState = {
    isLoading: true,
    username: null,
    access_token: null,
  };

  const loginReducer = (prevState: any, action: any) => {
    switch (action.type) {
      case 'Retrieve_token':
        return {
          ...prevState,
          access_token: action.token,
          isLoading: false
        };
      case 'Login':
        return {
          ...prevState,
          username: action.id,
          access_token: action.token,
          isLoading: false
        };
      case 'Logout':
        return {
          ...prevState,
          username: null,
          access_token: null,
          isLoading: false
        };
      case 'Register':
        return {
          ...prevState,
          username: action.id,
          access_token: action.token,
          isLoading: false
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
  const googleSignInHook = AuthService.GoogleSignInHook();
  const facebookSignInHook = AuthService.FacebookSignInHook();

  const signIn = async (username: string, token: string) => {
    await AsyncStorage.setItem(CommonConstants.tokenKey, token);    
    dispatch({ type: 'Login', id: username, token: token });
  };

  const authContext = React.useMemo(() => (
    {
      signIn: async (username: string, password: string, callback: (err: any) => void) => {
        try {
          const response = await AuthService.SignIn(username, password);
          await signIn(username, response.access_token);
        }
        catch (err) {
          const errorMessage = err?.response?.data?.error_description;
          if (callback && errorMessage) {
            callback(errorMessage);
          }
        }
      },
      googleSignIn: async () => {
        const response: any = await googleSignInHook.promptAsync();
        const authentication = response.authentication;
        if (authentication) {
          await signIn('', authentication.accessToken);
        }
      },
      facebookSignIn: async () => {
        const response: any = await facebookSignInHook.promptAsync();
        const authentication = response.authentication;
        if (authentication) {
          await signIn('', authentication.accessToken);
        }
      },
      signOut: async () => {
        await AsyncStorage.removeItem(CommonConstants.tokenKey);
        await AxiosClient.get('/api/Identity/logout', {
        });
        dispatch({ type: 'Logout' });
      }
    }
  ), []);

  React.useEffect(() => {
    WebBrowser.warmUpAsync();
    AxiosClient.interceptors.response.use(undefined, async err => {
      const error = err.response;
      if (error.status === 401) {
        await authContext.signOut();
        return;
      }
      throw err;
    });
    setTimeout(async () => {
      const token = await AsyncStorage.getItem(CommonConstants.tokenKey);
      dispatch({ type: 'Retrieve_token', token: token });
    }, 1000);

    return () => {
      WebBrowser.coolDownAsync();
    }
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {
          loginState.access_token ? <HomeStack /> : <AuthStack />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
