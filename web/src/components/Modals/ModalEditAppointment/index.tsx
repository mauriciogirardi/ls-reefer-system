import React, { useCallback } from 'react';
import { FiX } from 'react-icons/fi';
import { Form } from '@unform/web';

import Input from 'components/Input';
import Button from 'components/Button';

import {
  ModalContainer,
  HeaderModal,
  BackgroundModal,
  Wrapper,
} from './styles';

interface Appointment {
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
}

interface ModalProps {
  closeModal: () => void;
  data: Appointment | undefined;
}

const ModalEditAppointment: React.FC<ModalProps> = ({ closeModal, data }) => {
  const handleSubmit = useCallback(async (datas: object) => {
    console.log(datas);
  }, []);

  return (
    <>
      <BackgroundModal onClick={closeModal} />
      <ModalContainer>
        <HeaderModal>
          <button type="button" onClick={closeModal}>
            <FiX />
          </button>
          <h1>Editar serviço</h1>
        </HeaderModal>

        <Form initialData={data} onSubmit={handleSubmit}>
          <div>
            <span>Serviço</span>
            <Input
              containerStyle={{ backgroundColor: '#fff', borderColor: '#fff' }}
              name="typeService"
              placeholder="Serviço"
            />
            <Wrapper>
              <Input
                containerStyle={{
                  backgroundColor: '#fff',
                  borderColor: '#fff',
                }}
                name="device"
                placeholder="Tipo do aparelho"
              />
              <Input name="btus" placeholder="Btus" />
            </Wrapper>
            <Wrapper>
              <Input name="quantity" placeholder="Quantidade" />
              <Input name="electric" placeholder="Elétrica" />
            </Wrapper>
            <Input
              containerStyle={{ backgroundColor: '#fff', borderColor: '#fff' }}
              name="placeOfService"
              placeholder="Lugar do serviço"
            />
            <Input
              containerStyle={{ backgroundColor: '#fff', borderColor: '#fff' }}
              name="placeOfInstallation"
              placeholder="Cómodo ex: quarto, sala ..."
            />

            <Input
              containerStyle={{ backgroundColor: '#fff', borderColor: '#fff' }}
              name="price"
              placeholder="Valor"
            />
            <Input
              containerStyle={{ backgroundColor: '#fff', borderColor: '#fff' }}
              name="obs"
              placeholder="Observação"
            />

            <Button>Editar</Button>
          </div>
        </Form>
      </ModalContainer>
    </>
  );
};

export default ModalEditAppointment;
