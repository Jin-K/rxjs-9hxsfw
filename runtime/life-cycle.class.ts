import { Component } from './component.class';
import { IComponent } from './component.interface';
import { sleep } from './utils';

const LOG_PREFIX = 'LifeCycle.runOn(component)';

export class LifeCycle {
  static async runOn(component: IComponent) {
    console.info(`${LOG_PREFIX} -> component.ngOnInit()`);
    component.ngOnInit();
    await sleep(1000);

    console.info(`${LOG_PREFIX} -> component.ngAfterViewInit()`);
    component.ngAfterViewInit();
    await sleep(1000);

    console.info(`${LOG_PREFIX} -> component.subscribeLaterInCode()`);
    component.subscribeLaterInCode();
    await sleep(1000);

    console.info(`${LOG_PREFIX} -> component.ngOnDestroy()`);
    component.ngOnDestroy();
  }
}
