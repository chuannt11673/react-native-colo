import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

import colors from '@shared/consts/Colors';

import { Header, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';

// components
import FunnyAvatar from '@components/FunnyAvatar';
import FunnyImageGalleryModal from '@components/FunnyImageGalleryModal';
import FunnyImageGrid from 'components/FunnyImageGrid';

// services
import { createPost } from '@shared/services/UserService';

function CreatePostScreen(props: any) {
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState<{ content: string, images: string[] }>({
        content: '',
        images: []
    });

    useEffect(() => {
    }, []);

    const onPostHandler = () => {
        const form = new FormData();
        form.append('content', data.content);
        data.images.forEach(uri => {
            const file: any = {
                uri: uri,
                name: Math.random().toString(),
                type: ''
            };
            form.append('images', file);
        });

        createPost(form).then(res => {
            console.log(res);
            setData({
                content: '',
                images: []
            });
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
                                <Ionicons name="md-arrow-back" size={24} color={colors.black} onPress={
                                    props.navigation.goBack
                                } />
                            )
                        }
                        rightComponent={
                            (
                                <Ionicons name="md-send" size={24} color={colors.black}
                                    onPress={
                                        onPostHandler
                                    }
                                />
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
                        <FunnyImageGrid images={data.images} maxHeight={100} containerStyle={{ height: 'auto', maxHeight: '50%' }} />
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            padding: 15
                        }}>
                            <Button
                                title='Thêm ảnh'
                                titleStyle={{ color: '#01a41c' }}
                                buttonStyle={{
                                    paddingTop: 6,
                                    paddingBottom: 6,
                                    backgroundColor: colors.white,
                                    borderWidth: 1,
                                    borderRadius: 12,
                                    borderColor: '#01a41c'
                                }}
                                containerStyle={{
                                    marginRight: 5
                                }}
                                onPress={
                                    () => setModalVisible(true)
                                }
                            />
                            <Button
                                title='Gắn thẻ'
                                titleStyle={{ color: colors.secondary }}
                                buttonStyle={{
                                    paddingTop: 6,
                                    paddingBottom: 6,
                                    backgroundColor: colors.white,
                                    borderWidth: 1,
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
