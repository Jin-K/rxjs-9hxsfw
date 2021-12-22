import { HttpProvider } from './providers';
import { Component, LifeCycle } from './runtime';
import { ScenarioLogger, sleep } from './runtime/utils';

export class Program {
  static async main() {
    const logger = new ScenarioLogger('1', 6);
    logger.logTitle();
    await LifeCycle.runOn(new Component(HttpProvider.current));
    logger.logFooter();

    await sleep(2500);

    // logScenarioTitle('SCENARIO 2', 7);
    // const source2$ = HttpProvider.current
    //   .getData()
    //   .pipe(switchMapTo(interval(500)));
    // await LifeCycle.runOn(new Component(source2$, HttpProvider.current));
  }
}
