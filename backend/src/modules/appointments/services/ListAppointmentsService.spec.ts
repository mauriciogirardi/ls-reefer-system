import 'reflect-metadata';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListAppointmentsService from './ListAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listAppointments: ListAppointmentsService;

describe('listAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listAppointments = new ListAppointmentsService(fakeAppointmentsRepository);
  });

  it('Should be able to list appointments.', async () => {
    const appointmentOne = await fakeAppointmentsRepository.create({
      date: new Date(2020, 11, 20, 14, 0, 0),
      customer_id: '123456',
      user_id: '123123',
      technician: 'Holices sanson',
      typeService: 'instalação',
      device: 'split',
      btus: 18,
      quantity: 2,
      electric: 'não',
      price: 600.0,
      placeOfService: 'casa baixa',
      placeOfInstallation: 'quarto, sala',
      obs: '',
      status: true,
    });

    const appointmentTwo = await fakeAppointmentsRepository.create({
      date: new Date(2020, 11, 20, 15, 0, 0),
      customer_id: '123456',
      user_id: '123123',
      technician: 'Holices sanson',
      typeService: 'instalação',
      device: 'split',
      btus: 18,
      quantity: 2,
      electric: 'não',
      price: 600.0,
      placeOfService: 'casa baixa',
      placeOfInstallation: 'quarto, sala',
      obs: '',
      status: true,
    });

    const appointments = await listAppointments.execute({
      year: 2020,
      month: 12,
      day: 20,
    });

    expect(appointments).toEqual([appointmentOne, appointmentTwo]);
  });
});
