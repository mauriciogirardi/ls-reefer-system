import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

import ICustomerRepository from '@modules/customers/repositories/ICustomerRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

import IExpenseRepository from '@modules/expenses/repositories/IExpenseRepository';
import ExpenseRepository from '@modules/expenses/infra/typeorm/repositories/ExpenseRepository';

import IProductRepository from '@modules/products/repositories/IProductsRepository';
import ProductRepository from '@modules/products/infra/typeorm/repositories/ProductRepository';

import INotificationsRepository from '@modules/notification/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notification/infra/typeorm/repositories/NotificationsRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UserRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository,
);

container.registerSingleton<ICustomerRepository>(
  'CustomerRepository',
  CustomersRepository,
);

container.registerSingleton<IExpenseRepository>(
  'ExpenseRepository',
  ExpenseRepository,
);

container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);
