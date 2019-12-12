import 'regenerator-runtime/runtime';

const request = require('supertest');
const app = require('../src/server/app');

describe('# App Tests', () => {
  describe('## Testing routes', () => {
    test('It should not response the GET method', async () => {
      const response = await request(app).get('/wrong');
      expect(response.statusCode).toBe(404);
    });
  });
});
