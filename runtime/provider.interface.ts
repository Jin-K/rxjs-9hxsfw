import { Observable } from 'rxjs';

export interface IProvider<T> {
  getData(): Observable<T>;
}
