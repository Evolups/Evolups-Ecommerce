import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router'; 
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { ProductService } from 'src/services/product.service'; 
import { from } from 'rxjs';
 
@Component({
  selector: 'app-historydetail',
  templateUrl: './historydetail.component.html',
  styleUrls: ['./historydetail.component.css']
})
export class HistorydetailComponent implements OnInit {

  constructor(private route:Router,private productservices:ProductService,private router:ActivatedRoute) { }

  producto=[];
  groupItems: any[][] = [];
  categoria:string; 
  nofactu:string;


  ngOnInit(): void {
    this.VentaPorNumero();
  }


     
VentaPorNumero(){
  this.nofactu = this.router.snapshot.paramMap.get('id');
    this.productservices.getVenta(this.nofactu)
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
