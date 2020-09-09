import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class BagService {
public user:string="";

  public totalBagItems = new BehaviorSubject<number>(0);
  public cantidad:any=[];
  public items: any = [];
  public userlog = new BehaviorSubject<any>(null);
  public totalitems=0;

   count = 0;
  groupItems: any[][] = [];
  userLog:any;
  
  private sendOrderModel = {
    Cliente: 'cliente de prueba',
    Fecha: '2020-04-05',
    Item: 'LP32',
    Descripcion: 'Pruena',
    Cantidad: 5,
    Precio: 100,
    descuento: 0,
    ïtbis: 0,
    Direccion: 'la direccion  XXX',
    telefono: '8095544554',
    Celular: '8095544554',
    Comercio: 'El Comercio',
    usuario:"",
    flete:90
  };

  latitude: number=1.00;
  longitude: number=2.00;
  // parque simon bolivar
 origin:any= { lat:4.676802158355713, lng: -74.04825592041016 };
        // Parque la 93
  destination:any=  { lat: 4.676802158355713, lng: -74.04825592041016 };
  orig:any= [];
  tiempo:string;
  distancia:string;
  envio:number;

  constructor(private http: HttpClient) { }
 
  ngOnInit(): void {
    this.getuserlog();
   }
  
  
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
  calcularSubTotal() {
    const sumtotal = this.items.reduce((sumtotal, current) => sumtotal + current.precio1*current.cantidad, 0);
    return sumtotal;
  }

  calcularTotal() {
    const sum =this.items.reduce((sum, current) => sum + current.precio1*current.cantidad, 0);
    return sum;
  } 
  addItem(item) {
    if( this.items.filter(x => x.codigo !=item.codigo)){
    //item.cantidad=  10;
    } else {
     
       // item.cantidad=  10;
    } 
    console.log('addded', item);
    this.items.push(item);
   this.groupItems[0]=this.items[0].cantidad;
    this.totalBagItems.next(this.items.length);
    this.count++;
    
   // this.cantItem=this.totalBagItems.next(this.items.length);
    
  }

  eliminarArticulos(itemArray = [], isAll = false) {
    if (isAll) {
      this.items = [];
    } else {
     
      this.items = this.items.filter(x => x.codigo != itemArray[0].codigo);
    }
  
    this.totalBagItems.next(this.items.length);
   //this.cantidad.net(this.items.length);
  }

  getuserlog(){
    this.userLog=JSON.parse(localStorage.getItem('e-commerce')); 
  }
  
  ActualizarArticulo(item) {
  
    this.items.push(item);
    this.totalBagItems.next(this.items.length);
  }

  sendOrder(obj) {
    // let headers = new HttpHeaders({
    //   "Accept": 'application/json',
    //   'Content-Type': 'application/json,accept,content-type,origin,x-my-header',
    //   'Access-Control-Allow-Origin': '*'
    // });

    // let options = { headers: headers };
    //produccion
   return this.http.post('https://evolovers.com/api/venta', obj);

   //localhost
  //return this.http.post('http://localhost:56890/api/venta', obj);
  }

  
  
  getcars(obj) {
    // let headers = new HttpHeaders({
    //   "Accept": 'application/json',
    //   'Content-Type': 'application/json,accept,content-type,origin,x-my-header',
    //   'Access-Control-Allow-Origin': '*'
    // });

    // let options = { headers: headers };
    //produccion
  //return this.http.post('https://evolovers.com/api/car', obj);

   //localhost
   //return this.http.get<Array<any>>('http://localhost:56890/api/car/'+'112');

  return  this.http.post('https://evolovers.com/api/car', obj.replace("@",'').replace(".",''));

  }
  


  
  addcars(obj) {
    // let headers = new HttpHeaders({
    //   "Accept": 'application/json',
    //   'Content-Type': 'application/json,accept,content-type,origin,x-my-header',
    //   'Access-Control-Allow-Origin': '*'
    // });

    // let options = { headers: headers };
    //produccion
  //return this.http.post('https://evolovers.com/api/car', obj);

   //localhost
   //return this.http.get<Array<any>>('http://localhost:56890/api/car/'+'112');

 return  this.http.post('https://evolovers.com/api/car', obj);

 // return  this.http.post('http://localhost:56890/api/car', obj);
  
  }
  
  payCard(obj) {
    // let headers = new HttpHeaders({
    //   "Accept": 'application/json',
    //   'Content-Type': 'application/json,accept,content-type,origin,x-my-header',
    //   'Access-Control-Allow-Origin': '*'
    // });

    // let options = { headers: headers };
    //produccion
   return this.http.post('https://testsecureacceptance.cybersource.com/silent/pay', obj);

   //localhost
   //return this.http.post('http://localhost:56890/api/venta', obj);
  }


  getOrders() {
    return this.http.get<any>('https://evolovers.com/api/venta/3232');
  }

  

 getDistancia(origen: string, destino: string) {

  return new google.maps.DistanceMatrixService().getDistanceMatrix({
  'origins': [origen], 
  'destinations': [destino], 
  travelMode: 'DRIVING'}, 
  (results: any) => {
    return results.rows[0].elements[0].distance.text;
  /*   this.distancia=results.rows[0].elements[0].distance.text;
    this.tiempo=results.rows[0].elements[0].duration.text;
    this.envio=(results.rows[0].elements[0].distance.value/1000)*7; */

  /*   console.log('origen -- ', [origen]);
    console.log('destino-- ', [destino]);
      console.log('resultados distancia (mts) -- ', results.rows[0].elements[0].distance.text);
      console.log('tiempo-- ', results.rows[0].elements[0].duration.text);
      console.log('resultados -- ', results.rows[0]);
 */
  });
}




  // Get Current Location Coordinates
    setCurrentLocation(origencomercio:any) {
    //if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.destination={lat:this.latitude, lng:this.longitude };
       // this.origin={lat:19.03328,lng:-69.26474};

 /*        console.log('origen comercio-- ', origencomercio);
        console.log('destino-- ', this.destination);
 */
        this.getDistancia(origencomercio ,this.destination);
        //this.zoom = 8;
        //this.getAddress(this.latitude, this.longitude);
      });
   // }
  }



}
