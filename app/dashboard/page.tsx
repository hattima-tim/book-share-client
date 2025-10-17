import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardResponse } from "@/types/dashboard";
import { SignOutButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { BookOpen, LogOut, Coins, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import { ReferralSection } from "./referralSection";
import { ReferralStats } from "./referralStats";

const DashboardPage = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const dashboardData: DashboardResponse = await response.json();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">BookShare</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2">
              <Coins className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">
                {dashboardData.currentBalance} Credits
              </span>
            </div>
            <SignOutButton>
              <LogOut className="h-5 w-5" />
            </SignOutButton>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {dashboardData.name}!
          </h1>
          <p className="mt-2 text-muted-foreground">
            Manage your referrals and browse our e-book collection.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Credits
              </CardTitle>
              <Coins className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {dashboardData.totalCreditsEarned}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Available to spend
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Referral Code
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {dashboardData.referralCode}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Share with friends
              </p>
            </CardContent>
          </Card>

          {dashboardData.convertedUsers < 1 ? (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  First Purchase
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">No</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Earn 2 credits
                </p>
              </CardContent>
            </Card>
          ) : null}
        </div>

        <Tabs defaultValue="referrals" className="space-y-4">
          <TabsList>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="store">E-book Store</TabsTrigger>
          </TabsList>

          <TabsContent value="referrals" className="space-y-4">
            <ReferralSection dashboardData={dashboardData} />
            <ReferralStats dashboardData={dashboardData} />
          </TabsContent>

          <TabsContent value="store">
            <Card>
              <CardHeader>
                <CardTitle>E-book Store</CardTitle>
                <CardDescription>
                  Browse and purchase e-books using your credits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/store">
                  <Button>Browse E-books</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;
