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
}