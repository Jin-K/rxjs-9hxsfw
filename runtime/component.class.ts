import { Observable, ReplaySubject } from 'rxjs';
import { finalize, multicast, refCount } from 'rxjs/operators';

import { IComponent } from './component.interface';
import { IProvider } from './provider.interface';

export class Component<T> implements IComponent {
  private readonly multiCastReplaySubject = new ReplaySubject<T>(1);
  readonly viewModel$: Observable<T>;

  constructor(provider: IProvider<T>) {
    this.viewModel$ = provider.getData().pipe(
      multicast(this.multiCastReplaySubject),
      refCount(),
      finalize(() => console.warn('Component<T>.viewModel$ completed'))
    );
  }

  ngOnInit(): void {
    this.viewModel$.subscribe((result) =>
      console.info(
        'Component<T>.ngOnInit() -> this.viewModel$.subscribe(result) -> result:',
        result
      )
    );
  }

  ngAfterViewInit() {
    this.viewModel$.subscribe((result) =>
      console.info(
        'Component<T>.ngAfterViewInit() -> this.viewModel$.subscribe(result) -> result:',
        result
      )
    );
  }

  subscribeLaterInCode() {
    this.viewModel$.subscribe((result) =>
      console.info(
        'Component<T>.subscribeLaterInCode() -> this.viewModel$.subscribe(result) -> result:',
        result
      )
    );
  }

  ngOnDestroy() {
    console.info(
      'Component<T>.ngOnDestroy -> multiCastReplaySubject.observers.length:',
      this.multiCastReplaySubject.observers.length
    );
    console.warn(
      'Component<T>.ngOnDestroy -> multiCastReplaySubject.complete()'
    );
    this.multiCastReplaySubject.complete();
    console.info(
      'Component<T>.ngOnDestroy -> multiCastReplaySubject.observers.length:',
      this.multiCastReplaySubject.observers.length
    );
  }
}
