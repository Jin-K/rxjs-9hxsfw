import { fromEvent } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CoolLogger, IProvider } from '../runtime';

export class ClickProvider implements IProvider<Event> {
  private readonly _logger = new CoolLogger()
    .withPrefix('ClickProvider.getData()')
    .withPrefixStyle({ color: 'fuchsia' });

  getData() {
    return finalize<Event>(() =>
      this._logger.log(false, 'observable being unsubscribed')
    )(fromEvent(document, 'click'));
  }
}
