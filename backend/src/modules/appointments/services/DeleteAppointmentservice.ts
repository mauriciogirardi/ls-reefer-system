import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request {
  id: string;
}

@injectable()
export default class DeleteAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ id }: Request): Promise<void> {
    const findAppointment = await this.appointmentsRepository.findById(id);

    if (!findAppointment) {
      throw new AppError('Appointment not found');
    }

    await this.appointmentsRepository.delete(id);
  }
}
