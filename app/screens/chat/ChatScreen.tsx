import React, { useState } from 'react';
import { ScrollView, Text, View, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';

import styles from './ChatStyle';

import FunnyChat from '@components/FunnyChat';
import FunnyHeader from '@components/FunnyHeader';

import { Button } from 'react-native-elements';

import { Ionicons } from '@expo/vector-icons';

import colors from '@shared/consts/Colors';
import * as UserService from '@shared/services/UserService';
import ChatMessageModel from '@shared/interfaces/ChatMessageModel';
import UserInfoResponseModel from '@shared/interfaces/UserInfoResponseModel';
import CommonConsts from '@shared/consts/CommonConstants';

import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultAvatar = require('@assets/images/default-avatar.jpg');
export default function ChatScreen({ route, navigation }: any) {
    const [data] = useState(route.params.item);
    const [messages, setMessages] = React.useState<ChatMessageModel[]>();
    const [user, setUser] = useState<UserInfoResponseModel>();

    React.useEffect(() => {
        AsyncStorage.getItem(CommonConsts.userInfoKey).then((res) => {
            if (res) {
              const userInfo: UserInfoResponseModel = JSON.parse(res);
              setUser(userInfo);
            };

            // get conversations
            UserService.getCommunicationMessages(data.id).then(res => {
                const communicationMessages : ChatMessageModel[] = res.data;
                setMessages(communicationMessages);
            });
        });
    }, []);

    const onSendMessageHandler = (value: string) => {
        const newMessages = messages?.concat({
            userId: '',
            username: user?.name || '',
            message: value
        });
        setMessages(newMessages);
    };

    return (
        <>
            <TouchableWithoutFeedback
                onPress={
                    () => {
                        Keyboard.dismiss();
                    }
                }
            >
                <View
                    style={{ flex: 1 }}
                >
                    <FunnyHeader
                        title={data.name}
                        leftComponent={
                            <Button
                                icon={
                                    <Ionicons name="md-arrow-back" size={24} color={colors.white} />
                                }
                                buttonStyle={{ backgroundColor: 'transparent' }}
                                onPress={
                                    () => navigation.goBack()
                                }
                            />
                        }
                        rightComponent={
                            <View />
                        }
                    />
                    <ScrollView
                        style={styles.container}
                    >
                        {
                            messages?.map((item: any, index: number) => {
                                return item.username === user?.name ? (
                                    <View key={index} style={[styles.item, { justifyContent: 'flex-end' }, item.isNew ? { marginTop: 5 } : { padding: 5 }]}>
                                        <View style={[styles.message, { marginRight: 10, backgroundColor: '#99ffff' }]}>
                                            <Text style={styles.messageText}>
                                                {item.message}
                                            </Text>
                                        </View>
                                        <Image
                                            style={[styles.avatar]}
                                            source={
                                                item.avatar ? { uri: item.avatar } : defaultAvatar
                                            }
                                        />
                                    </View>
                                ) : (
                                        <View key={index} style={[styles.item, item.isNew ? { marginTop: 5 } : { padding: 0 }]}>
                                            <Image
                                                style={[styles.avatar]}
                                                source={
                                                    item.avatar ? { uri: item.avatar } : defaultAvatar
                                                }
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
                    <FunnyChat onSend={onSendMessageHandler} />
                </View>
            </TouchableWithoutFeedback>
        </>
    )
}
