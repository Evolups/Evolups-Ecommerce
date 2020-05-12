import { Component, OnInit } from '@angular/core';
import { BagService } from 'src/services/bag.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {

  constructor(public bagService: BagService) { }

  ngOnInit(): void {
  }

}
