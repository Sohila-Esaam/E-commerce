import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  productId:any;
  productDetails:any;
  constructor(private _ActivatedRoute:ActivatedRoute, private _ProductService:ProductService, private _CartService:CartService, private _Toastr:ToastrService){}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((param) =>
      {
        this.productId = param.get('id')
      })

    this._ProductService.getProductDetails(this.productId).subscribe({
      next:(response) => {
        this.productDetails = response.data;
        console.log(this.productDetails);
      },
      error:(err) => console.log(err)
    })
  }

  //addToCart
  addToCart(id:string){
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        this._Toastr.success("this product added successfully in your cart", "success", {closeButton:true, positionClass:'toast-top-left'});
        this._CartService.numsOfCartItems.next(response.numOfCartItems)
        console.log(response);
      },
      error: (err) =>{
        console.log(err);
      }
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }
}
