import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import * as Yup from 'yup';
import 'react-day-picker/lib/style.css';
import { Form } from '@unform/web';
import { format } from 'date-fns';

import Input from 'components/Input';
import Select from 'components/Select';
import Button from 'components/Button';
import listMonths from 'utils/listOfMonths';

import api from 'services/api';
import getValidationErrors from 'utils/getValidationErrors';
import { FormHandles } from '@unform/core';
import { useToast } from 'hooks/toast';
import {
  Container,
  Appointment,
  Calendar,
  ContentHour,
  Hour,
  Wrapper,
} from './styles';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

interface CustomerDataProps {
  id: string;
  name: string;
}

interface AppointmentDataProps {
  date: string;
  customer_id: string;
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

const CreateAppointment: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointment, setAppointment] = useState<AppointmentDataProps[]>([]);
  const [customers, setCustomers] = useState<CustomerDataProps[]>([]);

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  useEffect(() => {
    async function handleCustomers() {
      const { data } = await api.get<CustomerDataProps[]>('/customers');

      setCustomers(data.map(({ name, id }) => ({ name, id })));
    }

    handleCustomers();
  }, []);

  const selectedCustomer = useMemo(
    () =>
      customers.map(({ name, id }) => ({
        value: id,
        label: name,
      })),
    [customers],
  );

  const handleSubmit = useCallback(
    async (data: AppointmentDataProps) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          customer_id: Yup.string().uuid().required('Cliente obrigatório'),
          technician: Yup.string().required('Campo obrigatório'),
          typeService: Yup.string().required('Campo obrigatório'),
          device: Yup.string().required('Campo obrigatório'),
          quantity: Yup.string().required('Campo obrigatório'),
          placeOfService: Yup.string().required('Campo obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const appointmentDate = new Date(selectedDate);
        appointmentDate.setHours(selectedHour);
        appointmentDate.setMinutes(0);

        await api.post('/appointments', {
          ...data,
          date: appointmentDate,
          quantity: Number(data.quantity),
          price: Number(data.price),
          btus: Number(data.btus),
          status: false,
        });

        addToast({
          type: 'success',
          title: 'Agendamento feito com sucesso',
        });

        formRef.current?.reset();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao criar agendar.',
          description: 'Erro na criação agendamento, tente novamente.',
        });
      }
    },
    [addToast, selectedDate, selectedHour],
  );

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  useEffect(() => {
    async function handleMonthAvailability() {
      const response = await api.get('/appointments/month-availability', {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      });

      setMonthAvailability(response.data);
    }

    handleMonthAvailability();
  }, [currentMonth]);

  useEffect(() => {
    async function handleMonthAvailability() {
      const response = await api.get('/appointments/day-availability', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      });

      setAvailability(response.data);
    }

    handleMonthAvailability();
  }, [selectedDate]);

  const morningAvailability = useMemo(
    () =>
      availability
        .filter(({ hour }) => hour < 12)
        .map(({ hour, available }) => ({
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        })),
    [availability],
  );

  const afternoonAvailability = useMemo(
    () =>
      availability
        .filter(({ hour }) => hour >= 12 && hour < 18)
        .map(({ hour, available }) => ({
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        })),
    [availability],
  );

  const eveningAvailability = useMemo(
    () =>
      availability
        .filter(({ hour }) => hour >= 18)
        .map(({ hour, available }) => ({
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        })),
    [availability],
  );

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  return (
    <Container>
      <Appointment>
        <h1>Agendamento</h1>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[...disabledDays]}
            modifiers={{ available: { daysOfWeek: [0, 1, 2, 3, 4, 5, 6] } }}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            months={listMonths}
          />
        </Calendar>

        <ContentHour>
          <strong>Manhã</strong>
          {morningAvailability.map(({ hourFormatted, hour, available }) => (
            <Hour
              key={hourFormatted}
              available={available}
              selected={selectedHour === hour}
              onClick={() => handleSelectHour(hour)}
              disabled={!available}
            >
              <p>{hourFormatted}</p>
            </Hour>
          ))}

          <strong>Tarde</strong>
          {afternoonAvailability.map(({ hourFormatted, hour, available }) => (
            <Hour
              key={hourFormatted}
              available={available}
              selected={selectedHour === hour}
              onClick={() => handleSelectHour(hour)}
              disabled={!available}
            >
              <p>{hourFormatted}</p>
            </Hour>
          ))}

          <strong>Noite</strong>
          {eveningAvailability.map(({ hourFormatted, hour, available }) => (
            <Hour
              key={hourFormatted}
              available={available}
              selected={selectedHour === hour}
              onClick={() => handleSelectHour(hour)}
              disabled={!available}
            >
              <p>{hourFormatted}</p>
            </Hour>
          ))}
        </ContentHour>
      </Appointment>

      <Form onSubmit={handleSubmit} ref={formRef}>
        <h3>Serviço</h3>
        <Select name="customer_id" options={selectedCustomer} />

        <Input name="technician" placeholder="tecnico" />
        <Input name="typeService" placeholder="Serviço" />
        <Wrapper>
          <Input name="device" placeholder="Tipo do aparelho" />
          <Input name="btus" placeholder="Btus" />
        </Wrapper>
        <Wrapper>
          <Input name="quantity" placeholder="Quantidade" />
          <Input name="electric" placeholder="Elétrica" />
        </Wrapper>
        <Wrapper>
          <Input name="placeOfInstallation" placeholder="Cómodo" />
          <Input name="price" placeholder="R$ Valor" />
        </Wrapper>
        <Input name="placeOfService" placeholder="Lugar do serviço" />
        <Input name="obs" placeholder="Obs:" defaultValue="Sem observação" />

        <Button type="submit">Agendar</Button>
      </Form>
    </Container>
  );
};

export default CreateAppointment;
