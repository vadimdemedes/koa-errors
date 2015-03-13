/**
 * Dependencies
 */

var views = require('co-views');
var fs = require('co-fs');


/**
 * Expose errors middleware
 */

module.exports = function () { return errors; };


/**
 * Configure templates
 */

var render = views(__dirname + '/templates', {
  cache: false
});


/**
 * Errors middleware
 */

function * errors (next) {
  try {
    yield next;
  } catch (err) {
    console.error(err.stack);
    
    // parse first line in stacktrace
  	var line = err.stack.split('\n')[1];

  	// parse file path and line
  	var result = /at\s(.+\s)?\(?(.+)\:([0-9]+)\:[0-9]+/.exec(line);
  	var path = result[2];
  	var row = +result[3];

  	// read file and create an excerpt
  	// around line where error occured
  	var file = yield fs.readFile(path, 'utf-8');
  	file = file.split('\n');

  	var start = row - 6 < 0 ? 0 : row - 6;
  	var end = row + 6;

  	var excerpt = file.slice(start, end);

    this.status = 500;
  	this.body = yield render('error.html.ejs', {
  		name: err.name,
  		message: err.message,
  		line: row,
  		excerpt: excerpt,
  		excerpt_start: start + 1,
  		stack: err.stack
  	});
  }
}
