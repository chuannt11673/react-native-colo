import React, { useEffect, useState, useRef, PureComponent } from 'react';
import { View, Keyboard, Animated, TextInput, Image, FlatList, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';

import * as MediaLibrary from 'expo-media-library';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import EmojiSelector, { Categories } from 'react-native-emoji-selector';

import FunnyButton from '@components/FunnyButton';

import colors from '@shared/consts/Colors';

const modes = {
    emoji: 1,
    photo: 2,
    video: 3
};

interface LocalImageProps {
    item: any;
}
class LocalImage<P extends LocalImageProps> extends PureComponent<P> {
    render() {
        return (
            <TouchableOpacity
                style={{
                    width: windowWidth * 0.2,
                    height: windowWidth * 0.2,
                    borderWidth: 2,
                    borderColor: colors.white
                }}
            >
                <Image source={{ uri: this.props.item.uri }} style={{
                    width: '100%',
                    height: '100%'
                }} />
            </TouchableOpacity>
        );
    }
}


export default function FunnyChat() {
    const [textValue, setTextValue] = useState('');
    const [initialHeight, setInitialHeight] = useState(0);
    const [height, setKeyboardHeight] = useState(0);
    const [isKeyboardShown, setKeyboardShown] = useState(false);
    const [mode, setMode] = useState(modes.emoji);
    const inputRef = React.createRef<TextInput>();

    const animatedHeight = useRef(new Animated.Value(0)).current;

    const [images, setImages] = useState<any[]>([]);

    useEffect(() => {
        _chatToggle();
    }, [height]);

    useEffect(() => {
        setImages([]);
        getImages();
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
        return () => {
            Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
        }
    }, []);

    const _keyboardDidShow = (event: any) => {
        if (initialHeight === 0)
            setInitialHeight(event.endCoordinates.height);

        setKeyboardHeight(event.endCoordinates.height);
        setKeyboardShown(true);
    }

    const _keyboardDidHide = () => {
        setKeyboardShown(false);
    }

    const _chatToggle = () => {
        Animated.timing(
            animatedHeight,
            {
                toValue: height,
                duration: 200,
                useNativeDriver: false,
            }
        ).start();
    };

    const renderEmoji = () => {
        return (
            <EmojiSelector
                category={Categories.emotion}
                showSearchBar={false}
                showSectionTitles={false}
                columns={10}
                showTabs={false}
                onEmojiSelected={
                    (emoji) => setTextValue(`${textValue}${emoji}`)
                }
            />
        )
    };

    const renderImages = () => {
        return (
            <View style={{ flex: 1, width: '100%' }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{
                            flex: 1,
                            flexWrap: "wrap",
                            flexDirection: "row",
                            alignItems: "flex-start"
                        }}>
                            <FlatList
                                style={{ flex: 1 }}
                                contentContainerStyle={{ paddingBottom: 10 }}
                                data={images}
                                initialNumToRender={10}
                                renderItem={
                                    item => <LocalImage item={item.item} />
                                }
                                horizontal={false}
                                numColumns={5}
                                keyboardShouldPersistTaps={"always"}
                                removeClippedSubviews
                                onEndReached={getImages}
                            />
                        </View>
                    </View>
                </View>
            </View>
        )
    };

    const getImages = () => {
        const lastItem: any = images[images.length - 1];
        const options = {
            after: lastItem ? lastItem.id : null
        };

        MediaLibrary.requestPermissionsAsync().then(_ => {
            MediaLibrary.getAssetsAsync(options).then((res: any) => {
                const imagesRes = images.concat(res.assets);
                setImages(imagesRes);
            })
        });
    };

    const modeToggleHandler = (modeValue: any) => {
        if (isKeyboardShown) {
            Keyboard.dismiss();
            setMode(modeValue);
        } else {
            if (mode === modeValue) {
                setKeyboardHeight(height === 0 ? initialHeight : 0);
            } else {
                setMode(modeValue);
                if (height === 0)
                    setKeyboardHeight(initialHeight);
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Button
                        buttonStyle={{ backgroundColor: 'white' }}
                        icon={
                            <AntDesign name="user" size={23} style={styles.emojiIcon} />
                        }
                        onPress={
                            () => modeToggleHandler(modes.emoji)
                        }
                    />
                    <TextInput
                        ref={inputRef}
                        value={textValue}
                        style={styles.textInput}
                        placeholder='Cảm xúc / Hoạt động'
                        autoFocus={true}
                        onChangeText={
                            (text) => setTextValue(text)
                        }
                    />
                </View>
                <View style={styles.headerRight}>
                    <FunnyButton
                        icon={
                            <FontAwesome name="file-image-o" size={23} style={styles.imageIcon} />
                        }
                        onPress={
                            () => modeToggleHandler(modes.photo)
                        }
                    />
                    <FunnyButton
                        icon={
                            <FontAwesome name="video-camera" size={23} style={styles.videoIcon} />
                        }
                    />
                </View>
            </View>
            <Animated.FlatList
                style={{
                    height: animatedHeight
                }}
                data={[
                    { id: '1' }
                ]}
                keyExtractor={item => item.id}
                renderItem={
                    () => (
                        mode === modes.emoji ? renderEmoji() : renderImages()
                    )
                }
            />
        </View>
    )
}

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        backgroundColor: colors.white,
        borderTopColor: colors.border,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },
    headerLeft: {
        width: '60%',
        flexDirection: 'row'
    },
    headerRight: {
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    emojiIcon: {
        color: colors.secondary
    },
    textInput: {
        marginLeft: 10,
        minWidth: 200
    },
    imageIcon: {
        color: '#00b300',
    },
    videoIcon: {
        color: '#ff1ac6'
    },
})
