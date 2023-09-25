"use client";
import { DashboardIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GiVillage } from "react-icons/gi";
import { PiUsersThree } from "react-icons/pi";
import { RiWechatChannelsFill } from "react-icons/ri";

export default function Menu() {
	const activeLink = usePathname();
	const linkStyle =
		"flex items-center gap-2 text-gray-500 cursor-pointer hover:bg-gray-50 p-2 rounded-sm";
	const [menuLinks, setMenuLinks] = useState([]);
	useEffect(() => {
		setMenuLinks([
			{
				name: "Dashboard",
				link: "/dashboard",
				icon: <DashboardIcon />,
			},
			{
				name: "Customers",
				link: "/dashboard/customers",
				icon: <PiUsersThree />,
			},
			{
				name: "Packages",
				link: "/dashboard/packages",
				icon: <RiWechatChannelsFill />,
			},
			{
				name: "Villages & Streets",
				link: "/dashboard/villages",
				icon: <GiVillage />,
			},
		]);
	}, []);
	return (
		<>
			<ul className="mt-3 md:mt-0">
				{menuLinks.map((link, index) => (
					<li className="" key={index}>
						<Link
							href={link.link}
							className={
								linkStyle +
								(activeLink === link.link ? " bg-gray-100" : "")
							}
						>
							{link.icon}
							<span>{link.name}</span>
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}
