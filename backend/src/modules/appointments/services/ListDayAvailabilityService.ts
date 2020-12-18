import { getHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request {
  month: number;
  year: number;
  day: number;
}

type Response = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
export default class ListDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ year, month, day }: Request): Promise<Response> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        year,
        month,
        day,
      },
    );

    const hourStart = 7;

    const eachHourArray = Array.from(
      { length: 14 },
      (_, index) => index + hourStart,
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}
