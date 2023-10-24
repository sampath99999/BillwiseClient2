import {
	createStreet,
	deleteStreet,
	patchStreet,
} from "@/controllers/street.controller";
import prisma from "@/lib/utils";

export async function POST(req) {
	let { name, village_id } = await req.json();
	return await createStreet(name, village_id);
}

export async function DELETE(req) {
	let { ids } = await req.json();
	return await deleteStreet(ids);
}

export async function PATCH(req) {
	let { id, data } = await req.json();
	return await patchStreet(id, data);
}
