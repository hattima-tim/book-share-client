import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/cards";
import { ComponentErrorBoundary } from "@/components/ui/error-boundary";
import { DashboardResponse } from "@/types/dashboard";
import { Users, CheckCircle, Clock, Coins } from "lucide-react";

interface ReferralStatsProps {
  dashboardData: DashboardResponse;
}

export function ReferralStats({ dashboardData }: ReferralStatsProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Referral Statistics</CardTitle>
          <CardDescription>Track your referral performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Referred</p>
                <p className="text-2xl font-bold text-foreground">
                  {dashboardData.referredUsers.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Converted</p>
                <p className="text-2xl font-bold text-foreground">
                  {dashboardData.convertedUsers}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Coins className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Credits Earned</p>
                <p className="text-2xl font-bold text-foreground">
                  {dashboardData.totalCreditsEarned}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {dashboardData.referredUsers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Referred Users</CardTitle>
            <CardDescription>
              People who signed up with your referral code
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData.referredUsers.map((referral) => (
                <ComponentErrorBoundary key={referral._id}>
                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <span className="text-sm font-semibold text-foreground">
                          {referral.name.charAt(0).toUpperCase() || "?"}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {referral.name || "Unknown User"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(referral.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {referral.status === "converted" ? (
                        <Badge
                          variant="default"
                          className="bg-success text-white"
                        >
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Converted
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <Clock className="mr-1 h-3 w-3" />
                          Pending
                        </Badge>
                      )}
                    </div>
                  </div>
                </ComponentErrorBoundary>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
