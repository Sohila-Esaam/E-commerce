import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  isLogin:boolean = false;
  numsOfCartItems:any;

  constructor(private _AuthService:AuthService, private _CartService:CartService){
    _CartService.numsOfCartItems.subscribe({
      next: (x) => {
        this.numsOfCartItems = x;
      }
    })
  }

  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next: () => {
        if(this._AuthService.userData.getValue() !== null){
          this.isLogin = true;
        }
        else{
          this.isLogin = false;
        }
      }
    })
  }

  logout(){
    this._AuthService.logout();
  }

}
