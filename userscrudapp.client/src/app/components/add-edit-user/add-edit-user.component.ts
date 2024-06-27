import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/types/user.interface';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})

export class AddEditUserComponent {
  
  @Input() userIdToDelete: number = 0;
  @Input() isEditMode: boolean = true;

  user: User = {
    id: 0,
    fullName: '',
    email: '',
    birthDate: new Date(),
    city: ''
  };

  constructor(private modalRef: BsModalRef) {}


  onSubmit(form: NgForm) {
   
  }

  cancelEditUser(): void {
    this.modalRef.hide();
  }

}
