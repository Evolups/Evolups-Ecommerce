import { Component, OnInit } from '@angular/core';
import { BagService } from 'src/services/bag.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../interfaces/interfaces';


@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {

 
  registerUser: User = {
    usuario: ''
  };


  constructor(public bagService: BagService,private router:Router) { }

  async register( fRegister: NgForm ) {
   // if (fRegister.invalid) { return; }
    ///const valido = await this.userService.register( this.registerUser);
   this.router.navigate(['/formsearch',this.registerUser.usuario]);
 
   console.log(fRegister.value);
  }


  ngOnInit(): void {
  }
  
   

  departamento(){

    this.router.navigate(['/department']);
  
    }
  
  

}
