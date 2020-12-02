import { StyleSheet } from 'react-native';
import colors from '@shared/consts/Colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    avatarStyle: {
        borderWidth: 0
    },
    reorderArea: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    reorderTouchMove: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: -25,
        borderWidth: 1,
        borderColor: colors.black1,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
    },
    titleArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    titleName: {
        fontSize: 21,
        fontWeight: 'bold',
        color: colors.black
    },
    titleInfo: {
        fontSize: 16,
        color: colors.black
    },
    contentArea: {
        padding: 15,
        borderBottomColor: colors.black1,
        borderBottomWidth: 1,
    },
    contentText: {
        fontSize: 17,
        color: colors.black,
        lineHeight: 23
    },
    moreInfoView: {
        padding: 30,
        borderBottomColor: colors.black1,
        borderBottomWidth: 1,
    },
    moreInfoText: {
        fontSize: 17,
        marginBottom: 6,
        marginLeft: 10,
        color: colors.black
    },
    moreInfoButtonView: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10,
    },
    moreInfoButtonTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.black
    },
    moreInfoButtonContainer: {
        marginRight: 10,
        marginBottom: 10,
    },
    moreInfoButton: {
        borderWidth: 1,
        borderRadius: 21,
        borderColor: colors.black,
        backgroundColor: colors.white
    },
})