import { Observable, ReplaySubject } from 'rxjs';
import { finalize, multicast, refCount } from 'rxjs/operators';
import { NotSoCoolLogger } from './cool-logger.class';

import { IProvider } from './provider.interface';

export interface IComponent {
  ngOnInit(): void;
  ngAfterViewInit(): void;
  subscribeLaterInCode(): void;
  ngOnDestroy(): void;
}

export class Component<T> implements IComponent {
  private readonly _logger = new NotSoCoolLogger(
    'Component<T>',
    'color: cornflowerBlue'
  );
  private readonly multiCastReplaySubject = new ReplaySubject<T>(1);
  readonly viewModel$: Observable<T>;

  constructor(provider: IProvider<T>) {
    this.viewModel$ = provider.getData().pipe(
      multicast(this.multiCastReplaySubject),
      refCount(),
      finalize(() =>
        this._logger.log(true, [
          'viewModel$ completed',
          { color: 'DarkGoldenRod' },
        ])
      )
    );
  }

  ngOnInit(): void {
    this.viewModel$.subscribe((result) =>
      this._logger.log(
        false,
        'this.ngOnInit() -> this.viewModel$.subscribe(result) -> result -> ',
        result.toString()
      )
    );
  }

  ngAfterViewInit() {
    this.viewModel$.subscribe((result) =>
      this._logger.log(
        false,
        'this.ngAfterViewInit() -> this.viewModel$.subscribe(result) -> result -> ',
        result.toString()
      )
    );
  }

  subscribeLaterInCode() {
    this.viewModel$.subscribe((result) =>
      this._logger.log(
        false,
        'this.subscribeLaterInCode() -> this.viewModel$.subscribe(result) -> result -> ',
        result.toString()
      )
    );
  }

  ngOnDestroy() {
    this._logger.log(
      false,
      'this.ngOnDestroy() -> this.multiCastReplaySubject.observers.length -> ',
      this.multiCastReplaySubject.observers.length.toString()
    );
    this._logger.log(true, [
      'this.ngOnDestroy() -> this.multiCastReplaySubject.complete()',
      { color: 'DarkGoldenRod' },
    ]);
    this.multiCastReplaySubject.complete();
    this._logger.log(
      false,
      'this.ngOnDestroy() -> this.multiCastReplaySubject.observers.length -> ',
      this.multiCastReplaySubject.observers.length.toString()
    );
  }
}
