import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignupCredentials, SignupResponse} from "./auth.model";
import {BehaviorSubject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedIn$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
  }

  usernameAvailable(username: string) {
    return this.http.post<{ available: boolean }>(`${this.rootUrl}/auth/username`, {
      username
    });
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials, {
      withCredentials: true
    })
      .pipe(
        tap(() => this.signedIn$.next(true))
      )
  }

  checkAuth() {
    return this.http.get(`${this.rootUrl}/auth/signedin`, {
      withCredentials: true
    }).pipe(
      tap()
    )
  }


}
