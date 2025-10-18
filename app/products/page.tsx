import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/cards";
import { Badge } from "@/components/ui/badge";
import { BookOpen, LogOut as LogOutIcon, Coins, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import { SignOutButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { DashboardResponse } from "@/types/dashboard";
import PurchaseButton from "./purchaseButton";

const StorePage = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`,
    {
      method: "GET",
      cache: "force-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const products: Product[] = await response.json();

  const dashboardResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const user: DashboardResponse = await dashboardResponse.json();

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
                {user.currentBalance} Credits
              </span>
            </div>
            <SignOutButton>
              <LogOutIcon className="h-5 w-5" />
            </SignOutButton>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">E-book Store</h1>
          <p className="mt-2 text-muted-foreground">
            Browse our collection and purchase using your credits
          </p>
        </div>

        {user.referredBy && !user.totalCreditsEarned ? (
          <Card className="mb-8 border-primary/50 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Coins className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    First Purchase Bonus!
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Make your first purchase and earn 2 credits. Your referrer
                    gets 2 credits too!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product._id} className="flex flex-col max-w-sm">
              <CardHeader className="p-0">
                <div className="relative w-full h-60 overflow-hidden rounded-t-lg bg-muted">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 pt-4">
                <Badge variant="secondary" className="mb-2">
                  {product.category}
                </Badge>
                <CardTitle className="mb-2 text-foreground">
                  {product.title}
                </CardTitle>
                <CardDescription className="mb-2 text-sm text-muted-foreground">
                  by {product.author}
                </CardDescription>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="text-2xl font-bold text-foreground">
                  ${product.price}
                </div>
                <PurchaseButton product={product} user={user} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StorePage;
