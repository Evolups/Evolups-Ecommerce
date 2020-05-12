import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducto_Detalle(id: string) {

    return this.http.get<Array<any>>('https://evolups.azurewebsites.net/api/product/' + id);
  }

}
