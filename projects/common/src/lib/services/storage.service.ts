import { Injectable } from '@angular/core';
import { Session } from '../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key));
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  setSession(value: Session) {
    this.set('session', value);
  }

  getSession() {
    return this.get<Session>('session');
  }

  removeSession() {
    this.remove('session');
  }

}
