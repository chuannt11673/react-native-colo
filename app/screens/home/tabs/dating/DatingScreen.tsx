import React from 'react'
import { SafeAreaView, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// components
import FunnyAvatar from '@components/FunnyAvatar';
import FunnyHeader from '@components/FunnyHeader';
import FnButton from '@components/FunnyButton2';

// icons
import { AntDesign, FontAwesome } from '@expo/vector-icons';

// redux
import { connect } from 'react-redux';

import colors from '@shared/consts/Colors';
import { getProfiles } from '@shared/services/UserService';

function DatingScreen(props: any) {
    const [mode, setMode] = React.useState('top');
    const [data, setData] = React.useState<any[]>([]);

    React.useEffect(() => {
        getProfiles(50, 1).then(res => {
            const data = res.data.map((item: any) => {
                const result = {
                    id: item.id,
                    name: item.name,
                    avatar: item.avatar,
                    isLiked: false,
                    top: true,
                };

                if (!result.avatar && item.images) {
                    result.avatar = item.images[0].url;
                }

                return result;
            });

            setData(data);
        });
    }, []);

    const updateProfileHandler = () => {
        props.navigation.navigate('UpdateProfile');
    };

    const renderItem = (item: any) => {
        return (
            <TouchableOpacity style={{
                marginBottom: 15
            }}>
                <View style={{
                    borderRadius: 12,
                    borderColor: '#d9d9d9',
                    borderTopWidth: 0.5,
                    borderBottomWidth: 3,
                    borderLeftWidth: 0.5,
                    borderRightWidth: 3,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: 10
                }}>
                    <FunnyAvatar uri={item.avatar} name={item.name} content={item.isLiked ? 'Đã thích bạn' : 'Người lạ'} />
                    <FnButton
                        icon={
                            <FontAwesome name="heartbeat" size={24} color={colors.primary} />
                        }
                    />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <>
            <FunnyHeader title='Hẹn hò' navigation={props.navigation} />
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
                    height: 46,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    paddingRight: 10
                }}>
                    <FnButton
                        icon={
                            <AntDesign name="edit" size={31} color='#000099' />
                        }
                        containerStyle={{
                            width: 46
                        }}
                        onPress={
                            updateProfileHandler
                        }
                    />
                    <FnButton
                        icon={
                            <AntDesign name="bars" size={31} color='#000099' />
                        }
                        containerStyle={{
                            width: 46
                        }}
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
                        borderWidth: 0.5,
                        borderColor: colors.border,
                        borderRadius: 12,
                        overflow: 'hidden'
                    }}>
                        <FnButton
                            title='Nổi bật'
                            titleStyle={{
                                color: mode === 'top' ? colors.white : colors.black
                            }}
                            containerStyle={{
                                width: '50%',
                                height: 46,
                                backgroundColor: mode === 'top' ? btnColor : colors.white
                            }}
                            onPress={
                                () => setMode('top')
                            }
                        />
                        <FnButton
                            title='Thích bạn'
                            titleStyle={{
                                color: mode === 'like' ? colors.white : colors.black
                            }}
                            containerStyle={{
                                width: '50%',
                                height: 46,
                                backgroundColor: mode === 'like' ? btnColor : colors.white
                            }}
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
        </>
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