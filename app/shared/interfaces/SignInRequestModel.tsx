export default interface SignInRequestModel {
    username: string;
    password: string;
    callback?: (err: string) => void;
}