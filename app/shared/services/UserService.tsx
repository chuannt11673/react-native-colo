import AxiosClient from "@shared/Axios";

export const getMesssages = () => {
    return AxiosClient.get('/api/Users/GetChats');
};
export const getDiary = () => {
    return AxiosClient.get('/api/Posts/GetPosts');
};
export const getProfile = () => {
    return AxiosClient.get('/api/Users/GetUserProfile');
};
export const getProfiles = (pageSize: number, pageIndex: number) => {
    return AxiosClient.get(`/api/Users/GetUserProfiles?pageSize=${pageSize}&pageIndex=${pageIndex}`);
};
export const getCommunicationMessages = (communicationId: string) => {
    return AxiosClient.post('/api/Users/GetChatHistory', {
        communicationId: communicationId
    });
};
export const editProfile = (form: FormData) => {
    return AxiosClient.post('/api/Users/UpdateUserProfile', form, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
export const createPost = (form: FormData) => {
    return AxiosClient.post('/api/Posts/CreatePost', form, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
export const getStories = () => {
    return Promise.resolve([
        { id: '1', name: '', avatar: 'https://cdsweetheartstorage.blob.core.windows.net/assets/3388e561243d43128b38e84f6e1c3965.jpg', storyUrl: 'https://cdsweetheartstorage.blob.core.windows.net/assets/3388e561243d43128b38e84f6e1c3965.jpg' },
        { id: '2', name: '', avatar: 'https://cdsweetheartstorage.blob.core.windows.net/assets/73fc639ed0a21f67b89696cde5890651.jpg', storyUrl: 'https://cdsweetheartstorage.blob.core.windows.net/assets/73fc639ed0a21f67b89696cde5890651.jpg' },
        { id: '3', name: '', avatar: 'https://cdsweetheartstorage.blob.core.windows.net/assets/2a0fffbbd69f01e8659f302c5851ff83.jpg', storyUrl: 'https://cdsweetheartstorage.blob.core.windows.net/assets/2a0fffbbd69f01e8659f302c5851ff83.jpg' },
        { id: '4', name: '', avatar: 'https://cdsweetheartstorage.blob.core.windows.net/assets/8263ed25f96fc9721af5a025118ee507.jpg', storyUrl: 'https://cdsweetheartstorage.blob.core.windows.net/assets/8263ed25f96fc9721af5a025118ee507.jpg' },
        { id: '5', name: '', avatar: 'https://cdsweetheartstorage.blob.core.windows.net/assets/d645c7b5c22bcfd8b54c5bf1a01798b8.jpg', storyUrl: 'https://cdsweetheartstorage.blob.core.windows.net/assets/d645c7b5c22bcfd8b54c5bf1a01798b8.jpg' }
    ]);
}