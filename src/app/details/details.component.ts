import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { ActivatedRoute } from '@angular/router';
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
      empresa_id: 1
    };
  productid = '';
  cantidad = 1;


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private bagService: BagService) { }

  ngOnInit(): void {
    this.productid = this.route.snapshot.paramMap.get('id');
    this.productService.getProducto_Detalle(this.productid)
      .subscribe(resp => {
        console.log('response', resp);
        this.product = resp[0];
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
