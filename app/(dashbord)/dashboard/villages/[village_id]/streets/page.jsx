import Breadcrumb from "@/components/dashboard/breadcrumb";
import { StreetDataTable } from "./data-table";

export default async function Page({ params }) {
	const breadcrumbLinks = [
		{
			name: "Dashboard",
			link: "/dashboard",
		},
		{
			name: "Villages",
			link: "/dashboard/villages",
		},
	];

	const streets = await prisma.street.findMany({
		where: {
			village_id: parseInt(params.village_id),
		},
	});
	return (
		<>
			<Breadcrumb links={breadcrumbLinks} current="Streets" />
			<h3 className="mt-3 font-bold text-lg mb-3">Streets</h3>
			<StreetDataTable
				data={streets}
				village_id={parseInt(params.village_id)}
			></StreetDataTable>
		</>
	);
}
