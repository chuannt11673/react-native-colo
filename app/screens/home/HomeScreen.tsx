import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import AuthContext from '@shared/context/AuthContext';
export default function HomeScreen() {
    const { signOut } = React.useContext(AuthContext);
    return (
        <View>
            <Text>Home page</Text>
            <Button
                title='SignOut'
                onPress={
                    signOut
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({})
