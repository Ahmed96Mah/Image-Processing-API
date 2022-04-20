import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Test flip middleware response', () => {
  it('Expects an OK response with a status 200, indicating the creation of a flipped image', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=500&height=500&rotate=30&process=flip&ext=jpeg'
    );
    expect(response.status).toBe(200);
  });

  it('Expects an OK response with a status 200, indicating the creation of a flipped image (missing H&W)', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&process=flip&ext=jpeg'
    );
    expect(response.status).toBe(200);
  });
});
