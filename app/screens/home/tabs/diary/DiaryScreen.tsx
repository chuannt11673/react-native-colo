import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as UserService from '@shared/services/UserService';
import { styles } from './DiaryStyle';
import colors from '@shared/consts/Colors';
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';

// components
import FunnyTruncatedText from '@components/FunnyTruncatedText';
import FunnyAvatar from '@components/FunnyAvatar';
import FunnyHeader from '@components/FunnyHeader';
import FunnyImageGrid2 from '@components/FunnyImageGrid2';
import FnButton from '@components/FunnyButton2';

import AxiosClient from 'shared/Axios';

// redux
import { connect } from 'react-redux';
import { updateStatusBar } from '@stores/reducers/StatusBarReducer';

function DiaryScreen(props: any) {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setLoading] = useState(true);

    let _isMounted = false;

    useEffect(() => {
        _isMounted = true;
        UserService.getDiary().then((res: any) => {
            if (res && _isMounted) {
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
        return (
            <View key={index} style={styles.item}>
                <FunnyAvatar uri={item.avatar || item.images[0]} name={item.name} />
                <FunnyImageGrid2 images={item.images} />
                <View style={styles.content}>
                    <FunnyTruncatedText text={item.content} />
                </View>
                <View style={styles.action}>
                    <FnButton
                        title={item.likes.length + ''}
                        icon={
                            <SimpleLineIcons name="heart" size={21} color={colors.secondary} />
                        }
                        containerStyle={styles.actionBtnContainer}
                        titleStyle={styles.actionBtnTitle}
                    />
                    <FnButton
                        title={item.comments.length + ''}
                        icon={
                            <SimpleLineIcons name="bubbles" size={21} color={colors.black} />
                        }
                        containerStyle={styles.actionBtnContainer}
                        titleStyle={styles.actionBtnTitle}
                    />
                    <FnButton
                        title={item.shares.length + ''}
                        icon={
                            <SimpleLineIcons name="cursor" size={21} color={colors.black} />
                        }
                        containerStyle={styles.actionBtnContainer}
                        titleStyle={styles.actionBtnTitle}
                    />
                </View>
            </View>
        )
    }

    return (
        <>
            <FunnyHeader title='Nhật Ký' navigation={props.navigation} />
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
                                        <Text style={styles.headerText}>Hôm nay bạn thế nào?</Text>
                                    </View>
                                </TouchableOpacity>

                                <View style={styles.headerActions}>
                                    <FnButton
                                        title='Photo'
                                        icon={
                                            <FontAwesome name="file-image-o" size={19} color="#00b300" />
                                        }
                                        containerStyle={styles.headerContainer}
                                        titleStyle={styles.headerTitleStyle}
                                    />
                                    <FnButton
                                        title='Video'
                                        icon={
                                            <FontAwesome name="video-camera" size={19} color="#ff1ac6" />
                                        }
                                        containerStyle={styles.headerContainer}
                                        titleStyle={styles.headerTitleStyle}
                                    />
                                    <FnButton
                                        title='Draw'
                                        icon={
                                            <FontAwesome name="paint-brush" size={19} color="#ff1ac6" />
                                        }
                                        containerStyle={styles.headerContainer}
                                        titleStyle={styles.headerTitleStyle}
                                    />
                                </View>
                            </View>
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
