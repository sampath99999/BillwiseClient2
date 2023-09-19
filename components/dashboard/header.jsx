import Search from "@/components/dashboard/header/search";
import Logo from "@/components/dashboard/header/logo";
import { AddDropdown } from "@/components/dashboard/header/addDropdown";
import { BellIcon } from "@radix-ui/react-icons";
import MobileNavigation from "@/components/dashboard/header/mobileNavigation";
import { AccountDropdown } from "@/components/dashboard/header/accountDropdown";

export default function Header() {
	return (
		<>
			<div className="p-2 md:p-2 md:px-5 header border-b">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2 md:gap-10">
						<Logo />
						<Search mobile={false} />
						<MobileNavigation />
					</div>
					<div className="flex items-center gap-3">
						<ul className="list-none flex items-center text-gray-500 text-sm menu gap-3">
							<li>
								<AddDropdown></AddDropdown>
							</li>
							<li>
								<BellIcon />
							</li>
							<li>
								<AccountDropdown />
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
