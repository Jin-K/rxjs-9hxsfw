import { FakeHttpProvider } from './providers';
import { Component, LifeCycle } from './runtime';
import { ScenarioLogger, sleep } from './runtime/utils';

export class Program {
  static async main() {
    const logger = new ScenarioLogger('1', 6);
    logger.logTitle();
    await LifeCycle.runOn(new Component(FakeHttpProvider.current));
    logger.logFooter();

    await sleep(2500);
  }
}
