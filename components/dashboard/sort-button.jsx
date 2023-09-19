import { BiSortAlt2 } from "react-icons/bi";
import {
	AiOutlineSortAscending,
	AiOutlineSortDescending,
} from "react-icons/ai";
import { Button } from "@/components/ui/button";

export default function SortButton({ name, column }) {
	return (
		<Button
			variant="link"
			size={"sm"}
			className={"ps-0 text-gray-500"}
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
		>
			<span>{name}</span>
			<span className={"text-sm"}>
				{!column.getIsSorted() ? (
					<BiSortAlt2 />
				) : column.getIsSorted() === "asc" ? (
					<AiOutlineSortAscending />
				) : (
					<AiOutlineSortDescending />
				)}
			</span>
		</Button>
	);
}
