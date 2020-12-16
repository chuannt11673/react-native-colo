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
import UserInfoResponseModel from 'shared/interfaces/UserInfoResponseModel';

import { Provider } from 'react-redux';
import configuredStore from '@stores/index';

const store = configuredStore();

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

  const signIn = async (token: string) => {
    await AsyncStorage.setItem(CommonConstants.tokenKey, token);
    const userInfo : UserInfoResponseModel = await AxiosClient.get('/connect/userinfo');
    await AsyncStorage.setItem(CommonConstants.userInfoKey, JSON.stringify(userInfo));
    dispatch({ type: 'Login', id: userInfo.name, token: token });
  };

  const authContext = React.useMemo(() => (
    {
      signIn: async (username: string, password: string, callback: (err: any) => void) => {
        try {
          const response = await AuthService.SignIn(username, password);
          await signIn(response.access_token);
        }
        catch (err) {
          const errorMessage = err?.response?.data?.error_description;
          if (callback && errorMessage) {
            callback(errorMessage);
          }
        }
      },
      signInToken: async (token: string) => {
        await signIn(token);
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
    setTimeout(async () => {
      await AxiosClient.interceptors.response.use(undefined, async err => {
        const error = err.response;
        if (error.status === 401) {
          await authContext.signOut();
          return;
        }
        throw err;
      });

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
        <ActivityIndicator size='small' />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
            {
              loginState.access_token ? <HomeStack /> : <AuthStack />
            }
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
}