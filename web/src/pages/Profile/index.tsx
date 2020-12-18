import React, { ChangeEvent, useCallback, useRef } from 'react';
import {
  FiMail,
  FiLock,
  FiUser,
  FiCamera,
  FiChevronLeft,
  FiCoffee,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import getValidationErrors from 'utils/getValidationErrors';
import { useToast } from 'hooks/toast';
import { useAuth } from 'hooks/auth';

import Input from 'components/Input';
import Button from 'components/Button';

import api from 'services/api';
import { Container, ProfileAvatar, Avatar } from './styles';

interface ProfileFormData {
  name: string;
  occupation: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();
  const { goBack } = useHistory();

  const formRef = useRef<FormHandles>(null);

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        await api.patch('/users/avatar', data).then(response => {
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Avatar atualizado com sucesso.',
          });
        });
      }
    },
    [addToast, updateUser],
  );

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório.'),
          occupation: Yup.string(),
          email: Yup.string()
            .required('E-mail obrigatório.')
            .email('Dígite um e-mail válido.'),

          old_password: Yup.string(),

          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatóriio'),
            otherwise: Yup.string(),
          }),

          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatóriio'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          occupation,
          password,
          old_password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          occupation,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        goBack();

        addToast({
          type: 'success',
          title: 'Perfil atualizado com succeso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização do perfil',
          description:
            'ocorreu um erro ao fazer atualização do perfil, tente novamente.',
        });
      }
    },
    [addToast, goBack, updateUser],
  );

  return (
    <Container>
      <ProfileAvatar>
        <Link to="/dashboard">
          <FiChevronLeft />
        </Link>
        <Avatar>
          <img src={user.avatar} alt={user.name} />
          <label htmlFor="avatar">
            <FiCamera />
            <input type="file" id="avatar" onChange={handleAvatarChange} />
          </label>
        </Avatar>
      </ProfileAvatar>

      <Form initialData={user} ref={formRef} onSubmit={handleSubmit}>
        <h1>Meu perfil</h1>
        <Input name="name" icon={FiUser} placeholder="Nome" />
        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Input
          name="occupation"
          icon={FiCoffee}
          placeholder="Cargo"
          disabled
          style={{ opacity: 0.3 }}
        />
        <Input
          containerStyle={{ marginTop: '20px' }}
          name="old_password"
          icon={FiLock}
          type="password"
          placeholder="Senha atual"
        />

        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Nova senha"
        />

        <Input
          name="password_confirmation"
          icon={FiLock}
          type="password"
          placeholder="Corfirmar senha"
        />

        <Button type="submit">Confirmar mudanças</Button>
      </Form>
    </Container>
  );
};

export default Profile;
