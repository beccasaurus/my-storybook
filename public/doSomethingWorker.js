var exports = {};
importScripts('./backgroundWorkers.js');
var worker = exports.configureWorker(function (message) { return postMessage(message, undefined); });
var interval;
worker.on('start', function () {
    console.log('Starting greetings...');
    interval = setInterval(function () {
        worker.send('greeting', "Hi at " + new Date().toLocaleTimeString());
    }, 5000);
});
worker.on('stop', function () {
    console.log('Greetings stopped.');
    clearInterval(interval);
});
onmessage = function (e) { return worker.onmessage(e); };
onerror = function (e) { return worker.onerror(e); };
