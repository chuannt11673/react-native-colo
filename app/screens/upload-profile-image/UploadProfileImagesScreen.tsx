import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

import FunnyHeader from '@components/FunnyHeader';
import { Ionicons } from '@expo/vector-icons';

import colors from '@shared/consts/Colors';

import { connect } from 'react-redux';
import { updateProfile } from '@stores/actions/profile';

function UploadProfileImagesScreen(props: any) {
    
    React.useEffect(() => {
    }, []);

    return (
        <>
            <FunnyHeader
                title='Ảnh hồ sơ'
                leftComponent={
                    <Button
                        icon={
                            <Ionicons name="md-arrow-back" size={24} color={colors.white} />
                        }
                        buttonStyle={{ backgroundColor: 'transparent' }}
                        onPress={
                            () => props.navigation.goBack()
                        }
                    />
                }
                rightComponent={
                    <View />
                }
            />
            <ScrollView style={{
                flex: 1
            }}>
                <Text>{props.profile.name}</Text>
            </ScrollView>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer.profile
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (profile) => dispatch(updateProfile(profile))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadProfileImagesScreen);
