import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthentication from '@shared/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import DayAvailabilityController from '../controllers/DayAvailabilityController';
import MonthAvailabilityController from '../controllers/MonthAvailabilityController';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthentication);

const appointmentsController = new AppointmentsController();
const dayAvailabilityController = new DayAvailabilityController();
const monthAvailabilityController = new MonthAvailabilityController();

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      date: Joi.string().required(),
      typeService: Joi.string(),
      technician: Joi.string(),
      device: Joi.string(),
      electric: Joi.string(),
      placeOfService: Joi.string(),
      placeOfInstallation: Joi.string(),
      status: Joi.boolean(),
      obs: Joi.string(),
      btus: Joi.number(),
      quantity: Joi.number(),
      price: Joi.number(),
    },
  }),
  appointmentsController.create,
);

appointmentsRouter.get('/me', appointmentsController.index);

appointmentsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  appointmentsController.delete,
);

appointmentsRouter.get(
  '/month-availability',
  monthAvailabilityController.index,
);

appointmentsRouter.get('/day-availability', dayAvailabilityController.index);

export default appointmentsRouter;
