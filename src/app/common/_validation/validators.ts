import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Observable, of } from "rxjs";



export function NoWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const isWhitespace = (control.value || '').trim().length === 0;
        const isValid = !isWhitespace;
        return isValid ? null : { whitespace: true };
    };
}



export function MatchPassword(password: string, confirmPassword: string) {
    return (group: FormGroup) => {
        let passwordInput = group.controls[password],
            passwordConfirmationInput = group.controls[confirmPassword];
        if (passwordInput.value && passwordInput.value !== passwordConfirmationInput.value) {
            return passwordConfirmationInput.setErrors({ notEquivalent: true })
        }
        else {
            return null;
        }
    }
}
















