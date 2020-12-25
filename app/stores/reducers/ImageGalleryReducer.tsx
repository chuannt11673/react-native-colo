import { UPDATE_IMAGES_GALLERY } from '../actions/type';

const initialState = {
    images: []
}

const imageGalleryReducer = (state = initialState, action: { type: string, data: any }) => {
    switch (action.type) {
        case UPDATE_IMAGES_GALLERY:
            return {
                ...state,
                images: state.images.concat(action.data)
            };
        default:
            return {
                ...state
            };
    }
};

export default imageGalleryReducer;