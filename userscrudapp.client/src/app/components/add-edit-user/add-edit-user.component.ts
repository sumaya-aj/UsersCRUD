import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/types/user.interface';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})

export class AddEditUserComponent {
  

  user: User = {
    id: 0,
    fullName: '',
    email: '',
    birthDate: new Date(),
    city: ''
  };

  constructor() {}


  onSubmit(form: NgForm) {
   
  }

}
