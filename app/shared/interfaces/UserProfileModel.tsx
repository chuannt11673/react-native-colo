export default interface  UserProfileModel {
    name: string;
    dob: string;
    gender: string;
    hometown: string;
    job: string;
    targetGender: string;
    height: string;
    fromAge: number;
    toAge: number;
    
    note?: string;
    avatar?: string;
    images?: string[];
};
