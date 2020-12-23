export default interface  UserProfileModel {
    name: string;
    dob: string;
    gender: string;
    address: string;
    job: string;
    targetGender: string;
    height: string;
    fromAge: number;
    toAge: number;
    
    note?: string;
    avatar?: string;
    images?: string[];
};
