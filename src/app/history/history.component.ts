import { Component, OnInit } from '@angular/core';
import { BagService } from 'src/services/bag.service';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { createAotUrlResolver } from '@angular/compiler';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router'; 
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { ProductService } from 'src/services/product.service'; 
import { from } from 'rxjs';
 

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor( public  bagService: BagService,private authService: AuthService,private route:Router,private productservices:ProductService) { }
  user:any;
  producto=[];
  groupItems: any[][] = [];
  categoria:string; 

  ngOnInit(): void {
this.Venta();

 
  }


historydetail(nofactu:string){
  this.route.navigate(['/historydetail',nofactu]);
  }
    
Venta(){
  //Busca los productos por Categoria
this.user=JSON.parse(sessionStorage.getItem('e-commerce'));
console.log(this.user.email);

    this.productservices.getVentaTotalxcliente(this.user.email)
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
          //console.log(this.groupItems);
          contador++;
        });
  
      });
        
    });  
  }


}
