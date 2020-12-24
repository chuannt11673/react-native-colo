import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '@shared/consts/Colors';

import { Header } from 'react-native-elements';

import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';

function CreatePostScreen(props: any) {

    React.useEffect(() => {
        console.log(props);
    }, []);

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <Header
                containerStyle={{
                    backgroundColor: colors.white
                }}
                centerComponent={
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>Đăng bài</Text>
                }
                leftComponent={
                    (
                        <Ionicons name="md-arrow-back" size={24} color={colors.black} onPress={
                            props.navigation.goBack
                        } />
                    )
                }
            />
            {/* content */}
            <View>

            </View>
        </View>
    )
}

const mapStateToProps = (state: any) => {
    return {
        profile: state.profileReducer.profile
    }
};

export default connect(mapStateToProps)(CreatePostScreen);
