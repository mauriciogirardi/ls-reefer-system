import React, { useCallback, useRef, useState } from 'react';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';

import getValidationErrors from 'utils/getValidationErrors';
import api from 'services/api';
import { useToast } from 'hooks/toast';

import Input from 'components/Input';
import Button from 'components/Button';

import logoImg from 'assets/logo.svg';
import { Container, Logo } from './styles';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const location = useLocation();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string()
            .required('Senha obrigatório.')
            .min(6, 'A senha deve ter no minímo 6 digítos.'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'Confirmação incorreta',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        addToast({
          type: 'success',
          title: 'Senha atualizada com succeso.',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'ocorreu um erro ao resetar a senha, tente novamente.',
        });
      }
    },
    [history, addToast, location.search],
  );

  return (
    <Container>
      <Logo>
        <img src={logoImg} alt="Ls Reefer system" />
        <div />
      </Logo>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Resetar senha</h1>
        <Input
          name="password"
          icon={FiLock}
          placeholder="Nova senha"
          type="password"
        />
        <Input
          name="password_confirmation"
          icon={FiLock}
          placeholder="Confirmação da senha"
          type="password"
        />

        <Button type="submit">Alterar senha</Button>
      </Form>
    </Container>
  );
};

export default ResetPassword;
