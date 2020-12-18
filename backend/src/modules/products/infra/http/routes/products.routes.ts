import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthentication from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProductController from '../controller/ProductController';

const productsRouter = Router();
const productController = new ProductController();

productsRouter.use(ensureAuthentication);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      quantity: Joi.number().required(),
      price: Joi.number().required(),
      date: Joi.string().required(),
    },
  }),
  productController.create,
);

productsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
      name: Joi.string().required(),
      quantity: Joi.number().required(),
      price: Joi.number().required(),
      date: Joi.string().required(),
    },
  }),
  productController.update,
);

productsRouter.get(
  '/:name',
  celebrate({
    [Segments.PARAMS]: { name: Joi.string() },
  }),
  productController.index,
);

productsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  productController.delete,
);

productsRouter.get('/', productController.index);

export default productsRouter;
