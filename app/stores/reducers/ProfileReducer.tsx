import { UPDATE_PROFILE } from '../actions/type';

const initialState = {
    profile: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PROFILE:
            return {
                profile: action.data
            };
        default:
            return {
                ...state
            };
    }
};

export default profileReducer;