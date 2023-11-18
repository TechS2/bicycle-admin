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

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession, User {
    user: {
      id: string
      paypal_token: string
      role: string
    } & DefaultSession["user"];
  }


  interface User {
    // ...other properties
    paypal_token: string
    role: string;
  }

}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user, token }) {

      const { email, sub, paypal_token, role, iat, exp, jti } = token
      return {
        ...session,
        user: {
          ...session.user,
          email: email,
          role: role,
          paypal_token: paypal_token
        }
      }
    },
    jwt({ token, user }) {
      if (user) {
        token.paypal_token = user.paypal_token
        token.email = user.email
        token.role = user.role
        return token
      }
      return token
    },
  },

  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/'
  },
  secret: "POKOq/ooMmBaUcsKQfOeWkhXzwo5CTQ/vTiCARhS1vQ=",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userName: { label: "UserName", type: "text", placeholder: "Abdul Rehman" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {

        if (!credentials?.userName || !credentials?.password)
          return null
        
        const userInfo = null
        //await api.seller.sellerInfo.query({ userName: credentials.userName })

        if (!userInfo)
          return null
        
          //userInfo.password
        const result: boolean = await compare(credentials.password, "")

        if (!result)
          return null
        
        const paypal_token = null
        //await api.paypal.getAuthToken.query()

        if (!paypal_token)
          return null
        
        return {
          id: randomUUID().toString(),
          email: credentials?.userName,
          role: "Seller",
          paypal_token: paypal_token
        }
      }
    })
    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
    // }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};


/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
