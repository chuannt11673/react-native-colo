import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, Image, StatusBar, FlatList } from 'react-native';
import * as UserService from '@shared/services/UserService';
import { styles, itemStyles } from './MessageStyle';
import Moment from 'moment';
import colors from '@shared/consts/Colors';

export default function MessageScreen({ navigation }: any) {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        UserService.getMesssages().then(res => {
            setData(res);
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
                    <Image source={{ uri: item.avatar }} style={itemStyles.avatar} />
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
            <StatusBar barStyle='light-content' backgroundColor={colors.primary} translucent={true} />
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </View>
    )
}
