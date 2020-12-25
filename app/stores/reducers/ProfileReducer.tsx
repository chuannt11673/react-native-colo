import { UPDATE_PROFILE } from '../actions/type';

const initialState = {
    profile: {
        name: null,
        dob: null,
        gender: null,
        briefMessage: null,
        images: []
    }
}

const profileReducer = (state = initialState, action: { type: any, data: any }) => {
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

export const updateProfile = (profile: any) => (
    {
        type: UPDATE_PROFILE,
        data: profile
    }
);

export default profileReducer;