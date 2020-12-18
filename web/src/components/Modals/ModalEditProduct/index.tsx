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

interface ProductDataForm {
  id: string;
  name: string;
  quantity: number;
  price: number;
  date: string;
}

interface ProductEditing {
  name: string;
  quantity: number;
  price: number;
  date: string;
}

interface ModalProps {
  setIsOpen: () => void;
  handleUpdateProduct: (data: Omit<ProductDataForm, 'id'>) => void;
  editingProduct: ProductDataForm;
}
const ModalEditProduct: React.FC<ModalProps> = ({
  setIsOpen,
  handleUpdateProduct,
  editingProduct,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ProductEditing) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          quantity: Yup.string().required('Quantidade obrigatório'),
          price: Yup.string().required('Preço obrigatório'),
          date: Yup.string().required('Data obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        handleUpdateProduct(data);
        setIsOpen();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [handleUpdateProduct, setIsOpen],
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
          initialData={editingProduct}
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <h1>Editar produto</h1>
          <Input name="name" placeholder="Nome" />
          <Input name="quantity" type="number" placeholder="Quantidade" />
          <Input name="price" placeholder="R$ value" />
          <Input
            name="date"
            placeholder="Data"
            type="date"
            defaultValue={format(parseISO(editingProduct.date), 'yyyy-MM-dd')}
          />
          <Button type="submit">Editar</Button>
        </Form>
      </ModalContainer>
    </>
  );
};

export default ModalEditProduct;
