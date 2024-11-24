import { environment } from "../../enviornments/environment";

var baseUrl = environment.baseUrl;



export const APIPaths = {
    
    //Auth Service Constant
    login: baseUrl + 'SignIn',

    //Program Service Contants
    dashboard: baseUrl + 'RecordReading',
    history: baseUrl + '',
    changePassword: baseUrl + 'ChangePassword',
    addMeter:baseUrl + '/AddMeter'
   
   

   
}