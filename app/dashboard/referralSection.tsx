"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, Check, Share2 } from "lucide-react";
import { DashboardResponse } from "@/types/dashboard";

interface ReferralSectionProps {
  dashboardData: DashboardResponse;
}

export function ReferralSection({ dashboardData }: ReferralSectionProps) {
  const [copied, setCopied] = useState({
    code: false,
    link: false,
  });

  const handleLinkCopy = async () => {
    try {
      await navigator.clipboard.writeText(dashboardData.referralLink);
      setCopied((prev) => ({ ...prev, link: true }));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCodeCopy = async () => {
    try {
      await navigator.clipboard.writeText(dashboardData.referralCode);
      setCopied((prev) => ({ ...prev, code: true }));
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join BookShare",
          text: "Sign up for BookShare and we'll both earn credits when you make your first purchase!",
          url: dashboardData.referralLink,
        });
      } catch (err) {
        console.error("Failed to share:", err);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Referral Link</CardTitle>
        <CardDescription>
          Share this link with friends to earn credits together
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertDescription>
            When someone signs up with your link and makes their first purchase,
            you both earn 2 credits!
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label htmlFor="referral-code">Your Referral Code</Label>
          <div className="flex gap-2">
            <Input
              id="referral-code"
              value={dashboardData.referralCode}
              readOnly
              className="font-mono"
            />
            <Button variant="outline" onClick={handleCodeCopy}>
              {copied.code ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="referral-link">Your Referral Link</Label>
          <div className="flex gap-2">
            <Input
              id="referral-link"
              value={dashboardData.referralLink}
              readOnly
              className="text-sm"
            />
            <Button variant="outline" onClick={handleLinkCopy}>
              {copied.link ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleLinkCopy} className="flex-1">
            {copied.link ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy Link
              </>
            )}
          </Button>

          {/* @ts-expect-error not available in firefox */}
          {navigator.share ? (
            <Button
              onClick={handleShare}
              variant="outline"
              className="flex-1 bg-transparent"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
