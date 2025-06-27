import { redirect } from "next/navigation";
import { getUser } from "../actions";
import { SignUp } from "../components/sign-up";

export default async function SignInPage() {
	const user = await getUser();
	if (user) {
		redirect("/");
	}
	return (
		<div className="flex justify-center items-center h-screen">
			<SignUp />
		</div>
	);
}
