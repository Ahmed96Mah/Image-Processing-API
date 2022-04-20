import express from 'express';
import verifier from '../../util/verifier';
import checker from '../../util/checker';
import resize from '../../util/resize';
import rotate from '../../util/rotate';
import flip from '../../util/flip';
import flop from '../../util/flop';

const routes = express.Router();

routes.get(
  '/api/images',
  verifier,
  checker,
  resize,
  rotate,
  flip,
  flop,
  (req: express.Request, res: express.Response): void => {}
);

export default routes;
