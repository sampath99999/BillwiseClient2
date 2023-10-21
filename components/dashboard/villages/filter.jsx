"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { NewVillageModal } from "./newVillage";
import { AiOutlineDelete } from "react-icons/ai";

export default function VillageFilters({ villages, setVillages, table }) {
	function searchHandler(event) {
		let key = event.target?.value;
		table.getColumn("name")?.setFilterValue(key);
	}

	return (
		<>
			<div
				className={
					"border rounded-md p-2 flex justify-between items-center"
				}
			>
				<div className={"left flex items-center gap-3"}>
					<div className={"relative items-center flex"}>
						<Input
							placeholder="Search for Village"
							id={"searchVillage"}
							onChange={searchHandler}
						/>
						<label
							className={
								"absolute right-[10px] border px-2 rounded-md"
							}
							htmlFor={"searchVillage"}
							style={{ userSelect: "none" }}
						>
							↵
						</label>
					</div>
					{table.getSelectedRowModel()?.rows?.length > 0 && (
						<Button variant="outline>
							<span className="hidden md:inline">Delete</span>
							<span className="md:hidden">
								<AiOutlineDelete />
							</span>
						</Button>
					)}
				</div>
				<div className={"right flex items-center gap-3"}>
					<NewVillageModal
						villages={villages}
						setVillages={setVillages}
					/>
				</div>
			</div>
		</>
	);
}
