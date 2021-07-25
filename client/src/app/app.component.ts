import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '_services/account.service';
import { User } from './_model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating App';
  users: any;

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.setCurrerntUser();
  }

  setCurrerntUser()
  {
    const user: User = JSON.parse(localStorage.getItem('user') as string);
    this.accountService.serCurrentUser(user);
  }

}
