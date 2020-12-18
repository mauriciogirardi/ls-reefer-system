import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDayAvailabilityService from '@modules/appointments/services/ListDayAvailabilityService';

export default class DayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { year, month, day } = request.query;

    const listDayAvailability = container.resolve(ListDayAvailabilityService);

    const providers = await listDayAvailability.execute({
      year: Number(year),
      month: Number(month),
      day: Number(day),
    });

    return response.json(providers);
  }
}
