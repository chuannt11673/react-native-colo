import * as React from 'react';
import AuthContext from '@shared/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from 'navigation/HomeStack';
import AuthStack from 'navigation/AuthStack';
import * as WebBrowser from 'expo-web-browser'
import AxiosClient from 'shared/Axios';
import { makeRedirectUri } from 'expo-auth-session';
WebBrowser.maybeCompleteAuthSession();

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
  const signInHanler = (token?: string) => {
    dispatch({ type: 'SIGN_IN', token: token });
  }
  const returnUrl = makeRedirectUri({
    native: 'colo.app://redirect',
    preferLocalhost: false
  });
  const signOutHandler = async () => {
    await WebBrowser.openAuthSessionAsync(AxiosClient.defaults.baseURL + `/api/Identity/logout?returnUrl=${returnUrl}` , returnUrl);
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
