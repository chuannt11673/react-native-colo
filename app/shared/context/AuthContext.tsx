import React from 'react';

const AuthContext = React.createContext({
    signIn: (token:string) => {},
    signOut: () => {}
});
export default AuthContext;

