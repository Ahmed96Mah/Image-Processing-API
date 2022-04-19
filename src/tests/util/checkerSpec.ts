import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Test checker middleware response', () => {
  it('Expects an OK response with a status 200, indicating the recognition of an existing file', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=500&height=500&ext=jpg'
    );
    expect(response.status).toBe(200);
  });
});
