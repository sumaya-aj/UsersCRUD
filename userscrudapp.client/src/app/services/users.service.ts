import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { User } from '../types/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = [];
  private baseAPIUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseAPIUrl}/GetAll`);
  }
  
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseAPIUrl}/Delete/${id}`);
  }
  
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseAPIUrl}/Get/${id}`);
  }
  
  // updateUser(user: User): Observable<User> {
  //   return this.http.get<User>(`${this.baseAPIUrl}/Update`);
  // }
  
  addUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.baseAPIUrl}/Add`, user);
  }
}
