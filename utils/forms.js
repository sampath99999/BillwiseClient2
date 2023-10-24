import * as z from "zod";

export const newPackageFormSchema = z.object({
	name: z
		.string({
			required_error: "Package Name is Required",
		})
		.min(3, "Package Name should be at least 3 character's long")
		.max(30, "Package Name should be at most 30 character's long"),
	price: z
		.string({
			required_error: "Invalid Amount",
			invalid_type_error: "Invalid Type!",
		})
		.min(1, "Invalid Amount")
		.max(1000, "Max Amount is 1000₹"),
	type: z.enum(["CHANNEL", "PACKAGE"]),
	status: z.boolean(),
});

export const newVillageFormSchema = z.object({
	name: z
		.string({
			required_error: "Package Name is Required",
		})
		.min(3, "Package Name should be at least 3 character's long")
		.max(30, "Package Name should be at most 30 character's long"),
	shortcode: z
		.string({
			required_error: "Shortcode is Required",
		})
		.length(3, "Shortcode must be 3 character's long"),
});

export const newStreetFormSchema = z.object({
	name: z
		.string({
			required_error: "Street Name is Required",
		})
		.min(3, "Street Name should be at least 3 character's long")
		.max(30, "Street Name should be at most 30 character's long"),
});

const phoneRegex = new RegExp(
	/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const newCustomerFormSchema = z.object({
	first_name: z
		.string({
			required_error: "Customer First Name is Required",
		})
		.min(3, "First Name should be at least 3 character's long")
		.max(30, "Customer First Name should be at most 30 character's long"),
	last_name: z
		.string({
			required_error: "Customer Last Name is Required",
		})
		.min(3, "Last Name should be at least 3 character's long")
		.max(30, "Last Name should be at most 30 character's long"),
	father_name: z
		.string()
		.min(3, "Father Name should be at least 3 character's long")
		.max(30, "Father Name should be at most 30 character's")
		.optional(),
	mother_name: z
		.string()
		.min(3, "Mother Name should be at least 3 character's long")
		.max(30, "Mother Name should be at most 30 character's"),
	phone_number: z
		.string({
			required_error: "Phone Number is Required",
		})
		.regex(
			phoneRegex,
			"Phone Number should be at least 10 characters long"
		),
	box_no: z.string().optional(),
	mso_id: z.string().optional(),
	note: z.string().optional(),
	street: z.string().optional(),
	village: z.string().optional(),
});
