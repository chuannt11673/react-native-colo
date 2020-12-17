import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, View, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from './ProfileStyles';
import colors from '@shared/consts/Colors';
import FunnyImage from '@components/FunnyImage';
import FunnyHeader from 'components/FunnyHeader';
import FunnyButton from 'components/FunnyButton';

import { connect } from 'react-redux';

function ProfileScreen({ navigation, profile }: any) {
    const [isLoading] = useState(false);
    const renderData = () => {
        if (!profile)
            return null;

        return (
            <>                
                <View>
                    {
                        !profile.images || profile.images.length === 0 ? null : <FunnyImage uri={profile.images[0].uri} containerStyle={styles.avatarStyle} />
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
                            {profile.note}
                        </Text>
                    </View>
                    <View style={styles.moreInfoView}>
                        <Text style={styles.moreInfoText}>Đang ở {profile.hometown}</Text>
                        <Text style={styles.moreInfoText}>Làm việc tại {profile.job}</Text>
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
                            <View style={{
                                padding: 15
                            }}>
                                <FunnyButton
                                    title='Edit your profile'
                                    containerStyle={{
                                        width: 150,
                                    }}
                                    buttonStyle={{
                                        borderWidth: 1,
                                        borderColor: colors.border,
                                        borderRadius: 18,
                                        backgroundColor: colors.white
                                    }}
                                    onPress={
                                        () => {
                                            navigation.navigate('UpdateProfile');
                                        }
                                    }
                                />
                            </View>
                            {
                                renderData()
                            }
                        </ScrollView>
                    )
            }
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer.profile
    }
}

export default connect(mapStateToProps)(ProfileScreen);
