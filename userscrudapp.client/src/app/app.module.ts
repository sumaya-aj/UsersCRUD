import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RemoveTimeFromDatePipe } from './pipes/remove-time-from-date.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    RemoveTimeFromDatePipe,
    AddEditUserComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
