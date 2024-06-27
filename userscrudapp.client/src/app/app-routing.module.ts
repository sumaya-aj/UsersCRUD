import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { AddEditUserComponent } from "./components/add-edit-user/add-edit-user.component";
import { ListUsersComponent } from "./components/list-users/list-users.component";

const routes: Routes = [
    {path: '', component: ListUsersComponent},
    {path: 'add-user', component: AddEditUserComponent},
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }