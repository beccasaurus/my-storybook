import * as React from 'react';
import { createBackgroundWorker, BackgroundWorker } from './workers/backgroundWorkers';

export default {
  title: 'Background Worker',
};

let worker;

export const Overview = () => {
  const [greetings, setGreetings] = React.useState([]);

  if (!worker) {
    worker = createBackgroundWorker('./doSomethingWorker.js')
      .on('greeting', ({ data }) => {
        setGreetings((greetings) => greetings.concat(data));
      })
      .start();
  }

  const start = () => {
    worker.send('start');
  };
  const stop = () => {
    worker.send('stop');
  };
  return (
    <>
      <button onClick={() => start()}>Start</button>
      <button onClick={() => stop()}>Stop</button>
      <ul>
        {greetings.map((greeting) => (
          <li key={greeting}>{greeting}</li>
        ))}
      </ul>
    </>
  );
};
