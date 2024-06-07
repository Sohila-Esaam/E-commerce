import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { BrandsComponent } from './brands/brands.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { authGuard } from './auth.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AllordersComponent } from './allorders/allorders.component';
import { OrdersComponent } from './orders/orders.component';
import { BrandDetailsComponent } from './brand-details/brand-details.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', canActivate:[authGuard], component:HomeComponent},
  {path:'about', canActivate:[authGuard],  component:AboutComponent},
  {path:'allorders', canActivate:[authGuard],  component:AllordersComponent},
  {path:'orders', canActivate:[authGuard],  component:OrdersComponent},
  {path:'categories', canActivate:[authGuard],  component:CategoriesComponent},
  {path:'category/:id', canActivate:[authGuard],  component:SubCategoryComponent},
  {path:'brands', canActivate:[authGuard],  component:BrandsComponent},
  {path:'brand/:id', canActivate:[authGuard],  component:BrandDetailsComponent},
  {path:'cart', canActivate:[authGuard],  component:CartComponent},
  {path:'checkout', canActivate:[authGuard],  component:CheckoutComponent},
  {path:'productDetails/:id', canActivate:[authGuard],  component:ProductDetailsComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'**', component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
