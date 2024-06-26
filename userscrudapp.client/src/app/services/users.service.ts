import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = [];
  private getAllUsersUrl = 'http://localhost:5030/api/Users/GetAll'; // add to some global config file
  private baseAPIUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseAPIUrl}/GetAll`);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseAPIUrl}/Delete/${id}`);
  }
}
