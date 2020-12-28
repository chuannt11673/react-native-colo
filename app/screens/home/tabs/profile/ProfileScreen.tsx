import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, ActivityIndicator, Image } from 'react-native';
import { styles } from './ProfileStyles';
import colors from '@shared/consts/Colors';

// component
import FunnyImage from '@components/FunnyImage';
import FunnyHeader from 'components/FunnyHeader';
import FnButton from '@components/FunnyButton2';

import { connect } from 'react-redux';
import { updateProfile } from '@stores/reducers/ProfileReducer';

function ProfileScreen(props: any) {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    });

    const renderData = () => {
        if (!props.profile || !props.profile.name)
            return null;

        return (
            <>
                <View>
                    {
                        !props.profile.images || props.profile.images.length === 0 ? null : 
                        <Image source={{ uri: props.profile.images[0].uri }} style={{ width: '100%', height: 250, resizeMode: 'cover' }} />
                    }
                    <View style={styles.reorderArea}>
                        <View style={styles.reorderTouchMove}>
                            <FontAwesome name='reorder' size={21} color={colors.black} />
                        </View>
                    </View>
                    <View style={styles.titleArea}>
                        <View>
                            <Text style={styles.titleName}>{props.profile.name}</Text>
                            <Text style={styles.titleInfo}>{props.profile.gender}, {props.profile.dob} </Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <SimpleLineIcons name="heart" size={21} color={colors.secondary} />
                            <Text>0 theo dõi</Text>
                        </View>
                    </View>
                    <View style={styles.contentArea}>
                        <Text style={styles.contentText}>
                            {props.profile.briefMessage}
                        </Text>
                    </View>
                    <View style={styles.moreInfoView}>
                        <Text style={styles.moreInfoText}>Đang ở {props.profile.address}</Text>
                        <Text style={styles.moreInfoText}>Làm việc tại {props.profile.workAddress}</Text>
                        <View style={styles.moreInfoButtonView}>
                            {
                                props.profile.hobbies ? props.profile.hobbies.split(',').map((item: any, index: number) => (
                                    <FnButton
                                        key={index} title={item}
                                        titleStyle={styles.moreInfoButtonTitle}
                                        containerStyle={styles.moreInfoButtonContainer}
                                    />
                                )) : null
                            }
                        </View>
                    </View>
                    {
                        props.profile.images && props.profile.images.length > 0 ? props.profile.images.map((item: any, index: number) => index === 0 ? null : <FunnyImage key={index} uri={item.uri} />) : null
                    }
                </View>
            </>
        )
    };

    return (
        <>
            <FunnyHeader title='Cá Nhân' navigation={props.navigation} />
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
