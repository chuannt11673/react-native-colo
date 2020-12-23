import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, ActivityIndicator, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from './ProfileStyles';
import colors from '@shared/consts/Colors';
import FunnyImage from '@components/FunnyImage';
import FunnyHeader from 'components/FunnyHeader';

import { getProfile } from '@shared/services/UserService';
import AxiosClient from '@shared/Axios';

import { connect } from 'react-redux';
import { updateProfile } from '@stores/actions/profile';

function ProfileScreen({ navigation, profile, updateProfile }: any) {
    const [isLoading] = useState(false);

    useEffect(() => {
        if (profile && profile.name) {
            return;
        }

        getProfile().then(res => {
            const item = res.data;
            const profile = {
                ...item,
                images: item.images.map((image: any) => ({
                    ...image,
                    uri: AxiosClient.defaults.baseURL + image.url
                }))
            }
            updateProfile(profile);
        });
    }, []);

    const renderData = () => {
        if (!profile)
            return null;

        return (
            <>
                <View>
                    {
                        !profile.images || profile.images.length === 0 ? null : 
                        <Image source={{ uri: profile.images[0].uri }} style={{ width: '100%', height: 250, resizeMode: 'cover' }} />
                    }
                    <View style={styles.reorderArea}>
                        <View style={styles.reorderTouchMove}>
                            <FontAwesome name='reorder' size={21} color={colors.black} />
                        </View>
                    </View>
                    <View style={styles.titleArea}>
                        <View>
                            <Text style={styles.titleName}>{profile.name}</Text>
                            <Text style={styles.titleInfo}>{profile.gender}, {profile.dob} </Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <SimpleLineIcons name="heart" size={21} color={colors.secondary} />
                            <Text>0 theo dõi</Text>
                        </View>
                    </View>
                    <View style={styles.contentArea}>
                        <Text style={styles.contentText}>
                            {profile.briefMessage}
                        </Text>
                    </View>
                    <View style={styles.moreInfoView}>
                        <Text style={styles.moreInfoText}>Đang ở {profile.address}</Text>
                        <Text style={styles.moreInfoText}>Làm việc tại {profile.workAddress}</Text>
                        <View style={styles.moreInfoButtonView}>
                            {
                                profile.hobbies ? profile.hobbies.split(',').map((item: any, index: number) => (
                                    <Button key={index} title={item}
                                        titleStyle={styles.moreInfoButtonTitle}
                                        buttonStyle={styles.moreInfoButton}
                                        containerStyle={styles.moreInfoButtonContainer}
                                    />
                                )) : null
                            }
                        </View>
                    </View>
                    {
                        profile.images && profile.images.length > 0 ? profile.images.map((item: any, index: number) => index === 0 ? null : <FunnyImage key={index} uri={item.uri} />) : null
                    }
                </View>
            </>
        )
    };

    return (
        <>
            <FunnyHeader title='Cá Nhân' navigation={navigation} />
            {
                isLoading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size='small' />
                    </View>
                ) : (
                        <ScrollView style={styles.container}>
                            {
                                renderData()
                            }
                        </ScrollView>
                    )
            }
        </>
    );
}

const mapStateToProps = (state: any) => {
    return {
        profile: state.profileReducer.profile
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateProfile: (profile: any) => dispatch(updateProfile(profile))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
