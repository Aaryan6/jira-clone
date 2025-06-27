import { redirect } from "next/navigation";
import { getUser } from "../actions";
import { SignIn } from "../components/sign-in";

export default async function SignInPage() {
	const user = await getUser();
	if (user) {
		redirect("/");
	}
	return (
		<div className="flex justify-center items-center h-screen">
			<SignIn />
		</div>
	);
}
