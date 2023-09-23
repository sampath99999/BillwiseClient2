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
				if (!user.status) {
					throw new Error("Your account is not activated");
				}
				let network = await prisma.network.findUnique({
					where: {
						id: user.network_id,
					},
				});
				if (network) {
					if (!network.status) {
						throw new Error("Network is not active");
					}
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
	callbacks: {
		jwt: ({ token, account, user }) => {
			if (account) {
				token.accessToken = account.access_token;
				token.id = user?.id;
				token.network_id = user?.network_id;
			}
			return token;
		},
		session: ({ session, token }) => {
			session.user.id = token.id;
			session.user.network_id = token.network_id;
			return session;
		},
	},
};
const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
