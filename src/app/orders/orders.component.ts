import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  productList:any;
  
  cartId:string = ''

  constructor(private _ProductService:ProductService, private _CartService:CartService){}

  ngOnInit(): void {

    //getcartId
    // this._CartService.getLoggedUserCart().subscribe({
    //   next:(response) =>{
    //     console.log(response);
        
    //    this.cartId = response.data._id;
    //   }
    // })

    // allorders
    this._ProductService.getAllOrders().subscribe({
      next:(response)=>{
        this.productList = response.data
        console.log(this.productList);
      }
    })

    //userorders
    // this._CartService.getUserOrders(this.cartId).subscribe({
    //   next:(response) =>{
    //     console.log(response);
    //   },
    //   error:(err) => console.log(err)
      
    // })
  }
}
