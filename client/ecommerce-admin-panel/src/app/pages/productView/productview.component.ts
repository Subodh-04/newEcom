import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-productview',
  templateUrl: './productview.component.html',
  styleUrls: ['./productview.component.scss']
})
export class ProductViewComponent implements OnInit, OnDestroy {
  product: any;
  currentImageIndex = 0;
  slideshowInterval: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getById(id).subscribe(product => {
      this.product = product;
      if (this.product.images && this.product.images.length > 1) {
        this.startSlideshow();
      }
    });
  }

  startSlideshow() {
    this.slideshowInterval = setInterval(() => {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.product.images.length;
    }, 1500);
  }

  ngOnDestroy(): void {
    if (this.slideshowInterval) {
      clearInterval(this.slideshowInterval);
    }
  }

  changeImage(index: number) {
    this.currentImageIndex = index;
  }

  editProduct(id: number) {
    this.router.navigate(['/products','edit', id ]);
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(id).subscribe(() => {
        alert('Product deleted successfully');
        this.router.navigate(['/products']);
      });
    }
  }
}
