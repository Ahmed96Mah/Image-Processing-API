import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Test rotate middleware response', () => {
  it('Expects an OK response with a status 200, indicating the creation of a rotated image', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=500&height=500&rotate=30&process=rotate&ext=jpeg'
    );
    expect(response.status).toBe(200);
  });

  it('Expects an OK response with a status 200, indicating the creation of a rotated image (missing H&W)', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&rotate=30&process=rotate&ext=jpeg'
    );
    expect(response.status).toBe(200);
  });
});
