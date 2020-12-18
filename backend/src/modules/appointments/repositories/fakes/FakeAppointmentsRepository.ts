import { v4 } from 'uuid';
import { getDate, getMonth, getYear, isEqual } from 'date-fns';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import IFindAllInMonthFromProvider from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProvider from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import AppError from '@shared/errors/AppError';
import Appointment from '../../infra/typeorm/entities/Appointment';

export default class FakeAppointmentsRepository
  implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

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
    const appointment = new Appointment();

    Object.assign(appointment, {
      id: v4(),
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

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(
    date: Date,
    technician: string,
  ): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment =>
        isEqual(appointment.date, date) &&
        appointment.technician === technician,
    );

    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    month,
    year,
  }: IFindAllInMonthFromProvider): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  public async findAllInDayFromProvider({
    month,
    year,
    day,
  }: IFindAllInDayFromProvider): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year &&
        getDate(appointment.date) === day,
    );

    return appointments;
  }

  public async findById(id: string): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => appointment.id === id,
    );

    if (!findAppointment) {
      throw new AppError('Appointment not found.');
    }

    return findAppointment;
  }

  public async delete(id: string): Promise<void> {
    const findAppointment = this.appointments.findIndex(
      appointment => appointment.id === id,
    );

    this.appointments.splice(findAppointment, 1);
  }
}
