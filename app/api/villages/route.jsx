import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/utils";
import {
	createVillage,
	deleteVillages,
} from "@/controllers/village.controller";

export async function POST(req) {
	let { name, shortcode } = await req.json();
	return await createVillage(name, shortcode);
}

export async function DELETE(req, res) {
	let { ids } = await req.json();
	return deleteVillages(ids);
}

export async function PATCH(req) {
	let { id, data } = await req.json();
	try {
		if (data.price) data.price = parseInt(data.price);
		let updatePackage = await prisma.package.update({
			where: {
				id: id,
			},
			data,
		});
		if (updatePackage) {
			return NextResponse.json(updatePackage);
		} else {
			return NextResponse.json(
				{
					success: false,
					message: "Something went wrong",
				},
				{ status: 500 }
			);
		}
	} catch (e) {
		console.log(e);
		// TODO error handling
		return NextResponse.json(
			{
				success: false,
				message: "Something went wrong",
			},
			{ status: 500 }
		);
	}
}

export async function PUT(req) {
	let { ids, status } = await req.json();
	try {
		let updatePackages = await prisma.package.updateMany({
			where: {
				id: {
					in: ids,
				},
			},
			data: {
				status,
			},
		});
		if (updatePackages) {
			return NextResponse.json(updatePackages);
		} else {
			return NextResponse.json(
				{
					success: false,
					message: "Something went wrong",
				},
				{ status: 500 }
			);
		}
	} catch (e) {
		console.log(e);
		// TODO error handling
		return NextResponse.json(
			{
				success: false,
				message: "Something went wrong",
			},
			{ status: 500 }
		);
	}
}
