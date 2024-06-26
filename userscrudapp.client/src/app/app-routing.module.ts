import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { AddEditUserComponent } from "./components/add-edit-user/add-edit-user.component";

const routes: Routes = [
    {path: '', component: AppComponent},
    {path: 'add-edit-user', component: AddEditUserComponent},
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }