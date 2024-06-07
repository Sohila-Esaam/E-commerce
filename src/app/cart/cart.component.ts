import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cartDetails:any = [];
  constructor(private _CartService:CartService , private _Toastr:ToastrService){}

  ngOnInit(): void {
    // get all products
    this._CartService.getLoggedUserCart().subscribe({
      next: (response) =>{
        console.log(response.data);
        this.cartDetails = response.data;
      },
      error: (err) => console.log(err)
      
    })
  }

  //remove from cart
  removeProduct(productId:string){
    this._CartService.RemoveSpecificCartItem(productId).subscribe({
      next: (response) => {
        console.log(response);
        this.cartDetails = response.data ;
        this._Toastr.success("this product removed successfully", 'success', {closeButton:true, positionClass:'toast-top-left'})
      },
      error: (err) => console.log(err),
    })
  }

  //update item count
  updateCount(productId:string, count:number){
    this._CartService.updateItemCount(productId, count).subscribe({
      next: (response) =>{
        console.log(response);
        this.cartDetails = response.data;
      },
      error: (err) => console.log(err)
      
    })
  }

  increase(){
    this._Toastr.success("one product added successfully", 'success', {closeButton:true, positionClass:'toast-top-left'})
  }

  decrease(){
    this._Toastr.success("one product removed successfully", 'success', {closeButton:true, positionClass:'toast-top-left'})
  }
}