import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { Messages, NoWhitespaceValidator, Patterns } from '../../common/_validation';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../_services';
import { finalize } from 'rxjs';
import { showErrorAlert } from '../../common/alerts';
import { TokenHelper } from '../../_helpers';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  validationMessages = Messages.validation_messages;
  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
  }


  ngOnInit(): void {
    this.validateForm();
    if (TokenHelper.getUserDetail()) {
      this.router.navigateByUrl('/dashboard')
    }
  }

  validateForm() {
    this.loginForm = this.formBuilder.group({
      UserName: ['', Validators.compose([Validators.required, NoWhitespaceValidator, Validators.pattern(Patterns.emailRegex), Validators.maxLength(50)])],
      Password: ['', Validators.compose([Validators.required, NoWhitespaceValidator, Validators.pattern(Patterns.passwordRegex), Validators.maxLength(20), Validators.minLength(6)])],
    },
    );
  }

  onLogin() {
    if (this.loginForm.valid) {
      let model = this.loginForm.value;
      this.authService
        .login(model)
        .pipe(finalize(() => {
        }))
        .subscribe({
          next: (result: any) => {
            if (result?.Code == 0) {
              let user_detail = JSON.stringify(this.loginForm.value);
              TokenHelper.setUserDetail(user_detail);
              this.router.navigate(['/dashboard'])
            } else {
              showErrorAlert(result.Message);
            }
          },
          error: (error) => {
            showErrorAlert(error.error.message);
          },
          complete: () => {
          }
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}


