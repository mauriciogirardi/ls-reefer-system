import React, { useCallback, useRef } from 'react';
import { FiX } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from 'components/Input';
import Button from 'components/Button';

import { FormHandles } from '@unform/core';
import getValidationErrors from 'utils/getValidationErrors';
import { ModalContainer, HeaderModal, BackgroundModal } from './styles';

interface CustomerDataForm {
  id: string;
  name: string;
  phone: string;
  city: string;
  neighborhood: string;
  address: string;
}

interface CustomerEditing {
  name: string;
  phone: string;
  city: string;
  neighborhood: string;
  address: string;
}

interface ModalProps {
  setIsOpen: () => void;
  handleUpdateCustomer: (data: Omit<CustomerDataForm, 'id'>) => void;
  editingCustomer: CustomerDataForm;
}
const ModalEditCustomer: React.FC<ModalProps> = ({
  setIsOpen,
  handleUpdateCustomer,
  editingCustomer,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: CustomerEditing) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          phone: Yup.string().required('Telefone obrigatório'),
          city: Yup.string().required('Cidade obrigatório'),
          neighborhood: Yup.string().required('Bairro obrigatório'),
          address: Yup.string().required('Endereço obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        handleUpdateCustomer(data);
        setIsOpen();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [handleUpdateCustomer, setIsOpen],
  );

  const handleKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>): string => {
      let { value } = e.currentTarget;
      value = value.replace(/\D/g, '');
      value = value.replace(/(\d{2})(\d)/, '($1)$2');
      value = value.replace(/(\d{5})(\d)/, '$1-$2');
      value = value.replace(/(-\d{4})\d+?$/, '$1');
      e.currentTarget.value = value;
      return value;
    },
    [],
  );

  return (
    <>
      <BackgroundModal onClick={setIsOpen} />
      <ModalContainer>
        <HeaderModal>
          <button type="button" onClick={setIsOpen}>
            <FiX />
          </button>
        </HeaderModal>

        <Form
          initialData={editingCustomer}
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <h1>Editar cliente</h1>
          <Input name="name" placeholder="Nome" />
          <Input name="phone" placeholder="Telefone" onKeyUp={handleKeyUp} />
          <Input name="city" placeholder="Cidade" />
          <Input name="neighborhood" placeholder="Bairro" />
          <Input name="address" placeholder="Endereço" />

          <Button type="submit">Editar</Button>
        </Form>
      </ModalContainer>
    </>
  );
};

export default ModalEditCustomer;
