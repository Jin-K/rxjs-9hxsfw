const DEFAULT_CSS = 'background: #000; color: #00ff22';

export class ScenarioLogger {
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