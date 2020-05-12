import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BagService {

  public totalBagItems = new BehaviorSubject<number>(0);
  public items: any = [];
  groupItems: any[][] = [];
  private sendOrderModel = {
    Cliente: 'cliente de prueba',
    Fecha: '2020-04-05',
    Item: 'LP32',
    Descripcion: 'Pruena',
    Cantidad: 5,
    Precio: 100,
    descuento: 0,
    ïtbis: 0,
    Direccion: 'la direccion',
    telefono: '8095544554',
    Celular: '8095544554',
    Comercio: 'El Comercio'
  };

  constructor(private http: HttpClient) { }

  agruparItems() {
    this.groupItems = [];
    const source = from(this.items);
    // group by code
    const example = source.pipe(
      groupBy((item: any) => item.codigo),
      // return each item in group as array
      mergeMap(group => group.pipe(toArray()))
    );

    let contador = 0;
    const subscribe = example.subscribe(val => {
      this.groupItems[contador] = val;
      contador++;
    });

    // this.subTotal = this.bagService.calcularTotal();
  }
  calcularTotal() {
    const sum = this.items.reduce((sum, current) => sum + current.precio1, 0);
    return sum;
  }
  addItem(item) {
    console.log('addded', item);
    this.items.push(item);
    this.totalBagItems.next(this.items.length);
  }

  eliminarArticulos(itemArray = [], isAll = false) {
    if (isAll) {
      this.items = [];
    } else {
      this.items = this.items.filter(x => x.codigo != itemArray[0].codigo);
    }
    this.totalBagItems.next(this.items.length);
  }

  sendOrder(obj) {
    let headers = new HttpHeaders({
      "Accept": 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    let options = { headers: headers };
    return this.http.post<any>('/api/venta', obj, options);
  }

  getOrders() {
    return this.http.get<any>('https://evolups.azurewebsites.net/api/venta/3232');
  }
}
