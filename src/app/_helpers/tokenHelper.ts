import { jwtDecode } from "jwt-decode";

const APIPaths = {
    accessTokenKey: 'angular17token',
}


export class TokenHelper {

    public static getAccessToken(): string | any {
        return localStorage.getItem(APIPaths.accessTokenKey);
    }

    public static setToken(token: any): void {
        localStorage.setItem(APIPaths.accessTokenKey, token);
    }

    public static removeAccessToken(): void {
        return localStorage.removeItem(APIPaths.accessTokenKey);
    }

    public static getBearerToken() {
        const token = localStorage.getItem(APIPaths.accessTokenKey);
        return {
            Authorization: token ? 'Bearer ' + token : null
        };
    }
      
       public static isTokenExpired(token: string): boolean {
        const parts = token.split('.');
        if (parts.length !== 3) {
          return true; // Invalid token format
        }
      
        const payloadBase64 = parts[1];
        const payloadStr = atob(payloadBase64.replace('-', '+').replace('_', '/'));
        const payload = JSON.parse(payloadStr);
        return Date.now() > payload.exp * 1000; // Adjust for milliseconds
      }

    public static isTokenCurrent() {
        let user = null;
        user = TokenHelper.parseUserToken();
        let exp =  new Date(user?.exp * 1000)
        
            if (exp < new Date()) {
                localStorage.clear()
            }
        
        return exp > new Date() ? TokenHelper.getAccessToken() : null;
       }

       public static parseUserToken() {
        let token = this.getAccessToken();
        let user: any;
        try {
            if (token) {
                var decodedToken = jwtDecode(token);
                if (token) {
                    user = jwtDecode(token);
                }
            }

        } catch (error) {
            console.log(error);
        }
        return user;
    }

    
}
