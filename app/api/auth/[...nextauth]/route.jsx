// import prisma from "@/lib/utils";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt";

export const AuthOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "Username & Password",
			credentials: {},
			async authorize(credentials, req) {
				let prisma = new PrismaClient();
				let user = await prisma.user.findUnique({
					where: {
						username: credentials.username,
					},
				});
				if (!user) {
					throw new Error("Invalid username or password");
				}
				if (compareSync(credentials.password, user.password)) {
					return user;
				}
				throw new Error("Invalid username or password");
			},
		}),
	],
	pages: {
		signIn: "/login",
	},
};
const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
