import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import * as UserService from '@shared/services/UserService';
import { styles } from './ProfileStyles';
import colors from '@shared/consts/Colors';
import FunnyImage from '@components/FunnyImage';
import FunnyHeader from 'components/FunnyHeader';

export default function ProfileScreen() {
    const [data, setData] = useState<any>();
    useEffect(() => {
        UserService.getProfile().then(res => {
            setData(res);
        });
    }, []);

    const renderData = () => {
        return (
            <>
                <FunnyImage uri={data.avatar} containerStyle={styles.avatarStyle} />
                <View style={styles.reorderArea}>
                    <View style={styles.reorderTouchMove}>
                        <FontAwesome name='reorder' size={21} color={colors.black} />
                    </View>
                </View>
                <View style={styles.titleArea}>
                    <View>
                        <Text style={styles.titleName}>{data.name}</Text>
                        <Text style={styles.titleInfo}>{data.gender}, {data.age} tuổi</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <SimpleLineIcons name="heart" size={21} color={colors.secondary} />
                        <Text>{data.follows} theo dõi</Text>
                    </View>
                </View>
                <View style={styles.contentArea}>
                    <Text style={styles.contentText}>
                        {data.message}
                    </Text>
                </View>
                <View style={styles.moreInfoView}>
                    <Text style={styles.moreInfoText}>Đang ở {data.address}</Text>
                    <Text style={styles.moreInfoText}>Làm việc tại {data.workAddress}</Text>
                    <Text style={styles.moreInfoText}>Từng học tại {data.college}</Text>
                    <View style={styles.moreInfoButtonView}>
                        {
                            data.hobbies.map((item: any, index: number) => {
                                return <Button key={index} title={item}
                                    titleStyle={styles.moreInfoButtonTitle}
                                    buttonStyle={styles.moreInfoButton}
                                    containerStyle={styles.moreInfoButtonContainer}
                                />
                            })
                        }
                    </View>
                </View>
                {
                    data.photos.map((item: any, index: number) => <FunnyImage key={index} uri={item} />)
                }
            </>
        )
    }

    return (
        <>
            <FunnyHeader title='Cá Nhân' />
            <ScrollView style={styles.container}>
                {
                    data ? renderData() : null
                }
            </ScrollView>
        </>
    )
}
