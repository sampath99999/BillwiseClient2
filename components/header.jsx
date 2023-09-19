import Link from "next/link";
import { BsPerson } from "react-icons/bs";

export default function Header() {
	let logoWidth = "25px";
	let menuLinks = [
		{
			name: "Home",
			link: "/",
		},
		{
			name: "About Us",
			link: "/about-us",
		},
	];
	return (
		<>
			<div className="p-4 header">
				<div className="flex items-center justify-between w-full sm:w-[90%] md:w-[80%] lg:w-[70%] m-auto">
					<div className="flex items-center">
						<img src="/logo.png" alt="" className="w-[40px]" />
						<h1 className="font-semibold">Network</h1>
					</div>
					<div className="flex items-center gap-3">
						<ul className="list-none flex items-center text-gray-500 text-sm menu gap-3">
							{menuLinks.map((link) => (
								<li>
									<Link
										href={link.link}
										className="hover:text-black"
									>
										{link.name}
									</Link>
								</li>
							))}
							<li>
								<Link href="/login">
									<button className="p-2 rounded-full hover:bg-gray-200 ">
										<BsPerson />
									</button>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
