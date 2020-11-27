import React from 'react';

const AuthContext = React.createContext({
    signIn: (username: string, password: string) => {},
    signOut: () => {}
});
export default AuthContext;

