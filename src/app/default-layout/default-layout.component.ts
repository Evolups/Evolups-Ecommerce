import { Component, OnInit } from '@angular/core';
import { BagService } from 'src/services/bag.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../interfaces/interfaces';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { ProductService } from 'src/services/product.service'; 



@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {

 
  registerUser: User = {
    usuario: ''
  };

  // groupItems: any[][] = [];
  // producto=[];

  constructor(public bagService: BagService,private router:Router,private productservices: ProductService) { }


  async register( fRegister: NgForm ) {
   // if (fRegister.invalid) { return; }
    ///const valido = await this.userService.register( this.registerUser);
   this.router.navigate(['/formsearch',this.registerUser.usuario]);
 
   console.log(fRegister.value);
  }

  
  departamento(){

    this.router.navigate(['/department']);
  
    }

  ngOnInit(): void {
    // this.productos();
  }
  /* 
  productos() {
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


} */

   

  
   


}
