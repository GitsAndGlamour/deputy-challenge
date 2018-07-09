import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  question = 0;

  selectQuestion(question: number) {
    this.question = question;
  }
}
