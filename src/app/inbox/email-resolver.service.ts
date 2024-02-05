import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Email} from "./inbox.model";
import {EmailService} from "./email.service";
import {catchError, EMPTY} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email>{

  constructor(private emailService: EmailService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const { id } = route.params;
    console.log('Resolver is being executed');
    return this.emailService.getEmail(id).pipe(
      catchError(() => {
        this.router.navigateByUrl('/inbox/not-found').then();

        return EMPTY;
      } )
    );
  }


}
