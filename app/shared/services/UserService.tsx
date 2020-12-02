export const getMesssages = () => {
    return Promise.resolve([
        {
            id: '1',
            avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            name: 'Phương Ly',
            message: '8h tối em mới về, hẹn a 9h nha',
            time: new Date()
        },
        {
            id: '2',
            avatar: 'https://images.unsplash.com/photo-1504276048855-f3d60e69632f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            name: 'Phương Thùy',
            message: '8h tối em mới về, hẹn a 9h nha',
            time: new Date()
        }
    ]);
};
export const getDiary = () => {
    return Promise.resolve([
        {
            id: '1',
            avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            name: 'Phương Ly',
            content: `Ngày hôm nay, khi em bước đi trên con đường trải đầy hoa hồng, Anh chúc em luôn đáng yêu như vậy, luôn vui vẻ bên người em yêu. Mạnh mẽ một chút, yêu bản thân nhiều hơn =))`,
            photos: [
                'https://images.unsplash.com/photo-1448376561459-dbe8868fa34c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                'https://images.unsplash.com/photo-1504276048855-f3d60e69632f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                'https://images.unsplash.com/photo-1496440737103-cd596325d314?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            ]
        },
        {
            id: '2',
            avatar: 'https://images.unsplash.com/photo-1448376561459-dbe8868fa34c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            name: 'Phương Thùy',
            content: `Ngày hôm nay, khi em bước đi trên con đường trải đầy hoa hồng, Anh chúc em luôn đáng yêu như vậy, luôn vui vẻ bên người em yêu. Mạnh mẽ một chút, yêu bản thân nhiều hơn =))`,
            photos: [
                'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                'https://images.unsplash.com/photo-1504276048855-f3d60e69632f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
                'https://images.unsplash.com/photo-1496440737103-cd596325d314?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            ]
        }
    ]);
};
export const getProfile = () => {
    return Promise.resolve({
        id: '1',
        avatar: 'https://images.unsplash.com/photo-1504276048855-f3d60e69632f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        name: 'Lê Đức Trung',
        gender: 'Nam',
        age: 25,
        follows: 25,
        message: `Đôi khi chúng ta không hiểu rõ kết quả của những việc mình làm, thế nên cứ tự chuốc lấy những buồn khổ chẳng đáng có.`,
        address: 'Hoàng Mai, Hà Nội',
        workAddress: 'Colo dating',
        college: 'Đại học Lâm Nghiệp',
        hobbies: [
            'Chơi game', 'Đọc sách', 'Nghe nhạc', 'Nhiếp ảnh', 'Ăn uống'
        ],
        photos: [
            'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1507548335453-2264668e6243?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1604004555489-723a93d6ce74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1594671025903-3c5737bac2de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        ]
    })
}