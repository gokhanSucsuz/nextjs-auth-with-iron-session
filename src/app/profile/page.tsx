import { changePremium, getSession, updateUser } from "@/actions";
import { redirect } from "next/navigation";
import React from "react";

const ProfilePage = async () => {
	const session = await getSession();

	if (!session.isLoggedIn) {
		redirect("/login");
	}
	return (
		<div className="profile">
			<h1 className="font-bold text-3xl">Welcome to the Profile Page</h1>
			<p>
				Welcome, <b>{session.username}</b>
			</p>
			<span>
				You are a <b>{session.isPro ? "Premium" : "Free"} User.</b>
			</span>
			<form action={changePremium}>
				<button>
					{session.isPro ? "Cancel" : "Buy"} a Premium membership.
				</button>
			</form>
			<form action={updateUser}>
				<input
					type="text"
					name="username"
					required
					placeholder={session.username}
				/>
				<button>Update</button>
			</form>
		</div>
	);
};

export default ProfilePage;
