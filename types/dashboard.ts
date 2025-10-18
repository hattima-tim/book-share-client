export interface IUser {
  _id: string;
  clerkUserId: string;
  referralCode: string;
  credits: number;
  totalCreditsEarned: number;
  totalReferredUsers: number;
  name: string;
  createdAt: string;
  referredBy: string | null;
}

export interface DashboardResponse {
  convertedUsers: number;
  totalCreditsEarned: number;
  currentBalance: number;
  referralLink: string;
  referralCode: string;
  name: string;
  referredBy: string | null;
  referredUsers: (IUser & { status: "pending" | "converted" })[];
}
