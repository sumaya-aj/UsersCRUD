import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { User } from './types/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  users: User[] = [];
  showLoader: boolean = true;

  constructor(private userService: UsersService) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers()
      .subscribe({
          next: (users: User[]) => {
            this.users = users;
            this.showLoader = false;
            console.log(users);
          },
          error: (err) => {
            // this.showLoader = false;
            console.error(err)
          }
        });
  }
}
