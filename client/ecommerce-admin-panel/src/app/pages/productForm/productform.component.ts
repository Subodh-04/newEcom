import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './productform.component.html',
  styleUrls: ['./productform.component.scss'],
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  files: File[] = [];
  existingImages: string[] = [];
  imagesToRemove: string[] = [];
  editMode = false;
  productId: number;
  validationErrors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
    this.form = this.fb.group({
      sku: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.productId = +this.route.snapshot.params['id'];
    this.editMode = !!this.productId;

    if (this.editMode) {
      this.productService.getById(this.productId).subscribe((data) => {
        this.form.patchValue(data);
        this.existingImages = data.images || [];
      });
    }
  }

  onFileChange(event: any) {
    this.files = Array.from(event.target.files);
  }

  removeExistingImage(img: string) {
    this.imagesToRemove.push(img);
    this.existingImages = this.existingImages.filter(i => i !== img);
  }

  submit() {
    const formData = new FormData();
    Object.entries(this.form.value).forEach(([key, val]) => {
      formData.append(key, val?.toString() ?? '');
    });

    this.files.forEach((file) => formData.append('images', file));

    if (this.imagesToRemove.length) {
      formData.append('imagesToRemove', JSON.stringify(this.imagesToRemove));
    }

    const request$ = this.editMode
      ? this.productService.update(this.productId, formData)
      : this.productService.create(formData);

    request$.subscribe({
      next: () => this.router.navigate(['/products']),
      error: (err) => {
        if (err.status === 400 && err.error?.errors) {
          this.validationErrors = {};
          err.error.errors.forEach((e: any) => {
            this.validationErrors[e.field] = e.message;
          });
        }
      },
    });
  }
}
