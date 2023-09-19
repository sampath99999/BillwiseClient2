import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const AuthOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			name: "Username & Password",
			credentials: {},
			async authorize(credentials, req) {
				credentials = {
					username: credentials.username,
					password: credentials.password,
				};
				const res = await fetch(
					process.env.SERVER_URL + "/users/login",
					{
						method: "POST",
						body: JSON.stringify(credentials),
						headers: { "Content-Type": "application/json" },
					}
				);
				const user = await res.json();
				if (res.ok && user) {
					return user;
				}
				throw new Error(user.message);
			},
		}),
	],
	pages: {
		signIn: "/login",
	},
};
const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
