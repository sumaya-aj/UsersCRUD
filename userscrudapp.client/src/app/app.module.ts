import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RemoveTimeFromDatePipe } from './pipes/remove-time-from-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RemoveTimeFromDatePipe
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
