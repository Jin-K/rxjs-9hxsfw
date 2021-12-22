import { Observable } from 'rxjs';

import { IProvider } from '../runtime';

export class HttpProvider implements IProvider<string> {
  private readonly _delay = 125;

  private static _instance: HttpProvider | null = null;
  static get current(): HttpProvider {
    return (this._instance ??= new HttpProvider());
  }

  getData(): Observable<string> {
    return new Observable((subscriber) => {
      console.warn("HttpProvider.getData(): making http call :'(");

      setTimeout(() => {
        console.warn('HttpProvider.getData(): http result :|');
        subscriber.next('Hello World from HTTP');
        subscriber.complete();
      }, this._delay);

      return () =>
        console.warn(
          'HttpProvider.getData(): http observable being unsubscribed :D'
        );
    });
  }
}
