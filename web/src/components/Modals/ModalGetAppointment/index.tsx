import React from 'react';
import { FiClock, FiCalendar, FiX } from 'react-icons/fi';
import formatCurrency from 'utils/formatCurrency';

import { format, parseISO } from 'date-fns';
import {
  ModalContainer,
  HeaderModal,
  BackgroundModal,
  Client,
  Service,
  Address,
  Wrapper,
} from './styles';

interface Appointment {
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

interface ModalProps {
  closeModal: () => void;
  service: Appointment | undefined;
}

const Modal: React.FC<ModalProps> = ({ closeModal, service }) => (
  <>
    <BackgroundModal onClick={closeModal} />

    {service && (
      <ModalContainer>
        <HeaderModal>
          <button type="button" onClick={closeModal}>
            <FiX />
          </button>
          <p>
            <FiCalendar />
            {format(parseISO(service.date), 'dd/MM/yyyy')}
          </p>

          <p>
            <FiClock />
            {service.hourFormatted}
          </p>
          <span>113</span>
        </HeaderModal>
        <h2>Cliente</h2>
        <Client>
          <div>
            <p>{service.customer.name}</p>
            <p>{service.customer.phone}</p>
          </div>
        </Client>
        <h2>Endereço</h2>
        <Address>
          <div>
            <p>{service.customer.city}</p>
            <p>Bairro {service.customer.neighborhood}</p>
          </div>
          <p>{service.customer.address}</p>
        </Address>
        <h2>Serviço</h2>
        <Service>
          <Wrapper>
            <p>{`Serviço: ${service.typeService}`}</p>
            <p>{`Quantidade: ${service.quantity}`}</p>
          </Wrapper>

          <Wrapper>
            <p>{`Aparelho: ${service.device} de ${service.btus}btus`}</p>
            <p>
              {`Lugar: ${service.placeOfService}, ${service.placeOfInstallation}.`}
            </p>
          </Wrapper>
          <Wrapper>
            <p>{`Elétrica: ${service.electric}`}</p>
            <p>{`Valor: ${formatCurrency(Number(service.price))}`}</p>
          </Wrapper>

          <p>{`Status: ${service.status ? 'Concluído' : 'Em andamento'}`}</p>
          <p>Obs: {service.obs}</p>
        </Service>
      </ModalContainer>
    )}
  </>
);

export default Modal;
