# YEPS Response

[![NPM](https://nodei.co/npm/yeps-response.png)](https://npmjs.org/package/yeps-response)

[![npm version](https://badge.fury.io/js/yeps-response.svg)](https://badge.fury.io/js/yeps-response)
[![Build Status](https://travis-ci.org/evheniy/yeps-response.svg?branch=master)](https://travis-ci.org/evheniy/yeps-response)
[![Coverage Status](https://coveralls.io/repos/github/evheniy/yeps-response/badge.svg?branch=master)](https://coveralls.io/github/evheniy/yeps-response?branch=master)
[![Linux Build](https://img.shields.io/travis/evheniy/yeps-response/master.svg?label=linux)](https://travis-ci.org/evheniy/)
[![Windows Build](https://img.shields.io/appveyor/ci/evheniy/yeps-response/master.svg?label=windows)](https://ci.appveyor.com/project/evheniy/yeps-response)

[![Dependency Status](https://david-dm.org/evheniy/yeps-response.svg)](https://david-dm.org/evheniy/yeps-response)
[![devDependency Status](https://david-dm.org/evheniy/yeps-response/dev-status.svg)](https://david-dm.org/evheniy/yeps-response#info=devDependencies)
[![NSP Status](https://img.shields.io/badge/NSP%20status-no%20vulnerabilities-green.svg)](https://travis-ci.org/evheniy/yeps-response)

[![Known Vulnerabilities](https://snyk.io/test/github/evheniy/yeps-response/badge.svg)](https://snyk.io/test/github/evheniy/yeps-response)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/evheniy/yeps-response/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/evheniy/yeps-response.svg)](https://github.com/evheniy/yeps-response/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/evheniy/yeps-response.svg)](https://github.com/evheniy/yeps-response/network)
[![GitHub issues](https://img.shields.io/github/issues/evheniy/yeps-response.svg)](https://github.com/evheniy/yeps-response/issues)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/evheniy/yeps-response.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)

  
## How to install

    npm i -S yeps-response

## How to use

You can put any type of response data: value, promise, error.

### Without response

    const App = require('yeps');
    
    const error = require('yeps-error');
    const logger = require('yeps-logger');
    const server = require('yeps-server');
    
    const app = new App();
    
    app.all([
      error({ isJSON: true }),
      logger(),
    ]);
    
    app.then(async (ctx) => {
      ctx.res.end('data');
      
      return Promise.reject();
    });
    
    server.createHttpServer(app);
    
### With response

    const App = require('yeps');
    
    const error = require('yeps-error');
    const logger = require('yeps-logger');
    const server = require('yeps-server');
    
    const response = require('yeps-response');
    
    const app = new App();
    
    app.all([
      error({ isJSON: true }),
      logger(),
    ]);
    app.then(response());
    
    app.then(async (ctx) => {
      return ctx.response.resolve('data');
    });
    
    server.createHttpServer(app);
    
### Custom response

    const App = require('yeps');
    
    const error = require('yeps-error');
    const logger = require('yeps-logger');
    const server = require('yeps-server');
    
    const Response = require('yeps-response/response');
    
    const app = new App();
    
    app.all([
      error({ isJSON: true }),
      logger(),
    ]);
    
    app.then(async (ctx) => {
      const response = new Response(ctx);
    
      return response.resolve('data');
    });
    
    server.createHttpServer(app);

### Redirect

    app.then(async (ctx) => {
      return ctx.response.redirect(url = '/', code = 301);
    });

### Custom redirect

    app.then(async (ctx) => {
      const response = new Response(ctx);

      return response.redirect(url = '/', code = 301);
    });

### Reject

If you need to send request and finish response

    app.then(async (ctx) => {
      return ctx.response.reject(data);
    });


#### [YEPS documentation](http://yeps.info/)
