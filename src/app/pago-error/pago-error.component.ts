import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service'; 
import { Router,ActivatedRoute } from '@angular/router'; 
import { BagService } from 'src/services/bag.service';

 
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';


@Component({
  selector: 'app-pago-error',
  templateUrl: './pago-error.component.html',
  styleUrls: ['./pago-error.component.css']
})
export class PagoErrorComponent implements OnInit {

  constructor(private productservices: ProductService, private router: Router,private route: ActivatedRoute,public bagService: BagService) { }

  ngOnInit(): void {
    this.CargaRecibo();
   this.limpiarCarrito();

    this.Total();
  }


    groupCategorias: any[][] = [];
    venta:string;
    VCategoria=[];
  
    grouTotal: any[][] = [];
    Vtotal:string;
    VcatTotal=[];
  
  
    VCategorias={
      nro_fact:'1',
      fecha_fact:'01/02/2020',
      item:'T',
      itemds:'T',
  
      cantidad:'1',
      Precio:'1',
      descuento:'1'
      };
  
   
  limpiarCarrito(){
        this.bagService.items = [];
        this.bagService.totalBagItems.next(0);
  }

  VerHistorico(){
    
    this.router.navigate(['/history']);
  }

  Irhome(){

    this.router.navigate(['/department']);
  }

  pagar(nrofact){
/* 
    document.location.href = 'http://localhost:1183/signeddatafields.aspx?id='+nrofact&'id2='+'001'&'id3='+'144444444444444'&'id4'='11-2020' ';
*/
    document.location.href =(`http://localhost:1183/signeddatafields.aspx?id=${nrofact}&id1=001&id2=4111111111111111&id3=11-2020&id4=123  ` );

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

 


Total(){
//Busca la la venta
this.venta= this.route.snapshot.paramMap.get('id');

this.productservices.getVentaTotal(this.venta)
.subscribe( resp => {
 resp.forEach(item => {
   this.VcatTotal.push( item )
   this.grouTotal = [];
   const source = from(this.VcatTotal);         
   // group by code
   const example = source.pipe(
     groupBy((item: any) => item.nro_fact),
     // return each item in group as array
     mergeMap(group => group.pipe(toArray()))
   );

   let contador = 0;
   const subscribe = example.subscribe(val => {
     this.grouTotal[contador] = val;
    
     contador++;
   });

 });
   
}); 


}


}
