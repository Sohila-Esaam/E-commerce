import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLoading:boolean = false;
  formError:string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  })

  constructor(private _AuthService:AuthService, private _Router:Router){
    if(localStorage.getItem('userToken') !== null){
      _Router.navigate(['/home']);
    }
  }

  handleLogin(loginForm:FormGroup){
    this.isLoading = true;
    if(loginForm.valid){
      this._AuthService.login(loginForm.value).subscribe({
        next: (response) => {
          if(response.message === 'success'){
            this.isLoading = false;
            //navigate to home page
            this._Router.navigate(['/home']);
            //save token in localStorage
            localStorage.setItem('userToken', response.token)
            //decode method in services
            this._AuthService.decodeUserData();
          }
        },
        error: (err) => {
          this.formError = err.message;
        }
      })
    }
  }
}
