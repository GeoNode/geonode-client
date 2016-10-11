var tools = require('boundless-sdk-tools');
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please specify the output file: \n', function (input) {
  rl.close();
  tools.createPackage(input);
});
