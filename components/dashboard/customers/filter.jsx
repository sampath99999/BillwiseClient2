import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "@radix-ui/react-icons";
import CustomerAction from "@/components/dashboard/customers/action";
import CustomerFilterPopover from "@/components/dashboard/customers/filterPopover";

export default function CustomerFilter({ table, filters }) {
	function addFilter(name, value) {
		table.getColumn(name)?.setFilterValue(value);
	}

	function clearFilter() {
		table.resetColumnFilters();
	}

	return (
		<div
			className={
				"border rounded-md p-2 flex justify-between items-center"
			}
		>
			<div className={"left flex items-center gap-3"}>
				<CustomerAction />
				<CustomerFilterPopover
					filters={filters}
					addFilter={addFilter}
					clearFilter={clearFilter}
				/>
			</div>
			<div className={"right flex items-center gap-3"}>
				<div className={"relative items-center hidden md:flex"}>
					<Input
						placeholder="Search for Customer"
						id={"searchCustomer"}
					/>
					<label
						className={
							"absolute right-[10px] border px-2 rounded-md"
						}
						htmlFor={"searchCustomer"}
						style={{ userSelect: "none" }}
					>
						↵
					</label>
				</div>
				<Button variant={"secondary"} size={"sm"}>
					<PlusIcon />
					<span className="hidden md:inline">New Customer</span>
				</Button>
			</div>
		</div>
	);
}
