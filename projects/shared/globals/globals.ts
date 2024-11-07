import { BehaviorSubject } from "rxjs";
import { Session } from "../models/session.model";
import { Users } from "../../users/src/model/user.model";

export const SESSION_TIMEOUT = 3600000; // 1 hour
export const logoBlackSrc = 'https://teddydigital.io/wp-content/uploads/2023/10/logo-preto.png'
export const logoWhiteSrc = 'https://teddydigital.io/wp-content/uploads/2023/10/logo-branco.png'
export const defaultPaginatorSize = 10;
export const defaultPaginatorOptions = [5, 10, 25, 100];
export const session$: BehaviorSubject<Session> = new BehaviorSubject<Session>(null);
export const selectedUsers$: BehaviorSubject<Users> = new BehaviorSubject<Users>(null);
