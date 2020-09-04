import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  BASE_URL =  'http://localhost:3333/products';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.BASE_URL, product);
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.BASE_URL);
  }
}
