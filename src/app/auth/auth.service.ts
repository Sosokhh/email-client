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
    const storedAuthStatus = localStorage.getItem('authStatus');
    if (storedAuthStatus) {
      this.signedIn$.next(JSON.parse(storedAuthStatus));
    }

    return this.http.get<SignedInResponse>(`${this.rootUrl}/auth/signedin`).pipe(
      tap(({ authenticated }) => {
        console.log('Check Auth Response:', authenticated);
        this.signedIn$.next(authenticated);
        localStorage.setItem('authStatus', JSON.stringify(authenticated));
      })
    );
  }

  signOut() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {}).pipe(
      tap(() => {
        this.signedIn$.next(false);
        localStorage.removeItem('authStatus');

      })

    );
  }


  signIn(credentials: SignInCredentials) {
    return this.http.post(`${this.rootUrl}/auth/signin`, credentials)
      .pipe(
        tap(() =>{
          console.log('Sign In Successful');
          this.signedIn$.next(true)
        } )
      );
  }
}
