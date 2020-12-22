const CommonConstant = {
    tokenKey: 'access_token',
    userInfoKey: 'user_info',
};

export const years = () => {
    const res = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    for (let index = 1960; index < currentYear; index++) {
        res.push(index + '');        
    }

    return res;
}

export default CommonConstant;
