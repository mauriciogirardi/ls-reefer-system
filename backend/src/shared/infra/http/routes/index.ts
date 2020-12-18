import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

import customersRouter from '@modules/customers/infra/http/routes/customers.routes';
import expensesRouter from '@modules/expenses/infra/http/routes/expenses.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

routes.use('/customers', customersRouter);
routes.use('/expenses', expensesRouter);
routes.use('/products', productsRouter);

export default routes;
