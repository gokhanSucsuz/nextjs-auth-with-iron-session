import { getSession } from "@/actions";
import Link from "next/link";
import React from "react";

async function PremiumPage() {
	const session = await getSession();
	if (!session.isPro) {
		return (
			<div className="notPremium">
				<h1 className="font-bold text-3xl">
					Only premium users can see that content...
				</h1>
				<Link href="/profile">
					Go to the profile page to upgrade to premium user.
				</Link>
			</div>
		);
	}
	return (
		<div className="premium">
			<h1 className="font-bold text-3xl">{session.username} </h1>
			<ul>
				<li> Orange </li>
				<li> Apple </li>
				<li> Watermelon </li>
				<li> Appricot </li>
			</ul>
		</div>
	);
}

export default PremiumPage;
