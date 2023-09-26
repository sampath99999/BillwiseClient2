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
