import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducto_Detalle(id: string) {

    return this.http.get<Array<any>>('https://evolovers.com/api/product/' + id);
    //return this.http.get<Array<any>>('http://localhost:56890/api/product/' + id);

  }

  getProducto(id: string) {

    return this.http.get<Array<any>>('https://evolovers.com/api/product');
    //return this.http.get<Array<any>>('http://localhost:56890/api/product');
  }

  getProductoporCaegoria(id: string) {

    return this.http.get<Array<any>>('https://evolovers.com/api/productbycategoria/'+id);
    //return this.http.get<Array<any>>('http://localhost:56890/api/productbycategoria/'+id);
    
  }

  getOfertas(id: string) {

    return this.http.get<Array<any>>('https://evolovers.com/api/ofertas/'+id);
  }

getSectores(){
  return this.http.get<Array<any>>('https://evolovers.com/api/sectores');
  //return this.http.get<Array<any>>('  http://localhost:56890/api/sectores');



}
  
  getProductoNuevos() {
    
    //return this.http.get<Array<any>>('http://localhost:56890/api/ProductosNuevos');
    

    return this.http.get<Array<any>>('https://evolovers.com/api/ProductosNuevos');
  }

  getMarcas() {

    return this.http.get<Array<any>>('https://evolovers.com/api/marcas/');
  }

  getCategoria() {
    //return this.http.get<Array<any>>('http://localhost:56890/api/categorias/');
    return this.http.get<Array<any>>('https://evolovers.com/api/categorias/');
  }

  
  getCategoriabyId(id:string) {
    //return this.http.get<Array<any>>('http://localhost:56890/api/categorias/'+id);
    return this.http.get<Array<any>>('https://evolovers.com/api/categorias/'+id);
  }


  getVenta(id:string) {
    return this.http.get<Array<any>>('https://evolovers.com/api/venta/'+id);
    //return this.http.get<Array<any>>('http://localhost:56890/api/venta/'+id);

  }

    getVentaTotal(id:string) {
    return this.http.get<Array<any>>('https://evolovers.com/api/VentaTotales/'+id);
    //return this.http.get<Array<any>>('http://localhost:56890/api/venta/'+id);

  }

  getVentaTotalxcliente(id:string) {
    return this.http.get<Array<any>>('https://evolovers.com/api/VentaTotalxCliente/'+id.replace('@','').replace('.',''));
    //return this.http.get<Array<any>>('http://localhost:56890/api/venta/'+id);

  }

  getVentaxClientes(id:string) {
    return this.http.get<Array<any>>('https://evolovers.com/api/VentaxCliente/'+id.replace('@','').replace('.',''));

    //return this.http.get<Array<any>>('http://localhost:56890/api/VentaxCliente/'+id.replace('@','').replace('.',''));

  }


  getBuscar(id:string) {
   return this.http.get<Array<any>>('https://evolovers.com/api/BuscaProductosbylike/'+id);
   // return this.http.get<Array<any>>('http://localhost:56890/api/BuscaProductosbylike/'+id);
  }


  GetCantidadPagina(id:string) {
   return this.http.get<Array<any>>('https://evolovers.com/api/paginacion/'+id);
  
    // return this.http.get<Array<any>>('http://localhost:56890/api/BuscaProductosbylike/'+id);
  }

   GetProPagina(id:string,cant:number) 
  {
    return this.http.get<Array<any>>(`https://evolovers.com/api/paginacion?id=${id}&cant=${cant}`);
    //return this.http.get<Array<any>>(`http://localhost:56890//api/paginacion?id=${id}&cant=${cant}`);
     // return this.http.get<Array<any>>('http://localhost:56890/api/BuscaProductosbylike/'+id);
   }
 
   
   GetProComercio(id:string,cant:number) 
  {
    return this.http.get<Array<any>>(`https://evolovers.com/api/Comercio?id=${id}&cant=${cant}`);
   //return this.http.get<Array<any>>(`http://localhost:56890//api/Comercio?id=${id}&cant=${cant}`);
   
   }


   GetCar(id:string) 
   {
    return this.http.get<Array<any>>('https://evolovers.com/api/car/'+id.replace("@",'').replace(".",''));
     //return this.http.get<Array<any>>('http://localhost:56890/api/car/'+id.replace("@",'').replace(".",''));
   }
 
   

   DeleteCar(id:string,usuario:string) 
  {
   
    return this.http.get<Array<any>>(`https://evolovers.com/api/CarDelete/?id=${id}&usuario=${usuario}`);

 //return this.http.get<Array<any>>(`http://localhost:56890/api/CarDelete/?id=${id}&usuario=${usuario}`);
   }
 
 
   UpdateCar(id:string,usuario:string,cantidad:number) 
  {
    
    return this.http.get(`https://evolovers.com/api/CarUpdate/?id=${id}&usuario=${usuario}&cantidad=${cantidad}`);

   //return this.http.get(`http://localhost:56890/api/CarUpdate/?id=${id}&usuario=${usuario}&cantidad=${cantidad}`);

   }
 
   

   
   DeleteallCar(usuario:string) 
  {
  
 return this.http.get<Array<any>>(`https://evolovers.com/api/CarDelete/?&usuario=${usuario}`);

 //return this.http.get<Array<any>>(`http://localhost:56890/api/CarDelete/?&usuario=${usuario}`);
   }
 

   
   GetCar_Total(id:string) 
  {
   // return this.http.get<Array<any>>('https://evolovers.com/api/Delete/'+id);

    //return this.http.get<Array<any>>(`http://localhost:56890//api/paginacion?id=${id}&cant=${cant}`);
    return this.http.get<Array<any>>('https://evolovers.com/api/CarTotales/'+id.replace("@",'').replace(".",''));

    // return this.http.get<Array<any>>('http://localhost:56890/api/CarTotales/'+id.replace("@",'').replace(".",''));
   }
 
   
   
   enviar_email(mensaje:string,asunto:string,destinatario:string,ruta:string,nombre:string) 
  {
   
    return this.http.get<Array<any>>(`https://evolovers.com/api/EnviarEmail/?mensaje=${mensaje}&asunto=${asunto}&destinatario=${destinatario}&ruta=${ruta}&nombre=${nombre}`);

     // return this.http.get<Array<any>>(`http://localhost:56890/api/EnviarEmail/?mensaje=${mensaje}&asunto=${asunto}&destinatario=${destinatario}&ruta=${ruta}`);
    
   }
 


   
   enviar_email_orden(mensaje:string,asunto:string,destinatario:string,ruta:string,nombre:string,fecha:string,total:string,orden:string) 
  {
   
    return this.http.get<Array<any>>(`https://evolovers.com/api/EnviarOrden/?mensaje=${mensaje}&asunto=${asunto}&destinatario=${destinatario}&ruta=${ruta}&nombre=${nombre}&fecha=${fecha}&total=${total}&orden=${orden}`);

     // return this.http.get<Array<any>>(`http://localhost:56890/api/EnviarEmail/?mensaje=${mensaje}&asunto=${asunto}&destinatario=${destinatario}&ruta=${ruta}`);
    
   }

   
  
  newsletter(obj) {
  
   //localhost
   //return this.http.get<Array<any>>('http://localhost:56890/api/car/'+'112');

return  this.http.post('https://evolovers.com/api/NewsLetter', obj);

  //return  this.http.post('http://localhost:56890/api/NewsLetter', obj);
  
  }
  

  Get_newsletter(id:String) {
  
    return this.http.get<Array<any>>('https://evolovers.com/api/NewsLetter/'+id.replace("@",'').replace(".",''));
   
   }
  
   

}
