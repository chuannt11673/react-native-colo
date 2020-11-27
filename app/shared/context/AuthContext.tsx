import React from 'react';

const AuthContext = React.createContext({
    signIn: async (username: string, password: string) => {},
    signOut: () => {}
});
export default AuthContext;

