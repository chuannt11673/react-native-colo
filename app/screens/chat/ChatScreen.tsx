import React from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as UserService from '@shared/services/UserService';
import styles from './ChatStyle';

const defaultAvatar = require('@assets/images/default-avatar.jpg');
export default function ChatScreen({ route, navigation }: any) {
    const [data] = React.useState(route.params.item);
    const [messages, setMessages] = React.useState([]);
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: data.name
        });
    }, []);

    React.useEffect(() => {
        UserService.getCommunicationMessages(data.id).then(res => {
            const communicationMessages = res.data;
            setMessages(communicationMessages);
        });
        
    }, []);

    return (
        <>
            <StatusBar style='auto' />
            <View
                style={{ flex: 1 }}
            >
                <ScrollView
                    style={styles.container}
                >
                    {
                        messages.map((item: any, index: number) => {
                            return item.isMyself ? (
                                <View key={index} style={[styles.item, { justifyContent: 'flex-end' }, item.isNew ? { marginTop: 5 } : { padding: 5 }]}>
                                    <View style={[styles.message, { marginRight: 10, backgroundColor: '#99ffff' }]}>
                                        <Text style={styles.messageText}>
                                            {item.message}
                                        </Text>
                                    </View>
                                    <Image
                                        style={[styles.avatar]}
                                        source={item.isNew ? item.uri : defaultAvatar}
                                    />
                                </View>
                            ) : (
                                    <View key={index} style={[styles.item, item.isNew ? { marginTop: 5 } : { padding: 0 }]}>
                                        <Image
                                            style={[styles.avatar]}
                                            source={item.isNew ? item.uri : defaultAvatar}
                                        />
                                        <View style={[styles.message, { marginLeft: 10, backgroundColor: '#c2d6d6' }]}>
                                            <Text style={styles.messageText}>
                                                {item.message}
                                            </Text>
                                        </View>
                                    </View>
                                )
                        })
                    }
                </ScrollView>
            </View>
        </>
    )
}
