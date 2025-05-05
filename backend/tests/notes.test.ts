import request from 'supertest';
import app from '../server';  // Import your Express app

// Helper function to generate a token for authenticated tests
const generateToken = async () => {
  const response = await request(app)
    .post('/login')
    .send({ username: 'intern', password: 'letmein' });
  return response.body.token;
};

describe('Notes API', () => {

  // Test for unauthorized access to GET /notes
  it('should return 401 for GET /notes if no token is provided', async () => {
    const response = await request(app).get('/notes');
    expect(response.status).toBe(401);  // Unauthorized access
  });

  // Test for unauthorized access to POST /notes
  it('should return 401 for POST /notes if no token is provided', async () => {
    const response = await request(app)
      .post('/notes')
      .send({ text: 'Test note without token' });

    expect(response.status).toBe(401);  // Unauthorized access
  });

  // Test for authorized access to GET /notes
  it('should return notes for GET /notes if a valid token is provided', async () => {
    const token = await generateToken();
    const response = await request(app)
      .get('/notes')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);  // Check if response is an array
  });

  // Test for authorized access to POST /notes
  it('should create a new note for POST /notes if a valid token is provided', async () => {
    const token = await generateToken();
    const response = await request(app)
      .post('/notes')
      .set('Authorization', `Bearer ${token}`)
      .send({ text: 'New Note with token' });

    expect(response.status).toBe(201);  // Created successfully
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('text', 'New Note with token');
    expect(response.body).toHaveProperty('timeStamp');
  });
});
