import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Email} from "../inbox.model";
import {EmailService} from "../email.service";

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrl: './email-reply.component.scss'
})
export class EmailReplyComponent implements OnChanges {
  showModal = false;
  @Input() email!: Email;

  constructor(private emailService: EmailService) {
  }

  ngOnChanges() {
    const text = this.email.text.replace(/\n/gi, '\n>')
    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n--------- ${this.email.from} wrote: \n> ${text}`
    }
  }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    })
  }


}
