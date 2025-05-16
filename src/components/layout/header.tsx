'use client';

import { SignInButton } from '@clerk/nextjs';
import { SignUpButton } from '@clerk/nextjs';
import { SignedOut } from '@clerk/nextjs';
import { SignedIn } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Header() {
  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16">
      <ThemeToggle />
      <SignedOut>
        <Link href="/" className="mr-auto">
          <Button variant="ghost" size="default">
            Home
          </Button>
        </Link>
        <SignInButton>
          <Button variant="default" size="default">
            Sign In
          </Button>
        </SignInButton>
        <SignUpButton>
          <Button variant="outline" size="default">
            Sign Up
          </Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
