const request = require('supertest');
const app = require('../app');

describe('Auth Routes', () => {
  it('should sign up a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        phone: '08012345678',
        password: 'password123'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user');
  });

  it('should reject signup with existing email', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        name: 'Test User',
        email: 'testuser@example.com',
        phone: '08012345678',
        password: 'password123'
      });
    expect(res.statusCode).toBe(400);
  });
});
