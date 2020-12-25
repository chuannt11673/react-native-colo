import React from 'react';
import { FlatList, View, Image, Text, ActivityIndicator, Dimensions, TouchableWithoutFeedback } from 'react-native';
import colors from '@shared/consts/Colors';

import * as MediaLibrary from 'expo-media-library';

import { connect } from 'react-redux';

import { MaterialIcons } from '@expo/vector-icons';
import { Button, Header } from 'react-native-elements';
import { updateImagesGallery } from '@stores/reducers/ImageGalleryReducer';

const imageSize = Dimensions.get('screen').width * 0.333;
interface FunnyImageGalleryModalProps {
    onSelectImage?: (uri: string) => void;
    onCloseHandler?: () => void;
    onSendHandler?: (images: any[]) => void; 
    images: any[];
    updateImages: (images: any[]) => void;
}

function ImageItem(props: any) {
    const [data, setData] = React.useState({
        ...props.item,
        selected: false
    });
    const onPressHandler = () => {
        const updatedData  = {
            ...data,
            selected: !data.selected
        };
        setData(updatedData);
        if (updatedData.selected) {
            props.onSelect(updatedData);
        } else {
            props.onDeSelect(updatedData);
        }
    };

    return (
        <TouchableWithoutFeedback
            onPress={
                onPressHandler
            }
        >
            <View style={{
                width: imageSize,
                height: imageSize,
                borderWidth: 1,
                borderColor: colors.border
            }}>
                <Image source={{ uri: data.uri }} style={{
                    width: '100%',
                    height: '100%'
                }} />
                {
                    data.selected ? (
                        <MaterialIcons name="radio-button-checked" size={24} color='#0000ff' style={{
                            position: 'absolute',
                            top: 5,
                            right: 5
                        }} />
                    ) : <MaterialIcons name="radio-button-unchecked" size={24} color='#cccccc' style={{
                        position: 'absolute',
                        top: 5,
                        right: 5
                    }} />
                }
            </View>
        </TouchableWithoutFeedback>
    );
}

function FunnyImageGalleryModal(props: FunnyImageGalleryModalProps) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [selectedImages, setSelectedImages] = React.useState<any[]>([]);

    React.useEffect(() => {
        setSelectedImages([]);
        if (props.images.length === 0) {
            MediaLibrary.getAssetsAsync().then(res => {
                const assets = res.assets;
                props.updateImages(assets);
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            });
        } else {
            setIsLoading(false);
        }
    }, []);

    const onEndReachHandler = () => {
        const currentLenght = props.images.length;
        const lastItem: any = props.images[currentLenght - 1];
        const options = {
            after: lastItem ? lastItem.id : null
        };

        MediaLibrary.requestPermissionsAsync().then(_ => {
            MediaLibrary.getAssetsAsync(options).then((res: any) => {
                const assets = res.assets;
                props.updateImages(assets);
            })
        });
    };

    const onSelectImageHandler = (item: any) => {
        const selectedImagesTemp = selectedImages?.concat([item]);
        setSelectedImages(selectedImagesTemp);
    };

    const onDeselectImageHandler = (item: any) => {
        const index = selectedImages?.findIndex(x => x.id === item.id);
        if (index !== -1) {
            selectedImages?.splice(index, 1);
            setSelectedImages(selectedImages);
        }
    }

    if (isLoading) {
        return (
            <View style={{
                flex: 1,
                backgroundColor: colors.white,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size='small' />
            </View>
        )
    };

    return (
        <View style={{
            flex: 1
        }}>
            <Header
                containerStyle={{
                    backgroundColor: 'rgba(52, 52, 52, 0.8)'
                }}
                style={{
                    backgroundColor: 'transparent'
                }}
                leftComponent={
                    (
                        <Button
                            buttonStyle={{
                                backgroundColor: 'transparent',
                                padding: 0
                            }}
                            icon={
                                <MaterialIcons name="close" size={31} color={colors.white} />
                            }
                            onPress={
                                props.onCloseHandler
                            }
                        />
                    )
                }
                rightComponent={
                    (
                        <Button
                            buttonStyle={{
                                backgroundColor: 'transparent',
                                padding: 0
                            }}
                            icon={
                                <MaterialIcons name="send" size={31} color={colors.white} />
                            }
                            onPress={
                                () => {
                                    if (props.onSendHandler && selectedImages) {
                                        props.onSendHandler(selectedImages);
                                    }
                                }
                            }
                        />
                    )
                }
            />
            {
                props.images.length > 0 ? (
                    <FlatList
                        data={props.images}
                        keyExtractor={
                            item => `${item.id}`
                        }
                        numColumns={3}
                        renderItem={
                            item => <ImageItem item={item.item} onSelect={onSelectImageHandler} onDeSelect={onDeselectImageHandler} />
                        }
                        onEndReached={
                            onEndReachHandler
                        }
                        onEndReachedThreshold={0.1}
                    />
                ) : (
                        <View style={{ flex: 1, backgroundColor: colors.white }}>
                            <Text>There's no image</Text>
                        </View>
                    )
            }
        </View>
    )
};

const mapStateToProps = (state: any) => {
    return {
        images: state.imageGalleryReducer.images
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateImages: (images: any[]) => dispatch(updateImagesGallery(images))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FunnyImageGalleryModal);
