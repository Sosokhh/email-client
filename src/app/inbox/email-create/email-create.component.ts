import { Component } from '@angular/core';
import {Email} from "../inbox.model";
import {AuthService} from "../../auth/auth.service";
import {EmailService} from "../email.service";

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrl: './email-create.component.scss'
})
export class EmailCreateComponent {
  showModal = false;
  email!: Email;
  username: string = '';

  constructor(private authService: AuthService, private emailService: EmailService) {
    this.authService.username.subscribe(username => {
      this.username = username;
      this.email = {
        id: '',
        to: '',
        subject: '',
        html: '',
        text: '',
        from: `${this.username}@angular-email.com`
      }
    })

  }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
