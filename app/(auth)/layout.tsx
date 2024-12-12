import "@/app/globals.css";
import { SessionProvider } from "next-auth/react";
import StoreProvider from "../StoreProvider";
export default function AuthLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html>
			<SessionProvider>
			<body>
				<StoreProvider>
				{children}
				</StoreProvider>
				</body>
			</SessionProvider>
		</html>
	);
}
