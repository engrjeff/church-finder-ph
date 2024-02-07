import { default as db, default as prisma } from '@/prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { loginSchema } from '@/lib/validations/auth';

import {
  generateVerificationToken,
  getVerificationTokenByEmail,
} from './data/tokens';
import { sendVerificationEmail } from './mail';

export const nextAUthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signin',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const validation = loginSchema.safeParse(credentials);

        if (!validation.success) return null;

        const { email, password } = validation.data;

        const foundUser = await prisma.user.findUnique({ where: { email } });

        if (!foundUser) throw new Error('No account found');

        if (!foundUser.emailVerified) {
          const existingVerificationToken = await getVerificationTokenByEmail(
            foundUser.email
          );

          if (existingVerificationToken) {
            if (new Date() > existingVerificationToken.expires) {
              const newToken = await generateVerificationToken(foundUser.email);

              await sendVerificationEmail(
                foundUser.name,
                newToken.email,
                newToken.token
              );

              throw new Error(
                'A confirmation link was sent to your email. Please verify your email first'
              );
            }
          }

          throw new Error('Please verify your email first');
        }

        const passwordsMatch = await bcrypt.compare(
          password,
          foundUser.hashedPassword!
        );

        if (!passwordsMatch) throw new Error('No account found');

        const { name, email: userEmail, id, image, role } = foundUser;

        return {
          name,
          email: userEmail,
          id,
          image,
          role,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await db.user.findUnique({
        where: {
          email: token.email!,
        },
      });

      if (dbUser) {
        token.id = dbUser.id;
        token.role = dbUser.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role;
      }

      return session;
    },
  },
};
