import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, ActivityIndicator, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Button } from 'react-native-elements';
import * as UserService from '@shared/services/UserService';
import { styles } from './ProfileStyles';
import colors from '@shared/consts/Colors';
import FunnyImage from '@components/FunnyImage';
import FunnyHeader from 'components/FunnyHeader';
import UserProfileModel from 'shared/interfaces/UserProfileModel';
import FunnyButton from 'components/FunnyButton';
import FunnyTextInput from 'components/FunnyTextInput';
import * as ImagePicker from 'expo-image-picker';

const modes = {
    view: 1,
    editProfile: 2
};

export default function ProfileScreen({ navigation }: any) {
    const [data, setData] = useState<UserProfileModel>();
    const [mode, setMode] = useState(modes.view);
    const [isLoading, setLoading] = useState(true);
    const [avatar, setAvatar] = useState<any>();
    const [images, setImages] = useState<any>();

    useEffect(() => {
        UserService.getProfile().then((res: any) => {
            const responseData = res?.data;
            if (responseData) {
                setData(responseData);
            };
            setLoading(false);
        });
    }, []);

    const selectAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3,4],
            quality: 1,
        });
        if (!result.cancelled) {
            const parts = result.uri.split('/');
            setAvatar({
                uri: result.uri,
                name: parts[parts.length - 1],
                type: `${result.type}/jpg`
            });
        }
    };

    const selectImages = async () => {
    };

    const renderEditProfile = () => {
        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={
                    Platform.OS === 'ios' ? 'padding' : 'height'
                }
            >
                <View style={{
                    padding: 15,
                    alignItems: 'center'
                }}>
                    <Text style={{ textAlign: 'center', padding: 20, fontSize: 21 }}>Profile</Text>
                    {/* name */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: "center",
                        padding: 5
                    }}>
                        <FunnyTextInput value={data?.name} containerStyle={{ width: 300 }} placeholder='Name' onChangeText={
                            value => {
                                const tempData: any = { ...data, name: value };
                                setData(tempData);
                            }
                        } />
                    </View>
                    {/* gender */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: "center",
                        padding: 5
                    }}>
                        <FunnyTextInput value={data?.gender} containerStyle={{ width: 300 }} placeholder='Gender'
                            onChangeText={
                                value => {
                                    const tempData: any = { ...data, gender: value };
                                    setData(tempData);
                                }
                            }
                        />
                    </View>
                    {/* dob */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: "center",
                        padding: 5
                    }}>
                        <FunnyTextInput value={data?.dob} containerStyle={{ width: 300 }} placeholder='Date of birth'
                            onChangeText={
                                value => {
                                    const tempData: any = { ...data, dob: value };
                                    setData(tempData);
                                }
                            }
                        />
                    </View>
                    {/* brief message */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: "center",
                        padding: 5
                    }}>
                        <FunnyTextInput value={data?.briefMessage} containerStyle={{ width: 300 }} placeholder='Brief message'
                            onChangeText={
                                value => {
                                    const tempData: any = { ...data, briefMessage: value };
                                    setData(tempData);
                                }
                            }
                        />
                    </View>
                    {/* address */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: "center",
                        padding: 5
                    }}>
                        <FunnyTextInput value={data?.address} containerStyle={{ width: 300 }} placeholder='Address'
                            onChangeText={
                                value => {
                                    const tempData: any = { ...data, address: value };
                                    setData(tempData);
                                }
                            }
                        />
                    </View>
                    {/* work address */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: "center",
                        padding: 5
                    }}>
                        <FunnyTextInput value={data?.workAddress} containerStyle={{ width: 300 }} placeholder='Work Address'
                            onChangeText={
                                value => {
                                    const tempData: any = { ...data, workAddress: value };
                                    setData(tempData);
                                }
                            }
                        />
                    </View>
                    {/* college */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: "center",
                        padding: 5
                    }}>
                        <FunnyTextInput value={data?.college} containerStyle={{ width: 300 }} placeholder='College'
                            onChangeText={
                                value => {
                                    const tempData: any = { ...data, college: value };
                                    setData(tempData);
                                }
                            }
                        />
                    </View>
                    {/* hobbies */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: "center",
                        padding: 5
                    }}>
                        <FunnyTextInput value={data?.hobbies} containerStyle={{ width: 300 }} placeholder='Exp: music, playing guitar,...'
                            onChangeText={
                                value => {
                                    const tempData: any = { ...data, hobbies: value };
                                    setData(tempData);
                                }
                            }
                        />
                    </View>
                    {/* avatar */}
                    <View style={{
                        width: '100%',
                        paddingTop: 10,
                        paddingLeft: 25,
                        alignItems: 'flex-start'
                    }}>
                        <Button title='Avatar' onPress={selectAvatar} />
                    </View>

                    {/* images */}
                    <View style={{
                        width: '100%',
                        paddingTop: 10,
                        paddingLeft: 25,
                        alignItems: 'flex-start'
                    }}>
                        <Button title='Images' onPress={selectImages} />
                    </View>

                    <FunnyButton title='Save'
                        containerStyle={{
                            width: 150,
                            marginTop: 15
                        }}
                        buttonStyle={{
                            borderWidth: 1,
                            borderColor: colors.border,
                            borderRadius: 18,
                            backgroundColor: colors.white
                        }}
                        onPress={
                            async () => {
                                if (data) {
                                    const form = new FormData();
                                    form.append('name', data.name);
                                    form.append('gender', data.gender);
                                    form.append('briefMessage', data.briefMessage);
                                    form.append('address', data.address);
                                    form.append('workAddress', data.workAddress);
                                    form.append('college', data.college);
                                    form.append('hobbies', data.hobbies);
                                    form.append('avatar', avatar);
                                    form.append('images', images);
                                    const response: any = await UserService.editProfile(form);
                                    if (response.succeeded) {
                                        setData(response.data);
                                        setMode(modes.view);
                                    }
                                }
                            }
                        }
                    />
                </View>    
            </KeyboardAvoidingView>
        )
    };

    const renderData = () => {
        if (!data)
            return null;

        return (
            <>                
                <View>
                    {
                        data.avatar ? <FunnyImage uri={data.avatar} containerStyle={styles.avatarStyle} /> : (
                            <Image source={require('@assets/images/not-available.jpg')} style={{ width: '100%' }} />
                        )
                    }
                    <View style={styles.reorderArea}>
                        <View style={styles.reorderTouchMove}>
                            <FontAwesome name='reorder' size={21} color={colors.black} />
                        </View>
                    </View>
                    <View style={styles.titleArea}>
                        <View>
                            <Text style={styles.titleName}>{data.name}</Text>
                            <Text style={styles.titleInfo}>{data.gender}, {data.dob} </Text>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <SimpleLineIcons name="heart" size={21} color={colors.secondary} />
                            <Text>{data.follows} theo dõi</Text>
                        </View>
                    </View>
                    <View style={styles.contentArea}>
                        <Text style={styles.contentText}>
                            {data.briefMessage}
                        </Text>
                    </View>
                    <View style={styles.moreInfoView}>
                        <Text style={styles.moreInfoText}>Đang ở {data.address}</Text>
                        <Text style={styles.moreInfoText}>Làm việc tại {data.workAddress}</Text>
                        <Text style={styles.moreInfoText}>Từng học tại {data.college}</Text>
                        <View style={styles.moreInfoButtonView}>
                            {
                                data.hobbies ? data.hobbies.split(',').map((item: any, index: number) => (
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
                        data.images.map((item: any, index: number) => <FunnyImage key={index} uri={item} />)
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
                                mode === modes.view ? renderData() : renderEditProfile()
                            }
                        </ScrollView>
                    )
            }
        </>
    );
}
