import { Login } from 'src/app/models/login.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient){}

  baseUrl = `${environment.apiUrl}/usuarios`;

  login(loginData: Login): Observable<Login> {
    return this.httpClient.post<Login>(`${this.baseUrl}/login`, loginData, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }
  
}
