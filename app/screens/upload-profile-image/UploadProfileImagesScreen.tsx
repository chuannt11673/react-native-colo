import React from 'react';
import { Alert, FlatList, Modal, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import { Button } from 'react-native-elements';

import FunnyHeader from '@components/FunnyHeader';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '@shared/consts/Colors';

import { connect } from 'react-redux';
import { updateProfile } from '@stores/actions/profile';
import FunnyButton from '@components/FunnyButton';

import * as MediaLibrary from 'expo-media-library';

function UploadProfileImagesScreen(props: any) {
    const [images, setImages] = React.useState<any[]>();
    const [modalVisible, setModalVisible] = React.useState(false);
    
    const onSaveHandler = () => {
    };

    const addImagesHandler = async () => {
        const response = await MediaLibrary.getAssetsAsync();
        setImages(response.assets);
        setModalVisible(true);
    };

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <Button title='close' />
                <FlatList
                    contentContainerStyle={{
                        flex: 1,
                        backgroundColor: colors.secondary
                    }}
                    data={images}
                    keyExtractor={item => item.id}
                    renderItem={
                        item => (
                            <View>
                                <Text>{item.item.uri}</Text>
                            </View>
                        )
                    }
                />
            </Modal>
            <FunnyHeader
                title='Ảnh hồ sơ'
                leftComponent={
                    <Button
                        icon={
                            <Ionicons name="md-arrow-back" size={24} color={colors.white} />
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
                alignItems: 'center',
                padding: 20,
                backgroundColor: colors.white
            }}>
                <Text style={{
                    fontSize: 15,
                    fontWeight: '600',
                }}>Thêm ảnh vào hồ sơ để chinh phục đối phương nào</Text>
                <View style={{
                    width: '100%',
                    height: 400,
                    marginTop: 20,
                    backgroundColor: colors.white,
                    borderRadius: 12,
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderRightWidth: 5,
                    borderBottomWidth: 5,
                    borderColor: '#e6e6e6',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Ionicons name="ios-images" color={colors.border} size={100} />
                    <FunnyButton
                        containerStyle={{
                            top: 100
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
