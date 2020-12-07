import { Dimensions, StyleSheet } from 'react-native';
import colors from '@shared/consts/Colors';

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 10
    },
    item: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 23,
    },
    message: {
        maxWidth: windowWidth * 0.6,
        padding: 10,
        borderRadius: 14,
    },
    messageText: {
        fontSize: 16
    }
});

export default styles;
