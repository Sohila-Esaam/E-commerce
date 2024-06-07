import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  categoriesList:any = [];
  constructor(private _ProductService:ProductService){

  }
  
  ngOnInit(): void {
    this._ProductService.getAllCategories().subscribe({
      next: (response) => {
        this.categoriesList = response.data;
        console.log(this.categoriesList);
        
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
        items: 7
      },
    },
    nav: true
  }
}
