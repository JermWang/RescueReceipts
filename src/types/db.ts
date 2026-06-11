export type SubmissionStatus = "pending" | "approved" | "denied" | "paid";

export type AdoptionSubmission = {
  id: string;
  created_at: string;
  updated_at: string;
  x_handle: string;
  x_post_url: string;
  wallet_address: string;
  pet_name: string;
  pet_type: string;
  adoption_date: string;
  shelter_name: string | null;
  location: string | null;
  story: string | null;
  status: SubmissionStatus;
  approved_amount_sol: number | null;
  transaction_signature: string | null;
  admin_notes: string | null;
  reviewed_at: string | null;
  paid_at: string | null;
  model_variant: string | null;
  model_color: string | null;
  featured: boolean;
  public_notes: string | null;
};

export type PublicReceipt = Pick<
  AdoptionSubmission,
  | "id"
  | "created_at"
  | "x_handle"
  | "x_post_url"
  | "pet_name"
  | "pet_type"
  | "adoption_date"
  | "shelter_name"
  | "location"
  | "status"
  | "approved_amount_sol"
  | "transaction_signature"
  | "reviewed_at"
  | "paid_at"
  | "model_variant"
  | "model_color"
  | "featured"
  | "public_notes"
>;

export const PUBLIC_RECEIPT_COLUMNS =
  "id,created_at,x_handle,x_post_url,pet_name,pet_type,adoption_date,shelter_name,location,status,approved_amount_sol,transaction_signature,reviewed_at,paid_at,model_variant,model_color,featured,public_notes";
