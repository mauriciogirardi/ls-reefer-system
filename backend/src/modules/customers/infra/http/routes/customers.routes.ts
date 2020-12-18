import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthentication from '@shared/infra/http/middlewares/ensureAuthenticated';
import CustomerController from '../../controller/CustomerController';

const customersRouter = Router();
const customerController = new CustomerController();

customersRouter.use(ensureAuthentication);

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      phone: Joi.string().max(14),
      city: Joi.string().required(),
      neighborhood: Joi.string().required(),
      address: Joi.string().required(),
    },
  }),
  customerController.create,
);

customersRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      phone: Joi.string().max(14),
      city: Joi.string().required(),
      neighborhood: Joi.string().required(),
      address: Joi.string().required(),
    },
  }),
  customerController.update,
);

customersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customerController.delete,
);

customersRouter.get(
  '/:name',
  celebrate({
    [Segments.PARAMS]: {
      name: Joi.string(),
    },
  }),
  customerController.index,
);

customersRouter.get('/', customerController.index);

export default customersRouter;
