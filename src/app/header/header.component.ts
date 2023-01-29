import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  search = new FormControl('');
  constructor(
    public productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.filterSubject
      .subscribe((value: any) => {
        this.clearSearch();
      });
  }
  searchHandler() {
    this.productService.searchsubject.next(this.search.value)
  }
  clearSearch() {
    this.search.setValue('')
  }
}
