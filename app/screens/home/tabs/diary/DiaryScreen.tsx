import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View, Image, FlatList, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import * as UserService from '@shared/services/UserService';
import { styles } from './DiaryStyle';
import colors from '@shared/consts/Colors';
import { Entypo, FontAwesome, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

// components
import FunnyTruncatedText from '@components/FunnyTruncatedText';
import FunnyAvatar from '@components/FunnyAvatar';
import FunnyImageGrid2 from '@components/FunnyImageGrid2';
import FnButton from '@components/FunnyButton2';

import AxiosClient from 'shared/Axios';

import { getStories } from '@shared/services/UserService';

// redux
import { connect } from 'react-redux';
import { updateStatusBar } from '@stores/reducers/StatusBarReducer';

function DiaryHeader() {
    return (
        <View style={{
            width: '100%',
            height: 90,
            backgroundColor: colors.white,
        }}>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                padding: 15
            }}>
                <View style={{ width: 60, height: 60, justifyContent: 'flex-end' }}>
                </View>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity>
                        <FontAwesome name="search" size={24} color="black" style={{ opacity: 0.6, width: 30 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name="bars" size={24} color="black" style={{ opacity: 0.6, width: 30, textAlign: 'right' }} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

function DiaryStories() {
    const [data, setData] = useState<any[]>([]);
    useEffect(() => {
        getStories().then(data => {
            setData(data);
        });
    }, []);

    return (
        <View style={{
            width: '100%',
            height: 130,
        }}>
            <FlatList
                contentContainerStyle={{
                    alignItems: 'center',
                    padding: 10
                }}
                data={data}
                horizontal
                renderItem={
                    ({ item, index }) => (
                        <TouchableOpacity
                            key={index}
                            onPress={
                                event => {}
                            }
                        >
                            <View style={{
                                width: 80,
                                height: 110,
                                borderRadius: 8,
                                overflow: 'hidden',
                                marginRight: 10
                            }}>
                                <Image source={{ uri: item.storyUrl }} style={{
                                    flex: 1,
                                    justifyContent: 'center'
                                }} />
                            </View>
                        </TouchableOpacity>
                    )
                }
            />
        </View>
    )
}

function DiaryDivision() {
    return (
        <View style={{
            width: '100%',
            height: 4,
            backgroundColor: colors.border,
            opacity: 0.6
        }} />
    )
}

function DiaryScreen(props: any) {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setLoading] = useState(true);

    let _isMounted = false;

    useEffect(() => {
        _isMounted = true;
        UserService.getDiary().then((res: any) => {
            if (res && _isMounted) {
                res = res.filter((item: any) => item.content || item.images.length > 0);
                const values = res.map((item: any) => {
                    return {
                        ...item,
                        images: item.images.map((image: any) => {
                            const url = item.name === 'SystemAdmin' ? `${AxiosClient.defaults.baseURL}/${image.url}` : image.url;
                            return url;
                        })
                    }
                });
                setData(values);
            }
            setLoading(false);
        });

        return () => {
            _isMounted = false;
        }
    },
        []);

    const renderItem = (item: any, index: number) => {
        let action = undefined;
        if (item.images && item.images.length > 0) {
            action = `đã đăng ${item.images.length} ảnh mới`;
        }
        return (
            <View key={index} style={styles.item}>
                <FunnyAvatar uri={item.avatar || item.images[0]}
                    name={item.name}
                    action={action}
                    localtion='Hà nội'
                />
                {
                    item.content ? (
                        <View style={styles.content}>
                            <FunnyTruncatedText text={item.content} />
                        </View>
                    ) : null
                }
                <FunnyImageGrid2 images={item.images} />
                <View style={styles.action}>
                    <FnButton
                        title={item.likes.length + ''}
                        icon={
                            <SimpleLineIcons name="heart" size={21} color={colors.secondary} />
                        }
                        containerStyle={styles.actionBtnContainer}
                        titleStyle={styles.actionBtnTitle}
                        buttonStyle={{ justifyContent: 'flex-start', paddingLeft: 10 }}
                    />
                    <FnButton
                        title='Bình luận'
                        icon={
                            <FontAwesome name="comment" size={21} color={colors.blue} />
                        }
                        containerStyle={styles.actionBtnContainer}
                        titleStyle={styles.actionBtnTitle}
                    />
                    <FnButton
                        title='Chia sẻ'
                        icon={
                            <MaterialCommunityIcons name="share" size={21} color={colors.black} style={{ opacity: 0.6 }} />
                        }
                        containerStyle={styles.actionBtnContainer}
                        titleStyle={styles.actionBtnTitle}
                        buttonStyle={{ justifyContent: 'flex-end', paddingRight: 10 }}
                    />
                </View>
            </View>
        )
    }

    return (
        <>
            <DiaryHeader />
            <DiaryDivision />
            {
                isLoading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size='small' />
                    </View>
                ) : (
                        <ScrollView style={styles.container}>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={
                                    () => {
                                        props.navigation.navigate('CreatePost');
                                    }
                                }>
                                    <View style={styles.headerAvatar}>
                                        <FunnyAvatar
                                            uri='https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
                                        />
                                        <Text style={styles.headerText}>Chia sẻ câu chuyện của bạn...</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{
                                    width: '95%',
                                    borderTopColor: colors.border,
                                    borderTopWidth: 1.5,
                                    opacity: 0.6,
                                    alignSelf: 'center'
                                }} />
                                <View style={styles.headerActions}>
                                    <FnButton
                                        title='Ảnh'
                                        icon={
                                            <FontAwesome name="file-image-o" size={19} color="#00b300" />
                                        }
                                        containerStyle={styles.headerContainer}
                                        titleStyle={styles.headerTitleStyle}
                                    />
                                    <FnButton
                                        title='Video'
                                        icon={
                                            <MaterialIcons name="video-library" size={19} color="#ff1ac6" />
                                        }
                                        containerStyle={styles.headerContainer}
                                        titleStyle={styles.headerTitleStyle}
                                    />
                                    <FnButton
                                        title='Link'
                                        icon={
                                            <Entypo name="link" size={19} color={colors.blue} />
                                        }
                                        containerStyle={styles.headerContainer}
                                        titleStyle={styles.headerTitleStyle}
                                    />
                                </View>
                            </View>
                            <DiaryDivision />
                            
                            {/* stories */}
                            <DiaryStories />

                            <DiaryDivision />
                            {
                                data.map((item, index) => renderItem(item, index))
                            }
                        </ScrollView>
                    )
            }
        </>
    )
}

const mapStateToProps = (state: any) => {
    return {
        profile: state.profileReducer.profile,
        statusBar: state.statusBarReducer
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateStatusBar: (data: any) => {
            dispatch(updateStatusBar(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiaryScreen);
