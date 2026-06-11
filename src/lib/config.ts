export const SITE = {
  name: "RescueReceipts",
  ticker: "$RECEIPT",
  tagline: "Adopt a pet. Post proof. Claim a SOL starter bounty.",
  subtagline:
    "Verified pet adoptions become public receipts. Approved adopters may receive a small SOL starter bounty to help with first supplies.",
  xHandle: "RescueReceipts",
  xUrl: "https://x.com/RescueReceipts",
  contactEmail: "hello@rescuereceipts.xyz",
  solanaCluster: "mainnet-beta" as const,
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/park", label: "Adoption Park" },
  { href: "/receipts", label: "Receipts" },
  { href: "/bounties", label: "Live Bounties" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/terms", label: "Terms" },
];

export const PET_TYPES = [
  { value: "dog", label: "Dog" },
  { value: "cat", label: "Cat" },
  { value: "rabbit", label: "Rabbit" },
  { value: "bird", label: "Bird" },
  { value: "reptile", label: "Reptile" },
  { value: "other", label: "Other" },
] as const;

export type PetType = (typeof PET_TYPES)[number]["value"];

export const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending review", color: "bg-amber-100 text-amber-900 border-amber-300" },
  approved: { label: "Approved", color: "bg-soft-green/20 text-soft-greenDark border-soft-green/60" },
  denied: { label: "Denied", color: "bg-rose-100 text-rose-800 border-rose-300" },
  paid: { label: "Paid", color: "bg-sol-purple/15 text-sol-purple border-sol-purple/40" },
};

export const BOUNTY_TIERS = [
  {
    id: "starter",
    name: "Starter Adoption Bounty",
    description: "Small starter SOL for first food, bedding, or basic supplies.",
  },
  {
    id: "featured",
    name: "Featured Adoption Bounty",
    description: "Highlighted adoption story shown in the Adoption Park.",
  },
  {
    id: "sponsored",
    name: "Community Sponsored Bounty",
    description: "Funded by community sponsors or shelter partners.",
  },
] as const;

export const DEFAULT_POOL = {
  totalSol: 0,
  pendingCount: 0,
  approvedCount: 0,
  paidCount: 0,
  featuredCount: 0,
};

export const REQUIRED_CONFIRMATIONS = [
  "I confirm this is my adopted pet",
  "I confirm my proof post is public, includes a video of my pet, and tags @RescueReceipts",
  "I confirm the adoption is real",
  "I understand submissions are manually reviewed",
  "I understand bounties are not guaranteed",
  "I understand pets are a long-term responsibility and should not be adopted only for a reward",
] as const;
