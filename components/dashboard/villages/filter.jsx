"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { NewVillageModal } from "./newVillage";

export default function VillageFilters({ villages, setVillages }) {
	return (
		<>
			<div
				className={
					"border rounded-md p-2 flex justify-between items-center"
				}
			>
				<div className={"left flex items-center gap-3"}>
					<div className={"relative items-center hidden md:flex"}>
						<Input
							placeholder="Search for Village"
							id={"searchVillage"}
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
