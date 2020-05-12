import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  register(model) {
    return this.http.post(`/api/usuarios`, model);
  }

  login(model) {
    return this.http.get(`${environment.apiUrl}/usuarios?usuario=${model.usuario}&clave=${model.clave}`);
  }

  getUsers() {
    return this.http.get(`${environment.apiUrl}/usuarios`);
  }

  getByUserName(username) {
    return this.http.get<any>(`${environment.apiUrl}/usuarios/${username}`);
  }
}
