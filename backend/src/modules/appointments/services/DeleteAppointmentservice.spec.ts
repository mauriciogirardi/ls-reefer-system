import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import DeleteAppointmentService from './DeleteAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let deleteAppointment: DeleteAppointmentService;

describe('DeleteAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    deleteAppointment = new DeleteAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to delete a appointment', async () => {
    const appointmentOne = await fakeAppointmentsRepository.create({
      date: new Date(2020, 12, 19, 10, 0, 0),
      btus: 12,
      customer_id: '123456',
      device: 'test',
      electric: 'not',
      obs: 'not',
      placeOfInstallation: 'room',
      placeOfService: 'house',
      price: 350,
      quantity: 1,
      status: false,
      technician: 'John Doe',
      typeService: 'inst',
      user_id: '123456456',
    });

    const del = await deleteAppointment.execute({ id: appointmentOne.id });

    expect(del).not.toEqual([appointmentOne]);
  });

  it('Should be not able to delete a appointment.', async () => {
    await expect(
      deleteAppointment.execute({ id: 'not-found-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
