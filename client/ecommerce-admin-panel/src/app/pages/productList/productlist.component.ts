import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  viewProductDetails(productId: number) {
    this.router.navigate(['/products', productId]);
  }

  loadProducts() {
    this.productService.getAll().subscribe((data) => (this.products = data));
  }

  editProduct(id: number) {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure to delete this product?')) {
      this.productService.delete(id).subscribe(() => this.loadProducts());
    }
  }
}
