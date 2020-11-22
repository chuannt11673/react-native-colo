import { StyleSheet } from 'react-native';
import colors from '@shared/consts/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 21,
        fontWeight: '600'
    },
});

export default styles;
