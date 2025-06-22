import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './pages/productList/productlist.component';
import { ProductFormComponent } from './pages/productForm/productform.component';
import { ProductViewComponent } from './pages/productView/productview.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'products/add', component: ProductFormComponent },
  { path: 'products/:id', component: ProductViewComponent },
  { path: 'products/edit/:id', component: ProductFormComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
