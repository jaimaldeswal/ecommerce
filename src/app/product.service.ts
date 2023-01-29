import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  currentToggle = false;
  searchsubject = new Subject();
  filterSubject = new Subject();
  toggleSideBarSubject = new Subject();
  clearFilter = new Subject();
  clearSearchSubject = new Subject();
  constructor(private http: HttpClient) {
  }

  getJSON(): Observable<any> {
    return this.http.get('../assets/data/products .json');
  }
  toggleSideBar() {
    this.currentToggle = !this.currentToggle;
  }

}
