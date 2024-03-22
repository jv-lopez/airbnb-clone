import bcrypt from 'bcrypt';

import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
// import Facebook from "next-auth/providers/facebook"
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';

import { PrismaAdapter } from '@auth/prisma-adapter';

import type { NextAuthConfig } from 'next-auth';

import prisma from '@/app/libs/prismadb';

export const config = {
  theme: {
    logo: 'https://next-auth.js.org/img/logo/logo-sm.png',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    // Facebook,
    GitHub({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    Credentials({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        const isCorrectPassword = bcrypt.compare(
          credentials.password as string,
          user.hashedPassword,
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        return user;
      },
    }),
  ],
  basePath: '/auth',
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === '/middleware-example') return !!auth;
      return true;
    },
    jwt({ token, trigger, session }) {
      if (trigger === 'update') token.name = session.user.name;
      return token;
    },
  },
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
