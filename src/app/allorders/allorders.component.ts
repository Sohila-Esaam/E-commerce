import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit{
  constructor(private _CartService:CartService){}

  shippingAddressDetails:any;
  totalOrderPriceDetails:any;
  cartItemsDetails:any;
  price:any;
  responseList:any = []

  ngOnInit(): void {
    this._CartService.getAllOrders().subscribe({
      next: (response)=>{
        this.shippingAddressDetails = response.data[0].shippingAddress;
        this.totalOrderPriceDetails = response.data[0].totalOrderPrice;
        this.price = response.data[0].totalOrderPrice;
        this.responseList = response
        console.log(this.responseList);
        
      }
    })
  }
}
