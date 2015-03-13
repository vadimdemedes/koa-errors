# koa-errors

Koa middleware for displaying Rails-inspired error pages for development environments
with error name, message, stack trace and extracted code around source of error.

**Note**: It does not swallow errors, they still get the same usual output in the console.
**Tip**: Looking for [express version](https://github.com/vdemedes/express-errors)?


### Installation

```
$ npm install koa-errors --save
```


### Usage

```javascript
var koa = require('koa');
var errors = require('koa-errors');

var app = koa();

app.use(errors());
app.use(function * (next) {
  throw new Error('Oh no, the world is coming to an end!');
  
  this.body = 'No way!';
  
  yield next;
});

app.listen(3000);
```

![](http://cl.ly/image/2z1H1r2F1O2D/direct)


### License

koa-errors is released under the MIT license.
