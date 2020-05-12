import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service'; 
 import { Router,ActivatedRoute } from '@angular/router'; 
 import { from } from 'rxjs';
 import { groupBy, mergeMap, toArray } from 'rxjs/operators';
 import { BagService } from 'src/services/bag.service';


@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {


categoria:string; 
cantidad = 1;
groupItems: any[][] = [];
groupMarcas: any[][] = [];
groupCategorias: any[][] = [];
producto=[];
VCategoria=[];
marcas: any [][]=[];

marCas={
id:'1',
marcas:'Electric'

};

VCategorias={
  codigo:'1',
  categoria:'Pintura'
  
  };

//constructor( private productservices: ProductService, private router: Router,private route: ActivatedRoute,private bagService:BagService) {}

  ngOnInit(): void {
  this.Marcas();
  this.Categoria();
 
  } 

  ProductDetail(id:any)
{
  this.router.navigate(['/product-detail',id.codigo]); 
}

listaproductos(id){

  //this.router.navigate(['/productlist',id]);
  this.router.navigateByUrl('/productlist', { skipLocationChange: true }).then(() => {
    this.router.navigate(['productlist',id]);
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

   

Marcas(){
  //Busca las marcas
this.productservices.getMarcas()
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

   


product = {
  codigo: 'LP32',
  descripcio: 'CLEANER LIMPIADOR DE PISO',
  precio1: 63.56,
  existencia: 4.0,
  unidad: 'UNIDAD',
  empresa_id: 1,
  foto_url:""
};
constructor( private productservices: ProductService, private router: Router,private route: ActivatedRoute){
 

//Busca los productos por Categoria
this.categoria= this.route.snapshot.paramMap.get('id');

  this.productservices.getProductoporCaegoria(this.categoria)
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

}
