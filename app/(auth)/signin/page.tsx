import { type Metadata } from 'next';

import SignInForm from '../_components/SignInForm';

export const metadata: Metadata = {
  title: 'Log In',
};

function SignInPage() {
  return <SignInForm />;
}

export default SignInPage;
