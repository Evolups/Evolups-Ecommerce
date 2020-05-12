import { Component } from '@angular/core';
import { BagService } from 'src/services/bag.service';
 
 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'EvolupsEcommerce';
  constructor(public bagService: BagService) {}
}
