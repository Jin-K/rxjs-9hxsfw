import { IComponent } from './component.interface';
import { sleep } from './utils';

const LOG_PREFIX = 'LifeCycle.runOn(component)';
const PREFIX_CSS = 'color: #ed2222';

export class LifeCycle {
  static async runOn(component: IComponent) {
    console.info(`%c${LOG_PREFIX}%c: component.ngOnInit()`, PREFIX_CSS, '');
    component.ngOnInit();
    await sleep(1000);

    console.info(
      `%c${LOG_PREFIX}%c: component.ngAfterViewInit()`,
      PREFIX_CSS,
      ''
    );
    component.ngAfterViewInit();
    await sleep(1000);

    console.info(
      `%c${LOG_PREFIX}%c: component.subscribeLaterInCode()`,
      PREFIX_CSS,
      ''
    );
    component.subscribeLaterInCode();
    await sleep(1000);

    console.info(`%c${LOG_PREFIX}%c: component.ngOnDestroy()`, PREFIX_CSS, '');
    component.ngOnDestroy();
  }
}
