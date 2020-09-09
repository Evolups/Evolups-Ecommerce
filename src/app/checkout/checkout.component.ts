import { Component, OnInit,ViewChild, EventEmitter,Output,AfterViewInit, Input, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BagService } from 'src/services/bag.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { ProductService } from 'src/services/product.service'; 
import { AccountService } from 'src/services/account.service'; 

import { MapsAPILoader, MouseEvent } from '@agm/core';
import { stringify } from 'querystring';

declare let google: any;
 

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  validateForm: FormGroup;
  groupItems: any[][] = [];
  groupSectores: any[][] = [];
  groupCars: any[][] = [];
  VCars=[];
  VCarTotal=[];
  groupCarTotal:any[][] = [];
  total:number;
  subtotal:number;
  flete:number;

  venta:string;

  Vsectores=[];
  user:any;
  TipoTdc:String;
  Tdc:String;

  VCategoria={
    nro_fact:'1',
    fecha_fact:'01/02/2020',
    item:'T',
    itemds:'T',
    cantidad:'1',
    Precio:'1',
    descuento:'1'
    };

    
  Tarjeta:boolean;
  Efectivo:boolean;
  transferencia:boolean;
  tipopago:string;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  fechavence:string;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private accountService: AccountService,private formBuilder: FormBuilder, public bagService: BagService, private router: Router,private productservices: ProductService,  private mapsAPILoader: MapsAPILoader,    private ngZone: NgZone) {
   
  //Uusario que esta logueado
   this.user = localStorage.getItem('e-commerce');

    this.user =JSON.parse( localStorage.getItem('e-commerce'));

    this.validateForm = new FormGroup({
      Edificio: new FormControl('', [
        // Validators.required,
        // Validators.minLength(4),
        // forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ]),
      Apto: new FormControl('', [
    
        //Validators.minLength(250),
        // forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ]),
      Referencia: new FormControl('', [
        
        //Validators.minLength(250),
        // forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ]),
      Dirección: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
   
      nombreTarjeta: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      numeroTarjeta: new FormControl('', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
        Validators.pattern('[0-9]*')
      ]),
      cvv: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3),
        Validators.pattern('[0-9]*')
      ]),
      mes: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(2),
        Validators.pattern('[0-9]*')

      ]),
      ano: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern('[0-9]*')
      ])
    });
  }

  ngOnInit(): void {

    console.log('articulos a grabar',this.bagService.groupItems);
 
    //verifica si los datos telefono y dirccion estan correcta
this.accountService.getByUserName(this.user.email).subscribe(result => {
  if(result[0].direccion_vive=="" || result[0].celular=="" || result[0].telefono==""){
    alert("Deber completar la direccion y el telefono  en su Perfil");
this.router.navigateByUrl("/perfil");

  }

    });
    

    //Verifica si esta loguea, sino lo manda a loguearse
    if(this.user==null){
      this.router.navigate(['/login',"logout"]);
    }
  

    if(this.Tarjeta==null){
      this.Tarjeta=true;
    }

  this.CargaDirecion();
  //carga los articulos en el carrito
  this.CargaCar();
  this.CargaCar_total();

  }

  CargaDirecion(){
    
     //load Places Autocomplete
     this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

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
          this.zoom = 12;
        });
      });
    });
  }

  
  Select(tipo){

  this.tipopago=tipo;

  if(tipo=="tarjeta"){
   this.Tarjeta=true;
  }else {
    this.Tarjeta=false;
  }


  if(tipo=="Efectivo"){
    this.Efectivo=true;
    
  }else {
    this.Efectivo=false;
  }

  if(tipo=="Transferencia"){
    this.transferencia=true;
     
  } else{
    this.transferencia=false;
  }


  this.ngOnInit();

  } 

  
  CargaCar_total(){
    //Busca la la venta
/*  this.total=1500;
 this.subtotal=1200; */
   
    this.productservices.GetCar_Total(this.user.email)
    .subscribe( resp => {
      resp.forEach(item => {
        this.total=item.total;
        this.subtotal=item.subtotal;
        this.flete=item.flete;

        this.VCarTotal.push( item )
        this.groupCarTotal = [];
        const source = from(this.VCarTotal);         
        // group by code
        const example = source.pipe(
          groupBy((item: any) => item.nro_fact),
          // return each item in group as array
          mergeMap(group => group.pipe(toArray()))
        );
    
        let contador = 0;
        const subscribe = example.subscribe(val => {
          this.groupCarTotal[contador] = val;
         
          contador++;
        });
    
      });
        
    }); 
   
   
     }
  
  CargaCar(){
    //Busca la la venta
/*     this.user= this.route.snapshot.paramMap.get('id'); */

    this.productservices.GetCar(this.user.email)
    .subscribe( resp => {
      resp.forEach(item => {
        this.VCars.push( item )
        this.bagService.groupItems = [];
        const source = from(this.VCars);         
        // group by code
        const example = source.pipe(
          groupBy((item: any) => item.nro_fact),
          // return each item in group as array
          mergeMap(group => group.pipe(toArray()))
        );
    
        let contador = 0;
        const subscribe = example.subscribe(val => {
        this.bagService.groupItems[contador] = val;
         
          contador++;
        });
    
      });
        
    }); 
   
   
     }

    
  DeleteArticulos(){       

    this.productservices.DeleteallCar(this.user.email)
        .subscribe( resp => {
          
            
   }); 
       
       
 }

  sendOrder() {

    let myArray = [];
    const ramdonNumber  = Math.floor(Math.random() * 500);
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.bagService.groupItems.length; index++) {
      const element = this.bagService.groupItems[index];
  
      const obj = {
        nombre: this.user.name,
        apellido: "",
        fecha: Date.now(),
        hora: 10,
        item: element[0].codigo,
        descripcion: element[0].descripcio,
        cantidad: element[0].cantidad,
        Precio: element[0].precio1,
        descuento: 0,
        ïtbis: 0,
        direccion: this.validateForm.get('Dirección').value,
        telefono: "809",
        celular:"809" ,
        comercio: element[0].comercio,
        usuario:this.user.email,
        email:this.user.email,
        flete:this.flete,
        servicio:"EN PROCESO",
        tipopago:this.tipopago,
        referencia:this.validateForm.get('Referencia').value,
        edificio:this.validateForm.get('Edificio').value,
        apto:this.validateForm.get('Apto').value,
        latitud:element[0].latitud,
        longitud:element[0].longitud,
 
      };

      myArray.push(obj);
  
    
    }

    
   this.groupItems.push(myArray);

   this.fechavence=this.validateForm.get('mes').value+"-"+this.validateForm.get('ano').value;

    this.bagService.sendOrder(myArray).subscribe(result => {
    
   //this.router.navigate(['/receipt',result]); 
  
   //ESTO VA PARA EL PAGO
  //mastercar con 5, visa con 4
  //Verifica si es master o Visa
this.Tdc=this.validateForm.get('numeroTarjeta').value;

//Vista
 if(this.Tdc.substring(0,1)=="4"){

    this.TipoTdc="001";
  }

  //Mastercard
  if(this.Tdc.substring(0,1)=="5"){
    this.TipoTdc="002";
  }

//procesa pago cardnet
this.pagar(result,this.TipoTdc,this.validateForm.get('numeroTarjeta').value,this.fechavence,this.validateForm.get('cvv').value);
 
 //borra los articulos en el carrito del usuaio
this.DeleteArticulos();

    });
  }

  
  pagar(nrofact,tipotddc,notdc,fecvence,cvv){
    /* 
          document.location.href = 'http://localhost:1183/signeddatafields.aspx?id='+nrofact&'id2='+'001'&'id3='+'144444444444444'&'id4'='11-2020' ';
     */
          document.location.href =(`https://ferrapp.com/signeddatafields.aspx?id=${nrofact}&id1=${tipotddc}&id2=${notdc}&id3=${fecvence}&id4=${cvv}  ` );
    
   }


   pago() {
 
    let myArray = [];
    const ramdonNumber  = Math.floor(Math.random() * 500);
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.bagService.groupItems.length; index++) {
      const element = this.bagService.groupItems[index];
  
      const obj = {
        access_key:"2718fcb4f50a33a5bab863021c343962",
        profile_id:"0807427A-58BC-49A6-B2B1-5B28AD53A0FC",
        transaction_uuid:"URXRGDDD",
        signed_field_names:"access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,payment_method,bill_to_forename,bill_to_surname,bill_to_email,bill_to_phone,bill_to_address_line1,bill_to_address_city,bill_to_address_state,bill_to_address_country,bill_to_address_postal_code,override_custom_receipt_page,bill_to_forename,bill_to_surname,bill_to_email",
        unsigned_field_names:"card_number,card_type,card_expiry_date,card_cvn",
        signed_date_time:Date.now(),
        locale:"en",
        transaction_type:"authorization",
        reference_number:"15",
        amount:100,
        currency:"DOP",
        payment_method:"card",
        bill_to_forename:this.validateForm.get('name').value,
        bill_to_surname:this.validateForm.get('name').value,
        bill_to_email:this.user.email,
        bill_to_phone:"8098777053",
        bill_to_address_line1:this.validateForm.get('Dirección').value,
        bill_to_address_city:"Santo Domingo",
        bill_to_address_state:"Santo Domingo",
        bill_to_address_country:"RD",
        bill_to_address_postal_code:"809",
        override_custom_receipt_page:"/receipt",
        card_type:"001",
        card_number:this.validateForm.get('numeroTarjeta').value,
        card_expiry_date:this.validateForm.get('mes').value+'-'+this.validateForm.get('mes').value,
        card_cvn:this.validateForm.get('cvv').value,


/* 
        nombre: this.validateForm.get('name').value,
        apellido: this.validateForm.get('name').value,
        fecha: Date.now(),
        hora: 10,
        item: element[0].codigo,
        descripcion: element[0].descripcio,
        cantidad: element[0].cantidad,
        Precio: element[0].precio1,
        descuento: 0,
        ïtbis: 0,
        direccion: this.validateForm.get('Dirección').value,
        telefono: "809",
        celular:"809" ,
        comercio: element[0].comercio,
        usuario:this.user.email,
        email:this.user.email,
        flete:90 */
      };

      myArray.push(obj);
      console.log("datos pago");
      console.log(myArray);
      
    }
   
   this.groupItems.push(myArray);


  /*   this.bagService.payCard(myArray).subscribe(result => {
    this.router.navigate(['/http://localhost:1183/signeddatafields.aspx']);
  */
   
  
  }

  
Sectores(){
  //Busca las marcas
this.productservices.getSectores()
.subscribe( resp => {
  resp.forEach(item => {
    this.Vsectores.push( item )
    this.groupSectores = [];
    const source = from(this.Vsectores);
    // group by code
    const example = source.pipe(
      groupBy((item: any) => item.codigo),
      // return each item in group as array
      mergeMap(group => group.pipe(toArray()))
    );

    let contador = 0;
    const subscribe = example.subscribe(val => {
      this.groupSectores[contador] = val;
      //console.log(this.groupSectores);
      contador++;
    });

  });
    
});  

///Funcione de google map

}



  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
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
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  


}
