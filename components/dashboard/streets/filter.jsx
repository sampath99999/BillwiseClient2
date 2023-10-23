"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { NewStreetModal, NewVillageModal } from "./newStreet";
import { AiOutlineDelete } from "react-icons/ai";

export default function StreetFilters({
	streets,
	setStreets,
	table,
	village_id,
}) {
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
							placeholder="Search for Street"
							id={"searchStreet"}
							onChange={searchHandler}
						/>
						<label
							className={
								"absolute right-[10px] border px-2 rounded-md"
							}
							htmlFor={"searchStreet"}
							style={{ userSelect: "none" }}
						>
							↵
						</label>
					</div>
				</div>
				<div className={"right flex items-center gap-3"}>
					<NewStreetModal
						streets={streets}
						setStreets={setStreets}
						village_id={village_id}
					/>
				</div>
			</div>
		</>
	);
}
