import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from '../models/User';
import { Login } from '../models/Login';
import { Excel } from '../models/Excel';


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  baseURL = 'http://localhost:5001/';

  constructor(private http: HttpClient) {}

  public postRegister( user: User ): Observable<any> {
    return this.http.post<any>(`${this.baseURL}register`, user).pipe(take(1));
  }

  public postLogin( user: Login ): Observable<any> {
    return this.http.post<any>(`${this.baseURL}login`, user).pipe(take(1));
  }

  public formExcel( user: Excel): Observable<any> {
    return this.http.post<any>(`${this.baseURL}form`, user).pipe(take(1));
  }

  public getformExcel( username: String): Observable<any> {
    return this.http.get<any>(`${this.baseURL}form?username=` + username).pipe(take(1));
    
  }
}
