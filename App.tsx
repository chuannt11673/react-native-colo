import * as React from 'react';
import AuthContext from '@shared/context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from 'navigation/HomeStack';
import AuthStack from 'navigation/AuthStack';
import * as SecureStore from 'expo-secure-store';
import * as OAuth from '@shared/OAuth';
import * as Storage from '@shared/Storage';
import * as WebBrowser from 'expo-web-browser';

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
    SecureStore.setItemAsync(OAuth.MY_SECURE_AUTH_STATE_KEY, token).then(() => {
      Storage.storeUserInfo().then(() => {
        setTimeout(() => {
          dispatch({ type: 'SIGN_IN', token: token });
        }, 600);
      });
    });
  }
  const signOutHandler = async () => {
    OAuth.signOut().then(() => {
      SecureStore.deleteItemAsync(OAuth.MY_SECURE_AUTH_STATE_KEY).then(() => 
      {
        Storage.clear();
        dispatch({ type: 'SIGN_OUT' });
      })
    });
  }
  const authContext = React.useMemo(() => (
    {
      signIn: signInHanler,
      signOut: signOutHandler
    }
  ), []);

  React.useEffect(() => {
    WebBrowser.warmUpAsync();
    SecureStore.getItemAsync(OAuth.MY_SECURE_AUTH_STATE_KEY).then(res => {
      if (res) {
        Storage.getUserInfo().then(_ => {
          dispatch({ type: 'SIGN_IN', token: res });
        });
      }
    });
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

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
