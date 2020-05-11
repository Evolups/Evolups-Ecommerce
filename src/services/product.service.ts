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

  getProducto(id: string) {

    return this.http.get<Array<any>>('https://evolups.azurewebsites.net/api/product');
  }

  getProductoporCaegoria(id: string) {

    return this.http.get<Array<any>>('https://evolups.azurewebsites.net/api/productbycategoria/'+id);
  }

  getOfertas(id: string) {

    return this.http.get<Array<any>>('https://evolups.azurewebsites.net/api/ofertas/'+id);
  }

getSectores(){
  return this.http.get<Array<any>>('https://evolups.azurewebsites.net/api/sectores');

}
  
  getProductoNuevos(id: string) {

    return this.http.get<Array<any>>('https://evolups.azurewebsites.net/api/productbycategoria/'+id);
  }

  getMarcas() {

    return this.http.get<Array<any>>('https://evolups.azurewebsites.net/api/marcas/');
  }

  getCategoria() {
    return this.http.get<Array<any>>('https://evolups.azurewebsites.net/api/categorias/');
  }

  getVenta(id:string) {
    return this.http.get<Array<any>>('https://evolups.azurewebsites.net/api/venta/'+id);
  }

  getBuscar(id:string) {
    return this.http.get<Array<any>>('https://evolups.azurewebsites.net/api/BuscaProductosbylike/'+id);
  }


}
