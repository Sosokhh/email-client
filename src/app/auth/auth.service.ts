import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignedInResponse, SignInCredentials, SignInResponse, SignupCredentials, SignupResponse} from "./auth.model";
import {BehaviorSubject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedIn$ = new BehaviorSubject(false);
  username = new BehaviorSubject('');

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
        tap(({ username }) => {
          this.signedIn$.next(true);
          this.username.next(username);
        })
      )
  }

  checkAuth() {
    const storedAuthStatus = localStorage.getItem('authStatus');
    if (storedAuthStatus) {
      this.signedIn$.next(JSON.parse(storedAuthStatus));
    }

    return this.http.get<SignedInResponse>(`${this.rootUrl}/auth/signedin`).pipe(
      tap(({ authenticated, username }) => {
        this.signedIn$.next(authenticated);
        this.username.next(username);
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
    return this.http.post<SignInResponse>(`${this.rootUrl}/auth/signin`, credentials)
      .pipe(
        tap(({ username }) =>{
          this.signedIn$.next(true);
          this.username.next(username);
        } )
      );
  }
}
