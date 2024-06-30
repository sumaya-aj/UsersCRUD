import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/types/user.interface';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css'],
  providers: [DatePipe]
})

export class AddEditUserComponent implements OnInit  {
  
  @Input() userIdToDelete: number | undefined;
  @Input() isEditMode: boolean | undefined;

  user: User = {
    id: 0,
    fullName: '',
    email: '',
    birthDate: '',
    city: ''
  };

  users: User[] = [];

  showLoader: boolean = true;

  constructor(private modalRef: BsModalRef,
    private router: Router,
    private userService: UsersService,
    private datePipe: DatePipe) {
        // needed for value of this.isEditMode for addUser
        const navigation = this.router.getCurrentNavigation();
        const state = navigation?.extras.state?.['isEditMode'];
        this.isEditMode = state;
  }
 
  ngOnInit(): void {
    if(this.userIdToDelete) { // edit mode
      // get user data by id
      this.userService.getUserById(this.userIdToDelete)
      .subscribe({
        next: (user: User) => {
          this.user = user; // map user data with user model that the template is bound with
          this.user.birthDate = this.datePipe.transform(this.user.birthDate, 'yyyy-MM-dd') || ''; // send date formatted
          this.showLoader = false;
        },
        error: (err) => console.error(err)
      });
    }
  }

 
  onSubmit(form: NgForm) {
    debugger;


    // prepare data to send to api
    var newOrUpdatedUser: User = {
      id: form.controls['id'].value?? 0,
      fullName: form.controls['fullName'].value,
      email: form.controls['email'].value,
      birthDate: form.controls['birthDate'].value,
      city: form.controls['city'].value 
    }

    if (this.isEditMode) {
      // call edit service
      this.userService.updateUser(newOrUpdatedUser)
      .subscribe({
        next: () => {
          this.showLoader = true;
          this.modalRef?.hide();
          window.location.reload(); // refresh list after edit
          this.showLoader = false;
        },
        error: (err) => console.error(err)
      });
    } else {
      //call add service
      this.userService.addUser(newOrUpdatedUser)
      .subscribe({
        next: () => {
          this.router.navigateByUrl("/");// route to get all users path
        },
        error: (err) => console.error(err)
      });
    }
  }

  cancel(): void {
    console.log('in cancel: ' + this.isEditMode)
    if(this.isEditMode)
      this.modalRef.hide();
    else
      this.router.navigateByUrl("/");
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
}
