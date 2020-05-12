import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service'; 
 import { Router,ActivatedRoute } from '@angular/router'; 
 import { from } from 'rxjs';
 import { groupBy, mergeMap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {




categoria:string; 

//constructor(private productservices: ProductService, private router: Router,private route: ActivatedRoute) {};

  ngOnInit(): void {
  
  } 

  
  agruparItems() {
    this.groupItems = [];
    const source = from(this.producto);
    // group by code
    const example = source.pipe(
      groupBy((item: any) => item.codigo),
      // return each item in group as array
      mergeMap(group => group.pipe(toArray()))
    );

    let contador = 0;
    const subscribe = example.subscribe(val => {
      this.groupItems[contador] = val;
      console.log(this.groupItems);
      contador++;
    });
 
  }
  

  name = 'Angular';

  array = [{
 "name": "prueba1",
 "positionId": 1
 },{
 "name": "prueba2",
 "positionId": 2
 },{
 "name": "prueba3",
 "positionId": 3
 },{
 "name": "prueba4",
 "positionId": 4
 },{
 "name": "prueba5",
 "positionId": 5
 },{
 "name": "prueba6",
 "positionId": 6
 }]
 
 convertido = [];  
 groupItems: any[][] = [];
 producto=[];
 constructor( private productservices: ProductService, private router: Router,private route: ActivatedRoute){
 
  
  this.categoria= this.route.snapshot.paramMap.get('id');

  this.productservices.getProducto(this.categoria)
  .subscribe( resp => {
    resp.forEach(item => {
      this.producto.push( item )
      this.groupItems = [];
      const source = from(this.producto);
      // group by code
      const example = source.pipe(
        groupBy((item: any) => item.codigo),
        // return each item in group as array
        mergeMap(group => group.pipe(toArray()))
      );
  
      let contador = 0;
      const subscribe = example.subscribe(val => {
        this.groupItems[contador] = val;
        console.log(this.groupItems);
        contador++;
      });

    });
      
  });  

  
  
/* 


    for (let i = 0; i < this.array.length; i++) {
       const element = this.array[i];
        let arrayPar = []
         arrayPar.push(this.array[i])
     arrayPar.push(this.array[i+1])
     this.convertido.push(arrayPar)
     i++
     } */

     
    
  }
}