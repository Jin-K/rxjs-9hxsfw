import { Observable } from 'rxjs';

import { NotSoCoolLogger, IProvider } from '../runtime';

export class FakeHttpProvider implements IProvider<string> {
  private readonly _delay = 200;
  private readonly _logger = new NotSoCoolLogger()
    .withPrefix('HttpProvider.getData()')
    .withPrefixStyle({ color: 'fuchsia' });

  getData() {
    return new Observable<string>((subscriber) => {
      this._logger.log(false, "making http call :'(");

      setTimeout(() => {
        this._logger.log(false, 'http result :|');
        subscriber.next('Hello World from HTTP');
        subscriber.complete();
      }, this._delay);

      return () =>
        this._logger.log(false, 'http observable being unsubscribed :)');
    });
  }
}
