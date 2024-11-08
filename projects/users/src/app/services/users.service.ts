import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User, Users } from '../../model/user.model';
import { environment } from '../../environments/environment.development';
import { Paginator } from '@lib/common';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  getUsers(paginatorConfig: Paginator) {
    const url = `${environment.api.url}${environment.api.endpoints.users}?page=${paginatorConfig.page || 1}&limit=${paginatorConfig.limit || 10}`;
    return lastValueFrom(this.http.get<{ clients: Users, currentPage: number, totalPages: number }>(url));
  }

  insertUser(user: Partial<Pick<User, 'name' | 'salary' | 'companyValuation'>>) {
    const url = `${environment.api.url}${environment.api.endpoints.users}`;
    return lastValueFrom(this.http.post<User>(url, user));
  }

  updateUser(id: string, user: Partial<Pick<User, 'name' | 'salary' | 'companyValuation'>>) {
    const url = `${environment.api.url}${environment.api.endpoints.users}/${id}`;
    return lastValueFrom(this.http.patch<User>(url, user));
  }

  async deleteUser(id: string) {
    const url = `${environment.api.url}${environment.api.endpoints.users}/${id}`;
    const res = lastValueFrom(this.http.delete(url));
    return res;
  }

}
