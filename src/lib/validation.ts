import { z } from "zod";
import { isValidSolanaAddress } from "./solana";
import { PET_TYPES } from "./config";

const petTypeValues = PET_TYPES.map((p) => p.value) as [string, ...string[]];

const xUrlRegex = /^https?:\/\/(?:www\.)?(?:x\.com|twitter\.com)\/[A-Za-z0-9_]{1,15}\/status\/\d{5,}/i;
const xHandleRegex = /^@?[A-Za-z0-9_]{1,15}$/;

export const submissionSchema = z.object({
  x_handle: z
    .string()
    .trim()
    .min(1, "X handle required")
    .regex(xHandleRegex, "Invalid X/Twitter handle")
    .transform((s) => s.replace(/^@/, "")),
  x_post_url: z
    .string()
    .trim()
    .url("Must be a URL")
    .regex(xUrlRegex, "Must be a public X/Twitter post URL"),
  wallet_address: z
    .string()
    .trim()
    .min(32, "Wallet too short")
    .max(64, "Wallet too long")
    .refine(isValidSolanaAddress, "Invalid Solana address"),
  pet_name: z.string().trim().min(1, "Pet name required").max(60),
  pet_type: z.enum(petTypeValues),
  adoption_date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD"),
  shelter_name: z.string().trim().max(120).optional().or(z.literal("")),
  location: z.string().trim().max(120).optional().or(z.literal("")),
  story: z.string().trim().max(800).optional().or(z.literal("")),
  confirmations: z.array(z.boolean()).length(6).refine((arr) => arr.every(Boolean), {
    message: "All confirmations are required",
  }),
});

export type SubmissionInput = z.infer<typeof submissionSchema>;

export const adminUpdateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["pending", "approved", "denied", "paid"]).optional(),
  approved_amount_sol: z.coerce.number().min(0).max(1000).optional().nullable(),
  transaction_signature: z.string().trim().min(20).max(200).optional().nullable(),
  admin_notes: z.string().trim().max(2000).optional().nullable(),
  public_notes: z.string().trim().max(500).optional().nullable(),
  model_variant: z.string().trim().max(40).optional().nullable(),
  model_color: z.string().trim().max(40).optional().nullable(),
  featured: z.boolean().optional(),
});

export type AdminUpdateInput = z.infer<typeof adminUpdateSchema>;
