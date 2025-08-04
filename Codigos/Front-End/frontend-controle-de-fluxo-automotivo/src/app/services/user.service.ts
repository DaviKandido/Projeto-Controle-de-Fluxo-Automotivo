import { User } from "src/app/models/user.model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  baseUrl = `${environment.apiUrl}/usuarios`;

  login(loginData: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/login`, loginData, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  cadastro(cadastroData: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/sign-up`, cadastroData, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }
}
