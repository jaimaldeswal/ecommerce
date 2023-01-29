import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;

  filterForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public productService: ProductService
  ) { }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      priceMin: [''],
      priceMax: [''],
      size: [''],
      rebook: [''],
      nike: [''],
      adidas: [''],
    })
    this.productService.toggleSideBarSubject
      .subscribe((value: any) => {
        this.togglesidenav();
      });
    this.productService.clearFilter
      .subscribe((value: any) => {
        this.filterForm.reset();
      });
  }
  onFilterSubmit() {
    this.togglesidenav();
    this.productService.filterSubject.next(this.filterForm.value)
  }

  clearFilter() {
    this.togglesidenav();
    this.filterForm.reset()
    this.productService.filterSubject.next({ clear: true })

  }

  togglesidenav() {
    this.productService.currentToggle = !this.productService.currentToggle;
    this.sidenav.toggle();
  }

}
