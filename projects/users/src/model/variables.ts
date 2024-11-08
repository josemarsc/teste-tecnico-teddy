import { BehaviorSubject } from "rxjs";
import { Users } from "./user.model";

export const selectedUsers$: BehaviorSubject<Users> = new BehaviorSubject<Users>(null);
