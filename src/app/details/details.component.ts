import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { BagService } from 'src/services/bag.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  product = {
      codigo: 'LP32',
      descripcio: 'CLEANER LIMPIADOR DE PISO',
      precio1: 63.56,
      existencia: 4.0,
      unidad: 'UNIDAD',
      empresa_id: 1,
      foto_url:""
    };
  productid = '';
  cantidad = 1;
  groupMarcas: any[][] = [];
  marcas: any [][]=[];
  groupCategorias: any[][] = [];
  VCategoria=[];
  gMarcas: any[][] = [];
  Vmarcas: any [][]=[];
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private bagService: BagService,
    private router: Router) { }

  ngOnInit(): void {
    this.Productos();
    this.Marcas();
    this.Categoria();
 /*    this.productid = this.route.snapshot.paramMap.get('id');
    this.productService.getProducto_Detalle(this.productid)
      .subscribe(resp => {
        console.log('response', resp);
        if (resp.length == 0) {
          alert('Producto no encontrado');
          this.router.navigateByUrl('/home');
        }
        this.product = resp[0];
      }); */
  }

  listaproductos(id){

  this.router.navigate(['/productlist',id]);
  
  }

  Productos(){
  //Busca las marcas
  this.productid = this.route.snapshot.paramMap.get('id');
this.productService.getProducto_Detalle(this.productid )
.subscribe( resp => {
  resp.forEach(item => {
    this.marcas.push( item )
    this.groupMarcas = [];
    const source = from(this.marcas);
    // group by code
    const example = source.pipe(
      groupBy((item: any) => item.id),
      // return each item in group as array
      mergeMap(group => group.pipe(toArray()))
    );

    let contador = 0;
    const subscribe = example.subscribe(val => {
      this.groupMarcas[contador] = val;
      console.log(this.groupMarcas);
      contador++;
    });

  });
    
});  


}  

Marcas(){
  //Busca las marcas
this.productService.getMarcas()
.subscribe( resp => {
  resp.forEach(item => {
    this.Vmarcas.push( item )
    this.gMarcas = [];
    const source = from(this.Vmarcas);
    // group by code
    const example = source.pipe(
      groupBy((item: any) => item.id),
      // return each item in group as array
      mergeMap(group => group.pipe(toArray()))
    );

    let contador = 0;
    const subscribe = example.subscribe(val => {
      this.gMarcas[contador] = val;
      console.log(this.gMarcas);
      contador++;
    });

  });
    
});  


}


Categoria(){
  //Busca las marcas
this.productService.getCategoria()
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


  add() {
    if (this.cantidad <= 0) {
      this.cantidad = 1;
    }
    for (let index = 0; index < this.cantidad; index++) {
      // const element = array[index];
      this.bagService.addItem(this.product);
    }
    // const total = this.bagService.totalBagItems.value;
    // this.bagService.totalBagItems.next(total + 1);
  }

}
