import React from 'react'
import { SafeAreaView, View, StyleSheet } from 'react-native';

import FunnyButton from '@components/FunnyButton';

import { AntDesign, Foundation } from '@expo/vector-icons';

import colors from '@shared/consts/Colors';
import { Button } from 'react-native-elements';

import { connect } from 'react-redux';

function DatingScreen(props) {
    const [mode, setMode] = React.useState('top');

    const updateProfileHandler = () => {
        props.navigation.navigate('UpdateProfile');
    };

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            alignItems: 'center',
            paddingLeft: 15,
            paddingRight: 15
        }}>
            {/* action buttons */}
            <View style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingRight: 10
            }}>
                <FunnyButton
                    icon={
                        <AntDesign name="profile" size={31} color='#000099' />
                    }
                    onPress={ updateProfileHandler }
                />
                <FunnyButton
                    icon={
                        <Foundation name="list-bullet" size={31} color='#000099' />
                    }
                />
            </View>
            {/* main buttons */}
            <View style={{
                width: '100%',
                padding: 10
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: 10
                }}>
                    <Button title='Nổi bật'
                        titleStyle={
                            mode === 'top' ? { color: colors.white } : { color: colors.black }
                        }
                        containerStyle={styles.mainButton}
                        buttonStyle={
                            mode === 'top' ? {
                                backgroundColor: btnColor
                            } : {
                                backgroundColor: colors.white
                            }
                        }
                        onPress={
                            () => setMode('top')
                        }
                    />
                    <Button title='Thích bạn'
                        titleStyle={
                            mode === 'like' ? { color: colors.white } : { color: colors.black }
                        }
                        containerStyle={styles.mainButton}
                        buttonStyle={
                            mode === 'like' ? {
                                backgroundColor: btnColor
                            } : {
                                backgroundColor: colors.white
                            }
                        }
                        onPress={
                            () => setMode('like')
                        }
                    />
                </View>
            </View>
            {/* body */}
            <View>

            </View>
        </SafeAreaView>
    )
}
const btnColor = '#000099';
const styles = StyleSheet.create({
    mainButton: {
        width: '50%',
        borderRadius: 10
    },
});

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer.profile
    }
};

export default connect(mapStateToProps)(DatingScreen);