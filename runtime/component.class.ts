import { Observable, ReplaySubject } from 'rxjs';
import { finalize, multicast, refCount } from 'rxjs/operators';

import { IComponent } from './component.interface';
import { IProvider } from './provider.interface';

const LOG_PREFIX = 'Component<T>';
const PREFIX_COLOR_CSS = 'color: cornflowerBlue';
const WARN_COLOR_CSS = 'color: DarkGoldenRod';
const WARN_BACKGROUND_CSS = 'background: #FFFACD22';

export class Component<T> implements IComponent {
  private readonly multiCastReplaySubject = new ReplaySubject<T>(1);
  readonly viewModel$: Observable<T>;

  constructor(provider: IProvider<T>) {
    this.viewModel$ = provider.getData().pipe(
      multicast(this.multiCastReplaySubject),
      refCount(),
      finalize(() =>
        console.log(
          `%c${LOG_PREFIX}.viewModel$%c completed`,
          `${PREFIX_COLOR_CSS}; ${WARN_BACKGROUND_CSS}`,
          `${WARN_COLOR_CSS}; ${WARN_BACKGROUND_CSS}`
        )
      )
    );
  }

  ngOnInit(): void {
    this.viewModel$.subscribe((result) =>
      console.info(
        `%c${LOG_PREFIX}.ngOnInit()%c: this.viewModel$.subscribe(result) -> result:`,
        PREFIX_COLOR_CSS,
        '',
        result
      )
    );
  }

  ngAfterViewInit() {
    this.viewModel$.subscribe((result) =>
      console.info(
        `%c${LOG_PREFIX}.ngAfterViewInit()%c: this.viewModel$.subscribe(result) -> result:`,
        PREFIX_COLOR_CSS,
        '',
        result
      )
    );
  }

  subscribeLaterInCode() {
    this.viewModel$.subscribe((result) =>
      console.info(
        `%c${LOG_PREFIX}.subscribeLaterInCode()%c: this.viewModel$.subscribe(result) -> result:`,
        PREFIX_COLOR_CSS,
        '',
        result
      )
    );
  }

  ngOnDestroy() {
    console.info(
      `%c${LOG_PREFIX}.ngOnDestroy()%c: this.multiCastReplaySubject.observers.length ->`,
      PREFIX_COLOR_CSS,
      '',
      this.multiCastReplaySubject.observers.length
    );
    console.log(
      `%c${LOG_PREFIX}.ngOnDestroy():%c this.multiCastReplaySubject.complete()`,
      `${PREFIX_COLOR_CSS}; ${WARN_BACKGROUND_CSS}`,
      `${WARN_COLOR_CSS}; ${WARN_BACKGROUND_CSS}`
    );
    this.multiCastReplaySubject.complete();
    console.info(
      `%c${LOG_PREFIX}.ngOnDestroy()%c: this.multiCastReplaySubject.observers.length ->`,
      PREFIX_COLOR_CSS,
      '',
      this.multiCastReplaySubject.observers.length
    );
  }
}
