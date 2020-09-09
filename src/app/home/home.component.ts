import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,NavigationEnd } from '@angular/router';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { ProductService } from 'src/services/product.service'; 
import { BagService } from 'src/services/bag.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  groupNuevos: any[][] = [];
  Vnuevos=[];
  groupCategorias: any[][] = [];
  VCategoria=[];
  user:any;

  mySubscription: any;
  convertido = [];  
  groupItemsHome: any[][] = [];
  productoH=[];
  constructor( private productservices: ProductService, private router: Router,private route: ActivatedRoute,public bagService: BagService){
  
   this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }; 
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
 
 
    this.productservices.getProductoNuevos()
    .subscribe( resp => {
      resp.forEach(item => {
        this.productoH.push( item )
         this.groupItemsHome = [];
        const source = from(this.productoH);
         // group by code
        const example = source.pipe(
          groupBy((item: any) => item.codigo),
          // return each item in group as array
          mergeMap(group => group.pipe(toArray()))
        );
   
        let contador = 0;
        const subscribe = example.subscribe(val => {
        this.groupItemsHome[contador] = val;
         console.log(this.groupItemsHome);
        contador++;
       });
 
     });
       
   });   
 
 
 }
  
 

ngOnInit(): void {
//Uusario que esta logueado
this.user = localStorage.getItem('e-commerce');
this.user =JSON.parse( localStorage.getItem('e-commerce'));

 this.Categoria();
 this.CargaCar_total();


}



CargaCar_total(){
  //Busca la la venta

  this.productservices.GetCar_Total(this.user.email)
  .subscribe( resp => {
    resp.forEach(item => {
       
      //coloca total en el carrito
      this.bagService.totalitems=item.cantidad;  
  
    });
      
  }); 
 
 
   }


Categoria(){
  //Busca las marcas
this.productservices.getCategoria()
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
      console.log(this.groupCategorias);
      contador++;
    });

  });
    
});  


}



ProductosNuevos(){
  //Busca las marcas
this.productservices.getProductoNuevos()
.subscribe( resp => {
  resp.forEach(item => {
    this.Vnuevos.push( item )
    this.groupNuevos = [];
    const source = from(this.Vnuevos);
    // group by code
    const example = source.pipe(
      groupBy((item: any) => item.codigo),
      // return each item in group as array
      mergeMap(group => group.pipe(toArray()))
    );

    let contador = 0;
    const subscribe = example.subscribe(val => {
      this.groupNuevos[contador] = val;
      console.log(this.groupCategorias);
      contador++;
    });

  });
    
});  


}


departamento(id:string){
  this.router.navigate(['/productlist',id,0]);

}

ofertas(id:string){
  this.router.navigate(['/ofertas',id]);

}

logout(){

  localStorage.clear();
  this.router.navigate(['/login',"logout"]);

}


ProductDetail(id:any)
{
  this.router.navigate(['/detailsproduct',id.codigo]); 
}
 
  
}






