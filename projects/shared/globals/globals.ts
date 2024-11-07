import { BehaviorSubject } from "rxjs";
import { Session } from "../models/session.model";

export const logoBlackSrc = 'https://teddydigital.io/wp-content/uploads/2023/10/logo-preto.png'
export const logoWhiteSrc = 'https://teddydigital.io/wp-content/uploads/2023/10/logo-branco.png'
export const session$: BehaviorSubject<Session> = new BehaviorSubject<Session>(null);
export const defaultPaginatorSize = 10;
export const defaultPaginatorOptions = [5, 10, 25, 100];
