import UserProfileModel from 'shared/interfaces/UserProfileModel';
import { UPDATE_PROFILE } from './type';

export const updateProfile = (profile) => (
    {
        type: UPDATE_PROFILE,
        data: profile
    }
)