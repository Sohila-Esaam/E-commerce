import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  userId : string = "";
  numsOfCartItems = new BehaviorSubject(0);

  constructor(private _HttpClient:HttpClient) {
    this.getLoggedUserCart().subscribe({
      next:(response) => {
        console.log(response);
        
         this.userId = response.data._id
          this.numsOfCartItems.next(response.numOfCartItems)
      },
      error:(err) => console.log(err)
    })
    
   }

   headers:any = {token : localStorage.getItem('userToken')};

   //addToCart
   addToCart(productId:string):Observable<any>{
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/cart" , 
      {"productId": productId},  //body that need id of product to know which product that added to cart
      {headers : this.headers}  //headers for token to know which user that add to cart
    )
   }

   //get Logged user cart ==> get all products in cart
   getLoggedUserCart():Observable<any>{
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/cart" , 
      {headers : this.headers} 
    )
   }

   //delete from cart
   RemoveSpecificCartItem(productId:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {headers : this.headers}
    ) 
   }

   //update Item Count
   updateItemCount(productId:string, count:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {count : count},
      {headers : this.headers}
    )
   }

   //Checkout session
   onlinePayment(shippingAddress:any ,id:string){
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {shippingAddress : shippingAddress},  
      {headers: this.headers}
    )
   }

   //get all orders
   getAllOrders():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/`);
   }

    //getUserOrders
  getUserOrders(cartId:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartId}`,
      {headers : this.headers}
    )
  }
}
