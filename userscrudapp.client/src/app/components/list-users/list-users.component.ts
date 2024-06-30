import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/types/user.interface';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { Router } from '@angular/router';

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
    private modalService: BsModalService,
    private router: Router) {
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
          },
          error: (err) => console.error(err)
      });
  }

  openConfirmDeleteModal(confirmDeleteTemplateRef: TemplateRef<void>, userId: number, userFullName: string) {
    this.modalRef = this.modalService.show(confirmDeleteTemplateRef);
    
    // below two properties are for ng-template #confirmDeleteTemplateRef
    this.userIdToDelete = userId;
    this.userFullNameToDelete = userFullName;
  }
  
  openEditUserModal(userId: number) {
    this.modalRef = this.modalService.show(AddEditUserComponent, {
      initialState: {
        userIdToDelete: userId,
        isEditMode: true
      }
    });
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId)
      .subscribe({
        next: () => {
          this.loadUsers();  // refresh list after delete
          this.modalRef?.hide();
        },
        error: (err) => console.error(err)
      });
  }

  navigateToAddUserWithState() {
    this.router.navigate(['/add-user'], { state: { isEditMode: false } });
  }

  searchUsers(searchString: string): void {
    this.showLoader = true;
    this.userService.searchUsers(searchString)
      .subscribe({
        next: (users: User[]) => {
          this.users = users;
          this.showLoader = false;
        },
        error: (err) => {
          console.error(err);
          this.showLoader = false;
        }
      });
  }
}
