import 'reflect-metadata';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListDayAvailabilityService from './ListDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listDayAvailability: ListDayAvailabilityService;

describe('listDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listDayAvailability = new ListDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('Should be able to list the day availability from provider.', async () => {
    await fakeAppointmentsRepository.create({
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

    await fakeAppointmentsRepository.create({
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

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 20, 11).getTime();
    });

    const availability = await listDayAvailability.execute({
      customer_id: '123456',
      year: 2020,
      month: 12,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 7, available: false },
        { hour: 9, available: false },
        { hour: 8, available: false },
        { hour: 10, available: false },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
        { hour: 17, available: true },
      ]),
    );
  });
});
