import React from 'react'
import { SafeAreaView, View, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image, Text, ScrollView } from 'react-native';

// components
import FunnyAvatar from '@components/FunnyAvatar';
import FnButton from '@components/FunnyButton2';
import FnHeader from '@components/FunnyHeader2';

// icons
import { AntDesign, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';

// redux
import { connect } from 'react-redux';

import colors from '@shared/consts/Colors';
import { getProfiles } from '@shared/services/UserService';

function DatingScreen(props: any) {
    const [mode, setMode] = React.useState('top');
    const [data, setData] = React.useState<any[]>([]);
    const [viewMode, setViewMode] = React.useState('list');
    const [selectedData, setSelectedData] = React.useState<any>();

    React.useEffect(() => {
        getProfiles(50, 1).then(res => {
            const data = res.data.map((item: any) => {
                const result = {
                    ...item,
                    id: item.id,
                    isLiked: false,
                    top: true,
                    year: (new Date(item.dob)).getFullYear()
                };

                if (!result.avatar && item.images) {
                    result.avatar = item.images[0].url;
                }

                return result;
            });

            setData(data);
            setSelectedData(data[0]);
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
            <FnHeader
                title='Hẹn hò'
                leftComponent={
                    <TouchableOpacity onPress={
                        () => props.navigation.openDrawer()
                    }>
                        <FontAwesome name="bars" size={21} color={colors.white} />
                    </TouchableOpacity>
                }
                rightComponent={
                    <TouchableOpacity>
                        <Ionicons name="md-notifications" size={24} color={colors.white} />
                    </TouchableOpacity>
                }
            />
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: colors.white,
                alignItems: 'center',
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
                        onPress={
                            () => {
                                if (viewMode === 'list') {
                                    setViewMode('details');
                                } else {
                                    setViewMode('list');
                                }
                            }
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
                {
                    viewMode === 'list' ? (
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
                    ) : (
                        <ScrollView>
                            <View style={{
                                width: Dimensions.get('window').width,
                                height: 399,
                                paddingTop: 20
                            }}>
                                <Image source={{ uri: selectedData.avatar }} style={{ flex: 1 }} />
                            </View>
                            {/* add friend btn */}
                            <View style={{
                                position: 'absolute',
                                top: 420,
                                right: 30,
                            }}>
                                <TouchableOpacity>
                                    <FontAwesome5 name="user-plus" size={24} color={colors.blue} />
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                padding: 10
                            }}>
                                <FontAwesome name="user-o" size={21} color={colors.black} style={{ opacity: 0.6, width: 30, marginRight: 10, textAlign: 'center' }} />
                                <Text>{selectedData.name}, {selectedData.year}</Text>
                            </View>
                            <View style={{
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                padding: 10
                            }}>
                                <MaterialCommunityIcons name="map-marker-outline" size={21} color={colors.black} style={{ opacity: 0.6, width: 30, marginRight: 10, textAlign: 'center' }} />
                                <Text>{selectedData.address}</Text>
                            </View>
                            <View style={{
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                padding: 10
                            }}>
                                <SimpleLineIcons name="briefcase" size={21} color={colors.black} style={{ opacity: 0.6, width: 30, marginRight: 10, textAlign: 'center' }} />
                                <Text>{selectedData.workAddress}</Text>
                            </View>
                            <View style={{
                                width: '100%',
                                height: 1,
                                backgroundColor: colors.border
                            }} />
                            <View style={{
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                padding: 10
                            }}>
                                <Text style={{
                                    fontSize: 16
                                }}>{selectedData.briefMessage}</Text>
                            </View>
                        </ScrollView>                 
                    )
                }
                
            </SafeAreaView>
        </>
    )
}
const btnColor = '#000099';
const mapStateToProps = (state: any) => {
    return {
        profile: state.profileReducer.profile
    }
};

export default connect(mapStateToProps)(DatingScreen);