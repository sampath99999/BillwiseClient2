import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { VerifyToken } from "@/utils/auth";

export default async function HomePageLayout({ children }) {
	let session = await getServerSession(AuthOptions);
	if (!session) {
		redirect("/login");
	}

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
