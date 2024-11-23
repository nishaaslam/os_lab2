import { Observable, EMPTY, throwError } from "rxjs";
import { TokenHelper } from "../../_helpers";

export class Patterns {
    public static passwordRegex: RegExp = /^(?!.*[\s])(?=.*[a-z])(?=.*\d)(?=.*[A-Z])(?=.*[0-9])(?=.*[~`!?@#\$%\^&\*\[\]"\';:_\-<>\.,=\+\/\\\(\)|{}]).+$/;
    public static emailRegex: RegExp = /^[0-9A-Za-z._-]+@[A-Za-z0-9]+\.[A-Za-z._-]+$/;
    public static Num: RegExp = /^[0-9]*$/i;
    public static nameRegex: RegExp = /^[A-Za-z ]+$/; 
}
