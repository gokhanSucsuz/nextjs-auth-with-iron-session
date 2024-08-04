"use server";
import { sessionOptions, SessionData, defaultSession } from "@/lib";
import { getIronSession } from "iron-session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

let username = "gokhan";
let isPro = true;
let isBlocked = false;

export const getSession = async () => {
	const session = await getIronSession<SessionData>(cookies(), sessionOptions);

	if (!session.isLoggedIn) {
		session.isLoggedIn = defaultSession.isLoggedIn;
	}
	return session;
};
export const login = async (
	prevState: { error: undefined | string },
	formData: FormData
) => {
	const session = await getSession();

	const formUsername = formData.get("username") as string;
	const formPassword = formData.get("password") as string;

	// check user in the db
	//const user = await db.getUser(username,password)
	session.isBlocked = isBlocked;
	session.isPro = isPro;

	if (username !== formUsername) {
		return { error: "Wrong credentials!" };
	}
	session.userId = "1";
	session.username = formUsername;
	session.isPro = isPro;
	session.isLoggedIn = true;
	await session.save();
	redirect("/");
};
export const logout = async () => {
	const session = await getSession();
	session.destroy();
	redirect("/");
};

export const changePremium = async () => {
	const session = await getSession();

	isPro = !session.isPro;
	session.isPro = isPro;
	await session.save();
	revalidatePath("/profile");
};

export const updateUser = async (formData: FormData) => {
	const session = await getSession();
	const newUser = formData.get("username") as string;

	username = newUser;
	session.username = username;

	await session.save();
	revalidatePath("/profile");
};
