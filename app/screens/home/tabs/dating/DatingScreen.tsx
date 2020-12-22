import React from 'react'
import { SafeAreaView, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import FunnyButton from '@components/FunnyButton';

import { AntDesign, FontAwesome } from '@expo/vector-icons';

import colors from '@shared/consts/Colors';
import { Button } from 'react-native-elements';

import { connect } from 'react-redux';
import FunnyAvatar from 'components/FunnyAvatar';

function DatingScreen(props: any) {
    const [mode, setMode] = React.useState('top');
    const [data] = React.useState<any[]>([
        {
            id: '1',
            avatar: 'https://images.unsplash.com/photo-1510832198440-a52376950479?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            name: 'Phùng Khánh Linh',
            isLiked: true,
            top: true,
        },
        {
            id: '2',
            avatar: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8Z2lybHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            name: 'Phương Uyên',
            isLiked: false,
            top: true
        }
    ]);

    const updateProfileHandler = () => {
        props.navigation.navigate('UpdateProfile');
    };

    const renderItem = (item: any) => {
        return (
            <TouchableOpacity>
                <View style={{
                    borderRadius: 12,
                    borderColor: '#d9d9d9',
                    borderTopWidth: 0.5,
                    borderBottomWidth: 3,
                    borderLeftWidth: 0.5,
                    borderRightWidth: 3,
                    marginBottom: 15,
                }}>
                    <FunnyAvatar uri={item.avatar} name={item.name} content={item.isLiked ? 'Đã thích bạn' : 'Người lạ'} />
                    <Button
                        containerStyle={{
                            position: 'absolute',
                            right: 5,
                            top: '25%',
                            borderRadius: 8,
                        }}
                        buttonStyle={{
                            backgroundColor: '#e6e6e6'
                        }}
                        icon={
                            <FontAwesome name="heartbeat" size={24} color={colors.primary} />
                        }
                    />
                </View>
            </TouchableOpacity>
        )
    }

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
                        <AntDesign name="edit" size={31} color='#000099' />
                    }
                    onPress={ updateProfileHandler }
                />
                <FunnyButton
                    icon={
                        <AntDesign name="bars" size={31} color='#000099' />
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
            <FlatList
                style={{ width: '100%', padding: 15 }}
                data={
                    mode === 'top' ? data.filter(x => x.top) : data.filter(x => x.isLiked)
                }
                keyExtractor={item => item.id}
                renderItem={
                    item => renderItem(item.item)
                }
            />
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

const mapStateToProps = (state: any) => {
    return {
        profile: state.profileReducer.profile
    }
};

export default connect(mapStateToProps)(DatingScreen);