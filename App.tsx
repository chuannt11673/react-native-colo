import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AuthContext from '@shared/context/AuthContext';

// services
import { SignIn } from '@shared/services/AuthenticationService';

// navigation
import HomeStack from 'navigation/HomeStack';
import AuthStack from 'navigation/AuthStack';
import * as WebBrowser from 'expo-web-browser';

// actions
import { signIn, signOut, retrieveToken, UserInfo } from '@stores/reducers/AuthReducer';

// redux
import configuredStore from '@stores/index';
import { Provider, connect } from 'react-redux';
import AxiosClient from 'shared/Axios';

const store = configuredStore();
WebBrowser.maybeCompleteAuthSession();

function Auth(props: any) {

  React.useEffect(() => {
    // warnup browser
    WebBrowser.warmUpAsync();

    // retrieve token
    props.retrieveToken().then();

    // unauthorize handler
    AxiosClient.interceptors.response.use(undefined, async (err) => {
      const error = err.response;
      if (error.status === 401)
        await authContext.signOut();
    });

    return () => {
      WebBrowser.coolDownAsync();
    }
  }, []);

  const authContext = React.useMemo(() => {
    return {
      singIn: async (username: string, password: string, callback: (err: string) => void) => {
        // sign in
        SignIn(username, password).then( async res => {
          const userInfo = {
            username: username,
            token: res.access_token,
            isLoading: false
          };
          await signIn(userInfo);
        });
      },
      signInToken: async (token: string) => {
        const userInfo = {
          username: '',
          token: token
        };
        await props.signIn(userInfo);
      },
      signOut: async () => {
        await props.signOut();
      }      
    }
  }, []);

  if (props.authInfo.isLoading) {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <ActivityIndicator size='small' />
      </View>
    )
  }

  return (
    <>
      <StatusBar style={props.statusBar.style} translucent={true} />
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {
            props.authInfo.token ? <HomeStack /> : <AuthStack />
          }
        </NavigationContainer>
      </AuthContext.Provider>
    </>
  )
}

const mapStateToAuthProps = (state: any) => {
  return {
    authInfo: state.authReducer,
    statusBar: state.statusBarReducer 
  }
}

const mapDispatchToAuthProps = (dispatch: any) => {
  return {
    signIn: async (userInfo: UserInfo) => dispatch(await signIn(userInfo)),
    retrieveToken: async () => dispatch(await retrieveToken()),
    signOut: async () => dispatch(await signOut())
  }
}

const AuthMapped = connect(mapStateToAuthProps, mapDispatchToAuthProps)(Auth);

export default function App() {
  return (
    <Provider store={store}>
      <AuthMapped />
    </Provider>
  );
}
