import Breadcrumb from "@/components/dashboard/breadcrumb";
import { DataTable } from "@/app/(dashbord)/dashboard/packages/data-table";
import { CustomerColumns } from "@/app/(dashbord)/dashboard/packages/columns";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/utils";

export default async function Packages() {
	const breadcrumbLinks = [
		{
			name: "Dashboard",
			link: "/dashboard",
		},
	];
	const data = await prisma.package.findMany();
	return (
		<>
			<Breadcrumb links={breadcrumbLinks} current="Packages" />
			<h3 className="mt-3 font-bold text-lg mb-3">Packages</h3>
			<DataTable data={data} />
		</>
	);
}
