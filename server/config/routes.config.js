import { Router } from 'express';

const routes = Router();

routes.use('/', require('../routes/index.routes').default);
routes.use('/payees', require('../routes/payees.routes').default);

export default routes;