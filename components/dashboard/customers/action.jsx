import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function CustomerAction() {
	return (
		<>
			<Select>
				<SelectTrigger className={"md:w-[200px]"}>
					<SelectValue placeholder={"Action"} />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value={"instant-recharge"}>
						Instant Recharge
					</SelectItem>
					<SelectItem value={"recharge"}>Recharge</SelectItem>
					<SelectItem value={"hold"}>Hold</SelectItem>
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
