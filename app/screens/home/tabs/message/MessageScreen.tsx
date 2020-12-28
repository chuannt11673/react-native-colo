import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import { styles, itemStyles } from './MessageStyle';
import Moment from 'moment';

import FnHeader from '@components/FunnyHeader2';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import colors from '@shared/consts/Colors';
import * as UserService from '@shared/services/UserService';

const defaultAvatar = require('@assets/images/default-avatar.jpg');
export default function MessageScreen(props: any) {
    const [data, setData] = useState<any[]>([]);
    useEffect(() => {
        UserService.getMesssages().then((res: any) => {
            if (!res)
                return;
            
            const responseData = res?.data?.map((item: any) => {
                return {
                    ...item,
                    avatar: null,
                    message: item.latestMessage
                }
            });
            setData(responseData);
        }, err => {
            return;
        })
    }, []);

    const renderItem = (value: any) => {
        const item = value.item;
        return (
            <TouchableOpacity onPress={
                () => {
                    props.navigation.navigate('Chat', {
                        item: {
                            ...item,
                            time: null
                        }
                    })
                }
            }>
                <View style={itemStyles.item}>
                    <Image source={ item.avatar ? { uri: item.avatar } : defaultAvatar } style={itemStyles.avatar} />
                    <Text style={itemStyles.name}>
                        {item.name}
                    </Text>
                    <Text numberOfLines={1} style={itemStyles.message}>
                        {item.message}
                    </Text>
                    <Text style={itemStyles.time}>
                        {
                            Moment(item.time).format('MMM Do YY')
                        }
                    </Text>
                    <View style={itemStyles.badge}>
                        <Text style={itemStyles.text}>2</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <FnHeader
                title='Nhật ký'
                leftComponent={
                    <TouchableOpacity onPress={
                        () => props.navigation.openDrawer()
                    }>
                        <FontAwesome name="bars" size={21} color={colors.white} />
                    </TouchableOpacity>
                }
                rightComponent={
                    <TouchableOpacity>
                        <Ionicons name="md-notifications" size={24} color={colors.white} />
                    </TouchableOpacity>
                }
            />
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </View>
    )
}
