import { Session } from "@lib/common";
import { BehaviorSubject } from "rxjs";

export const SESSION_TIMEOUT = 3600000; // 1 hour
export const session$: BehaviorSubject<Session> = new BehaviorSubject<Session>(null);
