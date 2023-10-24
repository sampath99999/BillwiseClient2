import Breadcrumb from "@/components/dashboard/breadcrumb";
import prisma from "@/lib/utils";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { DataTable } from "./data-table";

export default async function Customers() {
	const breadcrumbLinks = [
		{
			name: "Dashboard",
			link: "/dashboard",
		},
	];
	let session = await getServerSession(AuthOptions);
	const data = await prisma.customer.findMany({
		where: {
			network_id: await session.user.network_id,
		},
		include: {
			street: true,
			village: true,
		},
	});
	return (
		<>
			<Breadcrumb links={breadcrumbLinks} current="Customers" />
			<h3 className="mt-3 font-bold text-lg mb-3">Customers</h3>
			<DataTable data={data} />
		</>
	);
}
