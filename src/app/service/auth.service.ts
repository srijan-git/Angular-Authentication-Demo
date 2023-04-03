import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  apiURL = 'http://localhost:3000/user';

  GetAll() {
    return this.http.get(this.apiURL);
  }
  GetByCode(code: any) {
    return this.http.get(this.apiURL + '/' + code);
  }

  ProceedRegistration(inputData: any) {
    return this.http.post(this.apiURL, inputData);
  }

  UpdateUser(code: any, inputData: any) {
    return this.http.put(this.apiURL + '/' + code, inputData);
  }

  IsLoggedIn() {
    return sessionStorage.getItem('userName') != null;
  }
  GetUserRole() {
    return sessionStorage.getItem('userRole') != null
      ? sessionStorage.getItem('userRole')?.toString()
      : '';
  }

  GetAllRole() {
    return this.http.get('http://localhost:3000/role');
  }
}
