const chai = require('chai');
const chaiHttp = require('chai-http');
const App = require('yeps');
const srv = require('yeps-server');
const error = require('yeps-error');
const response = require('..');

const { expect } = chai;

chai.use(chaiHttp);
let app;
let server;

describe('YEPS response test', () => {
  beforeEach(() => {
    app = new App();
    app.then(error());
    app.then(response());
    server = srv.createHttpServer(app);
  });

  afterEach((done) => {
    server.close(done);
  });

  it('should test response', async () => {
    let isTestFinished1 = false;
    let isTestFinished2 = false;
    let isTestFinished3 = false;

    app.then(async (ctx) => {
      isTestFinished1 = true;

      return ctx.response.resolve('test');
    });

    app.then(async (ctx) => {
      isTestFinished2 = true;

      ctx.res.end('test2');

      return Promise.reject();
    });

    await chai.request(server)
      .get('/')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.be.equal('test');
        isTestFinished3 = true;
      });

    expect(isTestFinished1).is.true;
    expect(isTestFinished2).is.false;
    expect(isTestFinished3).is.true;
  });

  it('should test sent response', async () => {
    let isTestFinished1 = false;
    let isTestFinished2 = false;
    let isTestFinished3 = false;

    app.then(async (ctx) => {
      isTestFinished1 = true;

      ctx.res.end('sent');
    });

    app.then(async (ctx) => {
      isTestFinished2 = true;

      return ctx.response.resolve('test');
    });

    await chai.request(server)
      .get('/')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.be.equal('sent');
        isTestFinished3 = true;
      });

    expect(isTestFinished1).is.true;
    expect(isTestFinished2).is.true;
    expect(isTestFinished3).is.true;
  });

  it('should test response with promise', async () => {
    let isTestFinished1 = false;
    let isTestFinished2 = false;

    app.then(async (ctx) => {
      isTestFinished1 = true;
      const data = Promise.resolve('test');

      return ctx.response.resolve(data);
    });

    await chai.request(server)
      .get('/')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.be.equal('test');
        isTestFinished2 = true;
      });

    expect(isTestFinished1).is.true;
    expect(isTestFinished2).is.true;
  });

  it('should test response with stringify', async () => {
    let isTestFinished1 = false;
    let isTestFinished2 = false;

    app.then(async (ctx) => {
      isTestFinished1 = true;

      return ctx.response.resolve({ message: 'Ok' });
    });

    await chai.request(server)
      .get('/')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.be.equal('{"message":"Ok"}');
        isTestFinished2 = true;
      });

    expect(isTestFinished1).is.true;
    expect(isTestFinished2).is.true;
  });

  it('should test redirect with default parameters', async () => {
    let isTestFinished1 = false;
    let isTestFinished2 = false;

    app.then(async (ctx) => {
      isTestFinished1 = true;

      return ctx.response.redirect();
    });

    await chai.request(server)
      .get('/')
      .send()
      .catch((err) => {
        expect(err).to.have.status(301);
        expect(err.response.headers.location).to.be.equal('/');
        isTestFinished2 = true;
      });

    expect(isTestFinished1).is.true;
    expect(isTestFinished2).is.true;
  });

  it('should test redirect with parameters', async () => {
    let isTestFinished1 = false;
    let isTestFinished2 = false;

    app.then(async (ctx) => {
      isTestFinished1 = true;

      return ctx.response.redirect('/test', 302);
    });

    await chai.request(server)
      .get('/')
      .send()
      .catch((err) => {
        expect(err).to.have.status(302);
        expect(err.response.headers.location).to.be.equal('/test');
        isTestFinished2 = true;
      });

    expect(isTestFinished1).is.true;
    expect(isTestFinished2).is.true;
  });

  it('should test error', async () => {
    let isTestFinished1 = false;
    let isTestFinished2 = false;
    let isTestFinished3 = false;
    let isTestFinished4 = false;

    app.then(async (ctx) => {
      isTestFinished1 = true;

      const err = Promise.reject(new Error());

      return ctx.response.resolve(err);
    });
    app.then(async () => {
      isTestFinished2 = true;
    });
    app.catch(async () => {
      isTestFinished3 = true;
    });

    await chai.request(server)
      .get('/')
      .send()
      .catch((err) => {
        expect(err).to.have.status(500);
        isTestFinished4 = true;
      });

    expect(isTestFinished1).is.true;
    expect(isTestFinished2).is.false;
    expect(isTestFinished3).is.false;
    expect(isTestFinished4).is.true;
  });

  it('should test error', async () => {
    let isTestFinished1 = false;
    let isTestFinished2 = false;
    let isTestFinished3 = false;
    let isTestFinished4 = false;

    app.then(async (ctx) => {
      isTestFinished1 = true;

      return ctx.response.resolve(new Error());
    });
    app.then(async () => {
      isTestFinished2 = true;
    });
    app.catch(async () => {
      isTestFinished3 = true;
    });

    await chai.request(server)
      .get('/')
      .send()
      .catch((err) => {
        expect(err).to.have.status(500);
        isTestFinished4 = true;
      });

    expect(isTestFinished1).is.true;
    expect(isTestFinished2).is.false;
    expect(isTestFinished3).is.false;
    expect(isTestFinished4).is.true;
  });
});
