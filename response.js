const debug = require('debug')('yeps:response:response');

debug('Response created');

module.exports = class {
  constructor(ctx) {
    debug('Response object created');

    this.ctx = ctx;
  }

  async resolve(data) {
    debug('Response data:');
    debug(data);

    debug('Response finished:', this.ctx.res.finished);

    if (!this.ctx.res.finished) {
      debug('Response sending');
      this.ctx.res.end(await data);
    }

    return Promise.reject();
  }
};
