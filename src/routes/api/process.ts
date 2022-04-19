import express from 'express';
import verifier from '../../util/verifier';
import checker from '../../util/checker';
import sharpy from '../../util/sharp';

const routes = express.Router();

routes.get('/api/images', verifier, checker, sharpy, (req, res) => {});

export default routes;
