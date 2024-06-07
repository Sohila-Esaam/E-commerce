import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit{
  categoryId: any;
  categoryDetails: any;
  constructor(private _ActivatedRoute:ActivatedRoute, private _ProductService:ProductService){

  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) =>
    {
      this.categoryId = params.get('id');
      console.log(this.categoryId);
      
    })

    this._ProductService.getCategoryDetails(this.categoryId).subscribe({
      next:(response) => {
        this.categoryDetails = response.data;
      }
    })
  }
}
