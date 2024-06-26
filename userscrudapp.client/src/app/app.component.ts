import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UsersService } from './services/users.service';
import { User } from './types/user.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  users: User[] = [];
  showLoader: boolean = true;
  modalRef?: BsModalRef;
  userIdToDelete: number = 0;
  userFullNameToDelete?: string;

  constructor(private userService: UsersService,
    private router: Router,
    private modalService: BsModalService) {
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
          error: (err) => console.error(err)
        });
  }

  openConfirmDeleteModal(confirmDeleteTemplateRef: TemplateRef<void>, userId: number, userFullName: string) {
    this.modalRef = this.modalService.show(confirmDeleteTemplateRef);
    this.userIdToDelete = userId;
    this.userFullNameToDelete = userFullName;
  }

  deleteUser() {
    this.userService.deleteUser(this.userIdToDelete)
      .subscribe({
        next: () => {
          this.loadUsers();  // Refresh list after delete
          this.modalRef?.hide();
        },
        error: (err) => console.error(err)
      });
  }
}
