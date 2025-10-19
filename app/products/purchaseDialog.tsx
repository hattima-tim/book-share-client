"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Coins, CheckCircle, AlertCircle, DollarSign } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/types/product";
import { DashboardResponse } from "@/types/dashboard";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface PurchaseDialogProps {
  product: Product;
  user: DashboardResponse;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PurchaseDialog({
  product,
  user,
  open,
  onOpenChange,
}: PurchaseDialogProps) {
  const { getToken } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [message, setMessage] = useState("");

  const CREDIT_VALUE = 10; // $10 = 1 credit
  const creditsNeeded = Math.ceil(product.price / CREDIT_VALUE);

  const creditsToUse = Math.min(user.currentBalance, creditsNeeded);
  const creditCoverage = creditsToUse * CREDIT_VALUE;
  const remainingAmount = Math.max(0, product.price - creditCoverage);

  const handlePurchase = async () => {
    setIsProcessing(true);
    try {
      const token = await getToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/purchase`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: product._id,
            productName: product.title,
            amount: product.price,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong. Please try again later."
        );
      }

      router.refresh();
      setPurchaseComplete(true);
      setIsProcessing(false);
    } catch (error: any) {
      setIsProcessing(false);
      setMessage(
        error.message || "Something went wrong. Please try again later."
      );
    }
  };

  const handleClose = () => {
    if (!isProcessing) {
      onOpenChange(false);
      setPurchaseComplete(false);
      setMessage("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle>
            {purchaseComplete ? "Purchase Complete!" : "Confirm Purchase"}
          </DialogTitle>
          <DialogDescription>
            {purchaseComplete
              ? "Your e-book is ready to read."
              : `You are about to purchase "${product.title}".`}
          </DialogDescription>
        </DialogHeader>

        {!purchaseComplete ? (
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Book Price
                </span>
                <span className="font-semibold text-foreground">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <div className="border-t pt-2 mt-2 mb-2">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Your Available Credits
                  </span>
                  <div className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-foreground">
                      {user.currentBalance} credits
                    </span>
                  </div>
                </div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Credits Applied
                  </span>
                  <span className="font-semibold text-foreground">
                    {creditsToUse} credits (${creditCoverage.toFixed(2)})
                  </span>
                </div>
              </div>

              <div className="border-t pt-2 mt-2">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    Amount to Pay
                  </span>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-bold text-foreground">
                      ${remainingAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Credits After Purchase
                  </span>
                  <span className="font-semibold text-foreground">
                    {user.currentBalance - creditsToUse} credits
                  </span>
                </div>
              </div>
            </div>

            {remainingAmount === 0 && (
              <Alert>
                <Coins className="h-4 w-4" />
                <AlertDescription>
                  Great! You can purchase this book entirely with your credits.
                </AlertDescription>
              </Alert>
            )}

            {remainingAmount > 0 && creditsToUse > 0 && (
              <Alert>
                <Coins className="h-4 w-4" />
                <AlertDescription>
                  You&apos;ll use {creditsToUse} credits and pay $
                  {remainingAmount.toFixed(2)} to complete this purchase.
                </AlertDescription>
              </Alert>
            )}

            {user.totalCreditsEarned === 0 && user.referredBy && (
              <Alert className="mb-4">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  This is your first purchase! You&apos;ll earn 2 credits after
                  completing this transaction.
                </AlertDescription>
              </Alert>
            )}

            {message && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center py-6">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <p className="text-center text-muted-foreground">{message}</p>
            </div>
          </div>
        )}

        <DialogFooter className="mt-6">
          {!purchaseComplete ? (
            <>
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={isProcessing}
                className="bg-transparent"
              >
                Cancel
              </Button>
              <Button onClick={handlePurchase} disabled={isProcessing}>
                {isProcessing
                  ? "Processing..."
                  : remainingAmount === 0
                  ? "Confirm Purchase"
                  : "Purchase"}
              </Button>
            </>
          ) : (
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
