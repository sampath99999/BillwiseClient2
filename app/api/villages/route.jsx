import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/utils";
import {
	createVillage,
	deleteVillages,
	patchVillage,
} from "@/controllers/village.controller";

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
