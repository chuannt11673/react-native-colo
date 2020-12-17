import React, { useEffect } from 'react';
import { Modal, ScrollView, Text, View } from 'react-native';
import { Button, Header } from 'react-native-elements';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '@shared/consts/Colors';

import { connect } from 'react-redux';
import { updateProfile } from '@stores/actions/profile';
import FunnyButton from '@components/FunnyButton';
import FunnyImageGalleryModal from 'components/FunnyImageGalleryModal';
import FunnyImageGrid from 'components/FunnyImageGrid';

function UploadProfileImagesScreen(props: any) {
    const [images, setImages] = React.useState<any[]>(props.profile.images ?? []);
    const [modalVisible, setModalVisible] = React.useState(false);
    
    const onSaveHandler = () => {
        const propfile = {
            ...props.profile,
            images: images
        };
        props.updateProfile(propfile);
        props.navigation.navigate('Dating');
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
                            images => {
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
            <ScrollView contentContainerStyle={{
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
                    backgroundColor: colors.white,
                    borderRadius: 12,
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderRightWidth: 5,
                    borderBottomWidth: 5,
                    borderColor: '#e6e6e6',
                    flex: 0.8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 10
                }}>
                    {
                        images?.length === 0 ? <Ionicons name="ios-images" color={colors.border} size={100} /> :
                        (
                            <View style={{
                                width: '100%',
                                height: '100%'
                            }}>
                                <FunnyImageGrid
                                    images={images.map(x => x.uri)}
                                    maxHeight={90}
                                    containerStyle={{
                                        maxHeight: '96%'
                                    }}
                                />
                            </View>
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
            </ScrollView>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer.profile
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (profile) => dispatch(updateProfile(profile))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadProfileImagesScreen);
