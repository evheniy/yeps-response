const debug = require('debug')('yeps:response:response');
const { STATUS_CODES } = require('http');

debug('Response created');

module.exports = class {
  constructor(ctx) {
    debug('Response object created');

    this.ctx = ctx;
  }

  async resolve(data = '') {
    debug('Response data:');
    debug(data);

    debug('Response finished:', this.ctx.res.finished);

    if (!this.ctx.res.finished) {
      debug('Response sending');

      let res;

      try {
        res = await data;

        if (data instanceof Error) {
          throw data;
        }
      } catch (err) {
        debug('Error:');
        debug(err);

        const code = err.code || 500;
        debug('Code:', code);

        const message = err.message || STATUS_CODES[500];
        debug('Message:', message);

        res = message;
        this.ctx.res.statusCode = code;
      }

      debug('Type:', typeof res);

      if (typeof res !== 'string') {
        res = JSON.stringify(res);
      }

      debug('Finishing...');
      this.ctx.res.end(res);
    }

    return Promise.reject();
  }

  async redirect(url = '/', code = 301) {
    this.ctx.res.statusCode = code;
    this.ctx.res.setHeader('Location', url);

    return this.resolve();
  }
};
