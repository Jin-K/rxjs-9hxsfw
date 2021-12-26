import { FakeHttpProvider } from './providers';
import { ClickProvider } from './providers/click-provider.class';
import { Component, Scenario } from './runtime';
import { sleep } from './runtime/sleep.function';
import './style.css';

(async function main() {
  const component1 = new Component(new FakeHttpProvider());
  const scenario1 = new Scenario(1, component1);
  await scenario1.run();

  await sleep(2500);

  const component2 = new Component(new ClickProvider());
  const scenario2 = new Scenario(2, component2);
  await scenario2.run();
})();
