import { z } from "zod";

export const EntitySchema = z.object({
    name: z.string().min(2, {
      message: "Entity name must be at least 2 characters.",
    }),
    email_address: z.string().email({
      message: "Please enter a valid email address.",
    }),
    address1: z.string().optional(),
    address2: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    state: z.string().optional(),
    zipcode: z.string().optional(),
    organization_type: z.enum(["COMPANY", "PARTNER"], {
      required_error: "Please select an organization type.",
    }),
    referenceIDs: z.array(
      z.object({
        docType: z.string(),
        InterchangeID: z.string().optional(),
        GroupID: z.string().optional(),
        ApplicationID: z.string().optional(),
      })
    ).min(1, {
      message: "At least one reference ID is required.",
    }),
  });

  export const ComplianceRuleSchema = z.object({
    rule: z.string().min(1, {
      message: "Rule is required.",
    }),
    rule_title: z.string().min(1, {
      message: "Rule title is required.",
    }),
  });