import React from 'react';
import { ActivityIndicator, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button, Header } from 'react-native-elements';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '@shared/consts/Colors';

import FunnyButton from '@components/FunnyButton';
import FunnyImageGalleryModal from '@components/FunnyImageGalleryModal';

import { connect } from 'react-redux';
import { editProfile } from '@shared/services/UserService';
import { updateProfile } from '@stores/reducers/ProfileReducer';

function UploadProfileImagesScreen(props: any) {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [images, setImages] = React.useState<any[]>(props.profile.images);
    const [isUpdating, setUpdating] = React.useState(false);

    const onSaveHandler = () => {
        const profile = {
            ...props.profile,
            images: images.map(item => ({
                filename: item.filename,
                uri: item.uri
            }))
        };

        const form = new FormData();
        form.append('name', profile.name);
        form.append('gender', profile.gender);
        form.append('dob', `01/01/${profile.dob}`);
        form.append('briefMessage', profile.briefMessage);
        form.append('address', profile.address);
        form.append('workAddress', profile.workAddress);
        form.append('college', profile.college);
        form.append('hobbies', profile.hobbies);

        if (images !== props.profile.images) {
            images.forEach(element => {
                const file: any = {
                    uri: element.uri,
                    name: element.filename,
                    type: ''
                };
                form.append('images', file);
            });
        }

        setUpdating(true);
        editProfile(form).then(res => {
            props.updateProfile(profile);
            props.navigation.navigate('Dating');

            setUpdating(false);
        }, err => {
            setUpdating(false);
            throw err.response;
        });
    };

    const addImagesHandler = async () => {
        setModalVisible(true);
    };

    return (
        <>
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
                                setImages(images);
                                setModalVisible(false);
                            }
                        }
                    />
                </View>
            </Modal>
            <Header
                containerStyle={{
                    backgroundColor: colors.white
                }}
                centerComponent={
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>Ảnh hồ sơ</Text>
                }
                leftComponent={
                    <Button
                        icon={
                            <Ionicons name="md-arrow-back" size={24} color={colors.black} />
                        }
                        buttonStyle={{ backgroundColor: 'transparent' }}
                        onPress={
                            () => props.navigation.goBack()
                        }
                    />
                }
                rightComponent={
                    <View />
                }
            />
            <View style={{
                flex: 1,
                padding: 25,
                backgroundColor: colors.white
            }}>
                <Text style={{
                    fontSize: 14,
                    fontWeight: '600',
                }}>Thêm ảnh vào hồ sơ để chinh phục đối phương nào</Text>
                <View style={{
                    width: '100%',
                    marginTop: 20,
                    borderRadius: 12,
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderRightWidth: 5,
                    borderBottomWidth: 5,
                    borderColor: '#e6e6e6',
                    backgroundColor: colors.white,
                    flex: 0.8,
                    alignItems: 'center'
                }}>
                    {
                        !images || images.length === 0 ? <Ionicons name="ios-images" color={colors.border} size={100} /> :
                            (
                                <ScrollView contentContainerStyle={{
                                    flex: 0.8,
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    justifyContent: 'flex-start',
                                    padding: 8
                                }}>
                                    {
                                        images.map((image, index) => (
                                            <TouchableOpacity key={index}>
                                                <View>
                                                    <Image source={{ uri: image.uri }} style={{
                                                        width: 100, height: 100
                                                    }} />
                                                </View>
                                            </TouchableOpacity>
                                        ))
                                    }
                                </ScrollView>
                            )
                    }
                    <FunnyButton
                        containerStyle={{
                            position: 'absolute',
                            bottom: 10
                        }}
                        buttonStyle={{
                            borderWidth: 1,
                            borderRadius: 12,
                            paddingLeft: 10,
                            paddingRight: 10,
                            backgroundColor: '#0000b3',
                        }}
                        title='Thêm ảnh'
                        titleStyle={{
                            color: colors.white,
                            marginLeft: 5
                        }}
                        icon={
                            <MaterialCommunityIcons name="image-plus" size={24} color={colors.white} />
                        }
                        onPress={
                            addImagesHandler
                        }
                    />
                </View>
                {
                    isUpdating ? (
                        <TouchableOpacity style={{
                            marginTop: 30,
                            width: '100%',
                            height: 50,
                            justifyContent: 'center',
                            backgroundColor: colors.primary,
                            borderRadius: 12,
                        }}>
                            <ActivityIndicator size='small' color={colors.white} />
                        </TouchableOpacity>
                    ) : 
                    (
                        <FunnyButton
                            containerStyle={{
                                marginTop: 30,
                                width: '100%',
                            }}
                            buttonStyle={{
                                backgroundColor: colors.primary,
                                borderRadius: 12,
                                width: '100%',
                                height: 50
                            }}
                            titleStyle={{
                                color: colors.white
                            }}
                            title='Hoàn thành'
                            onPress={
                                onSaveHandler
                            }
                        />
                    )
                }
            </View>
        </>
    )
}

const mapStateToProps = (state: any) => {
    return {
        profile: state.profileReducer.profile
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateProfile: (profile: any) => dispatch(updateProfile(profile))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadProfileImagesScreen);
