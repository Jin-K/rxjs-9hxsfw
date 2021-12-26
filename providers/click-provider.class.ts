import { fromEvent } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NotSoCoolLogger, IProvider } from '../runtime';

export class ClickProvider implements IProvider<Event> {
  private readonly _logger = new NotSoCoolLogger()
    .withPrefix('ClickProvider.getData()')
    .withPrefixStyle({ color: 'fuchsia' });

  getData() {
    return finalize<Event>(() =>
      this._logger.log(false, 'observable being unsubscribed')
    )(fromEvent(document, 'click'));
  }
}
