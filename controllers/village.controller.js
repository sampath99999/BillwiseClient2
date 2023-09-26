import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const createVillage = async function (name, shortcode) {
	try {
		let session = await getServerSession(AuthOptions);
		let villageDoc = await prisma.village.create({
			data: {
				name,
				shortcode,
				network_id: await session.user.network_id,
			},
		});
		if (villageDoc) {
			return NextResponse.json({
				success: true,
				data: villageDoc,
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
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{
				success: false,
				message: "Something went wrong",
			},
			{ status: 500 }
		);
	}
};

export const deleteVillages = async function (ids) {
	try {
		let session = await getServerSession(AuthOptions);
		let deleteResponse = await prisma.village.deleteMany({
			where: {
				id: {
					in: ids,
				},
				network_id: await session.user.network_id,
			},
		});
		if (deleteResponse) {
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
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{
				success: false,
				message: "Something went wrong",
			},
			{ status: 500 }
		);
	}
};
