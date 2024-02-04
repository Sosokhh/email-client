import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {EmailService} from "../email.service";
import {isPlatformBrowser} from "@angular/common";
import {EmailSummary} from "../inbox.model";

@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrl: './email-index.component.scss'
})
export class EmailIndexComponent implements OnInit {
  emails: EmailSummary[] = [];
  constructor(private emailService: EmailService,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.emailService.getEmails().subscribe(emails => {
        this.emails = emails;
      });
    }
  }

}
