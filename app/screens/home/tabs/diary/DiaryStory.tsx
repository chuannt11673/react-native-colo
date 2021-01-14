import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View, Image } from 'react-native';

import { connect } from 'react-redux';
import colors from 'shared/consts/Colors';
import { getStories } from 'shared/services/UserService';

import FnButton from '@components/FunnyButton2';

function DiaryStory(props: any) {
    let initialItem = {
        id: props.profile?.id,
        avatar: props.profile?.avatar,
        storyUrl: props.profile?.avatar,
        initial: true
    };

    const [data, setData] = useState<any[]>([initialItem]);
    useEffect(() => {
        getStories().then((res: any[]) => {
            if (data.length > 1) {
                const tempData = [initialItem];
                setData(tempData.concat(res));
            } else {
                setData(data.concat(res));
            }
        });
    }, [
        props.profile
    ]);

    return (
        <View style={{
            width: '100%',
            height: 124,
        }}>
            <FlatList
                contentContainerStyle={{
                    alignItems: 'center',
                    padding: 10
                }}
                data={data}
                horizontal
                renderItem={
                    ({ item, index }) => item.initial ? (
                        <TouchableOpacity
                            key={index}
                            onPress={
                                event => { }
                            }
                        >
                            <View style={{
                                width: 85,
                                height: 110,
                                borderWidth: 0.5,
                                borderRadius: 8,
                                borderColor: colors.border,
                                overflow: 'hidden',
                                marginRight: 10
                            }}>
                                <Image source={{ uri: item.storyUrl }} style={{
                                    flex: 1,
                                    justifyContent: 'center'
                                }} />
                                <View style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: 30,
                                    bottom: 0,
                                    backgroundColor: colors.white,
                                    justifyContent: 'flex-end',
                                    paddingLeft: 2,
                                    paddingRight: 2,
                                    paddingBottom: 2
                                }}>
                                    <FnButton
                                        containerStyle={{
                                            position: 'absolute',
                                            backgroundColor: colors.primary,
                                            borderRadius: 4,
                                            top: -12,
                                            left: 32
                                        }}
                                        buttonStyle={{
                                            width: 22,
                                            height: 22
                                        }}
                                        icon={
                                            <MaterialIcons name="add" size={19} color={colors.white} />
                                        }
                                    />
                                    <Text style={{
                                        fontSize: 12,
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        opacity: 0.6
                                    }}>Thêm vào tin</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ) : (
                            <TouchableOpacity
                                key={index}
                                onPress={
                                    event => { }
                                }
                            >
                                <View style={{
                                    width: 90,
                                    height: 110,
                                    borderRadius: 8,
                                    overflow: 'hidden',
                                    marginRight: 10
                                }}>
                                    <Image source={{ uri: item.storyUrl }} style={{
                                        flex: 1,
                                        justifyContent: 'center'
                                    }} />
                                    <View style={{
                                        width: 28,
                                        height: 28,
                                        position: 'absolute',
                                        left: 33.5,
                                        bottom: 10,
                                        borderRadius: 15,
                                        borderWidth: 1,
                                        borderColor: colors.border,
                                        overflow: 'hidden'
                                    }}>
                                        <Image source={{ uri: item.avatar }} style={{
                                            flex: 1,
                                        }}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                }
            />
        </View>
    )
}

const mapStateToProps = (state: any) => {
    return {
        profile: state.profileReducer.profile
    };
}

export default connect(mapStateToProps)(DiaryStory);
