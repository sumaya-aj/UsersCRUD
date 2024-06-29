import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/types/user.interface';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})

export class AddEditUserComponent implements OnInit  {
  
  @Input() userIdToDelete: number | undefined;
  @Input() isEditMode: boolean | undefined;

  user: User = {
    id: 0,
    fullName: '',
    email: '',
    birthDate: new Date(),
    city: ''
  };

  showLoader: boolean = true;

  constructor(private modalRef: BsModalRef,
    private router: Router,
    private userService: UsersService ) {
    // const navigation = this.router.getCurrentNavigation();
    // const state = navigation?.extras.state?.['isEditMode'];
    // this.isEditMode = state;
  }
 
  ngOnInit(): void {
    console.log('use id to delete:   '+this.userIdToDelete);
    console.log('is Edit Mode:   '+this.isEditMode);


    if(this.userIdToDelete) { // edit mode
      // get user data by id
      this.userService.getUserById(this.userIdToDelete)
      .subscribe({
        next: (user: User) => {
          this.user = user; // map user data with user model that the template is bound with
          this.showLoader = false;
        },
        error: (err) => console.error(err)
      });
    }
  }

 
  onSubmit(form: NgForm) {
    debugger;
  }

  cancel(): void {
    console.log('in cancel: ' + this.isEditMode)
    if(this.isEditMode)
      this.modalRef.hide();
    else
      this.router.navigateByUrl("/");
  }

}
