import Breadcrumb from "@/components/dashboard/breadcrumb";
import VillageFilters from "@/components/dashboard/villages/filter";
import { VillageDataTable } from "./data-table";
import prisma from "@/lib/utils";

export default async function Villages() {
	const breadcrumbLinks = [
		{
			name: "Dashboard",
			link: "/dashboard",
		},
	];

	const villages = await prisma.village.findMany();
	return (
		<>
			<Breadcrumb links={breadcrumbLinks} current="Villages" />
			<h3 className="mt-3 font-bold text-lg mb-3">Villages</h3>
			<VillageFilters />
			<VillageDataTable data={villages} />
		</>
	);
}
