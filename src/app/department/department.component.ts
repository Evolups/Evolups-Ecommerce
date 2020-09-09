import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ProductService } from 'src/services/product.service'; 
 import { from } from 'rxjs';
 import { groupBy, mergeMap, toArray } from 'rxjs/operators';
 import { BagService } from 'src/services/bag.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  constructor(private router:Router, private productservices: ProductService ) {}

groupCategorias: any[][] = [];
producto=[];
VCategoria=[];


  ngOnInit(): void {
    this.Categoria();
  }

  listaproductos(id:any){
  this.router.navigate(['/productlist',id,0]);

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




}
