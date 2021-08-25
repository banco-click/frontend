import { Signup } from './signup.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient: HttpClient) { }

  createUser(signup: Signup): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/usuario/`, signup);
  }

  checkUserNameExists(username: string): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/usuario/existe/${username}`);
  }

}
