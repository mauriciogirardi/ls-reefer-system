import { getRepository, Raw, Repository } from 'typeorm';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import IFindAllInMonthFromProvider from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProvider from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import AppError from '@shared/errors/AppError';
import Appointment from '../entities/Appointment';

export default class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({
    date,
    customer_id,
    user_id,
    technician,
    typeService,
    device,
    btus,
    quantity,
    electric,
    price,
    placeOfService,
    placeOfInstallation,
    obs,
    status,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      date,
      customer_id,
      user_id,
      technician,
      typeService,
      device,
      btus,
      quantity,
      electric,
      price,
      placeOfService,
      placeOfInstallation,
      obs,
      status,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findByDate(
    date: Date,
    technician: string,
  ): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date, technician },
    });

    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    month,
    year,
  }: IFindAllInMonthFromProvider): Promise<Appointment[]> {
    const pardedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${pardedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    month,
    year,
    day,
  }: IFindAllInDayFromProvider): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
      relations: ['customer', 'user'],
      order: { date: 'DESC' },
    });

    return appointments;
  }

  public async findById(id: string): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne(id);

    if (!findAppointment) {
      throw new AppError('Appointment not found.');
    }

    return findAppointment;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
