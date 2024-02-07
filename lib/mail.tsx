import UserVerificationEmail from '@/emails/UserVerificationEmail';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
  name: string,
  email: string,
  token: string
) {
  const confirmationLink = `${process.env.SITE_URL}/verify/${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Confirm your email',
    react: (
      <UserVerificationEmail name={name} confirmationLink={confirmationLink} />
    ),
  });
}
