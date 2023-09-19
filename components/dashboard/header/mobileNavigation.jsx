import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import Menu from "@/components/dashboard/sidebar/menu";
import Search from "@/components/dashboard/header/search";

export default function MobileNavigation() {
	return (
		<>
			<Sheet>
				<SheetTrigger autoFocus={false} className="block md:hidden">
					<DotsVerticalIcon />
				</SheetTrigger>
				<SheetContent side="left">
					<p className="text-gray-500 mb-2">Menu</p>
					<Search mobile={true} />
					<Menu />
				</SheetContent>
			</Sheet>
		</>
	);
}
