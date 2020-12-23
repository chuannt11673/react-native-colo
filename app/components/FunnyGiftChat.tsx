import React from 'react';
import { Keyboard, Modal, SafeAreaView, TextInput, TouchableOpacity, View } from 'react-native';

import colors from '@shared/consts/Colors';

import { FontAwesome, Ionicons } from '@expo/vector-icons';
import FunnyImageGalleryModal from './FunnyImageGalleryModal';

interface FunnyGiftChatProps {
    onSend?: (text: string) => void;
}

export default function FunnyGiftChat(props: FunnyGiftChatProps) {
    const [message, setMessage] = React.useState<string>('');
    const [modalVisible, setModalVisible] = React.useState(false);

    return (
        <SafeAreaView style={{
            backgroundColor: colors.white
        }}>
            <Modal
                animationType="slide"
                visible={modalVisible}
                style={{
                    flex: 1
                }}>
                <View style={{
                    flex: 1
                }}>
                    <FunnyImageGalleryModal
                        onCloseHandler={
                            () => setModalVisible(false)
                        }
                        onSendHandler={
                            (images: any[]) => {
                                setModalVisible(false);
                            }
                        }
                    />
                </View>
            </Modal>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 46,
                borderTopWidth: 0.5,
                borderTopColor: colors.border
            }}>
                {/* text input */}
                <TextInput
                    placeholder='Message'
                    style={{ width: '80%', padding: 10 }}
                    onChangeText={
                        value => setMessage(value)
                    }
                    multiline
                    value={message}
                />
                {/* select images */}
                <TouchableOpacity 
                    style={{ width: 40, alignItems: 'center' }}
                    onPress={
                        () => setModalVisible(true)
                    }
                >
                    <FontAwesome name="image" size={24} color={colors.black} />
                </TouchableOpacity>
                {/* send btn */}
                <TouchableOpacity
                    style={{ width: 46, alignItems: 'center' }}
                    disabled={
                        message === undefined || message === null || message === ''
                    }
                    onPress={
                        () => {
                            if (props.onSend) {
                                props.onSend(message);
                                setMessage('');
                            }
                        }
                    }
                >
                    <Ionicons name="md-send" size={24} color={
                        message !== undefined && message !== null && message !== '' ? colors.black : colors.border
                    } />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
