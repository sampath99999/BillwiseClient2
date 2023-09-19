import { Input } from "@/components/ui/input";
import { BiSearch } from "react-icons/bi";
import { GiSettingsKnobs } from "react-icons/gi";

export default function Search(props) {
	const mobile = props.mobile;
	return (
		<>
			<div
				className={
					"search items-center relative " +
					(mobile ? "flex md:hidden" : "hidden md:flex")
				}
			>
				<BiSearch className="absolute ms-[7px] text-gray-300" />
				<Input placeholder="Search..." type="text" className="px-7" />
				<GiSettingsKnobs className="absolute right-[10px] text-gray-300" />
			</div>
		</>
	);
}
