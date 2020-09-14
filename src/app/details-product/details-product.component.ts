import { Component, OnInit,Input, ElementRef, NgZone  } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { BagService } from 'src/services/bag.service';
import { MapsAPILoader, MouseEvent } from '@agm/core';
declare var google: any;


@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})

export class DetailsProductComponent implements OnInit {
  groupMarcas: any[][] = [];
  marcas: any [][]=[];
  productid = '';
  result:any;
  orig:any= [];
  latitude: number=1.00;
  longitude: number=2.00;
  distancia:string;
  tiempo:string;
  envio:number;
  user:any;
  CodigoAnt:string;
  cantidad:number;
  origencomercio:any;
  origen: string;
  destino: string;
  foto1:string;
  foto2:string;
  foto3:string;


  // parque simon bolivar
  origin:any= { lat:4.676802158355713, lng: -74.04825592041016 };
  // Parque la 93
destination:any=  { lat: 4.676802158355713, lng: -74.04825592041016 };

product = {
  codigo: 'LP32',
  descripcio: 'CLEANER LIMPIADOR DE PISO',
  precio1: 63.56,
  existencia: 4.0,
  unidad: 'UNIDAD',

  cantidad:1,
  foto_url:"",
  direccion:"",
  telefono:"",
  celular:"",
  comercio:"",
  email:"",
  flete:90,
  itbis:0,
  latitud:0,
  longitud:0,
  usuario:"",
  distancia:"",
  tiempo:""
   
};

  constructor(   
    private productService: ProductService,
    private route: ActivatedRoute,
    public bagService: BagService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router) { }

  ngOnInit(): void {
   this.cantidad=1;
/*    this.foto1='https://evolups.com/imgs/items/Fluke1.jpg';
   this.foto2='https://evolups.com/imgs/items/Fluke1.jpg';
    this.foto3='https://evolups.com/imgs/items/Fluke1.jpg';   */ 
 
     //Uusario que esta logueado
     this.user = sessionStorage.getItem('e-commerce');
     this.user =JSON.parse( sessionStorage.getItem('e-commerce'));
    this.Productos();
    this.CargaCar_total();
  
  }

  
  CargaCar_total(){
    //Busca la la venta
  
    this.productService.GetCar_Total(this.user.email)
    .subscribe( resp => {
      resp.forEach(item => {
         
        //coloca total en el carrito
        this.bagService.totalitems=item.cantidad;  
    
      });
        
    }); 
   
   
     }

  Productos(){
    //Busca las marcas
    this.productid = this.route.snapshot.paramMap.get('id');
  this.productService.getProducto_Detalle(this.productid )
  .subscribe( resp => {
    resp.forEach(item => {    
      this.marcas.push( item )
      this.groupMarcas = [];
      this.orig={lat:item.lat,lng:item.lon};
     //busca origen actual
      this.setCurrentLocation_original({lat:item.lat,lng:item.lon});
      this.foto1='https://evolups.com/imgs/items/'+item.foto_url.trim().substr(31,100).trim();
      this.foto2='https://evolups.com/imgs/items/'+item.foto_url2.trim().substr(31,100).trim();
      this.foto3='https://evolups.com/imgs/items/'+item.foto_url3.trim().substr(31,100).trim();  
      console.log("foto1",this.foto1);
      console.log("foto2",this.foto2);
      console.log("foto3",this.foto3);  


      //busca la distancia y tiempo 
/*  return new google.maps.DistanceMatrixService().getDistanceMatrix({
      'origins': [this.origen], 
      'destinations': [this.destination], 
      travelMode: 'DRIVING'}, 
      (results: any) => {
         console.log('resultados distancia (mts) -- ', results.rows[0].elements[0].distance.text);
          console.log('tiempo-- ', results.rows[0].elements[0].duration.text);
          console.log('resultados -- ', results.rows[0]); 
    
          this.distancia=results.rows[0].elements[0].distance.text;
          this.tiempo=results.rows[0].elements[0].duration.text; 
       
      }
        
      );
 */

      const source = from(this.marcas);
      // group by code
      const example = source.pipe(
        groupBy((item: any) => item.id),
        // return each item in group as array
        mergeMap(group => group.pipe(toArray()))
      
      );
  
  
      let contador = 0;
      const subscribe = example.subscribe(val => {
        this.groupMarcas[contador] = val;
       
      
        contador++;
      });


  
    });
      
  });  
  
  
  }  


 
   meno(){

 if( this.cantidad>1){
    this.cantidad=this.cantidad-1;
     }
  
  }
  
   mas(){
    this.cantidad=this.cantidad+1;
    
  }

  add(codigo:string,precio1:number,marca:string,descripcion:string,empresa_id:string,existencia:number,foto_url:string,envio:number,itbis:number) {
    

    if(this.user==null){
    //alert("Para agregar al carrito, debe estar logueado, favor loguearse");
    
    this.router.navigate(['/login/logout']);

    } else {
    if (this.cantidad <= 0) {
      this.cantidad = 1;
    }
   if(this.cantidad>existencia){
     alert("Este articulo no tiene disponibilidad para esa cantidad");
   } else {
    //for (let index = 0; index < this.cantidad; index++) {
       //const element = array[index];
       if(this.bagService.items.filter(x => x.codigo != codigo)){
       
       this.product.cantidad=this.cantidad;
       }else {
        this.bagService.cantidad=this.bagService.cantidad+this.cantidad;
        
       }

       this.product.codigo=codigo;
       this.product.precio1=precio1;
       this.product.descripcio=descripcion;
       this.product.comercio=empresa_id;
       this.product.foto_url=foto_url;
       this.product.usuario=this.user.email;
       this.product.flete=this.envio;
       this.product.itbis=itbis;

       
     
       if(this.CodigoAnt!=codigo){
      //this.bagService.addItem(this.product);
     

      let myArray = [];
      myArray.push(this.product);

      this.bagService.addcars(myArray).subscribe(result => {
      console.log("al grabar al carrito:",result);
     
      this.router.navigate(['/cars']);
 

      //this.bagService.addcars(this.product);
    
      this.CodigoAnt="";
      });

    }

       this.CodigoAnt=codigo;
      
  }


  }
}

  
  // Get Current Location Coordinates
  setCurrentLocation_original(origencomercio:any) {
   
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

 

  public getDistancia(origen: string, destino: string) {
  
     new google.maps.DistanceMatrixService().getDistanceMatrix({
    'origins': [origen], 
    'destinations': [destino], 
    travelMode: 'DRIVING'}, 
    (results: any) => {
          console.log('resultados distancia (mts) -- ', results.rows[0].elements[0].distance.text);
        console.log('tiempo-- ', results.rows[0].elements[0].duration.text);
        console.log('resultados -- ', results.rows[0]); 
        console.log('Latirud -- ', this.latitude); 
        console.log('Longitud-- ', this.longitude); 
        this.groupMarcas[0][0].tiempo=results.rows[0].elements[0].duration.text;
         this.groupMarcas[0][0].distancia=results.rows[0].elements[0].distance.text;
         this.groupMarcas[0][0].longitud=this.latitude;
         this.groupMarcas[0][0].latitud=this.longitude;
         this.distancia=results.rows[0].elements[0].distance.text;

        this.tiempo=results.rows[0].elements[0].duration.value;  
        this.envio=(results.rows[0].elements[0].distance.value/1000)*8;  
        this.product.distancia= this.distancia;
        this.product.latitud=  this.latitude;
        this.product.longitud=this.longitude;
        
       
    
    }

    
    
    );


}


}
