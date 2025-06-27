"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getUser } from "./(auth)/actions";
import { useLogout } from "./(auth)/auth/api/use-logout";
import { useUser } from "./(auth)/auth/api/use-user";

export default function Home() {
	const { data, isLoading } = useUser();
	const { mutate } = useLogout();

	useEffect(() => {
		if (!data && !isLoading) {
			redirect("/sign-in");
		}
	}, [data, isLoading]);

	return (
		<div className="grid items-center w-fit gap-4 p-8 whitespace-pre-wrap">
			<Button
				onClick={() => {
					mutate();
				}}
			>
				Logout
			</Button>
			{JSON.stringify(data, null, 2)}
		</div>
	);
}
