import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service'; 
 import { Router,ActivatedRoute } from '@angular/router'; 
 import { from } from 'rxjs';
 import { groupBy, mergeMap, toArray } from 'rxjs/operators';
 import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
 import { HttpClient } from '@angular/common/http';
 import { BagService } from 'src/services/bag.service';

 
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {


  SERVER_URL = "/home";
  uploadForm: FormGroup;  


  groupNuevos: any[][] = [];
  Vnuevos=[];
  groupCategorias: any[][] = [];
  VCategoria=[];
  user:any;

  mySubscription: any;
  convertido = [];  
  groupItemsHome: any[][] = [];
  productoH=[];

constructor(private productservices: ProductService, private router: Router,private route: ActivatedRoute,public bagService: BagService
  
  ) {};

  ngOnInit(): void {

 

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