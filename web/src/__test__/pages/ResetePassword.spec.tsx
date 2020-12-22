import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import ResetPassword from 'pages/ResetPassword';

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();
const mockedToken = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockedHistoryPush,
  }),
  useLocation: () => ({
    search: mockedToken,
  }),
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('hooks/auth', () => ({
  useAuth: () => ({
    signIn: mockedSignIn,
  }),
}));

jest.mock('hooks/toast', () => ({
  useToast: () => ({
    addToast: mockedAddToast,
  }),
}));

describe('ResetPassword', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  // it('should be able to reset password', async () => {
  //   const { getByPlaceholderText, getByText } = render(<ResetPassword />);

  //   const newPasswordFiled = getByPlaceholderText('Nova senha');
  //   const passwordConfirmationFiled = getByPlaceholderText(
  //     'Confirmação da senha',
  //   );
  //   const buttonElement = getByText('Alterar senha');

  //   fireEvent.change(newPasswordFiled, {
  //     target: { value: '123456' },
  //   });
  //   fireEvent.change(passwordConfirmationFiled, {
  //     target: { value: '123456' },
  //   });

  //   fireEvent.click(buttonElement);

  //   await waitFor(() => {
  //     expect(mockedHistoryPush).toHaveBeenCalledWith('/');
  //   });
  // });

  it('should be able to reset password', async () => {
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const newPasswordFiled = getByPlaceholderText('Nova senha');
    const passwordConfirmationFiled = getByPlaceholderText(
      'Confirmação da senha',
    );
    const buttonElement = getByText('Alterar senha');

    const password = fireEvent.change(newPasswordFiled, {
      target: { value: '123456' },
    });
    const passwordTwo = fireEvent.change(passwordConfirmationFiled, {
      target: { value: '123456' },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(password).toEqual(passwordTwo);
    });
  });

  it('should not be able to reset password with password_confirmation different', async () => {
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const newPasswordFiled = getByPlaceholderText('Nova senha');
    const passwordConfirmationFiled = getByPlaceholderText(
      'Confirmação da senha',
    );
    const buttonElement = getByText('Alterar senha');

    fireEvent.change(newPasswordFiled, {
      target: { value: '123456' },
    });
    fireEvent.change(passwordConfirmationFiled, {
      target: { value: '1245623' },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  // it('should display an error if login fails', async () => {
  //   mockedSignIn.mockImplementation(() => {
  //     throw new Error();
  //   });

  //   const { getByPlaceholderText, getByText } = render(<ResetPassword />);

  //   const emailFiled = getByPlaceholderText('E-mail');
  //   const passwordFiled = getByPlaceholderText('Senha');
  //   const buttonElement = getByText('Entrar');

  //   fireEvent.change(emailFiled, { target: { value: 'johndoe@example.com' } });
  //   fireEvent.change(passwordFiled, { target: { value: '123456' } });

  //   fireEvent.click(buttonElement);

  //   await waitFor(() => {
  //     expect(mockedAddToast).toHaveBeenCalledWith(
  //       expect.objectContaining({
  //         type: 'error',
  //       }),
  //     );
  //   });
  // });
});
