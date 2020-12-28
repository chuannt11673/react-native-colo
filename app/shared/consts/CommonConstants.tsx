const CommonConstant = {
    tokenKey: 'access_token',
    userInfoKey: 'user_info',
};

export const years = () => {
    const res = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    for (let index = 1960; index < currentYear; index++) {
        res.push(
            { label: index + '', value: index }
        );        
    }

    return res;
};

export const genders = () => {
    return [
        { label: 'Nam', value: 'male' },
        { label: 'Nữ', value: 'female' }
    ];
};

export const heights  = () => {
    const res = [];
    for (let index = 150; index < 190; index += 5) {
        res.push(
            { label: index + '', value: index }
        );        
    }

    return res;
};

export const ages = () => {
    const res : any[] = [];
    for (let index = 16; index < 69; index++) {
        res.push(
            { label: index.toString(), value: index }
        );        
    }

    return res;
}

export default CommonConstant;
