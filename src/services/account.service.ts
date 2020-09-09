import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BagService } from './bag.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient,public  bagservices:BagService) {bagservices.getuserlog() }

  
  register(model) {
    return this.http.post(`https://evolovers.com/api/usuarios`, model);
    //return this.http.post(`http://localhost:56890/api/usuarios`, model);

  }

  login(model) {
    return this.http.get(`${environment.apiUrl}/usuarios?usuario=${model.usuario}&clave=${model.clave}`);
  }

  getUsers() {
    return this.http.get(`${environment.apiUrl}/usuarios`);
    
  }

  getByUserName(username) {
    return this.http.get<any>(`https://evolovers.com/api/usuarios?id=${username}`);
    
    //return this.http.get<any>(`http://localhost:56890/api/usuarios/${username}`);
  }
 
 

}
