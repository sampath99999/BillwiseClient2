import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { VerifyToken } from "@/utils/auth";
import prisma from "@/lib/utils";

const validateUser = async function () {
	let session = await getServerSession(AuthOptions);
	if (!session) {
		redirect("/login?error=token_expired");
	}
	let user = await prisma.user.findUnique({
		where: {
			id: session.user.id,
		},
		include: {
			network: true,
		},
	});
	if (!user.status) {
		redirect("/login?error=user_inactive");
	}
	if (!user.network.status) {
		redirect("/login?error=network_inactive");
	}
};

export default async function HomePageLayout({ children }) {
	await validateUser();
	return (
		<>
			<Header />
			<div className="flex h-full">
				<Sidebar />
				<div className="h-full w-full p-2 md:px-5">{children}</div>
			</div>
		</>
	);
}
