import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatchPassword, Messages, NoWhitespaceValidator, Patterns } from '../../common/_validation';
import { CommonModule } from '@angular/common';
import { ProgramService } from '../../_services/program.service';
import { finalize } from 'rxjs';
import { showErrorAlert, showSuccessAlert } from '../../common/alerts';
import { TokenHelper } from '../../_helpers';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,NgxMaskDirective],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss'
})
export class AccountFormComponent implements OnInit {
  form!: FormGroup;
  loginForm!: FormGroup;
  meterForm!: FormGroup;
  validationMessages = Messages.validation_messages;
  constructor(private formBuilder: FormBuilder, private programService: ProgramService) { }

  ngOnInit(): void {
    this.validateForm();
    this.validateLoginForm();
    this.validateMeterForm();
    let userModel = TokenHelper.getUserDetail();
    if (userModel) {
      userModel = JSON.parse(userModel);
      this.loginForm.patchValue(userModel)
    }
  }

  validateForm() {
    this.form = this.formBuilder.group({
      CustomerId: [null],
      FullName: [null, Validators.compose([Validators.required, NoWhitespaceValidator, Validators.pattern(Patterns.nameRegex), Validators.maxLength(50),Validators.minLength(3)])],
      EmailAddress: [null, Validators.compose([Validators.required, NoWhitespaceValidator, Validators.pattern(Patterns.emailRegex), Validators.maxLength(50)])],
      MobileNo: ['', Validators.compose([Validators.required, NoWhitespaceValidator, Validators.pattern(Patterns.Num), Validators.minLength(11), Validators.maxLength(11)])],
      CnicNo: ['', Validators.compose([Validators.required, NoWhitespaceValidator, Validators.pattern(Patterns.Num), Validators.minLength(13), Validators.maxLength(13)])],
      FullAddress: ['', Validators.required, NoWhitespaceValidator, Validators.maxLength(300)],
      CityName: ['', Validators.compose([Validators.required, NoWhitespaceValidator, Validators.pattern(Patterns.nameRegex), Validators.maxLength(50),Validators.minLength(3)])],
    },

    );
  }

  validateMeterForm() {
    this.meterForm = this.formBuilder.group({
      meter_detail: this.formBuilder.array([]),
    },
    );
  }

  validateLoginForm() {
    this.loginForm = this.formBuilder.group({
      UserName: [{ value: "", disabled: true }, Validators.compose([Validators.required, NoWhitespaceValidator, Validators.pattern(Patterns.nameRegex), Validators.maxLength(50)])],
      Password: [{ value: "", disabled: true }, Validators.compose([Validators.required, NoWhitespaceValidator, Validators.minLength(6), Validators.maxLength(20)])],
      NewPassword: ["", Validators.compose([Validators.required, NoWhitespaceValidator, Validators.minLength(6), Validators.maxLength(20), Validators.pattern(Patterns.passwordRegex)])],
      confirm_new_password: ["", Validators.compose([Validators.required])],
    },
      { validators: MatchPassword('NewPassword', 'confirm_new_password') }
    );
  }

  get meter_detail(): FormArray {
    return this.meterForm.get("meter_detail") as FormArray;
  }

  addMeterDetails() {
    this.meter_detail.push(
      this.formBuilder.group({
        meter_number: ['', Validators.compose([Validators.required, NoWhitespaceValidator])],
        reference_number: ['', Validators.compose([Validators.required, NoWhitespaceValidator])],
        old_reference_number: ['', Validators.compose([Validators.required, NoWhitespaceValidator])],
        connection_date: ['', Validators.compose([Validators.required, NoWhitespaceValidator])],
        meter_load: ['', Validators.compose([Validators.required, NoWhitespaceValidator])],
        status: ['', Validators.compose([Validators.required, NoWhitespaceValidator])],
        meter_type: ['', Validators.compose([Validators.required, NoWhitespaceValidator])],
      })
    )
  }

  onLoginDetailSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      let model = this.loginForm.getRawValue();
      model.OldPassword = model.Password;
      delete model.Password;
      delete model.confirm_new_password;
      this.programService
        .changePassword(model)
        .pipe(finalize(() => {
          
        }))
        .subscribe({
          next: (result: any) => {
            if (result && result?.Code==0) {
              showSuccessAlert("Password Changed Successfully.")
            }else{
              showErrorAlert(result.Message) 
            }
          },
          error: (error) => {
            showErrorAlert(error.error.message);
          }
        });
    }
  }


  onSubmit() { 
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      let model = this.form.getRawValue();
      this.programService
        .registerCustomer(model)
        .pipe(finalize(() => {
          //this.form.reset();
        }))
        .subscribe({
          next: (result: any) => {
            if (result && result?.Code==0) {
              showSuccessAlert(result.Message)
            }else{
              showErrorAlert(result.Message) 
            }
          },
          error: (error) => {
            showErrorAlert(error.error.message);
          }
        });
    }
  }


  onMeterSubmit() {
    let model = this.meterForm.value;
    this.programService
      .addMeter(model)
      .pipe(finalize(() => {
      }))
      .subscribe({
        next: (result: any) => {
          if (result) {
            showSuccessAlert("Meter Details Added Successfully.")
          }
        },
        error: (error) => {
          showErrorAlert(error.error.message);
        },
        complete: () => {
        }
      });
  }
}
