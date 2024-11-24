import { environment } from "../../enviornments/environment";

var baseUrl = environment.baseUrl;



export const APIPaths = {
    
    //Auth Service Constant
    login: baseUrl + 'SignIn',

    //Program Service Contants
    dashboard: baseUrl + 'RecordReading',
    history: baseUrl + '',
    changePassword: baseUrl + 'ChangePassword',
    registerCustomer: baseUrl + 'RegisterCustomer',
    addMeter:baseUrl + 'RegisterMeterWithCustomer',
    getAllusers:baseUrl + 'GetAllUsers',
    createCredentials:baseUrl + 'CreateCredentials',
    recordReading: baseUrl + 'RecordReading',
    addMeterType: baseUrl + 'AddMeter'
   
   

   
}