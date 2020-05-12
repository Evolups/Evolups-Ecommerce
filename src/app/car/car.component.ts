import { Component, OnInit } from '@angular/core';
import { BagService } from 'src/services/bag.service';
import { Router,ActivatedRoute } from '@angular/router'; 


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  constructor(public bagService: BagService,private router:Router) { }

  ngOnInit(): void {
    this.bagService.agruparItems();
    console.log('groups', this.bagService.groupItems);
  }

//debe direccionar a la categoria que esta el producto seleccinado
  seguircomprando(){
  this.router.navigate(['/productlist','General']);
  }

  async confirmarEliminarArticulos(items) {

    if (confirm('Seguro desea eliminar estos articulos?')) {
      this.bagService.eliminarArticulos(items);
    }
  }

}
