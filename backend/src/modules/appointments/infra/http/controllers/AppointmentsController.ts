import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';
import { classToClass } from 'class-transformer';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ListAppointmentsService from '@modules/appointments/services/ListAppointmentsService';
import DeleteAppointmentService from '@modules/appointments/services/DeleteAppointmentService';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      customer_id,
      technician,
      date,
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
    } = request.body;
    const user_id = request.user.id;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      customer_id,
      user_id,
      technician,
      date: parsedDate,
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

    return response.json(appointment);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { year, month, day } = request.query;

    const listAppointment = container.resolve(ListAppointmentsService);

    const appointments = await listAppointment.execute({
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(classToClass(appointments));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAppointment = container.resolve(DeleteAppointmentService);

    const appointment = await deleteAppointment.execute({ id });

    return response.status(204).json(appointment);
  }
}
