import { Dimensions, StyleSheet } from 'react-native';
import colors from '@shared/consts/Colors';

const windowWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
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
        justifyContent: 'space-around',
        marginTop: 15
    },
    header: {
        
    },
    headerAvatar: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 16,
        opacity: 0.6
    },
    headerActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5,
        paddingBottom: 5
    },
    headerContainer: {
        width: '33.333%',
        height: 30,
        borderRadius: 0
    },
    headerTitleStyle: {
        fontSize: 13,
        marginLeft: 5
    },
    actionBtnContainer: {
        width: '33.333%'
    },
    actionBtnTitle: {
        marginLeft: 5,
        opacity: 0.6
    }
})