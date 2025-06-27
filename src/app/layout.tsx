import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
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
		<html lang="en" suppressHydrationWarning>
			<body className={cn(`antialiased min-h-screen`, inter.className)}>
				<QueryProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						forcedTheme="dark"
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
				</QueryProvider>
				<Toaster />
			</body>
		</html>
	);
}
