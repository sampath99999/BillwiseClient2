import { SlashIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Breadcrumb(props) {
	const links = props.links;
	const current = props.current;
	return (
		<div className={"flex items-center text-sm"}>
			{props.links.map((link, index) => (
				<div
					className={
						"flex items-center text-gray-400 hover:text-gray-700"
					}
					key={index}
				>
					<Link href={link.link}>{link.name}</Link>
					<SlashIcon />
				</div>
			))}
			<div className={"text-gray-700"}>{current}</div>
		</div>
	);
}
