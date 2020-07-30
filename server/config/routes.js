import { Router } from 'express';

const router = Router();

router.use('/', require('../routes/index.routes').default);
router.use('/payees', require('../routes/payees.routes').default);

export default router;

// https://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express