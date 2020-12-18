import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeNotificationsRepsository from '@modules/notification/repositories/fakes/FakeNotificationsRepsository';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepsository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepsository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );
  });

  it('Should be able to create a new appointment.', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 2, 15).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 11, 2, 17),
      user_id: '123123',
      customer_id: '123123123',
      btus: 12,
      device: 'split',
      electric: 'not',
      placeOfInstallation: 'home',
      placeOfService: 'room',
      price: 350,
      quantity: 1,
      status: true,
      typeService: 'installation',
      technician: 'Holices',
      obs: 'not obs',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.customer_id).toBe('123123123');
  });

  it('Should not be able to create two appointment on the same time.', async () => {
    const appointmentDate = new Date(2020, 11, 28, 11);

    await createAppointment.execute({
      date: appointmentDate,
      customer_id: '123123123',
      user_id: '123123',
      btus: 12,
      device: 'split',
      electric: 'not',
      placeOfInstallation: 'home',
      placeOfService: 'room',
      price: 350,
      quantity: 1,
      status: true,
      typeService: 'installation',
      technician: 'Holices',
      obs: 'not obs',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        customer_id: '123123123',
        user_id: '123123',
        btus: 12,
        device: 'split',
        electric: 'not',
        placeOfInstallation: 'home',
        placeOfService: 'room',
        price: 350,
        quantity: 1,
        status: true,
        typeService: 'installation',
        technician: 'Holices',
        obs: 'not obs',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create  an appointments on a  past data', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 15, 15).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 11, 15, 14),
        user_id: '123123',
        customer_id: '123123123',
        btus: 12,
        device: 'split',
        electric: 'not',
        placeOfInstallation: 'home',
        placeOfService: 'room',
        price: 350,
        quantity: 1,
        status: true,
        typeService: 'installation',
        technician: 'Holices',
        obs: 'not obs',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create  an appointments before 7am and after 9pm ', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 15, 15).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 11, 16, 6),
        user_id: '123123',
        customer_id: '123123123',
        btus: 12,
        device: 'split',
        electric: 'not',
        placeOfInstallation: 'home',
        placeOfService: 'room',
        price: 350,
        quantity: 1,
        status: true,
        typeService: 'installation',
        technician: 'Holices',
        obs: 'not obs',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 11, 16, 21),
        user_id: '123123',
        customer_id: '123123123',
        btus: 12,
        device: 'split',
        electric: 'not',
        placeOfInstallation: 'home',
        placeOfService: 'room',
        price: 350,
        quantity: 1,
        status: true,
        typeService: 'installation',
        technician: 'Holices',
        obs: 'not obs',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
