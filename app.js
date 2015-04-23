var prompt = require('prompt');
var debug = require('debug')('peter');
var config = require('config');

var peter = require('./peter.js');
// var stoplistDE = require('./stopp_de.js');

if(!config.has('app.promptSchema') || !config.has('app.google') || !config.has('peter')) {
    throw "Error: Check your config.";
}

prompt.start();
prompt.get(config.get('app.promptSchema'), function (err, result) {

    if(!result || !result.query) {
        console.log('Canceling...');
        return;
    }

    var queryUrl = config.get('app.google.baseUrl') + encodeURIComponent(result.query);

    console.log('########### Starting ###########');
    debug('Google request: %s', queryUrl);
    
    new peter(config.get('peter')).run(queryUrl);
});