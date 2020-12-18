import { format, getHours, isBefore, startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import INotificationsRepository from '@modules/notification/repositories/INotificationsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request {
  date: Date;
  customer_id: string;
  user_id: string;
  technician: string;
  typeService: string;
  device: string;
  btus: number;
  quantity: number;
  electric: string;
  price: number;
  placeOfService: string;
  placeOfInstallation: string;
  obs: string;
  status: boolean;
}

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({
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
  }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a  past.");
    }

    if (getHours(appointmentDate) < 7 || getHours(appointmentDate) > 20) {
      throw new AppError(
        "You can't create an appointment before 7am and after 9pm",
      );
    }
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
      technician,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already  booked.');
    }

    const appointment = await this.appointmentsRepository.create({
      date: appointmentDate,
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

    // Notifications
    const dateFormated = format(appointmentDate, "dd/MM/yyyy 'ás' HH:mm");

    await this.notificationsRepository.create({
      recipient_id: user_id,
      content: `Novo agendamendo para o dia ${dateFormated}`,
    });

    return appointment;
  }
}
