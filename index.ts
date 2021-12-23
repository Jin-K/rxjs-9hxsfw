import { FakeHttpProvider } from './providers';
import { Component, Scenario } from './runtime';
import { sleep } from './runtime/sleep.function';
import './style.css';

(async function main() {
  const component1 = new Component(FakeHttpProvider.current);
  const scenario1 = new Scenario(1, component1);
  await scenario1.run();

  await sleep(2500);

  const scenario2 = new Scenario(2, component1);
  await scenario2.run();
})();
