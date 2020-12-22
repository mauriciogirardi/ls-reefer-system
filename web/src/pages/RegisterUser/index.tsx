import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from 'utils/getValidationErrors';
import api from 'services/api';
import { useToast } from 'hooks/toast';

import Input from 'components/Input';
import Button from 'components/Button';
import Table from 'components/Table';
import ModalDelete from 'components/Modals/ModalDelete';
import { FiTrash2 } from 'react-icons/fi';
import { Container, Avatar } from './styles';

interface UserDataForm {
  id: string;
  name: string;
  email: string;
  avatar: string;
  password: string;
  occupation: string;
}

interface Delete {
  id: string;
}

const RegisterUser: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [users, setUsers] = useState<UserDataForm[]>([]);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<Delete>({} as Delete);

  const { addToast } = useToast();

  useEffect(() => {
    async function handleUser() {
      const response = await api.get('/users');
      setUsers(response.data);
    }

    handleUser();
  }, []);

  const handleSubmit = useCallback(
    async (data: UserDataForm) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string().email().required('E-mail obrigatório'),
          password: Yup.string().min(6, 'No mínimo 6  dígito'),
          occupation: Yup.string().required('Cargo obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, occupation, password, email } = data;

        const response = await api.post('/users', {
          name,
          occupation,
          password,
          email,
        });

        setUsers([response.data, ...users]);

        addToast({
          type: 'success',
          title: 'Usuário cadastrado com sucesso.',
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
          title: 'Erro ao cadastrar um usuário.',
          description: 'Erro no cadastro de usuário, tente novamente.',
        });
      }
    },
    [addToast, users],
  );

  const toggleDeleteModal = useCallback((): void => {
    setDeleteModalOpen(prevState => !prevState);
  }, []);

  const handleDeleteUser = useCallback(async (): Promise<void> => {
    try {
      await api.delete(`/users/${deleteData.id}`);

      const findUser = users.filter(user => user.id !== deleteData.id);

      setUsers(findUser);

      toggleDeleteModal();

      addToast({
        type: 'info',
        title: 'Usuário excluido com sucesso.',
      });
    } catch {
      addToast({
        type: 'error',
        title: 'Erro ao Excluir',
        description: 'Erro ao Excluir o usuário, tente novamente.',
      });
    }
  }, [addToast, users, deleteData.id, toggleDeleteModal]);

  const handleDelete = useCallback(
    (id: Delete): void => {
      setDeleteData(id);

      toggleDeleteModal();
    },
    [toggleDeleteModal],
  );

  return (
    <Container>
      {deleteModalOpen && (
        <ModalDelete
          setIsOpen={toggleDeleteModal}
          handleDelete={handleDeleteUser}
        />
      )}

      <h1>Cadastro de Usuário</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="name"
          placeholder="Nome"
          containerStyle={{ maxWidth: '250px' }}
        />
        <Input
          name="email"
          placeholder="E-mail"
          containerStyle={{ maxWidth: '250px' }}
        />
        <Input
          name="password"
          placeholder="Senha"
          containerStyle={{ maxWidth: '120px' }}
        />
        <Input
          name="occupation"
          placeholder="Cargo"
          containerStyle={{ maxWidth: '160px' }}
        />

        <Button type="submit">Cadastrar</Button>
      </Form>

      <Table
        nameOne="Avatar"
        nameTwo="Nome"
        nameTree="Email"
        nameFour="Ocupação"
      >
        {users.map(user => (
          <tr key={user.id}>
            <td>
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <Avatar />
              )}
            </td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.occupation}</td>
            <td>
              <button
                type="button"
                onClick={() => handleDelete({ id: user.id })}
              >
                <FiTrash2 size={20} color="#b4b4b4" />
              </button>
            </td>
          </tr>
        ))}
      </Table>
    </Container>
  );
};

export default RegisterUser;
