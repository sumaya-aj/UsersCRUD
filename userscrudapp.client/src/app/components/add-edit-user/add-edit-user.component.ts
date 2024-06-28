import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/types/user.interface';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})

export class AddEditUserComponent {
  
  @Input() userIdToDelete: number = 0;
  @Input() isEditMode: boolean | undefined = true;

  user: User = {
    id: 0,
    fullName: '',
    email: '',
    birthDate: new Date(),
    city: ''
  };

  constructor(private modalRef: BsModalRef,
    private router: Router
  ) {
    debugger;
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state?.['isEditMode'];
    console.log('Navigation Object state:', state);
    this.isEditMode = state;
  }

  onSubmit(form: NgForm) {
  }

  cancelEditUser(): void {
    this.modalRef.hide();
  }

}
