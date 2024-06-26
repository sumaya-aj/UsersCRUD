import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  modalRef?: BsModalRef;

  constructor(private userService: UsersService,
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
          error: (err) => {
            // this.showLoader = false;
            console.error(err)
          }
        });
  }


  openConfirmDeleteModal(confirmDeleteTemplateRef: TemplateRef<void>) {
    this.modalRef = this.modalService.show(confirmDeleteTemplateRef);
  }
}
