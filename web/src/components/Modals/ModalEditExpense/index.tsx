import React, { useCallback, useRef } from 'react';
import { FiX } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from 'components/Input';
import Button from 'components/Button';

import { FormHandles } from '@unform/core';
import getValidationErrors from 'utils/getValidationErrors';
import { format, parseISO } from 'date-fns';
import { ModalContainer, HeaderModal, BackgroundModal } from './styles';

interface ExpenseDataForm {
  id: string;
  name: string;
  price: number;
  date: string;
}

interface ExpenseEditing {
  name: string;
  price: number;
  date: string;
}

interface ModalProps {
  setIsOpen: () => void;
  handleUpdateExpense: (data: Omit<ExpenseDataForm, 'id'>) => void;
  editingExpense: ExpenseDataForm;
}
const ModalEditExpense: React.FC<ModalProps> = ({
  setIsOpen,
  handleUpdateExpense,
  editingExpense,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ExpenseEditing) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          price: Yup.string().required('Preço obrigatório'),
          date: Yup.string().required('Data obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        handleUpdateExpense(data);

        setIsOpen();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [handleUpdateExpense, setIsOpen],
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
          initialData={editingExpense}
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <h1>Editar gasto</h1>
          <Input name="name" placeholder="Nome" />
          <Input name="price" placeholder="R$ value" />
          <Input
            name="date"
            placeholder="Data"
            type="date"
            defaultValue={format(parseISO(editingExpense.date), 'yyyy-MM-dd')}
          />

          <Button type="submit">Editar</Button>
        </Form>
      </ModalContainer>
    </>
  );
};

export default ModalEditExpense;
