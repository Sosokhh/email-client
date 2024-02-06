import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Email} from "../inbox.model";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrl: './email-show.component.scss'
})
export class EmailShowComponent implements OnInit {
  email!: Email

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data.subscribe(({ email }) => {
      this.email = email;
    })
  }

}
