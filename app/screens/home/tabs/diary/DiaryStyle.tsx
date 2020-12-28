import { Dimensions, StyleSheet } from 'react-native';
import colors from '@shared/consts/Colors';

const windowWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    item: {
        paddingBottom: 10,
        borderBottomColor: colors.border,
        borderBottomWidth: 1
    },
    content: {
        padding: 10,
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    header: {
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 5
    },
    headerAvatar: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 16
    },
    headerActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    headerContainer: {
        width: windowWidth / 3,
        height: 30,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderColor: colors.border,
        borderRadius: 0
    },
    headerTitleStyle: {
        fontSize: 13,
        marginLeft: 5
    },
    actionBtnContainer: {
        width: 46
    },
    actionBtnTitle: {
        marginLeft: 5
    }
})