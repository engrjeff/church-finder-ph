import { default as db, default as prisma } from '@/prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcrypt';
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { loginSchema } from '@/lib/validations/auth';

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

        if (!foundUser) return null;

        const passwordsMatch = await bcrypt.compare(
          password,
          foundUser.hashedPassword!
        );

        if (!passwordsMatch) return null;

        const { name, email: userEmail, id, image } = foundUser;

        return {
          name,
          email: userEmail,
          id,
          image,
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
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (dbUser) {
        token.id = dbUser.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
  },
};
