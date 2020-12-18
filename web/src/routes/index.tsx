import React from 'react';
import { Switch } from 'react-router-dom';

import Dashboard from 'pages/Dashboard';
import CreateAppointment from 'pages/CreateAppointment';
import RegisterProduct from 'pages/RegisterProduct';
import RegisterExpense from 'pages/RegisterExpense';
import RegisterUser from 'pages/RegisterUser';
import Wallet from 'pages/Wallet';
import Profile from 'pages/Profile';
import ForgotPassword from 'pages/ForgotPassword';
import ResetPassword from 'pages/ResetPassword';
import RegisterCustomer from 'pages/RegisterCustomer';

import SignIn from 'pages/SignIn';

import Layout from 'Layout';
import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />

    <Route path="/profile" component={Profile} isPrivate />
    <Layout>
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/appointments" component={CreateAppointment} isPrivate />
      <Route path="/wallet" component={Wallet} isPrivate />

      <Route path="/register-expense" component={RegisterExpense} isPrivate />
      <Route path="/register-products" component={RegisterProduct} isPrivate />
      <Route path="/register-users" component={RegisterUser} isPrivate />
      <Route
        path="/register-customers"
        component={RegisterCustomer}
        isPrivate
      />
    </Layout>
  </Switch>
);

export default Routes;
