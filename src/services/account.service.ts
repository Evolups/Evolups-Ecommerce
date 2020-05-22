import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  register(model) {
    return this.http.post(`/api/usuarios`, model);
  }

  login(model) {
    return this.http.get(`${environment.apiUrl}/usuarios?usuario=${model.usuario}&clave=${model.clave}`);
  }

  logOut() {
    localStorage.clear();
    this.authService.signOut();
    window.location.reload();
  }

  getUsers() {
    return this.http.get(`${environment.apiUrl}/usuarios`);
  }

  getByUserName(username) {
    return this.http.get<any>(`${environment.apiUrl}/usuarios/${username}`);
  }
}
