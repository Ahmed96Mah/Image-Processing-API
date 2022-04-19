import express from 'express';
import verifier from '../../util/verifier';
import checker from '../../util/checker';
import resize from '../../util/resize';

const routes = express.Router();

routes.get('/api/images', verifier, checker, resize, (req, res) => {});

export default routes;
