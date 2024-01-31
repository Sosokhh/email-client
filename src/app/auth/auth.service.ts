import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignedInResponse, SignInCredentials, SignupCredentials, SignupResponse} from "./auth.model";
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
    return this.http.post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials)
      .pipe(
        tap(() => this.signedIn$.next(true))
      )
  }

  checkAuth() {
    return this.http.get<SignedInResponse>(`${this.rootUrl}/auth/signedin`).pipe(
      tap(({authenticated}) => {
        this.signedIn$.next(authenticated)
      })
    )
  }

  signOut() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {}).pipe(
      tap(() => this.signedIn$.next(false))
    );
  }


  signIn(credentials: SignInCredentials) {
    return this.http.post(`${this.rootUrl}/auth/signin`, credentials)
      .pipe(
        tap(() => this.signedIn$.next(true))
      );
  }
}
