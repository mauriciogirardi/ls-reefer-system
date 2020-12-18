import { inject, injectable } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request {
  month: number;
  year: number;
  day: number;
}

@injectable()
export default class ListAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository,
  ) {}

  public async execute({ year, month, day }: Request): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.findAllInDayFromProvider(
      {
        day,
        month,
        year,
      },
    );

    return appointments;
  }
}
