import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service'; 
import { Router,ActivatedRoute } from '@angular/router'; 
 
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  constructor(private productservices: ProductService, private router: Router,private route: ActivatedRoute ) {}

  ngOnInit(): void {
    this.CargaRecibo();
  }


  groupCategorias: any[][] = [];
  venta:string;
  VCategoria=[];

  VCategorias={
    nro_fact:'1',
    fecha_fact:'01/02/2020',
    item:'T',
    itemds:'T',
    cantidad:'1',
    Precio:'1',
    descuento:'1'
    };

    
    VerHistorico(){
      this.router.navigate(['/deparment']);
    }

  CargaRecibo(){
 //Busca la la venta
 this.venta= this.route.snapshot.paramMap.get('id');

 this.productservices.getVenta(this.venta)
 .subscribe( resp => {
   resp.forEach(item => {
     this.VCategoria.push( item )
     this.groupCategorias = [];
     const source = from(this.VCategoria);
     // group by code
     const example = source.pipe(
       groupBy((item: any) => item.nro_fact),
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

}
