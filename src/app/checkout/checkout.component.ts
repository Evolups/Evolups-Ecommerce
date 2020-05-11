import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BagService } from 'src/services/bag.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { ProductService } from 'src/services/product.service'; 

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  validateForm: FormGroup;
  groupItems: any[][] = [];
  groupSectores: any[][] = [];
  Vsectores=[];
  
  VCategoria={
    nro_fact:'1',
    fecha_fact:'01/02/2020',
    item:'T',
    itemds:'T',
    cantidad:'1',
    Precio:'1',
    descuento:'1'
    };


  constructor(private formBuilder: FormBuilder, private bagService: BagService, private router: Router,private productservices: ProductService) {
    this.validateForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        // forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
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
   this.Sectores();
  }
 


  sendOrder() {
    let myArray = [];
    const ramdonNumber  = Math.floor(Math.random() * 500);
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.bagService.groupItems.length; index++) {
      const element = this.bagService.groupItems[index];

      const obj = {
        Cliente: this.validateForm.get('name').value,
        Fecha: '2020-04-05',
        Item: element[0].codigo,
        Descripcion: element[0].descripcio,
        Cantidad: element.length,
        Precio: element[0].precio1,
        descuento: 0,
        ïtbis: 0,
        Direccion: 'La dirección',
        telefono: '8095544554',
        Celular: '8095544554',
        Comercio: 'El Comercio ' + ramdonNumber
      };

      myArray.push(obj);
    

    }

   
   this.groupItems.push(myArray);
   console.log(myArray);
    console.log(this.validateForm.value);
  

    this.bagService.sendOrder(myArray).subscribe(result => {
      this.router.navigate(['/receipt',result]);
    
      //alert('Se ha creado la orden #' + result);
      this.bagService.items = [];
      this.bagService.totalBagItems.next(0);
      //this.router.navigateByUrl('/receipt',result);
   
    });
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
      console.log(this.groupSectores);
      contador++;
    });

  });
    
});  


}

}
