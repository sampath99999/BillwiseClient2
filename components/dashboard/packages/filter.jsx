import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "@radix-ui/react-icons";
import PackageAction from "@/components/dashboard/packages/action";
import PackageFilterPopover from "@/components/dashboard/packages/filterPopover";
import { NewPackageModal } from "@/components/dashboard/packages/newPackage";

export default function PackageFilter({
	table,
	filters,
	packages,
	setPackages,
}) {
	function addFilter(name, value) {
		table.getColumn(name)?.setFilterValue(value);
	}

	function clearFilter() {
		table.resetColumnFilters();
	}

	function searchHandler(event) {
		let key = event.target?.value;
		table.getColumn("name")?.setFilterValue(key);
	}

	return (
		<div
			className={
				"border rounded-md p-2 flex justify-between items-center"
			}
		>
			<div className={"left flex items-center gap-3"}>
				<PackageAction />
				<PackageFilterPopover
					filters={filters}
					addFilter={addFilter}
					clearFilter={clearFilter}
				/>
			</div>
			<div className={"right flex items-center gap-3"}>
				<div className={"relative items-center hidden md:flex"}>
					<Input
						placeholder="Search for Package"
						id={"searchPackage"}
						onChange={searchHandler}
					/>
					<label
						className={
							"absolute right-[10px] border px-2 rounded-md"
						}
						htmlFor={"searchPackage"}
						style={{ userSelect: "none" }}
					>
						↵
					</label>
				</div>
				<NewPackageModal
					setPackages={setPackages}
					packages={packages}
				/>
			</div>
		</div>
	);
}
