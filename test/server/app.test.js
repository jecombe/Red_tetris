import 'regenerator-runtime/runtime';

const request = require('supertest');
const app = require('../../src/server/server');

describe('# App Tests', () => {
  describe('## Testing routes', () => {
    test('It should not response the GET method', async () => {
      const response = await request(app).get('/wrong');
      const responseTrue = await request(app).get('/');
      console.log(responseTrue);
      expect(responseTrue.status).toBe(200);
    });
  });
});
