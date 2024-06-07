import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient, private _Router:Router) { }

  //getAllProduct
  getALLProduct():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  //getProductDetails
  getProductDetails(id:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  //getAllCategories
  getAllCategories():Observable<any>{
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  //getCategoryDetails
  getCategoryDetails(id:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  }

  //getAllOrders
  getAllOrders():Observable<any>{
    return this._HttpClient.get("https://route-ecommerce.onrender.com/api/v1/orders/");
  }

  //getAllBrands
  getAllBrands():Observable<any>{
    return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/brands")
  }

  //getBrandDetails
  getBrandDetails(id:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
  }
}
