import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/utils";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const createStreet = async function (name, village_id) {
	try {
		let session = await getServerSession(AuthOptions);
		let streetDoc = await prisma.street.create({
			data: {
				name,
				network_id: await session.user.network_id,
				village_id,
			},
		});
		if (streetDoc) {
			return NextResponse.json({
				success: true,
				data: streetDoc,
			});
		} else {
			return NextResponse.json(
				{
					success: false,
					message: "Street not created! try again later",
				},
				{ status: 500 }
			);
		}
	} catch (error) {
		// TODO Report error
		console.log(error);
		return NextResponse.json(
			{
				success: false,
				message: "Error Occured during street creation",
			},
			{ status: 500 }
		);
	}
};

export const deleteStreet = async function (ids) {
	try {
		let session = await getServerSession(AuthOptions);
		let deleteResponse = await prisma.street.deleteMany({
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
					message: "Cannot delete Street",
				},
				{ status: 500 }
			);
		}
	} catch (error) {
		// TODO Report error
		return NextResponse.json(
			{
				success: false,
				message: "Error occured while deleting Street",
			},
			{ status: 500 }
		);
	}
};

export const patchStreet = async function (id, data) {
	try {
		let updatePackage = await prisma.street.update({
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
					message: "Cannot update Street",
				},
				{ status: 500 }
			);
		}
	} catch (e) {
		// TODO Report error
		return NextResponse.json(
			{
				success: false,
				message: "Error occured while updating Street",
			},
			{ status: 500 }
		);
	}
};
