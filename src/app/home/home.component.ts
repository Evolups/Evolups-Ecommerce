import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { ProductService } from 'src/services/product.service'; 


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
 
  convertido = [];  
  groupItems: any[][] = [];
  producto=[];
  constructor( private productservices: ProductService, private router: Router,private route: ActivatedRoute){
  
   
 
    this.productservices.getProducto("")
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
 
 
 }
ngOnInit(): void {

}

departamento(){
  this.router.navigate(['/ofertas',50]);

}

ofertas(id:string){
  this.router.navigate(['/ofertas',id]);

}

ProductDetail(id:any)
{
  this.router.navigate(['/product-detail',id.codigo]); 
}
 
  
}






