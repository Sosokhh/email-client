import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Email} from "../inbox.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrl: './email-form.component.scss'
})
export class EmailFormComponent implements OnInit {
  @Input() email!: Email;
  @Output() emailSubmit = new EventEmitter();
  emailForm = new FormGroup({
    to: new FormControl('', [Validators.required, Validators.email]),
    from: new FormControl({value: '', disabled: true}),
    subject: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
  });


  ngOnInit() {
    if (this.email) {
      const { subject, from, to, text } = this.email;
      this.emailForm.setValue({
        to: to,
        from: from,
        subject: subject,
        text: text
      });
    }
    }

  onSubmit() {
    if (this.emailForm.invalid) {
       return;
    }

    this.emailSubmit.emit(this.emailForm.value)
  }

}
