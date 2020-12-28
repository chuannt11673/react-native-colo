import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import colors from '@shared/consts/Colors';

import { Header } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';

// components
import FunnyAvatar from '@components/FunnyAvatar';
import FunnyImageGalleryModal from '@components/FunnyImageGalleryModal';
import FunnyImageGrid2 from 'components/FunnyImageGrid2';
import FnButton from '@components/FunnyButton2';

// services
import { createPost } from '@shared/services/UserService';

function CreatePostScreen(props: any) {
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState<{ content: string, images: string[] }>({
        content: '',
        images: []
    });
    const [isSending, setSending] = useState(false);

    useEffect(() => {
    }, []);

    const onPostHandler = () => {
        const form = new FormData();
        form.append('content', data.content);
        data.images.forEach(uri => {
            const file: any = {
                uri: uri,
                name: Math.random().toString(),
                type: 'image/jpeg'
            };
            form.append('images', file);
        });

        setSending(true);
        createPost(form).then(res => {
            setData({
                content: '',
                images: []
            });

            setSending(false);
        });
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={
                Platform.OS === 'ios' ? 'padding' : 'height'
            }
        >
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
                                const updatedData = {
                                    ...data,
                                    images: images.map(item => item.uri)
                                };
                                setData(updatedData);
                                setModalVisible(false);
                            }
                        }
                    />
                </View>
            </Modal>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{
                    flex: 1,
                    backgroundColor: colors.white
                }}>
                    <Header
                        containerStyle={{
                            backgroundColor: colors.white
                        }}
                        centerComponent={
                            <Text style={{ fontSize: 18, fontWeight: '600' }}>Đăng bài</Text>
                        }
                        leftComponent={
                            (
                                <TouchableOpacity onPress={props.navigation.goBack}>
                                    <Ionicons name="md-arrow-back" size={24} color={colors.black}/>
                                </TouchableOpacity>
                            )
                        }
                        rightComponent={
                            (
                                <TouchableOpacity
                                    disabled={isSending}
                                    onPress={
                                        onPostHandler
                                    }
                                >
                                    <Ionicons name="md-send" size={24}
                                        color={
                                            isSending ? colors.border : colors.black
                                        }
                                    />
                                </TouchableOpacity>
                            )
                        }
                    />
                    {/* content */}
                    <ScrollView contentContainerStyle={{
                        flex: 1
                    }}>
                        <FunnyAvatar
                            uri={props.profile.avatar}
                            name={props.profile.name}
                        />
                        <TextInput multiline placeholder='Chia sẻ câu chuyện của bạn..' style={{ width: '100%', minHeight: 46, padding: 15, fontSize: 18 }}
                            onChangeText={
                                value => {
                                    const updatedData = {
                                        ...data,
                                        content: value
                                    };
                                    setData(updatedData);
                                }
                            }
                            value={data.content}
                        />
                        <FunnyImageGrid2 images={data.images} />
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            padding: 15
                        }}>
                            <FnButton
                                title='Thêm ảnh'
                                titleStyle={{ color: '#01a41c' }}
                                containerStyle={{
                                    height: 30,
                                    padding: 12,
                                    backgroundColor: colors.white,
                                    borderWidth: 0.5,
                                    borderRadius: 12,
                                    borderColor: '#01a41c',
                                    marginRight: 10
                                }}
                                onPress={
                                    () => setModalVisible(true)
                                }
                            />
                            <FnButton
                                title='Gắn thẻ'
                                titleStyle={{ color: colors.secondary }}
                                containerStyle={{
                                    height: 30,
                                    padding: 12,
                                    backgroundColor: colors.white,
                                    borderWidth: 0.5,
                                    borderRadius: 12,
                                    borderColor: colors.secondary
                                }}
                            />
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const mapStateToProps = (state: any) => {
    return {
        profile: state.profileReducer.profile
    }
};

export default connect(mapStateToProps)(CreatePostScreen);
