import React, { useState } from 'react';
import { ScrollView, Text, View, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';

import styles from './ChatStyle';

import FunnyGiftChat from '@components/FunnyGiftChat';
import FnHeader from '@components/FunnyHeader2';

import { Ionicons } from '@expo/vector-icons';

import colors from '@shared/consts/Colors';
import * as UserService from '@shared/services/UserService';
import ChatMessageModel from '@shared/interfaces/ChatMessageModel';

const defaultAvatar = require('@assets/images/default-avatar.jpg');

import { connect } from 'react-redux';

function ChatScreen(props: any) {
    const [data] = useState(props.route.params.item);
    const [messages, setMessages] = React.useState<ChatMessageModel[]>();

    React.useEffect(() => {

        // get conversations
        UserService.getCommunicationMessages(data.id).then(res => {
            const communicationMessages: ChatMessageModel[] = res.data;
            setMessages(communicationMessages);
        });

    }, []);

    const onSendMessageHandler = (value: string) => {
        const newMessages = messages?.concat({
            userId: '',
            username: props.profile.name,
            message: value
        });
        setMessages(newMessages);
    };

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={
                    Platform.OS === 'ios' ? 'padding' : 'height'
                }
            >
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
                        <FnHeader
                            title={data.name}
                            leftComponent={
                                <TouchableOpacity onPress={
                                    () => props.navigation.goBack()
                                }>
                                    <Ionicons name="md-arrow-back" size={24} color={colors.white} />
                                </TouchableOpacity>
                            }
                        />
                        <ScrollView
                            style={styles.container}
                        >
                            {
                                messages?.map((item: any, index: number) => {
                                    return item.username === props.profile?.name ? (
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
                        <FunnyGiftChat onSend={onSendMessageHandler} />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>
    )
}

const mapStateToProps = (state: any) => {
    return {
        profile: state.profileReducer.profile
    }
}

export default connect(mapStateToProps)(ChatScreen);
