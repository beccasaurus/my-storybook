var exports: any = {};

importScripts('./backgroundWorkers.js');

const worker = exports.configureWorker((message: any) => postMessage(message, undefined));

let interval: any;

worker.on('start', () => {
  console.log('Starting greetings...');
  interval = setInterval(() => {
    worker.send('greeting', `Hi at ${new Date().toLocaleTimeString()}`);
  }, 5000);
});
worker.on('stop', () => {
  console.log('Greetings stopped.');
  clearInterval(interval);
});

onmessage = e => worker.onmessage(e);
onerror = (e: ErrorEvent) => worker.onerror(e);
