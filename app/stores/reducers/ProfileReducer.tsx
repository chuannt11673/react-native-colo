import { UPDATE_PROFILE } from '../actions/type';

const initialState = {
    profile: {
        name: 'dummy name',
        gender: 'male'
    }
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: action.data
            };
        default:
            return {
                ...state
            };
    }
};

export default profileReducer;