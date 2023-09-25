"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

export default function VillageFilters() {
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
					<Button variant={"secondary"} size={"sm"}>
						<PlusIcon />
						<span className="hidden md:inline">New Villages</span>
					</Button>
				</div>
			</div>
		</>
	);
}
