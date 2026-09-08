import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  // 1. Cambiamos la URL base para no incluir "/login"
  private apiUrl = 'http://localhost:8080/api/auth'; 

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    // 2. Concatenamos "/login"
    return this.http.post(`${this.apiUrl}/login`, credentials, { responseType: 'text' });
  }

  register(user: { username: string; password: string }): Observable<any> {
    // 3. Concatenamos "/register" (o "/registro" según esté en tu Spring Boot)
    return this.http.post(`${this.apiUrl}/registro`, user, { responseType: 'text' });
  }
} 