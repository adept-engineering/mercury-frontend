import { z } from "zod";

export const EntitySchema = z.object({
    name: z.string().min(2, {
      message: "Entity name must be at least 2 characters.",
    }),
    email_address: z.string().email({
      message: "Please enter a valid email address.",
    }),
    address1: z.string().min(1, {
      message: "Address line 1 is required.",
    }),
    address2: z.string().optional(),
    city: z.string().min(1, {
      message: "City is required.",
    }),
    country: z.string().min(1, {
      message: "Country is required.",
    }),
    state: z.string().min(1, {
      message: "State is required.",
    }),
    zipcode: z.string().min(1, {
      message: "Zipcode is required.",
    }),
    organization_type: z.enum(["COMPANY", "PARTNER"], {
      required_error: "Please select an organization type.",
    }),
    referenceIDs: z.array(
      z.object({
        docType: z.string(),
        interchangeID: z.string().optional(),
        groupID: z.string().optional(),
        applicationID: z.string().optional(),
      })
    ),
  });

  export const ComplianceRuleSchema = z.object({
    rule: z.string().min(1, {
      message: "Rule is required.",
    }),
    rule_title: z.string().min(1, {
      message: "Rule title is required.",
    }),
  });