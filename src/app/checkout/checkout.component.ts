import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  constructor(private _CartService:CartService){
  }

  shippingAddress:FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null),

  })

  navigateUrl(url:any){
    window.location.href = url
  }
  
  handleSubmit(shippingAddress:FormGroup){
    console.log(shippingAddress.value);
    this._CartService.onlinePayment(shippingAddress.value, this._CartService.userId).subscribe({
      next: (response:any) => {
        console.log(response.session.url);
        
       this.navigateUrl(response.session.url);
      }
    })
  }
  
}
