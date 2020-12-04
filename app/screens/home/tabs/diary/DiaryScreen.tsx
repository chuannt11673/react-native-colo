import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as UserService from '@shared/services/UserService';
import FunnyButton from '@components/FunnyButton';
import { styles } from './DiaryStyle';
import colors from '@shared/consts/Colors';
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import FunnyTruncatedText from '@components/FunnyTruncatedText';
import FunnyImageGrid from '@components/FunnyImageGrid';
import FunnyAvatar from '@components/FunnyAvatar';
import FunnyHeader from '@components/FunnyHeader';
import AxiosClient from 'shared/Axios';

export default function DiaryScreen({ navigation }: any) {
    const [data, setData] = useState<any[]>([]);
    useEffect(() => {
        UserService.getDiary().then((res: any) => {
            const values = res.map((item: any) => {
                return {
                    ...item,
                    photos: item.images.map((image: any) => {
                        const url = AxiosClient.defaults.baseURL + image.url.replace('wwwroot', '');
                        return url.replaceAll(`\\`, `/`);
                    })
                }
            });
            setData(values);
        }, err => {
            console.log(err?.response);
        })
    }, []);

    const renderItem = (item: any, index: number) => {
        return (
            <View key={index} style={styles.item}>
                <FunnyAvatar uri={item.avatar} name={item.name} />
                <FunnyImageGrid images={item.photos} />
                <View style={styles.content}>
                    <FunnyTruncatedText text={item.content} />
                </View>
                <View style={styles.action}>
                    <FunnyButton
                        title={item.likes.length + ''}
                        icon={
                            <SimpleLineIcons name="heart" size={21} color={colors.secondary} />
                        }
                    />
                    <FunnyButton
                        title={item.comments.length + ''}
                        icon={
                            <SimpleLineIcons name="bubbles" size={21} color={colors.black} />
                        }
                        onPress={
                            () => navigation.navigate('Comment', { item: item })
                        }
                    />
                    <FunnyButton
                        title={item.shares.length + ''}
                        icon={
                            <SimpleLineIcons name="cursor" size={21} color={colors.black} />
                        }
                    />
                </View>
            </View>
        )
    }

    return (
        <>
            <FunnyHeader title='Nhật Ký' />
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={
                        () => {
                            // navigation.navigate('CreatePost');
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
                        <FunnyButton
                            containerStyle={styles.headerContainer}
                            title='Photo'
                            titleStyle={styles.headerTitleStyle}
                            icon={
                                <FontAwesome name="file-image-o" size={19} color="#00b300" />
                            }
                        />
                        <FunnyButton
                            containerStyle={styles.headerContainer}
                            title='Video'
                            titleStyle={styles.headerTitleStyle}
                            icon={
                                <FontAwesome name="video-camera" size={19} color="#ff1ac6" />
                            }
                        />
                        <FunnyButton
                            containerStyle={styles.headerContainer}
                            title='Paint'
                            titleStyle={styles.headerTitleStyle}
                            icon={
                                <FontAwesome name="paint-brush" size={19} color="#ff1ac6" />
                            }
                        />
                    </View>
                </View>
                {
                    data.map((item, index) => renderItem(item, index))
                }
            </ScrollView>
        </>

    )
}
