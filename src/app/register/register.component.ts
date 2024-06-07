import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  isLoading:boolean =false;
  formError:string = '';

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, {validators : this.rePasswordMatch})

  rePasswordMatch(registerForm:any){
    let passwordControl = registerForm.get('password');
    let repasswordControl = registerForm.get('rePassword');

    if(passwordControl.value === repasswordControl.value){
      return null;
    }
    else{
      repasswordControl.setErrors({passwordMatch : "password and repassword not match"});
      return {PasswordMatch : "password and repassword not match"};
    }
  }
  
  constructor(private _AuthService:AuthService, private _Router:Router){ 
    if(localStorage.getItem('userToken') !== null){
      _Router.navigate(['/home']);
    }
  }


  handleRegister(registerForm:FormGroup){
    this.isLoading = true;
    if(registerForm.valid){
      //call register method from service
      this._AuthService.register(registerForm.value).subscribe({
        next: (response) => {
          if(response.message === 'success'){
            this._Router.navigate(['/login']);
            this.isLoading = false;
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.formError = err.error.message;
        }
      })
    }
  }
}
