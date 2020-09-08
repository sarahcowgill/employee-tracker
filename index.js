const prompts = require('./db/prompts');
const logocli = require('cli-logo'),
    version = 'v' + require('./package.json').version,
    name = require('./package.json').name;
    logocli.print({"name": name,"version": version});

prompts.start();