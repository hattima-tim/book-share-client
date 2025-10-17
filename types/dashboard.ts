export interface IUser {
  _id: string;
  clerkUserId: string;
  referralCode: string;
  credits: number;
  totalCreditsEarned: number;
  totalReferredUsers: number;
  name: string;
  createdAt: string;
}

export interface DashboardResponse {
  convertedUsers: number;
  totalCreditsEarned: number;
  currentBalance: number;
  referralLink: string;
  referralCode: string;
  name: string;
  referredUsers: (IUser & { status: "pending" | "converted" })[];
}
