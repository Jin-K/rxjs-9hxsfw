import { IComponent } from './component.class';
import { CoolLogger } from './cool-logger.class';
import { sleep } from './sleep.function';

class LifeCycle {
  private static _logger: CoolLogger = new CoolLogger(
    'LifeCycle.runOn(component)',
    'color: #ed2222'
  );
  static async runOn(component: IComponent) {
    this._logger.log(false, 'component.ngOnInit()');
    component.ngOnInit();
    await sleep(1000);

    this._logger.log(false, 'component.ngAfterViewInit()');
    component.ngAfterViewInit();
    await sleep(1000);

    this._logger.log(false, 'component.subscribeLaterInCode()');
    component.subscribeLaterInCode();
    await sleep(1000);

    this._logger.log(false, 'component.ngOnDestroy()');
    component.ngOnDestroy();
  }
}

const DEFAULT_CSS = 'background: #000; color: #00ff22';
class ScenarioLogger {
  private readonly _scenarioLabel: string;

  constructor(
    scenarioId: string,
    private readonly _iterations: number,
    private readonly _leftOffset: number = 5,
    private readonly _centerOffset: number = 7,
    private readonly _rightOffset: number = 5
  ) {
    this._scenarioLabel = `SCENARIO ${scenarioId}`;
  }

  logTitle() {
    const strbuilder = new Array<string>();

    strbuilder.push(new Array(this._leftOffset).fill(' ').join(''));
    for (let c = 0; c < this._iterations; c++) {
      strbuilder.push(this._scenarioLabel);
      if (c < this._iterations - 1)
        strbuilder.push(new Array(this._centerOffset).fill(' ').join(''));
    }
    strbuilder.push(new Array(this._rightOffset).fill(' ').join(''));

    const title = strbuilder.join('');
    const header =
      new Array(title.length).fill('-').join('') +
      '\r\n' +
      title +
      '\r\n' +
      new Array(title.length).fill('-').join('');

    console.log(`%c${header}`, DEFAULT_CSS);
  }

  logFooter() {
    const length =
      this._leftOffset +
      (this._iterations - 1) * this._centerOffset +
      this._rightOffset +
      this._iterations * this._scenarioLabel.length;
    const footer = new Array(length).fill('-').join('');
    console.log(`%c${footer}`, DEFAULT_CSS);
  }
}

export class Scenario {
  private readonly _scenarioLabel: string;
  private readonly _logger: ScenarioLogger;

  constructor(
    scenarioId: string | number,
    private readonly _component: IComponent
  ) {
    this._scenarioLabel = `SCENARIO ${scenarioId}`;
    this._logger = new ScenarioLogger(this._scenarioLabel, 6);
  }

  async run() {
    this._logger.logTitle();
    await LifeCycle.runOn(this._component);
    this._logger.logFooter();
  }
}
