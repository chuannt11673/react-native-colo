import React from 'react';
import { FlatList, View, Image, Text, ActivityIndicator, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import colors from '@shared/consts/Colors';

import * as MediaLibrary from 'expo-media-library';

import { connect } from 'react-redux';
import { updateImagesGallery } from '@stores/actions/imageGallery';

import { FontAwesome } from '@expo/vector-icons';

const imageSize = Dimensions.get('screen').width * 0.333;
interface FunnyImageGalleryModalProps {
    onSelectImage?: (uri: string) => void;
    images: any[];
    updateImages: (images: any[]) => void;
}

function ImageItem({ item }) {
    const [data, setData] = React.useState({
        ...item,
        selected: false
    });
    const onPressHandler = () => {
        const updatedData  = {
            ...data,
            selected: !data.selected
        };
        setData(updatedData);
    };

    return (
        <TouchableOpacity
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
                        <FontAwesome name="check-circle-o" size={24} color='#4d4dff' style={{
                            position: 'absolute',
                            bottom: 5,
                            right: 5
                        }} />
                    ) : null
                }
            </View>
        </TouchableOpacity>
    );
}

function FunnyImageGalleryModal(props: FunnyImageGalleryModalProps) {
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
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
            {
                props.images.length > 0 ? (
                    <ScrollView
                        contentContainerStyle={{
                            flexDirection: 'row',
                            flexWrap: 'wrap'
                        }}
                        onScrollEndDrag={
                            onEndReachHandler
                        }
                    >
                        {
                            props.images.map((item, index) => <ImageItem key={index} item={item} />)
                        }
                    </ScrollView>
                ) : (
                        <View style={{ flex: 1, backgroundColor: colors.white }}>
                            <Text>There's no image</Text>
                        </View>
                    )
            }
        </View>
    )
};

const mapStateToProps = (state) => {
    return {
        images: state.imageGalleryReducer.images
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateImages: (images: any[]) => dispatch(updateImagesGallery(images))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FunnyImageGalleryModal);
