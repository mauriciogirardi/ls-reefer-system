import React, { useCallback, useRef, useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import getValidationErrors from 'utils/getValidationErrors';
import api from 'services/api';
import { useToast } from 'hooks/toast';

import Input from 'components/Input';
import Button from 'components/Button';

import logoImg from 'assets/logo.svg';
import { Container, Logo } from './styles';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().required('E-mail é obrigatório.').email(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description: `Enviamos um e-mail para ${data.email}, para confirmação de senha, cheque sua caixa de entrada`,
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
          title: 'Erro na recuperação de senha',
          description:
            'ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [history, addToast, setLoading],
  );

  return (
    <Container>
      <Logo>
        <img src={logoImg} alt="Ls Reefer system" />
        <div />
      </Logo>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>
          <FiLock />
          Recupera senha
        </h1>
        <Input name="email" icon={FiMail} placeholder="E-mail" />

        <Button loading={loading} type="submit">
          Enviar
        </Button>

        <Link to="/">Voltar ao login</Link>
      </Form>
    </Container>
  );
};

export default ForgotPassword;
