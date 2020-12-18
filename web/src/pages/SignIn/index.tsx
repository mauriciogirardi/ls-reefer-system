import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import getValidationErrors from 'utils/getValidationErrors';
import { useAuth } from 'hooks/auth';
import { useToast } from 'hooks/toast';

import Input from 'components/Input';
import Button from 'components/Button';

import logoImg from 'assets/logo.svg';
import { Container, Logo } from './styles';

interface SignInFormData {
  password: string;
  email: string;
}

const SignIn: React.FC = () => {
  const history = useHistory();
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().required('E-mail é obrigatório.').email(),
          password: Yup.string().required('Senha é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'ocorreu um erro ao fazer login, cheque as credenciais.',
        });
      }
    },
    [signIn, history, addToast],
  );

  return (
    <Container>
      <Logo>
        <img src={logoImg} alt="Ls Reefer system" />
        <div />
      </Logo>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Faça seu login</h1>
        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Senha"
        />

        <Button type="submit">Entrar</Button>

        <Link to="/forgot-password">Esqueci minha senha</Link>
      </Form>
    </Container>
  );
};

export default SignIn;
