import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from 'utils/getValidationErrors';
import api from 'services/api';
import { useToast } from 'hooks/toast';

import Input from 'components/Input';
import Button from 'components/Button';
import ModalEditCustomer from 'components/Modals/ModalEditCustomer';
import HeaderMain from 'components/HeaderMain';
import Table from 'components/Table';
import ModalDelete from 'components/Modals/ModalDelete';

import { Container, Wrapper } from './styles';

interface CustomerDataForm {
  id: string;
  name: string;
  phone: string;
  city: string;
  neighborhood: string;
  address: string;
}

interface Delete {
  id: string;
}

const RegisterCustomer: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<Delete>({} as Delete);

  const [customers, setCustomers] = useState<CustomerDataForm[]>([]);
  const [searchField, setSearchField] = useState<string>();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<CustomerDataForm>(
    {} as CustomerDataForm,
  );

  useEffect(() => {
    async function handleCustomers() {
      await api.get('/customers').then(response => {
        if (!searchField) {
          setCustomers(response.data);
        }
      });
    }

    handleCustomers();
  }, [setCustomers, searchField]);

  const handleSubmit = useCallback(
    async (data: CustomerDataForm): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          phone: Yup.string()
            .required('Telefone obrigatório')
            .min(14, 'Esta faltando números'),
          city: Yup.string().required('Cidade obrigatório'),
          neighborhood: Yup.string().required('Bairro obrigatório'),
          address: Yup.string().required('Endereço obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, address, city, neighborhood, phone } = data;
        const response = await api.post('/customers', {
          name,
          address,
          city,
          neighborhood,
          phone,
        });

        setCustomers([response.data, ...customers]);
        addToast({
          type: 'success',
          title: 'Cliente cadastrado com sucesso.',
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
          title: 'Erro ao cadastro cliente.',
          description: 'Erro no cadastro de cliente, tente novamente.',
        });
      }
    },
    [addToast, customers],
  );

  const toggleDeleteModal = useCallback((): void => {
    setDeleteModalOpen(prevState => !prevState);
  }, []);

  const handleDeleteCustomer = useCallback(async (): Promise<void> => {
    try {
      await api.delete(`/customers/${deleteData.id}`);

      const findDeleteCustomer = customers.filter(
        customer => customer.id !== deleteData.id,
      );

      setCustomers(findDeleteCustomer);

      toggleDeleteModal();
      addToast({
        type: 'info',
        title: 'Cliente excluido com sucesso.',
      });
    } catch {
      addToast({
        type: 'error',
        title: 'Erro ao Excluir',
        description: 'Erro ao Excluir o cliente, tente novamente.',
      });
    }
  }, [addToast, customers, deleteData.id, toggleDeleteModal]);

  const handleDelete = useCallback(
    (id: Delete): void => {
      setDeleteData(id);

      toggleDeleteModal();
    },
    [toggleDeleteModal],
  );

  const handleUpdateCustomer = useCallback(
    async (customer: Omit<CustomerDataForm, 'id'>): Promise<void> => {
      try {
        const response = await api.put(`/customers/${editingCustomer.id}`, {
          ...customer,
        });

        setCustomers(
          customers.map(mappedCustomer =>
            mappedCustomer.id === editingCustomer.id
              ? { ...response.data }
              : mappedCustomer,
          ),
        );
        addToast({
          type: 'success',
          title: 'Editado com sucesso.',
        });
      } catch {
        addToast({
          type: 'error',
          title: 'Erro ao editar',
          description: 'Ocorreu um erro ao editar, tente novamente.',
        });
      }
    },
    [addToast, customers, editingCustomer],
  );

  const toggleEditModal = useCallback((): void => {
    setEditModalOpen(prevState => !prevState);
  }, []);

  const handleEditCustomer = useCallback(
    (customer: CustomerDataForm): void => {
      setEditingCustomer(customer);
      toggleEditModal();
    },
    [toggleEditModal],
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

  const handleSearchKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      setSearchField(value);
    },
    [],
  );

  useEffect(() => {
    async function handleSearch() {
      try {
        const response = await api.get(`/customers/${searchField}`);

        if (searchField) {
          setCustomers(response.data);
        }
      } catch {
        addToast({
          type: 'error',
          title: 'Erro ao pesquisar cliente.',
          description: 'Erro na pesquisa por cliente, tente novamente.',
        });
      }
    }

    handleSearch();
  }, [addToast, searchField]);

  return (
    <Container>
      {editModalOpen && (
        <ModalEditCustomer
          setIsOpen={toggleEditModal}
          editingCustomer={editingCustomer}
          handleUpdateCustomer={handleUpdateCustomer}
        />
      )}

      {deleteModalOpen && (
        <ModalDelete
          setIsOpen={toggleDeleteModal}
          handleDelete={handleDeleteCustomer}
        />
      )}

      <HeaderMain
        name="search"
        title="Cadastro de Cliente"
        handleSearchKeyUp={handleSearchKeyUp}
        placeholder="Pesquise pelo nome do cliente"
      />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Wrapper>
          <Input name="name" placeholder="Nome" />
          <Input name="phone" placeholder="Telefone" onKeyUp={handleKeyUp} />
          <Input name="city" placeholder="Cidade" />
        </Wrapper>
        <Wrapper>
          <Input name="neighborhood" placeholder="Bairro" />
          <Input name="address" placeholder="Endereço" />
          <Button type="submit">Cadastrar</Button>
        </Wrapper>
      </Form>

      <Table
        nameOne="Nome"
        nameTwo="Telefone"
        nameTree="Cidade"
        nameFour="Bairro"
        nameFive="Endereço"
      >
        {customers.map(customer => (
          <tr key={customer.id}>
            <td>{customer.name}</td>
            <td>{customer.phone}</td>
            <td>{customer.city}</td>
            <td>{customer.neighborhood}</td>
            <td>{customer.address}</td>
            <td>
              <button
                type="button"
                onClick={() => handleEditCustomer(customer)}
              >
                <FiEdit size={20} />
              </button>
              <button
                type="button"
                onClick={() => handleDelete({ id: customer.id })}
              >
                <FiTrash2 size={20} />
              </button>
            </td>
          </tr>
        ))}
      </Table>
    </Container>
  );
};

export default RegisterCustomer;
