import * as React from 'react';
import AuthContext from '@shared/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from 'navigation/HomeStack';
import AuthStack from 'navigation/AuthStack';
import * as SecureStore from 'expo-secure-store';
import * as OAuth from '@shared/OAuth';

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
  const signInHanler = async (token: string) => {
    await SecureStore.setItemAsync(OAuth.MY_SECURE_AUTH_STATE_KEY, token);
    dispatch({ type: 'SIGN_IN', token: token });
  }
  const signOutHandler = async () => {
    await SecureStore.deleteItemAsync(OAuth.MY_SECURE_AUTH_STATE_KEY);
    await OAuth.signOut();
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
