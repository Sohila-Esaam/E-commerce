import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit{

  brandsList:any;

  constructor(private _ProductService:ProductService){}

  ngOnInit(): void {
    this._ProductService.getAllBrands().subscribe({
      next: (response) =>{
        this.brandsList = response.data;
        console.log(this.brandsList);
      }
    })
  }
}
