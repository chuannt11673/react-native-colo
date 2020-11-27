import { AxiosInstance } from "axios";

const AxiosClient: AxiosInstance = require('axios').default;
AxiosClient.defaults.baseURL = 'http://colo-auth.azurewebsites.net';
export default AxiosClient;