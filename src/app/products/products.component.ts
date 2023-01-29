import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationPromptComponent } from '../confirmation-prompt/confirmation-prompt.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface Product {
  name: string,
  image: string,
  category: string,
  brand: string,
  size: string,
  price: string,
  year: string,
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  allProductsBase: Product[] = [];
  currentProduct: Product[] = [];

  constructor(
    public productService: ProductService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.productService.searchsubject
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value: any) => {
        this.searchHandler(value);
      });
    this.productService.filterSubject
      .subscribe((value: any) => {
        this.filterHandler(value);
      });
  }

  getAllProducts() {
    this.productService.getJSON().subscribe((data) => {
      this.allProductsBase = data;
      this.currentProduct = data;
    });
  }
  onDelete(i: number) {
    const heading = 'Are you sure to delete ' + this.currentProduct[i].name + ' ?';
    const dialogRef = this.dialog.open(ConfirmationPromptComponent, {
      width: '480px',
      data: {
        tagline: heading,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'OK') {
        const newData = this.allProductsBase.filter(el => el.name != this.currentProduct[i].name);
        this.allProductsBase = newData;
        this.currentProduct.splice(i, 1);
      }
    });
  }
  productDetails(i: number) {
    const dialogRef = this.dialog.open(ProductDetailComponent, {
      width: '600px',
      data: {
        product: this.currentProduct[i],
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'onDelete') {
        this.onDelete(i)
      }
    }
    )
  }
  searchHandler(value: string) {
    const newProduct = this.allProductsBase.filter(el => el.name.includes(value) || el.brand.includes(value) || el.category.includes(value) || el.year.includes(value));
    this.currentProduct = newProduct;
    this.productService.clearFilter.next(true)
  }
  togglesidenav() {
    this.productService.toggleSideBarSubject.next(true)
  }
  filterHandler(data) {
    this.productService.clearSearchSubject.next(true)
    if (data.clear) {
      this.currentProduct = [...this.allProductsBase];
    } else {
      let filterdProduct = [...this.allProductsBase];
      if (data.priceMin) {
        filterdProduct = filterdProduct.filter(el => +el.price >= +data.priceMin)
      }
      if (data.priceMax) {
        filterdProduct = filterdProduct.filter(el => +el.price <= +data.priceMax)
      }
      if (data.size) {
        filterdProduct = filterdProduct.filter(el => el.size == data.size)
      }
      let brandFilter = ''
      let flag = false;
      if (data.rebook) {
        flag = true
        brandFilter += brandFilter + ' rebook '

      }
      if (data.nike) {
        flag = true
        brandFilter += brandFilter + ' nike '
      }
      if (data.adidas) {
        flag = true
        brandFilter += brandFilter + ' adidas '
      }
      if (flag) {
        filterdProduct = filterdProduct.filter(el => brandFilter.includes(el.brand))

      }
      this.currentProduct = filterdProduct;
    }

  }
}
