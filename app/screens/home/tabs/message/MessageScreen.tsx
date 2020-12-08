import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import * as UserService from '@shared/services/UserService';
import { styles, itemStyles } from './MessageStyle';
import Moment from 'moment';
import FunnyHeader from 'components/FunnyHeader';

const defaultAvatar = require('@assets/images/default-avatar.jpg');
export default function MessageScreen({ navigation }: any) {
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
                    navigation.navigate('Chat', {
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
            <FunnyHeader title='Tin Nhắn' />
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </View>
    )
}
