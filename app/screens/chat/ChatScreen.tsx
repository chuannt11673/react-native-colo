import React from 'react';
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';


export default function ChatScreen({ route, navigation }: any) {

    React.useLayoutEffect(() => {
        const data = route.params.item;
        navigation.setOptions({
            title: data.name
        });
    }, []);

    return (
        <>
            <StatusBar style='auto' />
            <View>
                <Text></Text>
            </View>
        </>
    )
}
