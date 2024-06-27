import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/types/user.interface';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})

export class ListUsersComponent implements OnInit {
  users: User[] = [];
  showLoader: boolean = true;
  modalRef?: BsModalRef;
  userIdToDelete: number = 0;
  userFullNameToDelete?: string;

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
          error: (err) => console.error(err)
        });
  }

  openConfirmDeleteModal(confirmDeleteTemplateRef: TemplateRef<void>, userId: number, userFullName: string) {
    this.modalRef = this.modalService.show(confirmDeleteTemplateRef);
    this.userIdToDelete = userId;
    this.userFullNameToDelete = userFullName;
  }
  
  openEditUserModal(userId: number) {
    this.userIdToDelete = userId;
    this.modalRef = this.modalService.show(AddEditUserComponent, {
      initialState: {
        userIdToDelete: this.userIdToDelete,
        isEditMode: true
      }
    });
    // call service getUserById and bind returned data to template
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
