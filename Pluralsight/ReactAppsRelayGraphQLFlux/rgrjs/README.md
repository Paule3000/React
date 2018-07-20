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


Issues:
Currently failing with error:
"SyntaxError: Unexpected token import"

This is debug only and follows installation of babel stage-0 preset


Async db access method also failed and I reinstated the original version


Issues
------
ReferenceError: regeneratorRuntime is not defined
Add babel-polyfill
https://babeljs.io/docs/en/babel-polyfill/
