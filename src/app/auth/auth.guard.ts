import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";
import {map, Observable, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.signedIn$.pipe(
      take(1), // Take only one emission
      map((isSignedIn: boolean) => {
        if (isSignedIn) {
          return true;
        } else {
          this.router.navigate(['/']).then();
          return false;
        }
      })
    );
  }


}
