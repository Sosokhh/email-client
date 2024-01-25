import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignupCredentials, SignupResponse} from "./auth.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';


  constructor(private http: HttpClient) {
  }

  usernameAvailable(username: string) {
    return this.http.post<{ available: boolean }>(`${this.rootUrl}/auth/username`, {
      username
    });
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials)
  }

}
