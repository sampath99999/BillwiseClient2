import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { BsFilter } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { IoCloseOutline } from "react-icons/io5";

export default function PackageFilterPopover({
	filters,
	addFilter,
	clearFilter,
}) {
	return (
		<>
			<div
				className={
					"flex items-center gap-2 " +
					(filters.length === 0 ? "hidden" : " ")
				}
			>
				{filters.map((filter, index) => (
					<Button
						variant={"outline"}
						size={"sm"}
						className={"capitalize flex gap-2 text-xs"}
						onClick={() => addFilter(filter.id, "")}
						key={index}
					>
						<span>{filter.value}</span>
						<IoCloseOutline />
					</Button>
				))}
				<Button onClick={() => clearFilter()} variant={"outline"}>
					Clear All
				</Button>
			</div>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant={"outline"} className={"gap-2"} size={"sm"}>
						<span className="hidden md:inline whitespace-nowrap">
							More Filters
						</span>
						<BsFilter />
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					<div className={"flex flex-col gap-2"}>
						<Select
							onValueChange={(value) =>
								addFilter("status", value)
							}
						>
							<SelectTrigger>
								<SelectValue placeholder="Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="Inactive">
									Inactive
								</SelectItem>
								<SelectItem value="Active">Active</SelectItem>
							</SelectContent>
						</Select>
						<Select
							onValueChange={(value) => addFilter("type", value)}
						>
							<SelectTrigger>
								<SelectValue placeholder="Type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="channel">Channel</SelectItem>
								<SelectItem value="package">Package</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</PopoverContent>
			</Popover>
		</>
	);
}
