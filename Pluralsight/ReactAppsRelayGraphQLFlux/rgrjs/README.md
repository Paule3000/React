## RGR.js

A minimal template for working with React.js on an Express.js server using Webpack with Babel 6 (Tested with Node v5.1.1)

## Installing

```
git clone https://github.com/RGRjs/express-webpack-template.git rgrjs
cd rgrjs

npm install

npm install -g webpack nodemon
```

- Run a webpack watcher in one terminal: `webpack -w -d`
- Run a nodemon process in another terminal: `nodemon`
- Go to http://localhost:3000, you should see a "Hello React" line.


Paule
Simple method without restarts or auto build

Build:
webpack
npm run-script build (for server)

Run:
npm start

OR run in debugger using Launch Server.js config (see .vscode/launch.json)


Current State
-------------
Webpack failing with addition of babelRelayPlugin:
Invalid configuration object. Webpack has been initialised using a configuration
 object that does not match the API schema.
 - configuration.plugins[0] should be one of these:
   object { apply, . } | function
   -> Plugin of type object or instanceof Function
   Details:
    * configuration.plugins[0] should be an object.
      -> Plugin instance
    * configuration.plugins[0] should be an instance of function
      -> Function acting as plugin



Issues
------
ReferenceError: regeneratorRuntime is not defined
Add babel-polyfill
https://babeljs.io/docs/en/babel-polyfill/


Currently failing with error:
"SyntaxError: Unexpected token import"
This is debug only and follows installation of babel stage-0 preset

Moved data/schema.js under src directory so it is compiled by babel.


Async db access method failed and I reinstated the original version
Corrected with up to date MongoDb code. connect() returns a client.


