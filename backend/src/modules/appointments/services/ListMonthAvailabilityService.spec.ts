import 'reflect-metadata';

// import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListMonthAvailabilityService from './ListMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listMonthAvailability: ListMonthAvailabilityService;

describe('listMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listMonthAvailability = new ListMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('Should be able to list the month availability from provider.', async () => {
    await fakeAppointmentsRepository.create({
      date: new Date(2020, 11, 20, 7, 0, 0),
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
      date: new Date(2020, 11, 20, 8, 0, 0),
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
      date: new Date(2020, 11, 20, 9, 0, 0),
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
      date: new Date(2020, 11, 20, 10, 0, 0),
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
      date: new Date(2020, 11, 20, 11, 0, 0),
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
      date: new Date(2020, 11, 20, 12, 0, 0),
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
      date: new Date(2020, 11, 20, 13, 0, 0),
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

    await fakeAppointmentsRepository.create({
      date: new Date(2020, 11, 20, 16, 0, 0),
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
      date: new Date(2020, 11, 20, 17, 0, 0),
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
      date: new Date(2020, 11, 20, 18, 0, 0),
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
      date: new Date(2020, 11, 20, 19, 0, 0),
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
      date: new Date(2020, 11, 20, 20, 0, 0),
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

    const availability = await listMonthAvailability.execute({
      year: 2020,
      month: 12,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
