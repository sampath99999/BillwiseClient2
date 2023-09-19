"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	CaretDownIcon,
	DesktopIcon,
	FileIcon,
	PersonIcon,
	PlusIcon,
} from "@radix-ui/react-icons";

export function AddDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary">
					<span className="hidden md:block">Add New</span>
					<span className="block md:hidden">
						<PlusIcon />
					</span>
					<CaretDownIcon />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-40">
				<DropdownMenuItem className="gap-3">
					<PersonIcon />
					<span>Customer</span>
				</DropdownMenuItem>
				<DropdownMenuItem className="gap-3">
					<FileIcon />
					<span>Bill</span>
				</DropdownMenuItem>
				<DropdownMenuItem className="gap-3">
					<DesktopIcon />
					<span>Recharge</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
