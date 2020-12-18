import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthentication from '@shared/infra/http/middlewares/ensureAuthenticated';
import ExpenseController from '../controller/ExpenseController';

const expensesRouter = Router();
const expenseController = new ExpenseController();

expensesRouter.use(ensureAuthentication);

expensesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().required(),
      date: Joi.string().required(),
    },
  }),
  expenseController.create,
);

expensesRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().required(),
      date: Joi.string().required(),
    },
  }),
  expenseController.update,
);

expensesRouter.get(
  '/:name',
  celebrate({
    [Segments.PARAMS]: { name: Joi.string() },
  }),
  expenseController.index,
);

expensesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  expenseController.delete,
);

expensesRouter.get('/', expenseController.index);

export default expensesRouter;
