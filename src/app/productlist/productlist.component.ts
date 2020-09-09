import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service'; 
 import { Router,ActivatedRoute,NavigationEnd } from '@angular/router'; 
 import { from } from 'rxjs';
 import { groupBy, mergeMap, toArray } from 'rxjs/operators';
 import { BagService } from 'src/services/bag.service';
 
 
 

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  CodigoAnt:string="";
categoria:string; 
cantidad = 1;
groupItems: any[][] = [];
groupMarcas: any[][] = [];
groupCategorias: any[][] = [];
groupCategoriasbyid: any[][] = [];
groupPagCantidad: any[][] = [];
groupProPaginacion: any[][] = [];
productoPaginacion=[];
producto=[];
VCategoria=[];
VCategoriaid=[];
VCanPagina=[];
marcas: any [][]=[];
CantPro:string;
user:any;

mySubscription: any;

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
  //Uusario que esta logueado
this.user = localStorage.getItem('e-commerce');
this.user =JSON.parse( localStorage.getItem('e-commerce')); 

  this.Marcas();
  this.Categoria();
  this.CategoriabyId();

  this.Pagina_Cantidad();

  this.CantPro=this.route.snapshot.paramMap.get('cant');

  this.productosConPaginacion(this.CantPro); 
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
  
  ProductDetail(id:any)
{
  this.router.navigate(['/detailsproduct',id.codigo]); 
}

listaproductos(id){

 this.router.navigate(['/productlist',id]);

 this.productos();

}



ProductosconPaginacion(id:string,cant:string){

  this.router.navigate(['/productlist',id,cant]);
 
  this.productosConPaginacion(cant);
 
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
     
      contador++;
    });

  });
    
});  

}



CategoriabyId(){
  //Busca las marcas
 
this.productservices.getCategoriabyId(this.route.snapshot.paramMap.get('id'))
.subscribe( resp => {
  resp.forEach(item => {
    this.VCategoriaid.push( item )
    this.groupCategoriasbyid = [];
    const source = from(this.VCategoriaid);
    // group by code
    const example = source.pipe(
      groupBy((item: any) => item.codigo),
      // return each item in group as array
      mergeMap(group => group.pipe(toArray()))
    );

    console.log('categria by id',this.groupCategoriasbyid);
    let contador = 0;
    const subscribe = example.subscribe(val => {
    this.groupCategoriasbyid[contador] = val;
     
      contador++;
    });

  });
    
});  

}

  
Pagina_Cantidad(){
  //Busca las marcas
  this.categoria= this.route.snapshot.paramMap.get('id');
this.productservices.GetCantidadPagina( this.categoria)
.subscribe( resp => {
  resp.forEach(item => {
    this.VCanPagina.push( item )
    this.groupPagCantidad = [];
    const source = from(this.VCanPagina);
    // group by code
    const example = source.pipe(
      groupBy((item: any) => item.codigo),
      // return each item in group as array
      mergeMap(group => group.pipe(toArray()))
    );

    let contador = 0;
    const subscribe = example.subscribe(val => {
      this.groupPagCantidad[contador] = val;
   
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

      contador++;
    });

  });
    
});  


}



productos(){
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
         
          contador++;
        });
  
      });
        
    });  
  }
   

  
productosConPaginacion(cant:string){
  //Busca los productos por Categoria
 
  this.categoria= this.route.snapshot.paramMap.get('id');
cantidad:Number;
this.cantidad=Number(cant);
    this.productservices.GetProPagina(this.categoria,this.cantidad)
    .subscribe( resp => {
      resp.forEach(item => {
        this.productoPaginacion.push( item )
        this.groupItems = [];
        const source = from(this.productoPaginacion);
        // group by code
        const example = source.pipe(
          groupBy((item: any) => item.codigo),
          // return each item in group as array
          mergeMap(group => group.pipe(toArray()))
        );
    
        let contador = 0;
        const subscribe = example.subscribe(val => {
          this.groupItems[contador] = val;
      
          contador++;
        });
  
      });
        
    });  
  }


product = {
  codigo: 'LP32',
  descripcio: 'CLEANER LIMPIADOR DE PISO',
  precio1: 63.56,
  cantidad:1,
  existencia: 4.0,
  unidad: 'UNIDAD',
  empresa_id: 1,
  foto_url:"",
  comercio:""
};
constructor( private productservices: ProductService, private router: Router,private route: ActivatedRoute,private bagService:BagService){
  this.router.routeReuseStrategy.shouldReuseRoute = function () {
    return false;
  };
  this.mySubscription = this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      // Trick the Router into believing it's last link wasn't previously loaded
      this.router.navigated = false;
    }
  });

}




add(codigo:string,precio1:number,marca:string,descripcion:string,empresa_id:string,existencia:number,foto_url:string) {
  if (this.cantidad <= 0) {
    this.cantidad = 1;
  }
 if(this.cantidad>existencia){
   alert("Este articulo no tiene disponibilidad para esa cantidad");
 } else {
  //for (let index = 0; index < this.cantidad; index++) {
     //const element = array[index];
     if(this.bagService.items.filter(x => x.codigo != codigo)){
     
     this.product.cantidad=this.cantidad;
     }else {
      this.bagService.cantidad=this.bagService.cantidad+this.cantidad;
      
     }

     this.product.codigo=codigo;
     this.product.precio1=precio1;
     this.product.descripcio=descripcion;
     this.product.comercio=empresa_id;
     this.product.foto_url=foto_url;
   
     if(this.CodigoAnt!=codigo){
    this.bagService.addItem(this.product);
    this.CodigoAnt="";
     } 

     this.CodigoAnt=codigo;
     this.router.navigate(['/cars']);
    
 // }
  // const total = this.bagService.totalBagItems.value;
  // this.bagService.totalBagItems.next(total + 1);
}
}


}
