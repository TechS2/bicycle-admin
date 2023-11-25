import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { env } from "../env.mjs";
import { api } from "@/trpc/server";
import { compare } from "bcrypt";
import { randomUUID } from "crypto";


declare module "next-auth" {
  interface Session extends DefaultSession, User {
    user: {
      id: string
      paypal_token: string
      role: string
    } & DefaultSession["user"];
  }

  interface User {
    paypal_token: string
    role: string;
  }

}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user, token }) {
      const { email, paypal_token, role } = token;
      return {
        ...session,
        user: {
          ...session.user,
          email: email,
          role: role,
          paypal_token: paypal_token,
        },
      };
    },
    jwt({ token, user }) {
      if (user) {
        token.paypal_token = user.paypal_token;
        token.email = user.email;
        token.role = user.role;
        return token;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  secret: "POKOq/ooMmBaUcsKQfOeWkhXzwo5CTQ/vTiCARhS1vQ=",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "Abdul Rehman" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          const userInfo = await api.register.sellerInfo.query({userName: credentials.email,});

          if (!userInfo) {
            console.error("User info not found");
            return null;
          }

          const result: boolean = await compare(credentials.password,userInfo.password);

          if (!result) {
            console.error("Password comparison failed");
            return null;
          }

          const paypal_token = await api.paypal.getAuthToken.query();

          if (!paypal_token) {
            console.error("Failed to get PayPal token");
            return null;
          }

          return {
            id: randomUUID().toString(),
            email: credentials?.email,
            role: "Seller",
            paypal_token: paypal_token,
          };
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
        }
      },
    }),
    // ... (other providers)
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
