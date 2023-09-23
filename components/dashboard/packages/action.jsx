import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function PackageAction() {
	return (
		<>
			<Select>
				<SelectTrigger className={"md:w-[200px]"}>
					<SelectValue placeholder={"Action"} />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value={"inactive"}>InActive</SelectItem>
					<SelectItem value={"active"}>Active</SelectItem>
					<SelectItem value={"delete"}>Delete</SelectItem>
				</SelectContent>
			</Select>
			<Button size={"sm"}>
				<span className={"hidden md:inline"}>Apply</span>
				<span className={"inline md:hidden"}>
					<CheckIcon />
				</span>
			</Button>
		</>
	);
}
