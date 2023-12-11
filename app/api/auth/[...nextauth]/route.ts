import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        console.log(credentials);
        const email = credentials?.email;
        const isEmailVerified = true;
        const user = await prisma.user.findUnique({
          where: { email, isEmailVerified },
        });

        if (user) {
          const passwordCorrect = await compare(
            credentials?.password || "",
            user.password,
          );

          console.log("Password correct:", passwordCorrect);

          if (passwordCorrect) {
            return {
              id: user.id,
              email: user.email,
              isEmailVerified: user.isEmailVerified,
            };
          }
        }
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
