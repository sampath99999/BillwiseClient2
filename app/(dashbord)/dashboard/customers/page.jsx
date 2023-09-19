import Breadcrumb from "@/components/dashboard/breadcrumb";
import { CustomerColumns } from "@/app/(dashbord)/dashboard/customers/columns";
import { DataTable } from "@/app/(dashbord)/dashboard/customers/data-table";

export default function Customers() {
	const breadcrumbLinks = [
		{
			name: "Dashboard",
			link: "/dashboard",
		},
	];
	const data = [];

	return (
		<>
			<Breadcrumb links={breadcrumbLinks} current="Customers" />
			<h3 className="mt-3 font-bold text-lg mb-3">Customers</h3>
			<DataTable columns={CustomerColumns} data={data} />
		</>
	);
}
