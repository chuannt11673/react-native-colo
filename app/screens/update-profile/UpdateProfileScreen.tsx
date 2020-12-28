import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

// components
import FnButton from '@components/FunnyButton2';
import FnHeader from '@components/FunnyHeader2';

import styles from './UpdateProfileStyle';

import { FontAwesome, Ionicons } from '@expo/vector-icons';

import RNPickerSelect from 'react-native-picker-select';

import { connect } from 'react-redux';

import colors from '@shared/consts/Colors';
import { years, genders, heights, ages } from '@shared/consts/CommonConstants';

import { updateProfile } from '@stores/reducers/ProfileReducer';
import { updateStatusBar } from '@stores/reducers/StatusBarReducer';

const listOfYear = years();
const listOfGender = genders();
const listOfHeight = heights();
const listOfAge = ages();

function UpdateProfileScreen(props: any) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<any>({
        ...props.profile,
        images: undefined
    });

    useEffect(() => {
        setData(props.profile);
        setLoading(false);
    }, [props.profile]);

    const onSaveHandler = () => {
        let images = props.profile.images;
        if (images.length === 0) {
            images = data.images;
        }

        const profile = {
            ...data,
            images: images
        };

        props.updateProfile(profile);
        props.navigation.navigate('UploadProfileImages');
    };

    if (isLoading)
        return (
            <View>
                <ActivityIndicator size='small' />
            </View>
        )

    return (
        <>
            <FnHeader
                title='Thiết lập hồ sơ hẹn hò'
                leftComponent={
                    <TouchableOpacity onPress={
                        () => props.navigation.navigate('Dating')
                    }>
                        <Ionicons name="md-arrow-back" size={24} color={colors.white} />
                    </TouchableOpacity>
                }
            />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={
                    Platform.OS === 'ios' ? 'padding' : 'height'
                }
            >
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                >
                    <ScrollView style={{
                        flex: 1,
                        paddingBottom: 50,
                        backgroundColor: colors.white
                    }}>

                        <ScrollView style={{
                            padding: 25,
                        }}>
                            {/* name */}
                            <Text style={styles.title} >Tên hiển thị *</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <TextInput style={[styles.input, { width: '90%' }]} placeholder=''
                                    onChangeText={
                                        value => setData({
                                            ...data,
                                            name: value
                                        })
                                    }
                                    value={data.name}
                                />
                                <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                            </View>
                            {/* dob */}
                            <Text style={styles.title} >Năm sinh *</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{
                                    width: '40%',
                                    height: 40,
                                    justifyContent: 'center',
                                    borderWidth: 1,
                                    borderRadius: 12,
                                    borderColor: colors.border,
                                    padding: 6                                    
                                }}>
                                    <RNPickerSelect
                                        placeholder={{}}
                                        onValueChange={
                                            (value: any) => setData({
                                                ...data,
                                                dob: value
                                            })
                                        }
                                        items={
                                            listOfYear
                                        }
                                        value={data.dob}
                                    />
                                </View>
                                <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                            </View>
                            {/* gender */}
                            <Text style={styles.title} >Giới tính *</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{
                                    width: '40%',
                                    height: 40,
                                    justifyContent: 'center',
                                    borderWidth: 1,
                                    borderRadius: 12,
                                    borderColor: colors.border,
                                    padding: 6                                    
                                }}>
                                    <RNPickerSelect
                                        placeholder={{}}
                                        onValueChange={
                                            (value: any) => setData({
                                                ...data,
                                                gender: value
                                            })
                                        }
                                        items={listOfGender}
                                        value={data.gender}
                                    />
                                </View>
                                <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                            </View>
                            {/* address */}
                            <Text style={styles.title} >Làm việc tại</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <TextInput
                                    style={[styles.input, { width: '90%' }]}
                                    placeholder=''
                                    onChangeText={
                                        value => setData({
                                            ...data,
                                            address: value
                                        })
                                    }
                                    value={data.address}
                                />
                                <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                            </View>
                            {/* work address */}
                            <Text style={styles.title} >Công việc</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <TextInput style={[styles.input, { width: '90%' }]} placeholder=''
                                    onChangeText={
                                        value => setData({
                                            ...data,
                                            workAddress: value
                                        })
                                    }
                                    value={data.workAddress}
                                />
                                <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                            </View>
                            {/* college */}
                            <Text style={styles.title} >Học tại</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <TextInput style={[styles.input, { width: '90%' }]} placeholder=''
                                    onChangeText={
                                        value => setData({
                                            ...data,
                                            college: value
                                        })
                                    }
                                    value={data.college}
                                />
                                <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                            </View>
                            {/* hobbies */}
                            <Text style={styles.title} >Sở thích</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <TextInput
                                    style={[styles.input, { width: '90%' }]}
                                    multiline
                                    placeholder='Nghe nhạc, Xem phim,...'
                                    onChangeText={
                                        value => setData({
                                            ...data,
                                            hobbies: value
                                        })
                                    }
                                    value={data.hobbies}
                                />
                                <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                            </View>
                            {/* target */}
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                                <View style={{
                                    width: '50%'
                                }}>
                                    <Text style={styles.title} >Đối tượng hẹn hò</Text>
                                    <View style={{
                                        width: '69%',
                                        height: 40,
                                        justifyContent: 'center',
                                        padding: 6,
                                        borderWidth: 1,
                                        borderRadius: 12,
                                        borderColor: colors.border
                                    }}>
                                        <RNPickerSelect
                                            placeholder={{}}
                                            onValueChange={
                                                (value: any) => setData({
                                                    ...data,
                                                    targetGender: value
                                                })
                                            }
                                            items={
                                                listOfGender
                                            }
                                        />
                                    </View>
                                </View>
                                <View style={{
                                    width: '40%'
                                }}>
                                    <Text style={styles.title} >Chiều cao</Text>
                                    <View style={{
                                        width: '80%',
                                        height: 40,
                                        justifyContent: 'center',
                                        padding: 6,
                                        borderWidth: 1,
                                        borderRadius: 12,
                                        borderColor: colors.border,
                                    }}>
                                        <RNPickerSelect
                                            placeholder={{}}
                                            value={data.targetHeight}
                                            onValueChange={
                                                (value: any) => setData({
                                                    ...data,
                                                    targetHeight: value
                                                })
                                            }
                                            items={listOfHeight}
                                        />
                                    </View>
                                </View>
                                <View style={{
                                    width: '10%',
                                    justifyContent: 'center',
                                    alignItems: 'flex-end'
                                }}>
                                    <Text style={styles.title} ></Text>
                                    <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                                </View>
                            </View>
                            {/* target ages */}
                            <Text style={styles.title} >Độ tuổi</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    width: '30%',
                                    height: 40,
                                    justifyContent: 'center',
                                    borderWidth: 1,
                                    borderRadius: 12,
                                    borderColor: colors.border,
                                    padding: 6                                    ,
                                }}>
                                    <RNPickerSelect
                                        placeholder={{}}
                                        onValueChange={
                                            value => setData({
                                                ...data,
                                                fromAge: value
                                            })
                                        }
                                        items={listOfAge}
                                    />
                                </View>
                                <Text> to </Text>
                                <View style={{
                                    width: '30%',
                                    height: 40,
                                    justifyContent: 'center',
                                    borderWidth: 1,
                                    borderRadius: 12,
                                    borderColor: colors.border,
                                    padding: 6                                    ,
                                }}>
                                    <RNPickerSelect
                                        placeholder={{}}
                                        onValueChange={
                                            value => setData({
                                                ...data,
                                                toAge: value
                                            })
                                        }
                                        items={listOfAge}
                                    />
                                </View>
                            </View>
                            {/* brief message */}
                            <Text style={styles.title} >Ghi chú</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <TextInput style={[styles.input, { width: '90%', height: 'auto', minHeight: 46 }]} placeholder='' multiline
                                    onChangeText={
                                        value => setData({
                                            ...data,
                                            briefMessage: value
                                        })
                                    }
                                    value={data.briefMessage}
                                />
                                <FontAwesome name="dot-circle-o" size={24} color={colors.primary} />
                            </View>
                            {/* save btn */}
                            <FnButton
                                title='Tiếp theo'
                                containerStyle={{
                                    backgroundColor: colors.primary,
                                    borderRadius: 12,
                                    marginTop: 20,
                                    width: '90%',
                                    height: 50
                                }}
                                titleStyle={{
                                    color: colors.white,
                                    fontSize: 15
                                }}
                                disabled={
                                    !data || !data.name || !data.gender ? true : false
                                }
                                onPress={
                                    onSaveHandler
                                }
                            />
                        </ScrollView>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>
    )
}

const mapStateToProps = (state: any) => {
    return {
        profile: state.profileReducer.profile,
        statusBar: state.statusBarReducer
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateProfile: (profile: any) => {
            dispatch(updateProfile(profile));
        },
        updateStatusBar: (data: any) => {
            dispatch(updateStatusBar(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileScreen);
