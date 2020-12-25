import { UPDATE_STATUSBAR } from '@stores/actions/type';

const initialState = {
    style: 'auto'
};

const statusBarReducer = (state = initialState, action: { type: string, data: any }) => {
    switch (action.type) {
        case UPDATE_STATUSBAR:
            return action.data;
        default:
            return state;
    }
};

export const updateStatusBar = (data: { style: string }) => {
    return {
        type: UPDATE_STATUSBAR,
        data: data
    }
};

export default statusBarReducer;