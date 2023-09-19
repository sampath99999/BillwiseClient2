export async function VerifyToken(token) {
	const res = await fetch(process.env.SERVER_URL + "/users/verify", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	});

	const data = await res.json();
	if (res.ok && data) {
		return data;
	}
	throw new Error(data.message);
}
