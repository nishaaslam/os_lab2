export class Messages {
    public static validation_messages = {
        'email': [
            { type: 'required', message: 'Email is required' },
            { type: 'pattern', message: 'Enter a valid email' },
            { type: 'maxlength', message: 'Email should not be more than 50 characters ' },
            { type: 'whitespace', message: 'Only whitespace is not allowed ' },
        ],
       
       'name': [
            { type: 'required', message: 'Name is required' },
            { type: 'pattern', message: 'Enter a valid name' },
            { type: 'maxlength', message: 'Name must not be greater than 50 characters ' },
            { type: 'whitespace', message: 'Only whitespace is not allowed ' }
        ],
        'value': [
            { type: 'required', message: 'Value is required' },
            { type: 'pattern', message: 'Enter a valid value' },
            { type: 'maxlength', message: 'Value must not be greater than 50 characters ' },
            { type: 'whitespace', message: 'Only whitespace is not allowed' },
        ],
      
        'cnic': [
            { type: 'required', message: 'CNIC is required' },
            { type: 'pattern', message: 'Enter a valid CNIC' },
            { type: 'minlength', message: 'CNIC must  contain  13 digits' },
            { type: 'maxlength', message: 'CNIC must not be greater than 13 digits' },
        ],
        
        'address': [
            { type: 'required', message: 'Address is required' },
            { type: 'maxlength', message: 'Address must not be greater than 300 characters ' },
            { type: 'whitespace', message: 'Only whitespace is not allowed ' }
        ],
        'mobile': [
            { type: 'required', message: 'Phone Number is required' },
            { type: 'pattern', message: 'Enter a valid Phone number' },
            { type: 'whitespace', message: 'Only whitespace is not allowed ' },
            { type: 'minlength', message: 'Phone Number must be at least  number ' },
            { type: 'maxlength', message: 'Phone  Number should not be more than 11 number' }
        ],
        'password': [
            { type: 'required', message: 'Password is required' },
            { type: 'minlength', message: 'Password must be at least 6 characters ' },
            { type: 'maxlength', message: 'Password must be at most 20 characters ' },
            { type: 'pattern', message: 'Password must contain at least one uppercase, lowercase, number, special character and no space' },
            { type: 'tooltip', message: 'Password must be at least 8 and at most 20 characters ,must contain at least one uppercase, lowercase, number, special character and no space' },
            { type: 'whitespace', message: 'Only whitespace is not allowed ' },
        ],
        
        'confirmPassword': [
            { type: 'required', message: 'Confirm Password is required' },
            { type: 'notEquivalent', message: 'Password did not match' },
            { type: 'minlength', message: 'Password must be at least 6 characters ' },
            { type: 'maxlength', message: 'Password must be at most 20 characters ' },
            { type: 'pattern', message: 'Password must contain at least one uppercase, lowercase, number, special character and no space' },
            { type: 'whitespace', message: 'Only whitespace is not allowed ' },
        ],
    }
}
