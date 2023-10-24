import {
	createVillage,
	deleteVillages,
	getVillages,
	patchVillage,
} from "@/controllers/village.controller";
import prisma from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
	return await getVillages();
}

export async function POST(req) {
	let { name, shortcode } = await req.json();
	return await createVillage(name, shortcode);
}

export async function DELETE(req, res) {
	let { ids } = await req.json();
	return await deleteVillages(ids);
}

// To Updated Only Changed Fields
export async function PATCH(req) {
	let { id, data } = await req.json();
	return await patchVillage(id, data);
}

// To Updated Status bulk
export async function PUT(req) {
	let { ids, status } = await req.json();
	return await patchVillage(id, { status });
}
