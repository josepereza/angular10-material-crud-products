import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  BASE_URL =  'http://localhost:3333/products';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: Boolean = false): void {
    this.snackBar.open(msg, 'X', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: isError ? ['msg-error'] : ['msg-sucess'],
    });
  }

  handleErrror(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.BASE_URL, product).pipe(
      map(obj => obj),
      catchError(e => this.handleErrror(e))
    );
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.BASE_URL).pipe(
      map(obj => obj),
      catchError(e => this.handleErrror(e))
    );
  }

  readById(id: string): Observable<Product> {
    const url = `${this.BASE_URL}/${id}`;
    return this.http.get<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.handleErrror(e))
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.BASE_URL}/${product.id}`;
    return this.http.put<Product>(url, product).pipe(
      map(obj => obj),
      catchError(e => this.handleErrror(e))
    );
  }

  delete(id: number): Observable<Product> {
    const url = `${this.BASE_URL}/${id}`;
    return this.http.delete<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.handleErrror(e))
    );
  }
}
