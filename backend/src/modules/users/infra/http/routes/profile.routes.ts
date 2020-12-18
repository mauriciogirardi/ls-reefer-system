import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthentication from '@shared/infra/http/middlewares/ensureAuthenticated';
import UpdateProfileController from '../../controller/UpdateProfileController';

const profileRouter = Router();

const usersController = new UpdateProfileController();

profileRouter.use(ensureAuthentication);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      occupation: Joi.string(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  usersController.update,
);

profileRouter.get('/', usersController.show);

export default profileRouter;
