import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiClock, FiEdit, FiTrash2 } from 'react-icons/fi';
import { format, isAfter, isToday, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import ModalAppointmentInfo from 'components/Modals/ModalGetAppointment';
import ModalEditAppointment from 'components/Modals/ModalEditAppointment';
import ModalDelete from 'components/Modals/ModalDelete';

import api from 'services/api';
import listMonths from 'utils/listOfMonths';
import formattedHour from 'utils/formattedHour';

import { useToast } from 'hooks/toast';
import {
  Container,
  CardList,
  Header,
  TitleSchedule,
  Schedule,
  Calendar,
  Content,
  Buttons,
  NextAppointment,
  AppointmentContainer,
} from './styles';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

export interface Appointment {
  id: string;
  btus: number;
  date: string;
  device: string;
  electric: string;
  hourFormatted: string;
  obs: string;
  placeOfInstallation: string;
  placeOfService: string;
  price: string;
  quantity: number;
  status: false;
  technician: string;
  typeService: string;
  customer: {
    name: string;
    phone: string;
    city: string;
    neighborhood: string;
    address: string;
  };
  user: {
    name: string;
  };
}

interface Delete {
  id: string;
}

const Dashboard: React.FC = () => {
  const { addToast } = useToast();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<Delete>({} as Delete);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [appointmentModalInfo, setAppointmentModalInfo] = useState<
    Appointment
  >();

  const [appointmentEdit, setAppointmentEdit] = useState<Appointment>();

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  useEffect(() => {
    api
      .get<Appointment[]>('appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        const appointmentsFormatted = response.data.map(appointment => ({
          ...appointment,
          hourFormatted: formattedHour(appointment.date),
        }));

        setAppointments(appointmentsFormatted);
      });
  }, [selectedDate]);

  const handleModal = useCallback(() => {
    setModal(prevState => !prevState);
  }, []);

  const handleAppointmentInfo = useCallback(
    (id: string) => {
      setModal(prevState => !prevState);
      const findAppointment = appointments.find(
        appointment => appointment.id === id,
      );

      if (findAppointment) {
        setAppointmentModalInfo(findAppointment);
      }

      return findAppointment;
    },
    [appointments],
  );

  const handleEditAppointment = useCallback(
    (id: string) => {
      setModal(prevState => !prevState);
      const findAppointment = appointments.find(
        appointment => appointment.id === id,
      );

      if (findAppointment) {
        setAppointmentModalInfo(findAppointment);
      }

      return findAppointment;
    },
    [appointments],
  );

  const toggleDeleteModal = useCallback((): void => {
    setDeleteModalOpen(prevState => !prevState);
  }, []);

  const handleAppointmentDelete = useCallback(async () => {
    try {
      await api.delete(`/appointments/${deleteData.id}`);
      setAppointments(
        appointments.filter(appointment => appointment.id !== deleteData.id),
      );

      toggleDeleteModal();
      addToast({
        type: 'success',
        title: 'Agendamento excluido com sucesso',
      });
    } catch {
      addToast({
        type: 'error',
        title: 'Erro ao cancelar',
        description: 'Erro ao cancelar o agendamento, tente novamente.',
      });
    }
  }, [appointments, addToast, deleteData.id, toggleDeleteModal]);

  const handleDelete = useCallback(
    (id: Delete): void => {
      setDeleteData(id);

      toggleDeleteModal();
    },
    [toggleDeleteModal],
  );

  const handleModalEdit = useCallback(() => {
    setModalEdit(prevState => !prevState);
  }, []);

  const selectedDateAsText = useMemo(
    () => format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR }),
    [selectedDate],
  );

  const selectedWeekDay = useMemo(() => {
    const formatTextOfWeek =
      format(selectedDate, 'cccc') === 'Sunday' ||
      format(selectedDate, 'cccc') === 'Saturday'
        ? 'cccc'
        : "cccc'-feira'";

    return format(selectedDate, formatTextOfWeek, { locale: ptBR });
  }, [selectedDate]);

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

  const morningAppointments = useMemo(
    () =>
      appointments.filter(
        appointment => parseISO(appointment.date).getHours() < 12,
      ),
    [appointments],
  );

  const afternoonAppointments = useMemo(
    () =>
      appointments.filter(
        appointment =>
          parseISO(appointment.date).getHours() >= 12 &&
          parseISO(appointment.date).getHours() < 18,
      ),
    [appointments],
  );

  const nightAppointments = useMemo(
    () =>
      appointments.filter(
        appointment =>
          parseISO(appointment.date).getHours() >= 18 &&
          parseISO(appointment.date).getHours() < 23,
      ),
    [appointments],
  );

  const nextAppointment = useMemo(
    () =>
      appointments.find(appointment =>
        isAfter(parseISO(appointment.date), new Date()),
      ),

    [appointments],
  );

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get('/appointments/month-availability', {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth]);

  return (
    <Container>
      {modal && (
        <ModalAppointmentInfo
          closeModal={handleModal}
          service={appointmentModalInfo}
        />
      )}

      {modalEdit && (
        <ModalEditAppointment
          closeModal={handleModalEdit}
          data={appointmentModalInfo}
        />
      )}

      {deleteModalOpen && (
        <ModalDelete
          setIsOpen={toggleDeleteModal}
          handleDelete={handleAppointmentDelete}
        />
      )}

      <Header>
        <h2>Horários Agendados</h2>
        <p>
          {isToday(selectedDate) && <span>Hoje</span>}
          <span>{selectedDateAsText}</span>
          <span>{selectedWeekDay}</span>
        </p>
      </Header>

      <AppointmentContainer>
        <Schedule>
          {isToday(selectedDate) && nextAppointment && (
            <>
              <TitleSchedule>Agendamento a seguir</TitleSchedule>
              <NextAppointment>
                <Content
                  onClick={() => handleAppointmentInfo(nextAppointment.id)}
                >
                  <p>{nextAppointment.customer.name}</p>
                  <strong>
                    <FiClock />
                    {nextAppointment.hourFormatted}
                  </strong>
                </Content>
                <p>{`Tec: ${nextAppointment.technician}`}</p>
              </NextAppointment>
            </>
          )}
          <TitleSchedule>Manhã</TitleSchedule>

          {morningAppointments.length === 0 && (
            <p>Nenhum agendamento no período da manhã</p>
          )}

          {morningAppointments &&
            morningAppointments.map(appointment => (
              <CardList key={appointment.id}>
                <Content onClick={() => handleAppointmentInfo(appointment.id)}>
                  <p>{appointment.customer.name}</p>
                  <strong>
                    <FiClock />
                    {appointment.hourFormatted}
                  </strong>
                </Content>
                <Buttons>
                  <button type="button" onClick={handleModalEdit}>
                    <FiEdit />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete({ id: appointment.id })}
                  >
                    <FiTrash2 />
                  </button>
                </Buttons>
              </CardList>
            ))}

          <TitleSchedule>Tarde</TitleSchedule>

          {afternoonAppointments.length === 0 && (
            <p>Nenhum agendamento no período da tarde</p>
          )}

          {afternoonAppointments &&
            afternoonAppointments.map(appointment => (
              <CardList key={appointment.id}>
                <Content onClick={() => handleAppointmentInfo(appointment.id)}>
                  <p>{appointment.customer.name}</p>
                  <strong>
                    <FiClock />
                    {appointment.hourFormatted}
                  </strong>
                </Content>
                <Buttons>
                  <button type="button" onClick={handleModalEdit}>
                    <FiEdit />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete({ id: appointment.id })}
                  >
                    <FiTrash2 />
                  </button>
                </Buttons>
              </CardList>
            ))}

          <TitleSchedule>Noite</TitleSchedule>

          {nightAppointments.length === 0 && (
            <p>Nenhum agendamento no período da noite</p>
          )}

          {nightAppointments &&
            nightAppointments.map(appointment => (
              <CardList key={appointment.id}>
                <Content onClick={() => handleAppointmentInfo(appointment.id)}>
                  <p>{appointment.customer.name}</p>
                  <strong>
                    <FiClock />
                    {appointment.hourFormatted}
                  </strong>
                </Content>
                <Buttons>
                  <button type="button" onClick={handleModalEdit}>
                    <FiEdit />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete({ id: appointment.id })}
                  >
                    <FiTrash2 />
                  </button>
                </Buttons>
              </CardList>
            ))}
        </Schedule>

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
      </AppointmentContainer>
    </Container>
  );
};

export default Dashboard;
