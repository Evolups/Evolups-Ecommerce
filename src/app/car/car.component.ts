import { Component, OnInit } from '@angular/core';
import { BagService } from 'src/services/bag.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  constructor(public bagService: BagService) { }

  ngOnInit(): void {
    this.bagService.agruparItems();
    console.log('groups', this.bagService.groupItems);
  }

  async confirmarEliminarArticulos(items) {

    if (confirm('Seguro desea eliminar estos articulos?')) {
      this.bagService.eliminarArticulos(items);
    }
  }

}
