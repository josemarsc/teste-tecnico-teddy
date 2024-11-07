import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Users } from '../../model/user.model';
import { environment } from '../../environments/environment.development';
import { Paginator } from '../../../../shared/models/types';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  getUsers(paginatorConfig: Paginator) {
    const url = `${environment.api.url}${environment.api.endpoints.users}?page=${paginatorConfig.page || 1}&limit=${paginatorConfig.limit || 10}`;
    return lastValueFrom(this.http.get<{ clients: Users, currentPage: number, totalPages: number }>(url));
  }

}
