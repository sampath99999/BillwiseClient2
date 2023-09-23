import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AuthOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/utils";

export async function POST(req, res) {
	let { name, type, price, status } = await req.json();
	// TODO validations pending
	// TODO save and send positive response
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
