var https = require('https');
var thing;

https.request('https://www.allflicks.net/canada', (res) => {
  console.log(`Got response: ${res.headers}`);
  thing = res;
  // consume response body
  res.resume();
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});