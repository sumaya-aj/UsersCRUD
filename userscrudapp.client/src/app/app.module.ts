import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { AppRoutingModule } from './app-routing.module';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    AddEditUserComponent,
    ListUsersComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
