import {AfterViewInit, Component, Inject, OnChanges, OnInit, PLATFORM_ID, SimpleChanges} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {BehaviorSubject} from "rxjs";
import {isPlatformBrowser, isPlatformServer} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  signedIn$!: BehaviorSubject<boolean>;

  constructor(private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.signedIn$ = this.authService.signedIn$;
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.checkAuth().subscribe();
    }
  }
}
