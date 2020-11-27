import * as React from 'react';
import AuthContext from '@shared/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from 'navigation/HomeStack';
import AuthStack from 'navigation/AuthStack';

import AxiosClient from '@shared/Axios';
import OAuthConfig from '@shared/Config';
import { ConnectTokenResponse } from '@shared/interfaces/ConnectTokenResponse';

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token
          }
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null
          }
      }
    },
    {
      isLoading: true,
      isSignout: true,
      userToken: null
    }
  );

  const signInHanler = (username: string, password: string) => {
    const loginFormData = new FormData();
    loginFormData.append('client_id', OAuthConfig.clientId);
    loginFormData.append('grant_type', OAuthConfig.grant_type);
    loginFormData.append('scope', OAuthConfig.scope);
    loginFormData.append('username', username);
    loginFormData.append('password', password);

    AxiosClient.post('http://colo-auth.azurewebsites.net/connect/token', loginFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      const data: ConnectTokenResponse = res.data;
      dispatch({ type: 'SIGN_IN', token: data.access_token });
    }, err => {
      // Toast here
    });
  }

  const signOutHandler = () => {
    dispatch({ type: 'SIGN_OUT' });
  }

  const authContext = React.useMemo(() => (
    {
      signIn: signInHanler,
      signOut: signOutHandler
    }
  ), []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {
          state.userToken ? <HomeStack /> : <AuthStack />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
