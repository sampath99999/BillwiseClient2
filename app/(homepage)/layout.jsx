import Header from "@/components/header";

export default function HomePageLayout({ children }) {
	return (
		<>
			<Header />
			{children}
		</>
	);
}
