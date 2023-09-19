import Menu from "@/components/dashboard/sidebar/menu";
import Search from "@/components/dashboard/header/search";

export default function Sidebar() {
	return (
		<>
			<div className="w-[250px] ms-[-250px] md:ms-0 transition-all border-r">
				<Search mobile="true" />
				<Menu />
			</div>
		</>
	);
}
