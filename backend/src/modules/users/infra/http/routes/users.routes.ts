import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuthentication from '@shared/infra/http/middlewares/ensureAuthenticated';

import UsersController from '../../controller/UsersController';
import UserAvatarController from '../../controller/UserAvatarController';

const usersRouter = Router();

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      occupation: Joi.string(),
      password: Joi.string().min(6).required(),
    },
  }),
  usersController.create,
);

usersRouter.get('/', ensureAuthentication, usersController.index);

usersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthentication,
  usersController.delete,
);

usersRouter.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;