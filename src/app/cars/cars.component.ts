import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router'; 
import { BagService } from 'src/services/bag.service';
import { ProductService } from 'src/services/product.service'; 
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  mySubscription: any;

  constructor(private productservices: ProductService, private router: Router,private route: ActivatedRoute,public bagService: BagService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }; 
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });

   }

  user:any;
  groupCategorias: any[][] = [];
  VCategoria=[];
  venta:string;
  cantidad:number;

  groupCarTotal: any[][] = [];
 
  VCarTotal=[];


  ngOnInit(): void {
    
    //Uusario que esta logueado
    this.user = sessionStorage.getItem('e-commerce');

    this.user =JSON.parse( sessionStorage.getItem('e-commerce'));

    this.CargaCar();
    this.CargaCar_total();
  }

 
  
  async confirmarEliminarArticulos(items) {

    if (confirm('Seguro desea eliminar estos articulos?')) {
   
      this.CarDelete(items);
      this.router.navigate(['/cars']);

    }

  }

  
  meno(items,cantidad){


    if(cantidad>1){
  
      this.ActualizarCantidad(items,cantidad-1);
    }

    this.router.navigate(['/cars']);

    
}
     
      mas(items,cantidad){
     this.ActualizarCantidad(items,cantidad+1);
   
     this.router.navigate(['/cars']);
       
     }


  CarDelete(items:string){
    //Busca la la venta
   
    this.productservices.DeleteCar(items,this.user.email)
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


     
  ActualizarCantidad(items:string,cantidad:number){
    //Busca la la venta
   this.productservices.UpdateCar(items,this.user.email,cantidad)
    .subscribe( resp => {
      if(resp!='ok'){
        alert(resp);
      }
 
    /*   resp.forEach(item => {
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
     */

        
    }); 
   
   
     }


  CargaCar(){
    //Busca la la venta
   
    this.productservices.GetCar(this.user.email)
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

     
  CargaCar_total(){
    //Busca la la venta
   
   
    this.productservices.GetCar_Total(this.user.email)
    .subscribe( resp => {
      resp.forEach(item => {
        this.VCarTotal.push( item )
        this.groupCarTotal = [];
        //coloca total en el carrito
        this.bagService.totalitems=item.cantidad;
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


}
