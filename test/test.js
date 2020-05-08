const request = require('supertest');
const { expect } = require('chai');

const app = require('../index');

describe('test', () => {
  let server;
  before(function() {
    server = app.listen(9999);
  })

  after(function() {
    server.close();
  })

  describe('#GET test', () => {
    it('shoule return zzchm', async () => {
      const res = await request(server)
        .get('/zzchm')
        .expect(200)
      const result = res.text;
      expect(result).equal('zzchm')
    }).timeout(1000);
  })
})
