import { Observable } from 'rxjs';

import { IProvider } from '../runtime';

const LOG_PREFIX = 'HttpProvider.getData()';
const PREFIX_CSS = 'color: fuchsia';

export class FakeHttpProvider implements IProvider<string> {
  private readonly _delay = 125;

  private static _instance: FakeHttpProvider | null = null;
  static get current(): FakeHttpProvider {
    return (this._instance ??= new FakeHttpProvider());
  }

  getData(): Observable<string> {
    return new Observable((subscriber) => {
      console.log(`%c${LOG_PREFIX}%c: making http call :'(`, PREFIX_CSS, '');

      setTimeout(() => {
        console.log(`%c${LOG_PREFIX}%c: http result :|`, PREFIX_CSS, '');
        subscriber.next('Hello World from HTTP');
        subscriber.complete();
      }, this._delay);

      return () =>
        console.log(
          `%c${LOG_PREFIX}%c: http observable being unsubscribed :D`,
          PREFIX_CSS,
          ''
        );
    });
  }
}
