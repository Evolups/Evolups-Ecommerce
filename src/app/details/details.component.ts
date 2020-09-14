import { Component, OnInit,Input, ElementRef, NgZone  } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { BagService } from 'src/services/bag.service';
import { MapsAPILoader, MouseEvent } from '@agm/core';

declare var google: any;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})




export class DetailsComponent implements OnInit {

  nombre_cabeceras: string[] = [];
  user:any;

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
      latitud:0,
      longitud:0,
      usuario:""
       
    };
  productid = '';
  cantidad = 1;
  groupMarcas: any[][] = [];
  marcas: any [][]=[];
  groupCategorias: any[][] = [];
  VCategoria=[];
  gMarcas: any[][] = [];
  Vmarcas: any [][]=[];
  CodigoAnt:string;
  latitude: number=1.00;
  longitude: number=2.00;
  // parque simon bolivar
 origin:any= { lat:4.676802158355713, lng: -74.04825592041016 };
        // Parque la 93
  destination:any=  { lat: 4.676802158355713, lng: -74.04825592041016 };
  orig:any= [];
 
  envio:number;
  distancia:number;
  tiempo:number;
  zoom: number;
  address: string;
  private geoCoder;

public searchElementRef: ElementRef;

  constructor(
    
    private productService: ProductService,
    private route: ActivatedRoute,
    public bagService: BagService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router) { }

      
    marcanew:string;

  ngOnInit(): void {
      //Uusario que esta logueado
      this.user = sessionStorage.getItem('e-commerce');

      this.user =JSON.parse( sessionStorage.getItem('e-commerce'));

     //load Places Autocomplete
     this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

 /*      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);

       */

      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement,
        {
            componentRestrictions: { country: 'do' }
     
        });
      autocomplete.addListener("place_changed", () => {

        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          
  
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
         // this.zoom = 12;
        });
      });
    });


 this.getDistancia(this.origin,this.destination);
 
    this.Productos();
    this.Marcas();
    this.Categoria();
 
  


  }

  
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
       //this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }



  
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          //this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }


   calculateRoute() {
    console.log("localizacion");

    google.maps.DirectionsService().route({

      origin: this.origin,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        google.maps.DirectionsService().setDirections(response);
      } else {
        //alert('no ento');
      }
    });
    }


    public getDistancia(origen: string, destino: string) {
      return new google.maps.DistanceMatrixService().getDistanceMatrix({
      'origins': [origen], 
      'destinations': [destino], 
      travelMode: 'DRIVING'}, 
      (results: any) => {
          console.log('resultados distancia (mts) -- ', results.rows[0].elements[0].distance.text);
          console.log('tiempo-- ', results.rows[0].elements[0].duration.text);
          console.log('resultados -- ', results.rows[0]);
          this.distancia=results.rows[0].elements[0].distance.text;
          this.tiempo=results.rows[0].elements[0].duration.text;
      });

    
  }

  listaproductos(id){

  this.router.navigate(['/productlist',id]);
  
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
    console.log('origen producot',this.orig);
    this.setCurrentLocation_original({lat:item.lat,lng:item.lon});

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

Marcas(){
  //Busca las marcas
this.productService.getMarcas()
.subscribe( resp => {
  resp.forEach(item => {
    this.Vmarcas.push( item )
    this.gMarcas = [];
    const source = from(this.Vmarcas);
    // group by code
    const example = source.pipe(
      groupBy((item: any) => item.id),
      // return each item in group as array
      mergeMap(group => group.pipe(toArray()))
    );

    let contador = 0;
    const subscribe = example.subscribe(val => {
      this.gMarcas[contador] = val;
  
      contador++;
    });

  });
    
});  


}


Categoria(){
  //Busca las marcas
this.productService.getCategoria()
.subscribe( resp => {
  resp.forEach(item => {
    this.VCategoria.push( item )
    this.groupCategorias = [];
    const source = from(this.VCategoria);
    // group by code
    const example = source.pipe(
      groupBy((item: any) => item.codigo),
      // return each item in group as array
      mergeMap(group => group.pipe(toArray()))
    );

    let contador = 0;
    const subscribe = example.subscribe(val => {
      this.groupCategorias[contador] = val;
   
      contador++;
    });

  });
    
});  



}


  add(codigo:string,precio1:number,marca:string,descripcion:string,empresa_id:string,existencia:number,foto_url:string) {
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
     
       if(this.CodigoAnt!=codigo){
      //this.bagService.addItem(this.product);
      console.log("producto al carrito",this.product);

      let myArray = [];
      myArray.push(this.product);

      this.bagService.addcars(myArray).subscribe(result => {
    
      this.router.navigate(['/cars']);
 

      //this.bagService.addcars(this.product);
    
      this.CodigoAnt="";
      });

    }

       this.CodigoAnt=codigo;
      
       //this.router.navigate(['/car']);
      
   // }
    // const total = this.bagService.totalBagItems.value;
    // this.bagService.totalBagItems.next(total + 1);
  }
}


ComprarAhora(codigo:string,precio1:number,marca:string,descripcion:string,empresa_id:string,existencia:number,foto_url:string) {
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
   
     if(this.CodigoAnt!=codigo){
    this.bagService.addItem(this.product);
    this.CodigoAnt="";
     } 

     this.CodigoAnt=codigo;

     this.bagService.agruparItems();
     console.log('groups', this.bagService.groupItems);
     this.router.navigate(['/checkout']);
    

}

}

  


}
