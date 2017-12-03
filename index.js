const debug = require('debug')('yeps:response:index');
const Response = require('./response');

debug('Response module created');

module.exports = () => async (ctx) => {
  debug('Creating response');

  ctx.response = new Response(ctx);
};
