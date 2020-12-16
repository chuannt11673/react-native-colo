import { UPDATE_IMAGES_GALLERY } from './type';

export const updateImagesGallery = (images: any[]) => (
    {
        type: UPDATE_IMAGES_GALLERY,
        data: images
    }
);
