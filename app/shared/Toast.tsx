import { ToastAndroid } from 'react-native';
const FunnyToast = {
    show: (text: string, duration: number) => {
        ToastAndroid.show(text, duration);
    },
    showWithGravity: (text: string, duration: number, position: number) => {
        ToastAndroid.showWithGravity(text, duration, position);
    }
};

export default FunnyToast;