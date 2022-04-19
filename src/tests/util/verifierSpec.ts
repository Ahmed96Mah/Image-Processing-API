import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Test verifier middleware responses', () => {
  describe('File Name Verifications', () => {
    it('Expects an error message with status 400, indicating a missing "filename" query parameter', async () => {
      const response = await request.get(
        '/api/images?width=500&height=500&ext=jpg'
      );
      expect(response.status).toBe(400);
      expect(response.text).toEqual(
        'Error, The URL has to contain a query parameter: filename'
      );
    });

    it('Expects an error message with status 400, indicating a missing "filename" query value', async () => {
      const response = await request.get(
        '/api/images?filename=&width=500&height=500&ext=jpg'
      );
      expect(response.status).toBe(400);
      expect(response.text).toEqual(
        'Error, The filename query parameter must hold a value.'
      );
    });
  });

  describe("File's width Verifications", () => {
    it('Expects an error message with status 400, indicating a missing "width" query parameter', async () => {
      const response = await request.get(
        '/api/images?filename=fjord&height=500&ext=jpg'
      );
      expect(response.status).toBe(400);
      expect(response.text).toEqual(
        'Error, The URL has to contain a query parameter: width'
      );
    });

    it('Expects an error message with status 400, indicating a missing "width" query value', async () => {
      const response = await request.get(
        '/api/images?filename=fjord&width=&height=500&ext=jpg'
      );
      expect(response.status).toBe(400);
      expect(response.text).toEqual(
        "Error, The image's width must be a non-zero value. Received: "
      );
    });

    it('Expects an error message with status 400, indicating a "width" query value of 0', async () => {
      const response = await request.get(
        '/api/images?filename=fjord&width=0&height=500&ext=jpg'
      );
      expect(response.status).toBe(400);
      expect(response.text).toEqual(
        "Error, The image's width must be a non-zero value. Received: 0"
      );
    });
  });

  describe("File's height Verifications", () => {
    it('Expects an error message with status 400, indicating a missing "height" query parameter', async () => {
      const response = await request.get(
        '/api/images?filename=fjord&width=500&ext=jpg'
      );
      expect(response.status).toBe(400);
      expect(response.text).toEqual(
        'Error, The URL has to contain a query parameter: height'
      );
    });

    it('Expects an error message with status 400, indicating a missing "height" query value', async () => {
      const response = await request.get(
        '/api/images?filename=fjord&width=500&height=&ext=jpg'
      );
      expect(response.status).toBe(400);
      expect(response.text).toEqual(
        "Error, The image's height must be a non-zero value. Received: "
      );
    });

    it('Expects an error message with status 400, indicating a "height" query value of 0', async () => {
      const response = await request.get(
        '/api/images?filename=fjord&width=500&height=0&ext=jpg'
      );
      expect(response.status).toBe(400);
      expect(response.text).toEqual(
        "Error, The image's height must be a non-zero value. Received: 0"
      );
    });
  });

  describe("File's extension Verifications", () => {
    it('Expects an error message with status 400, indicating a missing "ext" query parameter', async () => {
      const response = await request.get(
        '/api/images?filename=fjord&width=500&height=500'
      );
      expect(response.status).toBe(400);
      expect(response.text).toEqual(
        'Error, The URL has to contain a query parameter: ext'
      );
    });

    it('Expects an error message with status 400, indicating an unallowed "ext" query value', async () => {
      const response = await request.get(
        '/api/images?filename=fjord&width=500&height=500&ext=no'
      );
      expect(response.status).toBe(400);
      expect(response.text).toEqual(
        'Error, The available image extensions: JPG, JPEG, PNG, WEBP, GIF, AVIF, TIFF'
      );
    });
  });
});
