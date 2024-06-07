import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  //zy rly f elconstructor bn3ml dependancy injection  
  //==> toastr = inject(ToastrService)

  allProducts:any[]=[];

  searchTerm: string = '';

  constructor(private _productService:ProductService, private _CartService:CartService, private _Toastr:ToastrService){}

  //addToCart
  addToCart(productId:string){
    this._CartService.addToCart(productId).subscribe({
      next: (response) => {
        this._Toastr.success("this product added successfully in your cart", "success", {closeButton:true, positionClass:'toast-top-left'});
        this._CartService.numsOfCartItems.next(response.numOfCartItems)
        console.log(response);
      },
      error: (err) =>{
        console.log(err);
      }
    })
  }

  ngOnInit(): void {
    //getAllProduct
    this._productService.getALLProduct().subscribe({
      next: (response) => {
        this.allProducts = response.data;
      }
    })
  }
  
}
