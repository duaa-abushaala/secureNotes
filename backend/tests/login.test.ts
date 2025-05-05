import request from 'supertest';
import app from '../server';  // Import your Express app

const userCredentials = {
  username: 'intern',
  password: 'letmein',
};

describe('Authentication API', () => {

  // Test valid login credentials
  it('should return a token for valid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send(userCredentials);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  // Test invalid login credentials
  it('should return 401 for invalid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'invalid', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });
});
