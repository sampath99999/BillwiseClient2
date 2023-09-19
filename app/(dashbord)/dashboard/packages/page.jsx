import Breadcrumb from "@/components/dashboard/breadcrumb";
import { DataTable } from "@/app/(dashbord)/dashboard/packages/data-table";
import { CustomerColumns } from "@/app/(dashbord)/dashboard/packages/columns";

export default function Packages() {
	const breadcrumbLinks = [
		{
			name: "Dashboard",
			link: "/dashboard",
		},
	];
	const data = [
		{
			name: "Gemini TV",
			price: "12.00",
			status: "Active",
			type: "Channel",
		},
		{
			name: "Zee Telugu",
			price: "8.00",
			status: "Inactive",
			type: "Channel",
		},
		{
			name: "SITI Telugu",
			price: "220.00",
			status: "Active",
			type: "Package",
		},
		{
			name: "SITI Basic",
			price: "120.00",
			status: "Active",
			type: "Package",
		},
		{
			name: "SITI Demo",
			price: "0.00",
			status: "Inactive",
			type: "Package",
		},
	];
	return (
		<>
			<Breadcrumb links={breadcrumbLinks} current="Packages" />
			<h3 className="mt-3 font-bold text-lg mb-3">Packages</h3>
			<DataTable columns={CustomerColumns} data={data} />
		</>
	);
}
