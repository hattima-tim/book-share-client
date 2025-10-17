"use client";

import { BookOpen, Gift, Users, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/cards";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">BookShare</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-5xl font-bold leading-tight text-foreground text-balance">
            Share Great Books, Earn Credits Together
          </h1>
          <p className="mt-6 text-xl text-muted-foreground text-pretty">
            Discover amazing e-books and earn credits when you share them with
            friends. Everyone wins when you both make your first purchase.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Start Earning Credits
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-transparent"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                Quality E-books
              </h3>
              <p className="text-muted-foreground">
                Access a curated collection of high-quality e-books across
                various topics and genres.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                Refer Friends
              </h3>
              <p className="text-muted-foreground">
                Share your unique referral link with friends and help them
                discover great books.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Gift className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                Earn Credits
              </h3>
              <p className="text-muted-foreground">
                Get 2 credits when you make your first purchase, and 2 more when
                your referral does too.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
            How It Works
          </h2>
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto text-2xl font-bold">
                  1
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  Sign Up
                </h3>
                <p className="text-muted-foreground">
                  Create your free account and get your unique referral code.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto text-2xl font-bold">
                  2
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  Share & Purchase
                </h3>
                <p className="text-muted-foreground">
                  Share your link with friends and make your first purchase to
                  earn 2 credits.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto text-2xl font-bold">
                  3
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  Earn Together
                </h3>
                <p className="text-muted-foreground">
                  When your friend makes their first purchase, you both get 2
                  more credits!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <Sparkles className="mx-auto h-12 w-12 text-primary mb-6" />
          <h2 className="mb-4 text-3xl font-bold text-foreground text-balance">
            Ready to Start Earning?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground text-pretty">
            Join thousands of readers who are sharing great books and earning
            credits together.
          </p>
          <Link href="/register">
            <Button size="lg">Create Your Free Account</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 BookShare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
