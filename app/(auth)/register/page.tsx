import { type Metadata } from 'next';

import RegisterForm from '../_components/RegisterForm';

export const metadata: Metadata = {
  title: 'Create an Account',
};

function RegisterPage() {
  return <RegisterForm />;
}

export default RegisterPage;
