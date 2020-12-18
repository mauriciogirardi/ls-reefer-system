import React, { useCallback, useEffect, useRef, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiTrash2, FiEdit } from 'react-icons/fi';

import getValidationErrors from 'utils/getValidationErrors';
import api from 'services/api';
import { useToast } from 'hooks/toast';

import Input from 'components/Input';
import Button from 'components/Button';
import ModalEditExpense from 'components/Modals/ModalEditExpense';
import ModalDelete from 'components/Modals/ModalDelete';
import HeaderMain from 'components/HeaderMain';
import Table from 'components/Table';

import formatCurrency from 'utils/formatCurrency';
import { Container } from './styles';

interface ExpenseDataForm {
  id: string;
  name: string;
  priceFormatted: string;
  dateFormatted: string;
  price: number;
  date: string;
}

interface Delete {
  id: string;
}

const RegisterExpense: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<Delete>({} as Delete);

  const [expenses, setExpenses] = useState<ExpenseDataForm[]>([]);
  const [searchField, setSearchField] = useState<string>();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<ExpenseDataForm>(
    {} as ExpenseDataForm,
  );

  useEffect(() => {
    async function handleExpense() {
      const response = await api.get<ExpenseDataForm[]>('/expenses');

      const expensesFormatted = response.data.map(expense => ({
        ...expense,
        priceFormatted: formatCurrency(Number(expense.price)),
        dateFormatted: format(parseISO(expense.date), 'dd/MM/yyyy'),
      }));

      if (!searchField) {
        setExpenses(expensesFormatted);
      }
    }

    handleExpense();
  }, [setExpenses, searchField]);

  const handleSubmit = useCallback(
    async (data: ExpenseDataForm): Promise<void> => {
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

        const response = await api.post<ExpenseDataForm>('/expenses', data);

        setExpenses([
          {
            ...response.data,
            priceFormatted: formatCurrency(Number(response.data.price)),
            dateFormatted: format(parseISO(response.data.date), 'dd/MM/yyyy'),
          },
          ...expenses,
        ]);

        addToast({
          type: 'success',
          title: 'Gasto cadastrado com sucesso.',
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
          title: 'Erro ao cadastro gasto.',
          description: 'Erro no cadastro de gasto, tente novamente.',
        });
      }
    },
    [addToast, expenses],
  );

  const toggleDeleteModal = useCallback((): void => {
    setDeleteModalOpen(prevState => !prevState);
  }, []);

  const handleDeleteExpense = useCallback(async (): Promise<void> => {
    try {
      await api.delete(`/expenses/${deleteData.id}`);

      const findDeleteExpense = expenses.filter(
        expense => expense.id !== deleteData.id,
      );

      setExpenses(findDeleteExpense);

      toggleDeleteModal();
      addToast({
        type: 'info',
        title: 'Gasto excluido com sucesso.',
      });
    } catch {
      addToast({
        type: 'error',
        title: 'Erro ao Excluir',
        description: 'Erro ao Excluir o gasto, tente novamente.',
      });
    }
  }, [addToast, expenses, toggleDeleteModal, deleteData.id]);

  const handleDelete = useCallback(
    (id: Delete): void => {
      setDeleteData(id);

      toggleDeleteModal();
    },
    [toggleDeleteModal],
  );

  const handleUpdateExpense = useCallback(
    async (
      expense: Omit<ExpenseDataForm, 'id' | 'priceFormatted' | 'dateFormatted'>,
    ) => {
      try {
        const response = await api.put(`/expenses/${editingExpense.id}`, {
          ...expense,
        });

        setExpenses(
          expenses.map(mappedExpense =>
            mappedExpense.id === editingExpense.id
              ? {
                  ...response.data,
                  dateFormatted: format(parseISO(expense.date), 'dd/MM/yyyy'),
                  priceFormatted: formatCurrency(Number(expense.price)),
                }
              : mappedExpense,
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
    [addToast, expenses, editingExpense],
  );

  const toggleEditModal = useCallback((): void => {
    setEditModalOpen(prevState => !prevState);
  }, []);

  const handleEditProduct = useCallback(
    (expense: ExpenseDataForm): void => {
      setEditingExpense(expense);
      toggleEditModal();
    },
    [toggleEditModal],
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
        const response = await api.get(`/expenses/${searchField}`);

        if (searchField) {
          setExpenses(response.data);
        }
      } catch {
        addToast({
          type: 'error',
          title: 'Erro ao pesquisar gasto.',
          description: 'Erro na pesquisa por gasto, tente novamente.',
        });
      }
    }

    handleSearch();
  }, [addToast, searchField]);

  return (
    <Container>
      {editModalOpen && (
        <ModalEditExpense
          setIsOpen={toggleEditModal}
          editingExpense={editingExpense}
          handleUpdateExpense={handleUpdateExpense}
        />
      )}

      {deleteModalOpen && (
        <ModalDelete
          setIsOpen={toggleDeleteModal}
          handleDelete={handleDeleteExpense}
        />
      )}

      <HeaderMain
        name="search"
        title="Cadastro de Gastos"
        handleSearchKeyUp={handleSearchKeyUp}
        placeholder="Pesquise pelo nome do gasto"
      />

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome" />

        <Input
          name="price"
          placeholder="R$ value"
          containerStyle={{ maxWidth: '160px' }}
        />
        <Input
          name="date"
          type="date"
          placeholder="Data"
          defaultValue={format(new Date(), 'yyyy-MM-dd')}
          containerStyle={{ maxWidth: '210px' }}
        />

        <Button type="submit">Cadastrar</Button>
      </Form>

      <Table nameOne="Gasto" nameTwo="Valor" nameTree="Data">
        {expenses.map(expense => (
          <tr key={expense.id}>
            <td>{expense.name}</td>
            <td>{expense.priceFormatted}</td>
            <td>{expense.dateFormatted}</td>
            <td>
              <button type="button" onClick={() => handleEditProduct(expense)}>
                <FiEdit size={20} />
              </button>
              <button
                type="button"
                onClick={() => handleDelete({ id: expense.id })}
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

export default RegisterExpense;
