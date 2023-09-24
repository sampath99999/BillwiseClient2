import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/utils";

export async function POST(req, res) {
	let { name, type, price, status } = await req.json();
	// TODO validations pending
	try {
		let session = await getServerSession(AuthOptions);

		let packageDoc = await prisma.package.create({
			data: {
				name: name,
				price: parseFloat(price),
				network_id: await session.user.network_id,
				type: type,
				status: status,
			},
		});
		if (packageDoc) {
			return NextResponse.json({
				success: true,
				data: packageDoc,
			});
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

export async function DELETE(req, res) {
	let { ids } = await req.json();
	try {
		let deletePackage = await prisma.package.deleteMany({
			where: {
				id: {
					in: ids,
				},
			},
		});
		if (deletePackage) {
			return NextResponse.json({
				success: true,
			});
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
