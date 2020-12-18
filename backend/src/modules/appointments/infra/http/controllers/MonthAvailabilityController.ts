import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListMonthAvailabilityService from '@modules/appointments/services/ListMonthAvailabilityService';

export default class MonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { year, month } = request.query;

    const listMonthAvailability = container.resolve(
      ListMonthAvailabilityService,
    );

    const providers = await listMonthAvailability.execute({
      month: Number(month),
      year: Number(year),
    });

    return response.json(providers);
  }
}
