import { FormControl } from "@angular/forms";

type GenericFormNoExcludedKeys<T> = {
  [key in keyof T]: FormControl<T[key]>;
}
type GenericFormExcludedKeys<T, ExcludedKeys extends keyof T> = {
  [key in Exclude<keyof T, ExcludedKeys>]: FormControl<T[key]>;
}
export type GenericForm<T, ExcludedKeys extends keyof T = keyof T> = ExcludedKeys extends string ? GenericFormNoExcludedKeys<T> : GenericFormExcludedKeys<T, ExcludedKeys>;


export type Login = {
  nome: string;
}

export type AppPage = {
  label: string;
  path: string;
  icon: string;
}

export type ActiveRoute = 'users' | 'products';

export type Paginator = {
  currentPage?: number;
  totalPages?: number;

  page?: number;
  limit?: number;
}
