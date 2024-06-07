import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.css']
})
export class BrandDetailsComponent implements OnInit{
  brandId:any;
  brandDetails:any;
  constructor(private _ActivatedRoute:ActivatedRoute, private _ProductService:ProductService){
    _ActivatedRoute.paramMap.subscribe((params)=> {
      this.brandId = params.get('id');
    })
  }

  ngOnInit(): void {
    this._ProductService.getBrandDetails(this.brandId).subscribe({
      next: (response) =>{
        this.brandDetails = response.data;
        console.log(this.brandDetails);
      }
    })
  }
}
