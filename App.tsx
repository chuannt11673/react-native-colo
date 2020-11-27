import * as React from 'react';
import AuthContext from '@shared/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from 'navigation/HomeStack';
import AuthStack from 'navigation/AuthStack';

import AxiosClient from '@shared/Axios';
import OAuthConfig from '@shared/Config';

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

  const authContext = React.useMemo(() => (
    {
      signIn: async (username: string, password: string) => {
        const form = new FormData();
        form.append('client_id', OAuthConfig.clientId);
        form.append('grant_type', OAuthConfig.grant_type);
        form.append('scope', OAuthConfig.scope);
        form.append('username', username);
        form.append('password', password);
        AxiosClient.post('/connect/token', form).then(res => {
          console.log(res);
        });
      },
      signOut: () => {
        dispatch({ type: 'SIGN_OUT' });
      }
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
