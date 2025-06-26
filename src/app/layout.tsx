import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/query-provider";
import { cn } from "@/lib/utils";

const inter = Inter({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Jira Clone",
	description: "Jira Clone",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={cn(`antialiased`, inter.className)}>
				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	);
}
